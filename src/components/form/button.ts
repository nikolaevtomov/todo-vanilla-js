import Observer from '^/library/observer';
import { elementFactory } from '^/library/dom';
import { StateProps } from '^/library/state';

import {
  FORM_DATA_ATTRIBUTE,
  BUTTON_DATA_ATTRIBUTE,
} from '^/components/form/constants';

class Button implements Observer {
  createMarkup(state: number) {
    return elementFactory(
      'button',
      {},
      {
        class: 'button',
        type: 'submit',
        ...(Boolean(state === 0) && { disabled: 'true' }),
      },
      'Add',
    );
  }

  render(state: number) {
    const markup = this.createMarkup(state);
    const parent = document.querySelector(`[data = ${BUTTON_DATA_ATTRIBUTE}]`);

    if (state !== 0) {
      markup.removeAttribute('disabled');
    }

    parent?.replaceChildren(markup);

    return markup;
  }

  update(state: StateProps) {
    this.render(state[FORM_DATA_ATTRIBUTE].length);
  }
}

export default Button;
