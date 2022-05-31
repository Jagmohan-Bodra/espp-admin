import {
  reqSetCustomize,
  reqSetStyle,
  reqSetScreenMode,
  reqSetIframeRef,
  reqSetStyleCustomizeBlock,
} from '~/reduxs/craft/action';
import store from '~/reduxs/store';
import {PAGE_SIZE_TYPE} from '~/constants/master-data';

export const getId = (id) => `wiooh-${id}`;

export function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export const defaultStyleProps = () => ({
  ...Object.assign(
    {},
    ...Object.values(PAGE_SIZE_TYPE).map((pageType) => ({
      [pageType]: {},
    })),
  ),
});

export const defaultStyle = (id) => ({
  ...Object.assign(
    {},
    ...Object.values(PAGE_SIZE_TYPE).map((pageType) => ({
      [pageType]: {[id]: {}},
    })),
  ),
});

export const onStyleChange = ({id, mode, styleObj, componentStyle}) => ({
  ...componentStyle,
  [mode]: {
    [id]: {
      ...componentStyle[mode][id],
      ...styleObj,
    },
  },
});

export const handleStyleChange = ({style, id}) => {
  store.dispatch(reqSetStyle({[getId(id)]: style}));
};

export const setCustomizeStore = (boolean) => {
  store.dispatch(reqSetCustomize(boolean));
};

export const setCreenModeStore = (mode) => {
  store.dispatch(reqSetScreenMode(mode));
};

export const setSetIframeRefStore = (iframeRef) => {
  store.dispatch(reqSetIframeRef(iframeRef));
};

export const setStyleCustomizeBlockStore = (data) => {
  store.dispatch(reqSetStyleCustomizeBlock(data));
};
