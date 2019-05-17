import m, { FactoryComponent, Attributes } from 'mithril';
import { IExecutingTimelineItem } from '..';
import { IBoundingRectangle } from '../interfaces';
import { boundsToStyle, extractDependencyLinks } from '../helpers';
import { ScenarioLink } from './scenario-link';

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
    view: ({ attrs: { items, bounds, lineHeight, scale } }) => {
      const links = extractDependencyLinks(items, lineHeight, scale);
      // console.table(links);
      return m('.mst__links', { style: boundsToStyle(bounds) }, links.map(link => m(ScenarioLink, { link })));
    },
  };
};
