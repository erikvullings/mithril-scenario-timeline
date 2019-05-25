import { IExecutingTimelineItem, IDependency } from '.';

export class CircularDependencyError extends Error {
  constructor(m: string, private dependencies: ICircularDependency[]) {
      super(m);

      // Set the prototype explicitly.
      Object.setPrototypeOf(this, CircularDependencyError.prototype);
  }

  get circularDependencies() {
    return this.dependencies;
  }
}

export interface ICircularDependency {
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
}
