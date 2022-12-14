"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialKeys = void 0;
/**
 * Enum for special keys
 * will be added more by demand according to https://w3c.github.io/webdriver/webdriver-spec.html#keyboard-actions
 */
var SpecialKeys;
(function (SpecialKeys) {
    SpecialKeys["ENTER"] = "\uE007";
    SpecialKeys["ARROW_LEFT"] = "\uE012";
    SpecialKeys["ARROW_RIGHT"] = "\uE014";
    SpecialKeys["ARROW_UP"] = "\uE013";
    SpecialKeys["ARROW_DOWN"] = "\uE015";
    SpecialKeys["TAB"] = "\uE004";
    SpecialKeys["ESCAPE"] = "\uE00C";
    SpecialKeys["BACK_SPACE"] = "\uE003";
    SpecialKeys["EMOJI_HEART"] = "\u2766";
    SpecialKeys["EMOJI_POOP"] = "\uD83D\uDCA9";
    SpecialKeys["HTML_NON_BREAKING_SPACE"] = "&nbsp;";
})(SpecialKeys = exports.SpecialKeys || (exports.SpecialKeys = {}));
