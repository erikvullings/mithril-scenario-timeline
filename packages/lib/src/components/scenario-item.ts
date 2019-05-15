import m, { FactoryComponent, Attributes } from 'mithril';
import { IExecutingTimelineItem } from '..';
import { IBoundingRectangle } from '../interfaces';
import { boundsToStyle, boundsToCircleStyle } from '../helpers';

export interface IScenarioItem extends Attributes {
  /** Bound for the component using absolute positioning */
  bounds: IBoundingRectangle;
  item: IExecutingTimelineItem;
}

export const ScenarioItem: FactoryComponent<IScenarioItem> = () => {
  const isInstantenaous = (item: IExecutingTimelineItem) => item.endTime === item.startTime;
  return {
    view: ({ attrs: { item, bounds } }) => {
      return isInstantenaous(item)
        ? m(
            '.mst__item.mst__item--circle',
            { style: boundsToCircleStyle(bounds, 8) },
            m('div.mst__title', item.title)
          )
        : m('.mst__item.mst__item--rect', { style: boundsToStyle(bounds) }, m('div.mst__title', item.title));
    },
  };
};
