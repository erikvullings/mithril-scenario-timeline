import m, { FactoryComponent, Attributes } from 'mithril';
import '../styles/scenario-timeline.css';
import { ITimelineItem, IExecutingTimelineItem } from '../interfaces/timeline';
import { preprocessTimeline } from '../helpers';
import { ScenarioItems } from './scenario-items';
import { TimeAxis } from './time-axis';
import { ScenarioLinks } from './scenario-links';

export interface IScenarioTimeline extends Attributes {
  /** 1 second is x pixels horizontally */
  scale?: number;
  /** Line height in pixels */
  lineHeight?: number;
  /** The items you want to place on the timeline */
  timeline: ITimelineItem[];
  /** Optional onclick event handler to inform you that the item has been clicked */
  onClick?: (item: IExecutingTimelineItem) => void;
}

export const ScenarioTimeline: FactoryComponent<IScenarioTimeline> = () => {
  const state = {} as {
    // 1 second is x pixels
    scale?: number;
    lineHeight: number;
    onClick?: (item: ITimelineItem) => void;
  };

  const gutter = 4;
  const margin = 20;
  const timeAxisHeight = 32;

  const calculateScale = (duration: number) => duration > 800 ? Math.floor(80000 / duration) / 100 : 1;

  return {
    oninit: ({ attrs: { scale, lineHeight, onClick } }) => {
      state.scale = scale;
      state.lineHeight = lineHeight || 28;
      state.onClick = onClick;
    },
    view: ({ attrs: { timeline } }) => {
      const items = preprocessTimeline(timeline);
      const startTime = Math.min(...items.map(item => item.startTime!));
      const endTime = Math.max(...items.map(item => item.endTime!));
      const { lineHeight, onClick, scale = calculateScale(endTime - startTime) } = state;
      const bounds = {
        left: 0,
        top: gutter,
        width: scale * endTime + margin,
        height: items.length * lineHeight,
      };
      console.table(items);
      return m('.mst__container', [
        m(TimeAxis, { startTime, endTime, bounds: { ...bounds, top: 0, height: timeAxisHeight }, scale }),
        m(ScenarioItems, { items, bounds, lineHeight, scale, onClick }),
        m(ScenarioLinks, { items, bounds: { ...bounds, top: gutter + timeAxisHeight }, lineHeight, scale }),
      ]);
    },
  };
};
