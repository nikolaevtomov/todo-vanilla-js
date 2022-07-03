import Observer from '^/library/observer';
import { elementFactory } from '^/library/dom';
import { AppState } from '^/library/state';

import { ItemProps } from '^/components/list/types';
import {
  LIST_DATA_ATTRIBUTE,
  ITEM_DATA_ATTRIBUTE,
} from '^/components/list/constants';
import PlusIcon from '^/components/list/plus-icon';
import MinusIcon from '^/components/list/minus-icon';
import TrashIcon from '^/components/list/trash-icon';

class Item implements Observer {
  createMarkup(element: ItemProps) {
    return elementFactory(
      'li',
      {},
      {
        data: ITEM_DATA_ATTRIBUTE,
        class: ITEM_DATA_ATTRIBUTE,
      },
      elementFactory(
        'span',
        {},
        {
          class: 'name'.concat(element.done ? ' done' : ''),
        },
        `${element.name}`,
      ),
      elementFactory(
        'button',
        {
          click: () => {
            AppState.update({
              [LIST_DATA_ATTRIBUTE]: AppState.get()
                [LIST_DATA_ATTRIBUTE].filter(
                  (item) => item.name !== element.name,
                )
                .concat({ name: element.name, done: !element.done })
                .sort((a, b) => a.name.localeCompare(b.name)),
            });
          },
        },
        {
          class: 'button clear mark',
        },
        !element.done ? PlusIcon() : MinusIcon(),
      ),
      elementFactory(
        'button',
        {
          click: () => {
            AppState.update({
              [LIST_DATA_ATTRIBUTE]: AppState.get()
                [LIST_DATA_ATTRIBUTE].filter(
                  (item) => item.name !== element.name,
                )
                .sort((a, b) => a.name.localeCompare(b.name)),
            });
          },
        },
        {
          class: 'button clear delete',
        },
        TrashIcon(),
      ),
    );
  }

  render(state: ItemProps) {
    const markup = this.createMarkup(state);
    // const parent = document.querySelector(`[data = ${ITEM_DATA_ATTRIBUTE}]`);

    // if (parent) {
    //   parent.replaceChildren(
    //     elementFactory(
    //       'span',
    //       {},
    //       {
    //         class: 'name'.concat(state.done ? ' done' : ''),
    //       },
    //       `${state.name}`,
    //     ),
    //   );
    // }

    return markup;
  }

  update(state: ItemProps) {
    this.render(state);
  }
}

export default Item;
