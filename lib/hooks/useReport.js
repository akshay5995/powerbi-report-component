"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBootstrap = exports.useReport = exports._useReport = void 0;
var react_1 = require("react");
var config_1 = require("../utils/config");
function _useReport(performOnEmbed) {
    var _a = (0, react_1.useState)(null), report = _a[0], _setEmbedInstance = _a[1];
    var setEmbed = function (embedDivRef, embedConfig) {
        var errors = (0, config_1.validateConfig)(embedConfig);
        if (!errors || errors.length === 0) {
            embed(embedDivRef.current, embedConfig);
        }
        else {
            var errorString = (0, config_1.parseConfigErrors)(errors);
            throw new Error(errorString || 'invalid configuration passed');
        }
    };
    var embed = function (ref, config) {
        var reportMode = config.reportMode;
        var isCreateMode = reportMode === 'Create';
        var embedInstance;
        if (isCreateMode)
            embedInstance = window.powerbi.createReport(ref, config);
        else {
            embedInstance = window.powerbi.embed(ref, config);
        }
        if (performOnEmbed) {
            performOnEmbed(embedInstance, ref);
        }
        _setEmbedInstance(embedInstance);
    };
    return [report, setEmbed];
}
exports._useReport = _useReport;
function useReport() {
    var _a = (0, react_1.useState)(null), report = _a[0], _setEmbedInstance = _a[1];
    var embed = function (ref, config) {
        var embedConfig = (0, config_1.createEmbedConfigBasedOnEmbedType)(config);
        var errors = (0, config_1.validateConfig)(embedConfig);
        if (!errors || errors.length === 0) {
            var _embed = window.powerbi.embed(ref.current, embedConfig);
            var embedInstance = window.powerbi.get(ref.current);
            _setEmbedInstance(embedInstance);
        }
        else {
            var errorString = (0, config_1.parseConfigErrors)(errors);
            throw new Error(errorString || 'invalid configuration passed');
        }
    };
    return [report, embed];
}
exports.useReport = useReport;
function useBootstrap() {
    var _a = (0, react_1.useState)(false), isBotstrapped = _a[0], setIsBootstrapped = _a[1];
    var _b = (0, react_1.useState)(null), report = _b[0], _setEmbedInstance = _b[1];
    var embed = function (ref, config) {
        if (isBotstrapped) {
            var embedConfig = (0, config_1.createEmbedConfigBasedOnEmbedType)(config);
            var errors = (0, config_1.validateConfig)(embedConfig);
            if (!errors || errors.length === 0) {
                var _embed = window.powerbi.embed(ref.current, embedConfig);
                var embedInstance = window.powerbi.get(ref.current);
                _setEmbedInstance(embedInstance);
            }
            else {
                var errorString = (0, config_1.parseConfigErrors)(errors);
                throw new Error(errorString || 'invalid configuration passed');
            }
        }
        else {
            throw new Error('bootstrap was not called');
        }
    };
    var bootstrap = function (ref, config) {
        var bootstrapConfig = (0, config_1.createEmbedConfigBasedOnEmbedType)(config);
        if ((0, config_1.validateBootrapConfig)(bootstrapConfig)) {
            window.powerbi.bootstrap(ref.current, bootstrapConfig);
            setIsBootstrapped(true);
        }
        else {
            throw new Error('invalid configuration passed');
        }
    };
    return [report, bootstrap, embed];
}
exports.useBootstrap = useBootstrap;
