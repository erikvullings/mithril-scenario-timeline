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
  `top: ${b.top}px; left: ${b.left}px; width: ${b.width}px; height: ${b.height}px`;

/** Convert a bounding rectangle to a style for wrapping a circle */
export const boundsToCircleStyle = (b: IBoundingRectangle, diameter = 8) =>
  `top: ${b.top + (b.height - diameter) / 2}px; left: ${b.left -
    diameter / 2}px; width: ${diameter}px; height: ${diameter}px`;

// export const compose = <T>(...fns: Function[]) => fns.reduceRight(_pipe)

export const compose = <R>(fn1: (a: R) => R, ...fns: Array<(a: R) => R>) =>
  fns.reduce((prevFn, nextFn) => value => prevFn(nextFn(value)), fn1);

export const pipe = <T extends any[], R>(fn1: (...args: T) => R, ...fns: Array<(a: R) => R>) => {
  const piped = fns.reduce((prevFn, nextFn) => (value: R) => nextFn(prevFn(value)), value => value);
  return (...args: T) => piped(fn1(...args));
};
