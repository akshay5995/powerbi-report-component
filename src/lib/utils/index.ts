// Removes null, undefined and empty string from given object

const clean = (obj: any) => {
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

const validateAndInvokeCallback = (
  callback: Function | undefined,
  data: any
) => {
  if (!!callback) {
    callback(data);
  }
};

const isEmptyObject = (obj: Object) =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

const generateRandomHexWithId = (embedId: string) => {
  const randHex: string = Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

  return `${embedId}+${randHex}`;
};

export {
  clean,
  validateAndInvokeCallback,
  isEmptyObject,
  generateRandomHexWithId,
};
