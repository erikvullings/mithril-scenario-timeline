import m, { FactoryComponent, Attributes } from 'mithril';
import './styles/scenario-timeline.css';

export interface IScenarioTimeline extends Attributes {
  title?: string;
}

export const ScenarioTimeline: FactoryComponent<IScenarioTimeline> = () => {
  const state = {} as {
    title?: string;
  };
  return {
    oninit: ({ attrs: { title }}) => {
      state.title = title;
    },
    view: () => {
      const { title } = state;
      return m('mst__container', m('h1', title));
    },
  };
};
