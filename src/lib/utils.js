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

export { clean };
