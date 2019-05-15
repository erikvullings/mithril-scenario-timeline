import m, { FactoryComponent, Attributes } from 'mithril';
import { IExecutingTimelineItem } from '..';
import { IBoundingRectangle } from '../interfaces';
import { boundsToStyle } from '../helpers';

export interface IScenarioLinks extends Attributes {
  /** Bound for the component using absolute positioning */
  bounds: IBoundingRectangle;
  /** Height of a single entry, e.g. needs to be matched with the tree component. */
  lineHeight: number;
  /** 1 second is x pixels horizontally */
  scale: number;
  items: IExecutingTimelineItem[];
}

export const ScenarioLinks: FactoryComponent<IScenarioLinks> = () => {
  return {
    view: ({ attrs: { bounds } }) => {
      return m('.mst__links', { style: boundsToStyle(bounds) });
    },
  };
};
