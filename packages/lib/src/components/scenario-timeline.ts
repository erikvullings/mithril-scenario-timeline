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
  /** Error callback when the timeline cannot be drawn, e.g. due to circular dependencies */
  errorCallback?: (e: CircularDependencyError) => void;
  /** Width of the timeline: in case the time exceeds beyond this point, shrink the scale */
  width?: number;
}

export const ScenarioTimeline: FactoryComponent<IScenarioTimeline> = () => {
  const state = {
    curTime: 0,
    endTime: 0,
  } as {
    items: IExecutingTimelineItem[];
    titleView: FactoryComponent<{ item: IExecutingTimelineItem }> | undefined;
    errorCallback?: (e: CircularDependencyError) => void;
    scenarioStart?: Date;
    // 1 second is x pixels
    scale?: number;
    lineHeight: number;
    onClick?: (item: ITimelineItem) => void;
    time?: number | Date | ScenarioTimer;
    startTime: number;
    curTime: number;
    endTime: number;
    dom: HTMLDivElement;
    maxWidth?: number;
  };

  const gutter = 4;
  const rightMargin = 100;
  const leftMargin = 25;
  const timeAxisHeight = 32;
  const horMargin = leftMargin + rightMargin;

  const calculateScale = (duration: number) => Math.min(10, Math.max(0.01, 800 / duration));

  const render = (): void => {
    const {
      lineHeight,
      onClick,
      curTime = 0,
      time,
      items,
      titleView,
      scenarioStart,
      startTime,
      endTime,
      maxWidth = Number.MAX_SAFE_INTEGER,
    } = state;
    const t = Math.max(curTime, endTime);
    const { scale = calculateScale(t - startTime) } = state;

    const tMax = (maxWidth - horMargin) / scale;

    if (t >= tMax) {
      state.scale = scale / 2;
      return render();
    }

    const bounds = {
      left: leftMargin,
      top: gutter,
      width: maxWidth,
      height: items.length * lineHeight,
    };

    return m.render(
      state.dom,
      m('.mst__container', [
        m(TimeAxis, {
          scenarioStart,
          startTime: startTime - 222,
          endTime: tMax,
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
          curTime: ct => {
            state.curTime = ct;
            // As this is inside a closure, recompute tMax
            const tmax = (state.maxWidth! - horMargin) / state.scale!;
            if (ct > tmax) {
              render();
            }
          },
        }),
      ])
    );
  };

  return {
    oninit: ({ attrs: { scale, lineHeight = 28, onClick, titleView, errorCallback, width: maxWidth } }) => {
      state.scale = scale;
      state.lineHeight = lineHeight;
      state.onClick = onClick;
      state.titleView = titleView;
      state.errorCallback = errorCallback;
      state.maxWidth = maxWidth;
    },
    view: ({ attrs: { timeline, time, scenarioStart, verbose } }) => {
      if (time && time instanceof Date && !scenarioStart) {
        console.error(`When time is a Date, scenarioStart must be supplied as Date too!`);
      }
      try {
        state.time = time;
        state.scenarioStart = scenarioStart;
        const items = preprocessTimeline(timeline);
        state.items = items;
        state.startTime = Math.min(...items.map(item => item.startTime!));
        state.endTime = Math.max(state.curTime || 0, ...items.map(item => item.endTime!));
        setTimeout(() => render(), 0);
        if (verbose) {
          console.table(items);
        }
        return m('.mst__container');
      } catch (e) {
        const { errorCallback } = state;
        if (errorCallback) {
          errorCallback(e as CircularDependencyError);
        }
        return undefined;
      }
    },
    oncreate: ({ dom }) => {
      state.dom = dom as HTMLDivElement;
      if (dom && !state.maxWidth) {
        state.maxWidth = dom.clientWidth;
      }
    },
  };
};
