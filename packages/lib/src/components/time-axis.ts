import m, { FactoryComponent, Attributes } from 'mithril';
import { IBoundingRectangle } from '../interfaces';
import { boundsToStyle, range, padLeft } from '../helpers';

export interface ITimeAxis extends Attributes {
  /** Start time of the timeline: if supplied, will be used as the starting point */
  timelineStart?: Date;
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
    const duration = e - s;
    return duration <= 10
      ? 1
      : duration <= 30
      ? 5
      : duration <= 60
      ? 10
      : duration <= 300
      ? 30
      : duration <= 600
      ? 60
      : duration <= 900
      ? 120
      : duration <= 1800
      ? 300
      : duration <= 3600
      ? 600
      : duration <= 7200
      ? 900
      : duration <= 14400
      ? 1800
      : Math.round(duration / 14400) * 1800;
  };

  const scaleFactor = (step: number): [number, string] =>
    step < 60 ? [1, 'sec'] : step < 600 ? [60, 'min'] : step <= 3600 ? [3600, 'hrs'] : [5 * 3600, 'hrs'];

  const hour = 60 * 60;

  const formatTime = (sf: number, time: number) =>
    sf <= 60 ? time / 60 : `${padLeft(Math.round(time / hour))}:${padLeft(Math.round((time % hour) / 60))}`;

  const formatRealTime = (time: Date, sf: number) =>
    `${padLeft(time.getHours())}:${padLeft(time.getMinutes())}${sf === 1 ? `.${padLeft(time.getSeconds())}` : ''}`;

  return {
    view: ({ attrs: { bounds, startTime, endTime, scale, timelineStart } }) => {
      const sst = timelineStart ? timelineStart.valueOf() : 0;
      const style = boundsToStyle(bounds);
      const step = stepSize(startTime, endTime);
      const [sf, legend] = scaleFactor(step);
      const timeFormatter = (sec: number): m.Children => {
        return sst === 0 ? formatTime(sf, sec) : formatRealTime(new Date(sst + sec * 1000), sf);
      };

      return m('.mst__time-scale', { style }, [
        ...range(startTime, endTime, step).map((i) => [
          m('.mst__time-scale-marker', { style: `left: ${scale * i}px` }),
          m(
            '.mst__time-scale-text',
            { style: `left: ${scale * i - textWidth / 2}px; width: ${textWidth}px;` },
            timeFormatter(i)
          ),
        ]),
        m('.mst__time-scale-legend', sst === 0 ? legend : 'time'),
      ]);
    },
  };
};
