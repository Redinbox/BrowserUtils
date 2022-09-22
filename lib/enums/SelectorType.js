"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectorType = void 0;
/**
 * Selectors search types
 */
var SelectorType;
(function (SelectorType) {
    SelectorType["ID"] = "id";
    SelectorType["XPATH"] = "xpath";
    SelectorType["CSS"] = "css selector";
    SelectorType["NAME"] = "name";
    SelectorType["TAG_NAME"] = "tag name";
    SelectorType["CLASS_NAME"] = "class name";
    SelectorType["LINK_TEXT"] = "link text";
    SelectorType["PARTIAL_LINK_TEXT"] = "partial link text";
})(SelectorType = exports.SelectorType || (exports.SelectorType = {}));
