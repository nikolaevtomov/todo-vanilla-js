import Subject from '^/library/subject';

import { LIST_DATA_ATTRIBUTE } from '^/components/list/constants';
import { FORM_DATA_ATTRIBUTE } from '^/components/form/constants';
import { COUNT_DATA_ATTRIBUTE } from '^/components/count/constants';

export interface StateProps {
  [FORM_DATA_ATTRIBUTE]: string;
  [LIST_DATA_ATTRIBUTE]: Array<string>;
  [COUNT_DATA_ATTRIBUTE]: number;
}

const INITIAL_STATE: StateProps = {
  [FORM_DATA_ATTRIBUTE]: '',
  [LIST_DATA_ATTRIBUTE]: ['JavaScript'],
  [COUNT_DATA_ATTRIBUTE]: 0,
};

class State extends Subject {
  state: StateProps;

  constructor() {
    super();
    this.state = INITIAL_STATE;
  }

  update(data: unknown) {
    this.state = Object.assign(this.state, data);
    this.notify(this.state);
  }

  get() {
    return this.state;
  }
}

export const AppState = new State();
