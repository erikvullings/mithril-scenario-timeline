import m, { FactoryComponent, Attributes } from 'mithril';
import { ILink } from '../interfaces/link';

export interface IScenarioLink extends Attributes {
  link: ILink;
}

export const ScenarioLink: FactoryComponent<IScenarioLink> = () => {
  const bounds = ({ x1, y1, x2, y2 }: ILink) =>
    `left: ${x1}px; top: ${y1}px; width: ${x2 - x1}px; height: ${y2 - y1}px;`;
  const verLine = ({ x1, y1, y2 }: ILink) => `left: ${x1}px; top: ${y1}px; height: ${y2 - y1}px;`;
  const horLine = ({ x1, x2, y2 }: ILink) => `left: ${x1}px; top: ${y2}px; width: ${x2 - x1 || 1}px;`;
  const indLine = ({ indicator }: ILink) => `left: ${indicator === 'start' ? 0 : -4}px; top: 0px;`;
  return {
    view: ({ attrs: { link } }) => {
      const { x1, x2, indicator } = link;
      return m(
        '.mst__link',
        {
          style: bounds(link),
        },
        [
          m('.mst__link--vertical', { style: verLine(link) }),
          indicator === 'none'
            ? undefined
            : m('.mst__arrow', {
                style: indLine(link),
                className: indicator === 'start' ? 'mst__arrow--right' : 'mst__arrow--left',
              }),
          x1 === x2 ? undefined : m('.mst__link--horizontal', { style: horLine(link) }),
        ]
      );
    },
  };
};
