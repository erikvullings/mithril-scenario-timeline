import {
  ITimelineItem,
  IExecutingTimelineItem,
  IBoundingRectangle,
  CircularDependencyError,
  ICircularDependency,
} from '../interfaces';
import { IDependency } from '../interfaces/dependency';
import { ILink } from '../interfaces/link';

/* Compose and pipe functions from https://dev.to/ascorbic/creating-a-typed-compose-function-in-typescript-3-351i */

/**
 * Compose multiple one-aray functions together, e.g. when supplying f1, f2 and f3,
 * the result is equivalent to fn1(fn2(fn3(inner))).
 */
export const compose = <R>(fn1: (a: R) => R, ...fns: Array<(a: R) => R>) =>
  fns.reduce((prevFn, nextFn) => value => prevFn(nextFn(value)), fn1);

/**
 * Pipe multiple one-aray functions together, e.g. when supplying f1, f2 and f3,
 * the result is equivalent to fn3(fn2(fn1(inner))).
 */
export const pipe = <T extends any[], R>(fn1: (...args: T) => R, ...fns: Array<(a: R) => R>) => {
  const piped = fns.reduce(
    (prevFn, nextFn) => (value: R) => nextFn(prevFn(value)),
    value => value
  );
  return (...args: T) => piped(fn1(...args));
};

/**
 * Convert the timeline items to their reactive counterpart (IExecutingTimelineItem),
 * so start time and duration can be computed reactively.
 */
const calcStartEndTimes = (items: ITimelineItem[]) => {
  const lookupMap = items.reduce(
    (acc, cur) => {
      const { id } = cur;
      acc[id] = {
        item: cur,
        start: [],
        end: [],
        hasStartTime: false,
        hasEndTime: false,
      };
      const { start, end } = acc[id];
      const children = items.filter(i => i.parentId === id).map(i => i.id);
      if (cur.dependsOn && cur.dependsOn.length) {
        acc[id].start = [...start, ...cur.dependsOn];
      }
      if (children.length) {
        acc[id].end = [...end, ...children.map(i => ({ id: i, condition: 'finished' } as IDependency))];
      }
      return acc;
    },
    {} as {
      [id: string]: {
        item: IExecutingTimelineItem;
        /** All dependencies to determine the items start time */
        start: IDependency[];
        /** All dependencies to determine the items end time, i.e. its children's end time, if any. */
        end: IDependency[];
        /** If true, the start time is resolved */
        hasStartTime: boolean;
        /** If true, the end time is resolved */
        hasEndTime: boolean;
        /** Calculated list of child IDs */
        children?: string[];
      };
    }
  );

  const resolvable = (deps: IDependency[]) =>
    deps.reduce((acc, cur) => {
      return (
        acc &&
        lookupMap.hasOwnProperty(cur.id) &&
        (cur.condition === 'started' ? lookupMap[cur.id].hasStartTime : lookupMap[cur.id].hasEndTime)
      );
    }, true);

  // Resolve start/end times
  let keys = Object.keys(lookupMap);
  do {
    let hasChanged = false;
    keys = keys.filter(key => {
      const { item, start, end, hasStartTime, hasEndTime } = lookupMap[key];
      if (!hasStartTime) {
        if (start.length === 0) {
          item.startTime = item.delay || 0;
          lookupMap[key].hasStartTime = true;
        } else {
          const canResolve = resolvable(start);
          if (canResolve) {
            item.startTime =
              (item.delay || 0) +
              Math.max(
                ...start.map(
                  cur =>
                    (cur.condition === 'started' ? lookupMap[cur.id].item.startTime : lookupMap[cur.id].item.endTime) ||
                    0
                )
              );
            lookupMap[key].hasStartTime = true;
          }
        }
      }
      if (!hasEndTime) {
        if (end.length === 0) {
          if (lookupMap[key].hasStartTime) {
            item.endTime = item.startTime;
            lookupMap[key].hasEndTime = true;
          }
        } else {
          const canResolve = resolvable(end);
          if (canResolve) {
            item.endTime = Math.max(
              ...end.map(
                cur =>
                  (cur.condition === 'started' ? lookupMap[cur.id].item.startTime : lookupMap[cur.id].item.endTime) || 0
              )
            );
            lookupMap[key].hasEndTime = true;
          }
        }
      }
      hasChanged =
        hasChanged || hasStartTime !== lookupMap[key].hasStartTime || hasEndTime !== lookupMap[key].hasEndTime;
      return !(lookupMap[key].hasStartTime && lookupMap[key].hasEndTime);
    });
    if (!hasChanged && keys.length) {
      // console.error(JSON.stringify(lookupMap, null, 2));
      // console.error(JSON.stringify(keys, null, 2));
      // TODO Add error callback, and mention possible circular dependencies, e.g.
      // Return all items that haven't been resolved
      // Inspect those for head/tail dependencies, i.e. A waits for B to finish, while B waits for A to start.
      // keys.length = 0; // To stop the loop
      throw new CircularDependencyError(
        'Cannot resolve circular dependencies',
        keys.reduce((acc, key) => {
          acc.push(lookupMap[key]);
          return acc;
        }, [] as ICircularDependency[])
      );
    }
  } while (keys.length);

  // Convert to array
  return Object.keys(lookupMap).reduce((acc, cur) => {
    acc.push(lookupMap[cur].item);
    return acc;
  }, [] as IExecutingTimelineItem[]);
};

