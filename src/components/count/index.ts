import Observer from '^/library/observer';
import { elementFactory } from '^/library/dom';
import { StateProps } from '^/library/state';

import { LIST_DATA_ATTRIBUTE } from '^/components/list/constants';
import { COUNT_DATA_ATTRIBUTE } from '^/components/count/constants';

import '^/components/count/styles.scss';

class Count implements Observer {
  createMarkup(state: number) {
    return elementFactory(
      'div',
      {},
      {
        class: 'count',
      },
      'count: ',
      elementFactory(
        'span',
        {},
        {
          data: COUNT_DATA_ATTRIBUTE,
        },
        `${state}`,
      ),
    );
  }

  render(state: number) {
    const markup = this.createMarkup(state);
    const parent = document.querySelector(`[data = ${COUNT_DATA_ATTRIBUTE}]`);

    if (parent) {
      parent.replaceChildren(String(state));
    }

    return markup;
  }

  update(state: StateProps) {
    this.render(state[LIST_DATA_ATTRIBUTE].length);
  }
}

export default Count;
