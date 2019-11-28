import m, { FactoryComponent, Attributes } from 'mithril';
import '../styles/scenario-timeline.css';
import { ITimelineItem, IExecutingTimelineItem } from '../interfaces/timeline';
import { preprocessTimeline } from '../helpers';
import { ScenarioItems } from './scenario-items';
import { TimeAxis } from './time-axis';
import { ScenarioLinks } from './scenario-links';
import { ScenarioTime } from './scenario-time';
import { CircularDependencyError } from '../interfaces';

export type ScenarioTimer = (timerCb: (time: number | Date) => void) => void;

export interface IScenarioTimeline extends Attributes {
  /** Start time of the scenario: if supplied, will be used as the starting point */
  scenarioStart?: Date;
  /**
   * Current time, either as Date (requires scenarioStart) or offset in seconds.
   * May also be a function that updates the time and invokes a callback to reduce
   * the number of redraws.
   */
  time?: number | Date | ScenarioTimer;
  /** 1 second is x pixels horizontally */
  scale?: number;
  /** Line height in pixels */
  lineHeight?: number;
  /** The items you want to place on the timeline */
  timeline: ITimelineItem[];
  /** Optional component to render the item title */
  titleView?: FactoryComponent<{ item: IExecutingTimelineItem }>;
  /** Optional onclick event handler to inform you that the item has been clicked */
  onClick?: (item: IExecutingTimelineItem) => void;
  /** Turn on debugging */
  verbose?: boolean;
  /** Error callback when the timeline cannot be drawn, e.g. due to circular dependencies */
  errorCallback?: (e: CircularDependencyError) => void;
}

export const ScenarioTimeline: FactoryComponent<IScenarioTimeline> = () => {
  const state = {
    time: 0,
    endTime: 0,
  } as {
    // 1 second is x pixels
    scale?: number;
    lineHeight: number;
    onClick?: (item: ITimelineItem) => void;
    time?: number;
    endTime: number;
  };

  const gutter = 4;
  const rightMargin = 100;
  const leftMargin = 25;
  const timeAxisHeight = 32;

  const calculateScale = (duration: number) => Math.min(10, Math.max(0.01, 800 / duration));

  return {
    oninit: ({ attrs: { scale, lineHeight, onClick } }) => {
      state.scale = scale;
      state.lineHeight = lineHeight || 28;
      state.onClick = onClick;
    },
    view: ({ attrs: { timeline, time, scenarioStart, verbose, titleView, errorCallback } }) => {
      if (time && time instanceof Date && !scenarioStart) {
        console.error(`When time is a Date, scenarioStart must be supplied as Date too!`);
      }
      try {
        const items = preprocessTimeline(timeline);
        const startTime = Math.min(...items.map(item => item.startTime!));
        const curTime = state.time || 0;
        const endTime = Math.max(curTime, ...items.map(item => item.endTime!));
        state.endTime = endTime;
        const { lineHeight, onClick, scale = calculateScale(endTime - startTime) } = state;
        const bounds = {
          left: leftMargin,
          top: gutter,
          width: leftMargin + scale * endTime + rightMargin,
          height: items.length * lineHeight,
        };
        if (verbose) {
          console.table(items);
        }
        return m('.mst__container', [
          m(TimeAxis, {
            scenarioStart,
            startTime,
            endTime,
            bounds: { ...bounds, top: 0, height: timeAxisHeight },
            scale,
          }),
          m(ScenarioItems, {
            items,
            bounds,
            lineHeight,
            scale,
            onClick,
            titleView,
          }),
          m(ScenarioLinks, {
            items,
            bounds: { ...bounds, top: gutter + timeAxisHeight },
            lineHeight,
            scale,
          }),
          m(ScenarioTime, {
            scenarioStart,
            time,
            bounds: {
              left: bounds.left,
              width: bounds.width,
              top: timeAxisHeight - gutter,
              height: bounds.height + 2 * gutter,
            },
            scale,
            curTime: t => {
              state.time = t;
              if (t > state.endTime) {
                m.redraw();
              }
            },
          }),
        ]);
      } catch (e) {
        if (errorCallback) {
          errorCallback(e as CircularDependencyError);
        }
        return undefined;
      }
    },
  };
};
