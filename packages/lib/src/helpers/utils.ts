import { ITimelineItem, IExecutingTimelineItem, IBoundingRectangle } from '../interfaces';
import { IDependency } from '../interfaces/dependency';

/**
 * Convert the timeline items to their reactive counterpart (IExecutingTimelineItem),
 * so start time and duration can be computed reactively.
 */
export const calcStartEndTimes = (items: ITimelineItem[]) => {
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
      return acc && (cur.condition === 'started' ? lookupMap[cur.id].hasStartTime : lookupMap[cur.id].hasEndTime);
    }, true);

  // Resolve start/end times (and thereby duration)
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
      console.error(JSON.stringify(lookupMap, null, 2));
      console.error(JSON.stringify(keys, null, 2));
      throw Error('Nothing is changing anymore. Exiting!');
    }
  } while (keys.length);

  // Convert to array
  return Object.keys(lookupMap).reduce(
    (acc, cur) => {
      acc.push(lookupMap[cur].item);
      return acc;
    },
    [] as IExecutingTimelineItem[]
  );
};

export const toTree = (items: IExecutingTimelineItem[]) => {
  // TODO Check if isOpen
  const findChildren = (parentId?: string): IExecutingTimelineItem[] =>
    items
      .filter(item => (parentId ? item.parentId === parentId : !item.parentId))
      .map(item => ({
        ...item,
        children: findChildren(item.id),
      }));

  return findChildren();
};

export const flatten = (items: IExecutingTimelineItem[]) => {
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

/** Convert a bounding rectangle to a style */
export const boundsToStyle = (b: IBoundingRectangle) =>
  `top: ${b.top}px; left: ${b.left}px; width: ${b.width}px; height: ${b.height}px;`;

/** Convert a bounding rectangle to a style for wrapping a circle */
export const boundsToCircleStyle = (b: IBoundingRectangle) => `top: ${b.top}px; left: ${b.left}px`;

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
  const piped = fns.reduce((prevFn, nextFn) => (value: R) => nextFn(prevFn(value)), value => value);
  return (...args: T) => piped(fn1(...args));
};

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
