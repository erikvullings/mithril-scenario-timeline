import m, { FactoryComponent, Attributes } from 'mithril';
import { IBoundingRectangle, IExecutingTimelineItem, ITimelineItem } from '../interfaces';
import { ScenarioItem } from './scenario-item';
import { boundsToStyle } from '../helpers';

export interface IScenarioItems extends Attributes {
  /** Bound for the component using absolute positioning */
  bounds: IBoundingRectangle;
  /** Height of a single entry, e.g. needs to be matched with the tree component. */
  lineHeight: number;
  /** 1 second is x pixels horizontally */
  scale: number;
  /** Optional onclick event handler to inform you that the item has been clicked */
  onClick?: (item: IExecutingTimelineItem) => void;
  /** Optional component to render the item title */
  titleView?: FactoryComponent<{ item: ITimelineItem }>;
  items: IExecutingTimelineItem[];
}

export const ScenarioItems: FactoryComponent<IScenarioItems> = () => {
  /** Space between subsequent rows */
  const gutter = 2;

  return {
    view: ({ attrs: { items, bounds, scale, lineHeight, onClick, titleView } }) => {
      const getBounds = (item: IExecutingTimelineItem, row: number) => ({
        top: bounds.top + lineHeight * row + gutter,
        left: item.startTime! * scale,
        height: lineHeight - 2 * gutter,
        width: (item.endTime! - item.startTime!) * scale,
      });

      return m(
        '.mst__items',
        { style: boundsToStyle(bounds) },
        items.map((item, row) =>
          m(ScenarioItem, { item, key: item.id, bounds: getBounds(item, row), onClick, titleView })
        )
      );
    },
  };
};
