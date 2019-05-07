import m from 'mithril';
import { CodeBlock } from 'mithril-materialized';
import { ScenarioTimeline } from 'mithril-scenario-timeline';

export const EditorPage = () => {
  const state = {};
  return {
    view: () =>
      m('.col.s12', [
        m('h2.header', 'ScenarioTimeline'),

        m(ScenarioTimeline, { title: 'Hello timeline' }),

        m(CodeBlock, {
          code: `TODO`,
        }),
      ]),
  };
};
