import Observer from '^/library/observer';
import { elementFactory } from '^/library/dom';
import { AppState, StateProps } from '^/library/state';

import Item from '^/components/list/item';
import { ItemProps } from '^/components/list/types';
import { LIST_DATA_ATTRIBUTE } from '^/components/list/constants';

import '^/components/list/styles.scss';

const item = new Item();
AppState.addObserver(item);

class List implements Observer {
  createMarkup(state: Array<ItemProps>) {
    return elementFactory(
      'ul',
      {},
      {
        class: 'list',
        data: LIST_DATA_ATTRIBUTE,
      },
      ...state.map((i) => item.render(i)),
    );
  }

  render(state: Array<ItemProps>) {
    const markup = this.createMarkup(state);
    const parent = document.querySelector(`[data = ${LIST_DATA_ATTRIBUTE}]`);

    if (parent) {
      parent.replaceChildren(
        ...state.map((_i, index) => item.render(state[index])),
      );
    }

    return markup;
  }

  update(state: StateProps) {
    this.render(state[LIST_DATA_ATTRIBUTE]);
  }
}

export default List;
