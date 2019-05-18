import m, { FactoryComponent, Attributes } from 'mithril';
import { IBoundingRectangle, ScenarioTimer } from '..';

export interface IScenarioTime extends Attributes {
  /** Bound for the component using absolute positioning */
  bounds: IBoundingRectangle;
  /** Start time of the scenario: if supplied, will be used as the starting point */
  scenarioStart?: Date;
  /** Horizontal resolution */
  scale: number;
  /** Number of seconds since the start */
  time?: number | Date | ScenarioTimer;
}

export const ScenarioTime: FactoryComponent<IScenarioTime> = () => {
  const state = {} as {
    dom: HTMLDivElement;
    scenarioStart?: Date;
    time?: number | Date | ScenarioTimer;
    t: number;
    scale: number;
    bounds: IBoundingRectangle;
  };

  const computeTime = (time: number | Date) => {
    if (typeof time === 'number') {
      return time;
    } else {
      const { scenarioStart } = state;
      if (scenarioStart) {
        return (time.valueOf() - scenarioStart.valueOf()) / 1000;
      }
    }
    return 0;
  };

  const updateTime = (time: number | Date) => {
    state.t = computeTime(time);
    render();
  };

  const boundsToStyle = (b: IBoundingRectangle, time: number, scale: number) =>
    `top: ${b.top}px; left: ${b.left + time * scale}px; width: 2px; height: ${b.height}px;`;

  const render = () => {
    const { dom, bounds, scale, time } = state;
    const t = time instanceof Function ? state.t : computeTime(time || 0);
    if (t * scale > bounds.width || t === 0) {
      return;
    }
    m.render(dom, m('.mst__time', { style: boundsToStyle(bounds, t, scale) }));
  };

  return {
    oninit: ({ attrs: { time } }) => {
      if (time instanceof Function) {
        time(updateTime);
      }
    },
    oncreate: ({ dom }) => (state.dom = dom as HTMLDivElement),
    view: ({ attrs: { scale, time, bounds, scenarioStart } }) => {
      state.time = time;
      state.scenarioStart = scenarioStart;
      state.scale = scale;
      state.bounds = bounds;
      setTimeout(() => render(), 0);
      return m('div');
    },
  };
};
