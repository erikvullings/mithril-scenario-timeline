import m, { FactoryComponent, Attributes } from 'mithril';
import { ILink } from '../interfaces/link';

export interface IScenarioLink extends Attributes {
  link: ILink;
}

export const ScenarioLink: FactoryComponent<IScenarioLink> = () => {
  // const bounds = ({ x1, y1, x2, y2 }: ILink) =>
  //   `left: ${x1}px; top: ${y1}px; width: ${x2 - x1}px; height: ${y2 - y1}px;`;
  const verLine = ({ x1, y1, y2 }: ILink) => `left: ${x1}px; top: ${y1}px; height: ${y2 - y1}px;`;
  const horLine = ({ x1, x2, y2 }: ILink) => `left: ${x1}px; top: ${y2}px; width: ${x2 - x1}px;`;
  return {
    view: ({ attrs: { link } }) => {
      const { x1, x2 } = link;
      return m(
        '.mst__link',
        // {
        //   style: bounds(link),
        // },
        [
          m('.mst__link--vertical', { style: verLine(link) }),
          x1 === x2 ? undefined : m('.mst__link--horizontal', { style: horLine(link) }),
        ]
      );
    },
  };
};
