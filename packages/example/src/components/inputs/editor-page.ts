import m from 'mithril';
import { CodeBlock } from 'mithril-materialized';
import { ScenarioTimeline, ITimelineItem, IExecutingTimelineItem } from 'mithril-scenario-timeline';

export const EditorPage = () => {
  const state = {
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
  };
  return {
    view: () => {
      const { timeline, timeline2 } = state;
      const onClick = (item: IExecutingTimelineItem) => console.table(item);

      return m('.col.s12', [
        m('h2.header', 'ScenarioTimeline'),

        m(ScenarioTimeline, { timeline, time: 90, title: 'Hello timeline', onClick }),

        m('h2.header', 'ScenarioTimeline 2'),

        m(ScenarioTimeline, {
          timeline: timeline2,
          time: 1250,
          scenarioStart: new Date(2019, 4, 19, 9, 0),
          title: 'Hello timeline 2',
          onClick,
        }),

        m(CodeBlock, {
          code: `TODO`,
        }),
      ]);
    },
  };
};
