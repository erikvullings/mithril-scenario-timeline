import m, { FactoryComponent, Attributes } from 'mithril';
import { IBoundingRectangle } from '..';

export interface IScenarioTime extends Attributes {
  /** Bound for the component using absolute positioning */
  bounds: IBoundingRectangle;
  scale: number;
  /** Number of seconds since the start */
  time?: number;
}

export const ScenarioTime: FactoryComponent<IScenarioTime> = () => {
  const boundsToStyle = (b: IBoundingRectangle, time: number, scale: number) =>
  `top: ${b.top}px; left: ${b.left + time * scale}px; width: 2px; height: ${b.height}px;`;

  return {
    view: ({ attrs: { scale, time, bounds } }) => {
      if (!scale || !time) {
        return undefined;
      }
      return m('.mst__time', { style: boundsToStyle(bounds, time, scale) });
    },
  };
};
