import { dashboardSvc } from '../../services/dashboard-service';
import m from 'mithril';
import { CodeBlock } from 'mithril-materialized';

export const HomePage = () => ({
  view: () =>
    m('.row', [
      m(
        '.col.s12.m7.l8',
        m('.introduction', [
          m('h2', 'About mithril-scenario-timeline'),
          m('p', [
            `A component for Mithril to create a scenario timeline. See the `,
            m('a[href=/editor]', { oncreate: m.route.link }, 'example.'),
          ]),
          m('p', [
            'You can check out the API documentation ',
            m('a[href="https://erikvullings.github.io/mithril-scenario-timeline/typedoc/index.html"]', 'here'),
            '.',
          ]),
          m('h3', 'Installation'),
          m('p', 'First, you need to install the required packages:'),
          m(CodeBlock, {
            language: 'console',
            code: `npm i mithril mithril-scenario-timeline
# Also install the typings if you use TypeScript
npm i --save-dev @types/mithril`,
          }),
          m('p', 'Next, you can use them inside your application:'),
          m(CodeBlock, {
            code: `import { ScenarioTimeline } from 'mithril-scenario-timeline';`,
          }),
        ])
      ),
      m('.col.s12.m5.l4', [
        m('h1', 'Contents'),
        m('ul.collection', [
          dashboardSvc
            .getList()
            .filter(d => d.visible && !d.default)
            .map(d => m('li.collection-item', m(m.route.Link, { href: d.route }, d.title))),
        ]),
      ]),
    ]),
});
