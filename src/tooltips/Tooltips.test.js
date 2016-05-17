import assert from 'assert';

import { Tooltips } from './Tooltips';
import { Utils } from '../../tests/Utils';

const selectors = {
  toggler: `.js-tooltip-toggle`,
  toggleable: `.js-tooltip`,
  collapsed: `.is-invisible`,
};

describe(`Tooltip`, () => {
  beforeEach(() => {
    const template = nunjucks.render(`tooltips/Tooltips.test.html`);

    document.body.insertAdjacentHTML(`afterbegin`, template);
  });

  afterEach(() => {
    const tooltips = document.querySelector(`#tooltips`);

    tooltips.parentNode.removeChild(tooltips);
  });

  it(`should initialize with hidden tooltips`, () => {
    const hiddenToggleable = document.querySelector(selectors.toggleable + selectors.collapsed);
    const hiddenToggler = hiddenToggleable.parentNode.querySelector(selectors.toggler);

    Tooltips.tooltip({ hiddenToggler, hiddenToggleable });

    assert(Utils.isHidden(hiddenToggleable));
  });
});
