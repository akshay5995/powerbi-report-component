"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportVisualHandler = exports.tileHandler = exports.dashboardHandler = exports.reportHandler = void 0;
var utils_1 = require("../utils");
var reportHandler = function (report, reportRef, props) {
    var reportMode = props.reportMode;
    var isCreateMode = reportMode === 'Create';
    var reportInstance = window.powerbi.get(reportRef);
    report.on('loaded', function () {
        (0, utils_1.validateAndInvokeCallback)(props.onLoad, reportInstance);
    });
    report.on('error', function (event) {
        return (0, utils_1.validateAndInvokeCallback)(props.onError, event.detail);
    });
    report.on('saved', function (event) {
        return (0, utils_1.validateAndInvokeCallback)(props.onSave, event.detail);
    });
    if (!isCreateMode) {
        report.on('rendered', function () {
            return (0, utils_1.validateAndInvokeCallback)(props.onRender, reportInstance);
        });
        report.on('dataSelected', function (event) {
            return (0, utils_1.validateAndInvokeCallback)(props.onSelectData, event.detail);
        });
        report.on('pageChanged', function (event) {
            return (0, utils_1.validateAndInvokeCallback)(props.onPageChange, event.detail);
        });
        report.on('buttonClicked', function (event) {
            return (0, utils_1.validateAndInvokeCallback)(props.onButtonClicked, event.detail);
        });
        report.on('commandTriggered', function (event) {
            return (0, utils_1.validateAndInvokeCallback)(props.onCommandTriggered, event.detail);
        });
    }
};
exports.reportHandler = reportHandler;
var reportVisualHandler = function (reportVisual, reportRef, props) {
    var reportInstance = window.powerbi.get(reportRef);
    reportVisual.on('loaded', function () {
        (0, utils_1.validateAndInvokeCallback)(props.onLoad, reportInstance);
    });
    reportVisual.on('rendered', function () {
        return (0, utils_1.validateAndInvokeCallback)(props.onRender, reportInstance);
    });
    reportVisual.on('dataSelected', function (event) {
        return (0, utils_1.validateAndInvokeCallback)(props.onSelectData, event.detail);
    });
};
exports.reportVisualHandler = reportVisualHandler;
var dashboardHandler = function (dashboard, dashboardRef, props) {
    if (props.onLoad)
        props.onLoad(dashboard, window.powerbi.get(dashboardRef));
    dashboard.on('tileClicked', function (event) {
        return (0, utils_1.validateAndInvokeCallback)(props.onTileClicked, event.detail);
    });
};
exports.dashboardHandler = dashboardHandler;
var tileHandler = function (tile, props) {
    tile.on('tileLoaded', function (event) {
        return (0, utils_1.validateAndInvokeCallback)(props.onLoad, event.detail);
    });
    tile.on('tileClicked', function (event) {
        return (0, utils_1.validateAndInvokeCallback)(props.onClick, event.detail);
    });
};
exports.tileHandler = tileHandler;
