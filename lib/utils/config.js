"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.validateBootrapConfig = exports.createReportVisualConfig = exports.parseConfigErrors = exports.createEmbedConfigBasedOnEmbedType = exports.createTileConfig = exports.createDashboardConfig = exports.createReportConfig = exports.validateConfig = void 0;
var powerbi_client_1 = require("powerbi-client");
var index_1 = require("./index");
var pbi = __importStar(require("powerbi-client"));
var createReportConfig = function (props) {
    var tokenType = props.tokenType, accessToken = props.accessToken, embedUrl = props.embedUrl, embedId = props.embedId, permissions = props.permissions, pageName = props.pageName, extraSettings = props.extraSettings, datasetId = props.datasetId, reportMode = props.reportMode, groupId = props.groupId;
    if (reportMode === 'Create') {
        return (0, index_1.clean)({
            type: 'report',
            tokenType: powerbi_client_1.models.TokenType[tokenType],
            accessToken: accessToken,
            embedUrl: embedUrl,
            datasetId: datasetId,
            groupId: groupId,
            reportMode: reportMode,
        });
    }
    var cleanSettings = (0, index_1.clean)(__assign({ filterPaneEnabled: true, navContentPaneEnabled: true }, extraSettings));
    var cleanDataSetBinding = (0, index_1.clean)({
        datasetId: datasetId,
    });
    var settings = (0, index_1.isEmptyObject)(cleanSettings)
        ? {}
        : {
            settings: cleanSettings,
        };
    var datasetBinding = (0, index_1.isEmptyObject)(cleanDataSetBinding)
        ? {}
        : {
            datasetBinding: cleanDataSetBinding,
        };
    return (0, index_1.clean)(__assign(__assign({ type: 'report', tokenType: powerbi_client_1.models.TokenType[tokenType], accessToken: accessToken, embedUrl: embedUrl, id: embedId, pageName: pageName, viewMode: powerbi_client_1.models.ViewMode[reportMode], permissions: powerbi_client_1.models.Permissions[permissions], reportMode: reportMode }, settings), datasetBinding));
};
exports.createReportConfig = createReportConfig;
var createDashboardConfig = function (props) {
    var tokenType = props.tokenType, accessToken = props.accessToken, embedUrl = props.embedUrl, pageView = props.pageView, embedId = props.embedId;
    return (0, index_1.clean)({
        type: 'dashboard',
        tokenType: powerbi_client_1.models.TokenType[tokenType],
        accessToken: accessToken,
        embedUrl: embedUrl,
        id: embedId,
        pageView: pageView,
    });
};
exports.createDashboardConfig = createDashboardConfig;
var createTileConfig = function (props) {
    var tokenType = props.tokenType, accessToken = props.accessToken, embedUrl = props.embedUrl, embedId = props.embedId, dashboardId = props.dashboardId;
    return (0, index_1.clean)({
        type: 'tile',
        tokenType: powerbi_client_1.models.TokenType[tokenType],
        accessToken: accessToken,
        embedUrl: embedUrl,
        id: embedId,
        dashboardId: dashboardId,
    });
};
exports.createTileConfig = createTileConfig;
var createReportVisualConfig = function (props) {
    var tokenType = props.tokenType, accessToken = props.accessToken, embedUrl = props.embedUrl, pageName = props.pageName, embedId = props.embedId, visualName = props.visualName;
    return (0, index_1.clean)({
        type: 'visual',
        tokenType: powerbi_client_1.models.TokenType[tokenType],
        accessToken: accessToken,
        embedUrl: embedUrl,
        id: embedId,
        pageName: pageName,
        visualName: visualName,
    });
};
exports.createReportVisualConfig = createReportVisualConfig;
var validateTypeConfig = function (config) {
    switch (config.type) {
        case 'report':
            return pbi.models.validateReportLoad(config);
        case 'dashboard':
            return pbi.models.validateDashboardLoad(config);
        case 'tile':
            return pbi.models.validateTileLoad(config);
        case 'visual':
            return pbi.models.validateVisualSelector(config);
        default:
            throw Error('Unknown config type allowed types are report, dashboard or tile');
    }
};
var validateCreateReportConfig = function (config) {
    if (!config.embedUrl)
        throw Error('Embed URL is required');
    return pbi.models.validateCreateReport(config);
};
var validateConfig = function (config) {
    var isCreateMode = config.reportMode === 'Create';
    return isCreateMode
        ? validateCreateReportConfig(config)
        : validateTypeConfig(config);
};
exports.validateConfig = validateConfig;
var validateBootrapConfig = function (config) {
    return !!config.type && !!config.tokenType;
};
exports.validateBootrapConfig = validateBootrapConfig;
var createEmbedConfigBasedOnEmbedType = function (config) {
    var embedType = config.embedType;
    switch (embedType) {
        case 'report':
            return createReportConfig(config);
        case 'dashboard':
            return createDashboardConfig(config);
        case 'tile':
            return createTileConfig(config);
        case 'visual':
            return createReportVisualConfig(config);
        default:
            throw Error('Wrong embed type!');
    }
};
exports.createEmbedConfigBasedOnEmbedType = createEmbedConfigBasedOnEmbedType;
var parseConfigErrors = function (errors) {
    var parsedError = '';
    if (Array.isArray(errors) && errors.length) {
        parsedError = errors
            .map(function (error) { return error.detailedMessage || error.message || ''; })
            .filter(function (x) { return x; })
            .join(', ');
    }
    return parsedError;
};
exports.parseConfigErrors = parseConfigErrors;
