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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var Embed_1 = __importDefault(require("./Embed"));
var config_1 = require("./utils/config");
var onEmbedHandlers_1 = require("./utils/onEmbedHandlers");
var ReportVisual = function (props) {
    var _a = React.useState(null), currentConfig = _a[0], setCurrentConfig = _a[1];
    var performOnEmbed = React.useCallback(function (report, reportRef) {
        (0, onEmbedHandlers_1.reportVisualHandler)(report, reportRef, props);
    }, [props]);
    React.useEffect(function () {
        setCurrentConfig((0, config_1.createReportVisualConfig)(props));
    }, [props]);
    if (!currentConfig) {
        return React.createElement("div", null, "Error!");
    }
    return (React.createElement(Embed_1.default, { config: currentConfig, performOnEmbed: performOnEmbed, style: props.style }));
};
exports.default = ReportVisual;
