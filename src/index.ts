import { elementFactory } from '^/library/dom';

import Main from '^/components/main';

import '^/index.scss';

module.hot && module.hot.accept();

window.addEventListener('load', () => {
  const markup = elementFactory('div', {}, { class: 'wrapper' }, Main);

  document.getElementById('app')?.appendChild(markup);
});
