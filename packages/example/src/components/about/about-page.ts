import m from 'mithril';

export const AboutPage = () => ({
  view: () =>
    m('.row', [
      m('h1', 'About'),
      m('p', 'Created to support the DRIVER+ Trial Management Tool (scenario editor).'),
      // m('h1', 'Attribution'),
      // m('ul.collection', [m('li.collection-item', 'Logo: ideation by Vytautas Alech from the Noun Project.')]),
    ]),
});
