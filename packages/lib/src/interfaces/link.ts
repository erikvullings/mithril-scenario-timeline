export interface ILink {
  /** Horizontal start coordinate */
  x1: number;
  /** Vertical start coordinate */
  y1: number;
  /** Horizontal end coordinate */
  x2: number;
  /** Vertical end coordinate */
  y2: number;
  /**
   * Indicates whether we need to mark the dependency as dependent on start or end condition,
   * or none if already clear (e.g. for items with children).
   */
  indicator: 'start' | 'end' | 'none';
}
