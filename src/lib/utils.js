// Removes null, undefined and empty string from given object
const clean = obj => {
  const propNames = Object.getOwnPropertyNames(obj);
  propNames.forEach(element => {
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

const modes = ["view", "edit", "create"];
  
const validateMode = (mode) => modes.findIndex(m => mode === m) > -1;

const validateAndInvokeCallback = (callback, data) => {
  if(callback) { 
    if(typeof(callback) == "function") {
    callback(data)
    } else {
      throw "callback passed is not a function"
    }
  }
}

export { clean, validateMode, validateAndInvokeCallback };
