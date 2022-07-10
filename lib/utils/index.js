"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomHexWithId = exports.isEmptyObject = exports.validateAndInvokeCallback = exports.clean = void 0;
var clean = function (obj) {
    var propNames = Object.getOwnPropertyNames(obj);
    propNames.forEach(function (element) {
        if (obj[element] === null ||
            obj[element] === undefined ||
            obj[element] === '') {
            delete obj[element];
        }
    });
    return obj;
};
exports.clean = clean;
var validateAndInvokeCallback = function (callback, data) {
    if (!!callback) {
        callback(data);
    }
};
exports.validateAndInvokeCallback = validateAndInvokeCallback;
var isEmptyObject = function (obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
};
exports.isEmptyObject = isEmptyObject;
var generateRandomHexWithId = function (embedId) {
    var randHex = Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    return "".concat(embedId, "+").concat(randHex);
};
exports.generateRandomHexWithId = generateRandomHexWithId;
