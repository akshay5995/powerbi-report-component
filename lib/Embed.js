"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var index_1 = require("./utils/index");
var useReport_1 = require("./hooks/useReport");
var Embed = function (_a) {
    var config = _a.config, performOnEmbed = _a.performOnEmbed, style = _a.style;
    var id = config.id;
    var randId = (0, index_1.generateRandomHexWithId)(id);
    var reportEl = React.useRef(null);
    var _b = (0, useReport_1._useReport)(performOnEmbed), _ = _b[0], setEmbed = _b[1];
    React.useEffect(function () {
        if (reportEl) {
            setEmbed(reportEl, config);
        }
    }, []);
    return (React.createElement("div", { className: 'report', style: style, ref: reportEl, id: randId }));
};
exports.default = Embed;
