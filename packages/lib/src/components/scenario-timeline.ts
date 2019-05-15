import m, { FactoryComponent, Attributes } from 'mithril';
import '../styles/scenario-timeline.css';
import { ITimelineItem } from '../interfaces/timeline';
import { calcStartEndTimes, toTree, flatten, pipe } from '../helpers';
import { ScenarioItems } from './scenario-items';

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

  const preprocessTimeline = pipe(calcStartEndTimes, toTree, flatten);

  return {
    oninit: ({ attrs: { scale, lineHeight } }) => {
      state.scale = scale || 1;
      state.lineHeight = lineHeight || 28;
    },
    view: ({ attrs: { timeline } }) => {
      const { lineHeight, scale } = state;
      const items = preprocessTimeline(timeline);
      const bounds = {
        left: 0,
        top: 0,
        width: Math.max(...items.map(item => item.endTime!)),
        height: items.length * lineHeight,
      };
      console.table(items);
      return m(ScenarioItems, { items, bounds, lineHeight, scale });
    },
  };
};
