import m, { FactoryComponent, Attributes } from 'mithril';
import '../styles/scenario-timeline.css';
import { ITimelineItem } from '../interfaces/timeline';
import { calcStartEndTimes, toTree, flatten, pipe } from '../helpers';
import { ScenarioItems } from './scenario-items';
import { TimeAxis } from './time-axis';

export interface IScenarioTimeline extends Attributes {
  /** 1 second is x pixels horizontally */
  scale?: number;
  /** Line height in pixels */
  lineHeight?: number;
  /** The items you want to place on the timeline */
  timeline: ITimelineItem[];
}

export const ScenarioTimeline: FactoryComponent<IScenarioTimeline> = () => {
  const state = {} as {
    // 1 second is x pixels
    scale: number;
    lineHeight: number;
  };

  const gutter = 4;
  const margin = 20;
  const timeAxisHeight = 32;
  const preprocessTimeline = pipe(calcStartEndTimes, toTree, flatten);

  return {
    oninit: ({ attrs: { scale, lineHeight } }) => {
      state.scale = scale || 1;
      state.lineHeight = lineHeight || 28;
    },
    view: ({ attrs: { timeline } }) => {
      const { lineHeight, scale } = state;
      const items = preprocessTimeline(timeline);
      const startTime = Math.min(...items.map(item => item.startTime!));
      const endTime = Math.max(...items.map(item => item.endTime!));
      const bounds = {
        left: 0,
        top: gutter,
        width: scale * endTime + margin,
        height: items.length * lineHeight,
      };
      console.table(items);
      return [
        m(TimeAxis, { startTime, endTime, bounds: { ...bounds, top: 0, height: timeAxisHeight }, scale }),
        m(ScenarioItems, { items, bounds, lineHeight, scale }),
      ];
    },
  };
};
