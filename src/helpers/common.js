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

export const keyGenaral = () => {
  let stt = 1000;
  return () => {
    if (stt > 1000000) stt = 1000;
    return stt++;
  };
};

export const groupBy = (array, key, condition = () => true) => {
  const result = [];
  (array || []).map((item) => {
    if (!result.includes(item[key]) && condition(item)) {
      result.push(item[key]);
    }
  });
  return result;
};

export const findChildrenTree = (treeArr, rootId) => {
  const children = [rootId];
  for (let i = 0; i < children.length; i++) {
    const childOfI = treeArr.filter((item) => item.parent === children[i]);
    children.push(...childOfI.map((child) => child._id));
  }

  return treeArr.filter((item) => !children.includes(item._id));
};

export const treeArray = function (treeArr, rootId = undefined) {
  const arr = [];
  for (let i = 0; i < treeArr.length; i++) {
    const childOfI = (treeArr[i].parent || '')._id == rootId && treeArr[i];
    if (childOfI) {
      const childObj = {
        ...childOfI,
        title: childOfI.name,
        value: childOfI._id,
        key: i + 1,
        children: treeArray(treeArr, childOfI._id),
      };
      arr.push(childObj);
    }
  }
  return arr;
};

export const flatten = (object, separator = '.') => {
  return Object.assign(
    {},
    ...(function _flatten(child, path = []) {
      return [].concat(
        ...Object.keys(child || {}).map((key) =>
          typeof child[key] === 'object'
            ? _flatten(child[key], path.concat([key]))
            : {[path.concat([key]).join(separator)]: child[key]},
        ),
      );
    })(object),
  );
};
