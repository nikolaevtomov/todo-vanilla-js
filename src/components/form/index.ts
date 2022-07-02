import { elementFactory } from '^/library/dom';
import { AppState } from '^/library/state';

import Button from '^/components/form/button';
import {
  FORM_DATA_ATTRIBUTE,
  BUTTON_DATA_ATTRIBUTE,
} from '^/components/form/constants';
import { LIST_DATA_ATTRIBUTE } from '^/components/list/constants';
import { COUNT_DATA_ATTRIBUTE } from '^/components/count/constants';

const button = new Button();
AppState.addObserver(button);

import '^/components/form/styles.scss';

class Form {
  createMarkup(element: string) {
    return elementFactory(
      'div',
      {},
      {
        class: 'form-wrapper',
      },
      elementFactory('h3', {}, {}, 'Todo'),
      elementFactory(
        'form',
        {
          submit: (event) => {
            event?.preventDefault();

            const input = document.querySelector(
              `[data = ${FORM_DATA_ATTRIBUTE}]`,
            );

            AppState.update({
              [LIST_DATA_ATTRIBUTE]: AppState.get()[LIST_DATA_ATTRIBUTE].concat(
                AppState.get()[FORM_DATA_ATTRIBUTE],
              ),
            });

            AppState.update({
              [COUNT_DATA_ATTRIBUTE]:
                AppState.get()[LIST_DATA_ATTRIBUTE].length,
            });

            AppState.update({
              [FORM_DATA_ATTRIBUTE]: '',
            });

            (input as HTMLInputElement).value = '';
          },
        },
        {
          class: 'form',
        },
        elementFactory(
          'input',
          {
            input: (event) => {
              AppState.update({
                [FORM_DATA_ATTRIBUTE]: (event?.target as HTMLInputElement)
                  .value,
              });
            },
          },
          {
            data: FORM_DATA_ATTRIBUTE,
          },
          element,
        ),
        elementFactory(
          'span',
          {},
          {
            data: BUTTON_DATA_ATTRIBUTE,
          },
          button.render(AppState.get()[FORM_DATA_ATTRIBUTE].length),
        ),
      ),
    );
  }

  render(element: string) {
    const markup = this.createMarkup(element);
    const parent = document.querySelector(`[data = ${FORM_DATA_ATTRIBUTE}]`);

    if (parent) {
      parent.innerHTML = String(element);
    }

    return markup;
  }
}

export default Form;
