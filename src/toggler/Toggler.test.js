import assert from 'assert';

import { Toggler } from './Toggler';
import { Utils } from '../../tests/Utils';

const selectors = {
  toggler: `.js-toggler`,
  toggleable: `.js-toggleable`,
  collapsed: `.is-invisible`,
};

describe(`Toggler`, () => {
  beforeEach(() => {
    const template = nunjucks.render(`toggler/Toggler.test.html`);

    document.body.insertAdjacentHTML(`afterbegin`, template);
  });

  afterEach(() => {
    const togglers = document.querySelector(`#toggler`);

    togglers.parentNode.removeChild(togglers);
  });

  it(`can initialize with hidden Toggler`, () => {
    const togglerSelector = selectors.toggler;
    const toggleableSelector = selectors.toggleable + selectors.collapsed;
    const hiddenToggleable = document.querySelector(toggleableSelector);

    Toggler.toggler({ togglerSelector, toggleableSelector });

    assert(Utils.isHidden(hiddenToggleable));
  });

  it(`can initialize with visible Toggler`, () => {
    const togglerSelector = selectors.toggler;
    const toggleableSelector = selectors.toggleable + `:not(${selectors.collapsed})`;
    const visibleToggleable = document.querySelector(toggleableSelector);

    Toggler.toggler({ togglerSelector, toggleableSelector });

    assert(!Utils.isHidden(visibleToggleable));
  });

  it(`should be visible after expanding`, () => {
    const toggleable = document.querySelector(selectors.toggleable);

    Toggler.expand(toggleable);

    assert(!Utils.isHidden(toggleable));
  });

  it(`should be hidden after closing`, () => {
    const toggleable = document.querySelector(selectors.toggleable);

    Toggler.expand(toggleable);
    Toggler.collapse(toggleable);

    assert(Utils.isHidden(toggleable));
  });

  it(`should collapse all tooltips`, () => {
    const toggleables = document.querySelectorAll(selectors.toggleable);
    const togglerSelector = selectors.toggler;
    const toggleableSelector = selectors.toggleable;

    Toggler.toggler({ togglerSelector, toggleableSelector });

    // expand all the toggleables
    [...toggleables].forEach((toggleable) => {
      Toggler.expand(toggleable);
    });

    // collapse all the tooltips
    Toggler.collapseOpen();

    // check that they're closed
    [...toggleables].forEach((toggleable) => {
      assert(Utils.isHidden(toggleable));
    });
  });
});
