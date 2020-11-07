import m, { FactoryComponent } from 'mithril';
import { CodeBlock, Icon } from 'mithril-materialized';
import {
  ScenarioTimeline,
  ITimelineItem,
  IExecutingTimelineItem,
  CircularDependencyError,
} from 'mithril-scenario-timeline';
import { timeline as tl } from './timeline-example';

export const EditorPage = () => {
  const state = {
    time: new Date(2019, 4, 19, 9, 59),
    error: undefined as undefined | CircularDependencyError,
    timelineStart: new Date(2019, 4, 19, 9, 0),
    scenarioStart: new Date(2019, 4, 19, 9, 13, 42),
    timeline: [
      {
        id: 'a',
        title: 'A',
        isOpen: true,
        delay: 0,
      },
      {
        id: 'a.1',
        title: 'a.1',
        parentId: 'a',
        completed: 0.5,
        delay: 40,
        isOpen: true,
        dependsOn: [
          {
            id: 'a',
            condition: 'started',
          },
        ],
      },
      {
        id: 'a.2',
        title: 'a.2',
        parentId: 'a',
        delay: 40,
        isOpen: true,
        dependsOn: [
          {
            id: 'a.1',
            condition: 'finished',
          },
        ],
      },
      {
        id: 'a.1.1',
        title: 'a.1.1',
        parentId: 'a.1',
        completed: 1,
        delay: 0,
        dependsOn: [
          {
            id: 'a.1',
            condition: 'started',
          },
        ],
      },
      {
        id: 'a.2.1',
        title: 'a.2.1',
        parentId: 'a.2',
        delay: 100,
        dependsOn: [
          {
            id: 'a.2',
            condition: 'started',
          },
        ],
      },
      {
        id: 'a.2.2',
        title: 'a.2.2',
        parentId: 'a.2',
        delay: 100,
        dependsOn: [
          {
            id: 'a.2.1',
            condition: 'started',
          },
        ],
      },
      {
        id: 'a.1.2',
        title: 'a.1.2',
        parentId: 'a.1',
        completed: 1,
        delay: 100,
        dependsOn: [
          {
            id: 'a.1.1',
            condition: 'finished',
          },
        ],
      },
      {
        id: 'a.3',
        title: 'a.3',
        parentId: 'a',
        delay: 140,
        completed: 100,
        dependsOn: [
          {
            id: 'a.1.1',
            condition: 'finished',
          },
        ],
      },
      {
        id: 'b',
        title: 'B',
        isOpen: true,
        delay: 200,
      },
      {
        id: 'c',
        title: 'C',
        isOpen: true,
        delay: 200,
      },
      {
        id: 'c.1',
        title: 'C.1',
        isOpen: true,
        delay: 0,
        parentId: 'c',
        dependsOn: [{ id: 'c', condition: 'started' }],
      },
      {
        id: 'b.1',
        title: 'b.1',
        parentId: 'b',
        delay: 150,
        dependsOn: [
          {
            id: 'b',
            condition: 'started',
          },
        ],
      },
    ] as ITimelineItem[],
    timeline2: [
      {
        id: 'a',
        title: 'A',
        isOpen: true,
        delay: 0,
      },
      {
        id: 'a.1',
        title: 'a.1',
        parentId: 'a',
        delay: 400,
        isOpen: true,
        dependsOn: [
          {
            id: 'a',
            condition: 'started',
          },
        ],
      },
      {
        id: 'a.2',
        title: 'a.2',
        parentId: 'a',
        delay: 400,
        isOpen: true,
        dependsOn: [
          {
            id: 'a.1',
            condition: 'finished',
          },
        ],
      },
      {
        id: 'a.1.1',
        title: 'a.1.1',
        parentId: 'a.1',
        delay: 0,
        dependsOn: [
          {
            id: 'a.1',
            condition: 'started',
          },
        ],
      },
      {
        id: 'a.2.1',
        title: 'a.2.1',
        parentId: 'a.2',
        delay: 1000,
        highlight: true,
        dependsOn: [
          {
            id: 'a.2',
            condition: 'started',
          },
        ],
      },
      {
        id: 'a.2.2',
        title: 'a.2.2',
        parentId: 'a.2',
        delay: 1500,
        dependsOn: [
          {
            id: 'a.2.1',
            condition: 'started',
          },
        ],
      },
      {
        id: 'a.1.2',
        title: 'a.1.2',
        parentId: 'a.1',
        delay: 1000,
        dependsOn: [
          {
            id: 'a.1.1',
            condition: 'finished',
          },
        ],
      },
      {
        id: 'a.3',
        title: 'a.3',
        parentId: 'a',
        delay: 1400,
        highlight: true,
        dependsOn: [
          {
            id: 'a.1.1',
            condition: 'finished',
          },
        ],
      },
      {
        id: 'b',
        title: 'B',
        isOpen: true,
        delay: 2000,
      },
      {
        id: 'b.1',
        title: 'b.1',
        parentId: 'b',
        delay: 1500,
        dependsOn: [
          {
            id: 'b',
            condition: 'started',
          },
        ],
      },
    ] as ITimelineItem[],
    timeline3: [
      {
        id: 'a',
        title: 'A',
        isOpen: true,
        delay: 0,
      },
      {
        id: 'b',
        title: 'B',
        isOpen: true,
        delay: 0,
      },
    ],
    timelineCircularDependencies: [
      {
        id: 'a',
        title: 'A',
        isOpen: true,
        delay: 0,
      },
      {
        id: 'a.1',
        title: 'a.1',
        parentId: 'a',
        completed: 0.5,
        delay: 40,
        isOpen: true,
        dependsOn: [
          {
            id: 'a',
            condition: 'started',
          },
        ],
      },
      {
        id: 'a.2',
        title: 'a.2',
        parentId: 'a',
        delay: 40,
        isOpen: true,
        dependsOn: [
          {
            id: 'a.1',
            condition: 'finished',
          },
        ],
      },
      {
        id: 'a.1.1',
        title: 'a.1.1',
        parentId: 'a.1',
        completed: 1,
        delay: 0,
        dependsOn: [
          {
            id: 'a.1',
            condition: 'finished',
          },
        ],
      },
      {
        id: 'a.1.2',
        title: 'a.1.2',
        parentId: 'a.1',
        completed: 1,
        delay: 100,
        dependsOn: [
          {
            id: 'a.1.1',
            condition: 'finished',
          },
        ],
      },
      {
        id: 'a.2.1',
        title: 'a.2.1',
        parentId: 'a.2',
        delay: 100,
        dependsOn: [
          {
            id: 'a.2',
            condition: 'started',
          },
        ],
      },
      {
        id: 'a.2.2',
        title: 'a.2.2',
        parentId: 'a.2',
        delay: 100,
        dependsOn: [
          {
            id: 'a.2.1',
            condition: 'started',
          },
        ],
      },
      {
        id: 'a.3',
        title: 'a.3',
        parentId: 'a',
        delay: 140,
        completed: 100,
        dependsOn: [
          {
            id: 'a.1.1',
            condition: 'finished',
          },
        ],
      },
      {
        id: 'b',
        title: 'B',
        isOpen: true,
        delay: 200,
      },
      {
        id: 'c',
        title: 'C',
        isOpen: true,
        delay: 200,
      },
      {
        id: 'c.1',
        title: 'C.1',
        isOpen: true,
        delay: 0,
        parentId: 'c',
        dependsOn: [{ id: 'c', condition: 'started' }],
      },
      {
        id: 'b.1',
        title: 'b.1',
        parentId: 'b',
        delay: 150,
        dependsOn: [
          {
            id: 'b',
            condition: 'started',
          },
        ],
      },
    ] as ITimelineItem[],
  };

  const updateTime = (update: (t: number | Date) => void) => {
    setInterval(() => {
      state.time = new Date(state.time.valueOf() + 100000);
      update(state.time);
    }, 1000);
  };

  const titleView: FactoryComponent<{ item: IExecutingTimelineItem }> = () => {
    const { scenarioStart } = state;
    const newTime = (timeInSec?: number) =>
      new Date(scenarioStart.valueOf() + (timeInSec || 0) * 1000).toLocaleTimeString();
    const tooltip = (item: IExecutingTimelineItem) =>
      item.startTime === item.endTime
        ? `${newTime(item.startTime)}`
        : `${newTime(item.startTime)} - ${newTime(item.endTime)}`;
    return {
      view: ({ attrs: { item } }) => {
        return m('div.mst__tooltip', { style: 'vertical-align: middle' }, [
          m(Icon, { iconName: 'send', className: 'tiny' }),
          m('span', `My title: ${item.title}`),
          m('span.mst__tooltiptext', tooltip(item)),
          // m('span', `Custom title: ${item.title}`),
        ]);
      },
    };
  };

  return {
    view: () => {
      const { timeline, timeline2, timeline3, timelineStart, scenarioStart, timelineCircularDependencies } = state;
      const onClick = (item: IExecutingTimelineItem) => console.table(item);

      return m('.col.s12', [
        m('h2.header', 'ScenarioTimeline - completed diamonds'),
        m(ScenarioTimeline, { timeline, time: 90, onClick }),

        m('h2.header', 'ScenarioTimeline - running, fixed width, highlighted diamonds'),
        m(ScenarioTimeline, {
          timeline: timeline2,
          time: updateTime,
          lineHeight: 30,
          titleView,
          timelineStart,
          scenarioStart,
          onClick,
        }),

        m('h2.header', 'ScenarioTimeline - running, fixed scale'),
        m(ScenarioTimeline, {
          timeline: timeline2,
          time: updateTime,
          lineHeight: 30,
          titleView,
          scenarioStart,
          scale: 0.1,
          onClick,
          width: 1200,
        }),

        m('h2.header', 'ScenarioTimeline - example'),

        m(ScenarioTimeline, {
          timeline: tl,
          scenarioStart: new Date(2019, 4, 19, 9, 0),
          onClick,
        }),

        m('h2.header', 'Circular dependency'),
        m(ScenarioTimeline, {
          timeline: timelineCircularDependencies,
          time: 90,
          onClick,
          errorCallback: (e) => {
            console.log(e);
            state.error = e;
          },
        }),

        m('h2.header', 'ScenarioTimeline - almost empty'),
        m(ScenarioTimeline, { timeline: timeline3, time: 90, onClick }),

        m(CodeBlock, {
          code: `
          const state = {
            time: new Date(2019, 4, 19, 9, 20),
            timeline: [
              ...
            ] as ITimelineItem[],
            timeline2: [
              ...
            ] as ITimelineItem[],
          };

          const updateTime = (update: (t: number | Date) => void) => {
            setInterval(() => {
              state.time = new Date(state.time.valueOf() + 10000);
              update(state.time);
            }, 1000);
          };

          return {
            view: () => {
              const { timeline, timeline2 } = state;
              const onClick = (item: IExecutingTimelineItem) => console.table(item);

              return m('.col.s12', [
                m('h2.header', 'ScenarioTimeline - completed diamonds'),

                m(ScenarioTimeline, { timeline, time: 90, onClick }),

                m('h2.header', 'ScenarioTimeline - running, highlighted diamonds'),

                m(ScenarioTimeline, {
                  timeline: timeline2,
                  time: updateTime,
                  lineHeight: 30,
                  scenarioStart: new Date(2019, 4, 19, 9, 0),
                  onClick,
                }),
              ]);
            },
          };
        `,
        }),
      ]);
    },
  };
};
