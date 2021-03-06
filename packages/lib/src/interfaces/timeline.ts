import { TimelineItemState } from './timeline-state';
import { IDependency } from './dependency';

export interface ITimelineItem {
  /** ID of the item */
  readonly id: string;
  /** ID of the parent, if any */
  parentId?: string;
  /** Name of the item */
  title?: string;
  /** Delay in msec with respect to its parent or the start of the timeline. */
  delay?: number;
  /** If true, show the items children */
  isOpen?: boolean;
  /**
   * Percentage completed [0, 1].
   * For messages, this will be either 0 or 1, but for aggregated tasks,
   * this represents how many of the total number of messages are completed.
   */
  completed?: number;
  /**
   * If true, highlight the item.
   */
  highlight?: boolean;
  /** IDs of the items that it depends on before it can start, i.e. these other items need to be completed */
  dependsOn?: IDependency[];
  /** Additional properties you may wish to add */
  [key: string]: any;
  // /**
  //  * IDs of the items that consider it an alternative. If all alternatives are 'used',
  //  * this item can no longer be executed.
  //  */
  // alternativeTo?: string[];
}

export interface IExecutingTimelineItem extends ITimelineItem {
  /** Current state of the timeline item. Only relevant during execution. */
  state?: TimelineItemState;
  /**
   * Start time in seconds, relative to the scenario start time.
   */
  startTime?: number;
  /**
   * End time in seconds, relative to the scenario start time.
   */
  endTime?: number;
  /** Calculated list of child IDs */
  children?: IExecutingTimelineItem[];
}
