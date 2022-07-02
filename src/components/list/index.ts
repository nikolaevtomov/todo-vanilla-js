import Observer from '^/library/observer';
import { elementFactory } from '^/library/dom';
import { StateProps } from '^/library/state';

import { LIST_DATA_ATTRIBUTE } from '^/components/list/constants';

import '^/components/count/styles.scss';

class List implements Observer {
  createMarkup(state: Array<string>) {
    return elementFactory(
      'ol',
      {},
      {
        class: 'list',
        data: LIST_DATA_ATTRIBUTE,
      },
      ...state.map((item) =>
        elementFactory(
          'li',
          {},
          {
            class: 'item',
          },
          `${item}`,
        ),
      ),
    );
  }

  render(state: Array<string>) {
    const markup = this.createMarkup(state);
    const parent = document.querySelector(`[data = ${LIST_DATA_ATTRIBUTE}]`);

    if (parent) {
      parent.replaceChildren(
        ...state.map((item) =>
          elementFactory(
            'li',
            {},
            {
              class: 'item',
            },
            `${item}`,
          ),
        ),
      );
    }

    return markup;
  }

  update(state: StateProps) {
    this.render(state[LIST_DATA_ATTRIBUTE]);
  }
}

export default List;
