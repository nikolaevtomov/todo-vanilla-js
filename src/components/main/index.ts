import { elementFactory } from '^/library/dom';
import { AppState } from '^/library/state';

import Form from '^/components/form';
import List from '^/components/list';
import Count from '^/components/count';
import { FORM_DATA_ATTRIBUTE } from '^/components/form/constants';
import { LIST_DATA_ATTRIBUTE } from '^/components/list/constants';

import '^/components/main/styles.scss';

const form = new Form();
const list = new List();
const count = new Count();

AppState.addObserver(list);
AppState.addObserver(count);

const markup = elementFactory(
  'main',
  {},
  { class: 'main' },
  form.render(AppState.get()[FORM_DATA_ATTRIBUTE]),
  list.render(AppState.get()[LIST_DATA_ATTRIBUTE]),
  count.render(AppState.get()[LIST_DATA_ATTRIBUTE].length),
);

export default markup;
