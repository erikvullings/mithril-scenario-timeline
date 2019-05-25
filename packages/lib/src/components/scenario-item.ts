import m, { FactoryComponent, Attributes } from 'mithril';
import { IExecutingTimelineItem } from '..';
import { IBoundingRectangle } from '../interfaces';
import { boundsToStyle, boundsToMarkerStyle, boundsToCompletionStyle } from '../helpers';

export interface IScenarioItem extends Attributes {
  /** Bound for the component using absolute positioning */
  bounds: IBoundingRectangle;
  /** Optional onclick event handler to inform you that the item has been clicked */
  onClick?: (item: IExecutingTimelineItem) => void;
  item: IExecutingTimelineItem;
  /** Optional component to render the item title */
  titleView?: FactoryComponent<{ item: IExecutingTimelineItem }>;
}

export const ScenarioItem: FactoryComponent<IScenarioItem> = () => {
  const isInstantaneous = (item: IExecutingTimelineItem) =>
    (!item.children || item.children.length === 0) && item.endTime === item.startTime;
  return {
    view: ({ attrs: { item, bounds, titleView, onClick } }) => {
      const onclick = onClick
        ? (e: MouseEvent) => {
            onClick(item);
            (e as any).redraw = false;
          }
        : undefined;
      return m(
        '.mst__item',
        isInstantaneous(item)
          ? m(
              item.highlight
                ? '.mst__item--diamond-attention'
                : item.completed === 1
                ? '.mst__item--diamond-completed'
                : '.mst__item--diamond',
              { style: boundsToMarkerStyle(bounds), onclick },
              m('.mst__title', titleView ? m(titleView, { item }) : item.title)
            )
          : m('.mst__item--rect', { style: boundsToStyle(bounds), onclick }, [
              m('.mst__item--completed', { style: boundsToCompletionStyle(bounds, item.completed) }),
              m('.mst__title', titleView ? m(titleView, { item }) : item.title),
            ])
      );
    },
  };
};