const toTree = (items: IExecutingTimelineItem[]) => {
  // TODO Check if isOpen
  const findChildren = (parentId?: string): IExecutingTimelineItem[] =>
    items
      .filter(item => (parentId ? item.parentId === parentId : !item.parentId))
      .map(item => ({
        ...item,
        children: item.isOpen ? findChildren(item.id) : undefined,
      }));

  return findChildren();
};

const flatten = (items: IExecutingTimelineItem[]) => {
  const f = (children: IExecutingTimelineItem[], init: IExecutingTimelineItem[]) =>
    children.reduce((acc, child) => {
      acc.push(child);
      if (child.children && child.children.length) {
        f(child.children, acc);
      }
      return acc;
    }, init);
  return f(items, []);
};

export const preprocessTimeline = pipe(calcStartEndTimes, toTree, flatten);

export const extractDependencyLinks = (
  items: IExecutingTimelineItem[],
  lineHeight: number,
  scale: number,
  timeOffset: number
) => {
  const findItem = (id: string) =>
    items
      .map((it, index) => ({ it, index }))
      .filter(i => i.it.id === id)
      .shift();

  return items.reduce((acc, item, row) => {
    if (item.dependsOn && item.dependsOn.length) {
      const links = item.dependsOn
        .map(dep => {
          const found = findItem(dep.id);
          if (!found) {
            return undefined;
          }
          const { it, index } = found;
          const hasStartCondition = dep.condition === 'started';
          const time = hasStartCondition ? it.startTime! : it.endTime!;
          const verOffset = it.children ? 4 : -4;
          const horOffset = item.children ? -4 : -7;
          const x1 = (time + timeOffset) * scale;
          const y1 = (index + 1) * lineHeight + verOffset;
          const x2 = (item.startTime! + timeOffset) * scale + horOffset;
          const y2 = (row + 0.5) * lineHeight + 1 + (item.startTime! === time ? -6 : 0);
          return { x1, y1, x2, y2, indicator: it.children ? 'none' : hasStartCondition ? 'start' : 'end' };
        })
        .filter(Boolean) as ILink[];
      acc.push(...links);
    }
    return acc;
  }, [] as ILink[]);
};

/** Convert a bounding rectangle to a style */
export const boundsToStyle = (b: IBoundingRectangle) =>
  `top: ${b.top}px; left: ${b.left}px; width: ${b.width}px; height: ${b.height}px;`;

/** Convert a bounding rectangle to a style for the completion percentage */
export const boundsToCompletionStyle = (b: IBoundingRectangle, completion = 0) =>
  `top: 0px; left: 0px; width: ${b.width * completion}px; height: ${b.height - 3}px;`;

/** Convert a bounding rectangle to a style for wrapping a circle */
export const boundsToMarkerStyle = (b: IBoundingRectangle) =>
  `top: ${b.top + b.height / 2 - 12}px; left: ${b.left - 4}px`;

export const range = (s: number, e: number, step = 1) =>
  Array.from({ length: Math.ceil((e - s) / step) }, (_, k) => k * step + s);

/**
 * Pad left, default with a '0'
 *
 * @see http://stackoverflow.com/a/10073788/319711
 * @param {(string | number)} n
 * @param {number} width
 * @param {string} [z='0']
 * @returns
 */
export const padLeft = (n: string | number, width = 2, z = '0') => {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};
