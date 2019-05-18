import m, { FactoryComponent, Attributes } from 'mithril';
import { IBoundingRectangle } from '../interfaces';
import { boundsToStyle, range, padLeft } from '../helpers';

export interface ITimeAxis extends Attributes {
  /** Start time of the scenario: if supplied, will be used as the starting point */
  scenarioStart?: Date;
  /** Bound for the component using absolute positioning */
  bounds: IBoundingRectangle;
  /** Start time */
  startTime: number;
  /** End time */
  endTime: number;
  /** 1 second is x pixels horizontally */
  scale: number;
}

export const TimeAxis: FactoryComponent<ITimeAxis> = () => {
  const textWidth = 50;

  const stepSize = (s: number, e: number) => {
    const minutes = (e - s) / 60;
    return minutes < 1
      ? 10
      : minutes < 10
      ? 60
      : minutes < 60
      ? 300
      : minutes < 180
      ? 600
      : minutes < 300
      ? 1800
      : 3600;
  };

  const scaleFactor = (step: number): [number, string] =>
    step < 60 ? [1, 'sec'] : step < 600 ? [60, 'min'] : step <= 3600 ? [3600, 'hrs'] : [5 * 3600, 'hrs'];

  const hour = 60 * 60;

  const formatTime = (sf: number, time: number) =>
    sf <= 60 ? time / 60 : `${padLeft(Math.round(time / hour))}:${padLeft(Math.round((time % hour) / 60))}`;

  const formatRealTime = (time: Date, sf: number) =>
    `${padLeft(time.getHours())}:${padLeft(time.getMinutes())}${sf === 1 ? `.${padLeft(time.getSeconds())}` : ''}`;

  return {
    view: ({ attrs: { bounds, startTime, endTime, scale, scenarioStart } }) => {
      const sst = scenarioStart ? scenarioStart.valueOf() : 0;
      const style = boundsToStyle(bounds);
      const step = stepSize(startTime, endTime);
      const [sf, legend] = scaleFactor(step);
      return m('.mst__time-scale', { style }, [
        ...range(startTime, endTime, step).map(i => [
          m('.mst__time-scale-marker', { style: `left: ${scale * i}px` }),
          m(
            '.mst__time-scale-text',
            { style: `left: ${scale * i - textWidth / 2}px; width: ${textWidth}px;` },
            sst === 0 ? formatTime(sf, i) : formatRealTime(new Date(sst + i * 1000), sf)
          ),
        ]),
        m('.mst__time-scale-legend', sst === 0 ? legend : 'time'),
      ]);
    },
  };
};
