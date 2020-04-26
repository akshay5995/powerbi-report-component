// Removes null, undefined and empty string from given object
const clean = (obj) => {
  const propNames = Object.getOwnPropertyNames(obj);
  propNames.forEach((element) => {
    if (
      obj[element] === null ||
      obj[element] === undefined ||
      obj[element] === ''
    ) {
      delete obj[element];
    }
  });
  return obj;
};

const modes = ['view', 'edit', 'create'];

const validateMode = (mode) => modes.findIndex((m) => mode === m) > -1;

const validateAndInvokeCallback = (callback, data) => {
  if (callback) {
    if (typeof callback == 'function') {
      callback(data);
    } else {
      throw 'callback passed is not a function';
    }
  }
};

const isEmptyObject = (obj) =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

const debounce = (func, wait, immediate) => {
  var timeout;
  return () => {
    var context = this;
    var args = arguments;

    var later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
};

export {
  clean,
  validateMode,
  validateAndInvokeCallback,
  isEmptyObject,
  debounce,
};
