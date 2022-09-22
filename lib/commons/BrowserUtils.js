"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserUtils = void 0;
const os_1 = require("os");
const chai_1 = require("chai");
const logger_1 = __importDefault(require("@wdio/logger"));
const log = (0, logger_1.default)('hooks');
const DEFAULT_TIME_OUT = process.env.DEFAULT_TIME_OUT === undefined ? 3000 : Number(process.env.DEFAULT_TIME_OUT);
var BrowserUtils;
(function (BrowserUtils) {
    /**
     * Selectors search types
     */
    let SelectorType;
    (function (SelectorType) {
        SelectorType["ID"] = "id";
        SelectorType["XPATH"] = "xpath";
        SelectorType["CSS"] = "css selector";
        SelectorType["NAME"] = "name";
        SelectorType["TAG_NAME"] = "tag name";
        SelectorType["CLASS_NAME"] = "class name";
        SelectorType["LINK_TEXT"] = "link text";
        SelectorType["PARTIAL_LINK_TEXT"] = "partial link text";
    })(SelectorType || (SelectorType = {}));
    function pause(milliseconds = 1000) {
        return __awaiter(this, void 0, void 0, function* () {
            log.debug(`Pause the execution for '${milliseconds}'`);
            return new Promise((resolve) => setTimeout(resolve, milliseconds));
        });
    }
    BrowserUtils.pause = pause;

    /**
     * Will return true or false whether or not an <option> or <input> element
     * of type checkbox or radio is currently selected.
     * @param selector element selector
     */
    function isSelected(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            log.debug(`Check if element with selector '${selector}'  is selected`);
            yield waitForEnabled(selector);
            tryBlock(() => __awaiter(this, void 0, void 0, function* () { return yield $(selector).isSelected(); }), `Failed to get selected state of '${selector}'`);
        });
    }
    BrowserUtils.isSelected = isSelected;
    /**
     * Clear a <textarea> or text <input> element’s value
     * @param selector element selector
     */
    function clearValue(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            log.debug(`Clear text in '${selector}'`);
            yield waitForDisplayed(selector);
            tryBlock(() => __awaiter(this, void 0, void 0, function* () { return yield $(selector).clearValue(); }), `Failed to clear value in '${selector}'`);
        });
    }
    BrowserUtils.clearValue = clearValue;
    /**
     * Set a value to an element located by selector
     * @param selector element selector
     * @param value - value to add
     */
    function setValue(selector, value) {
        return __awaiter(this, void 0, void 0, function* () {
            log.debug(`Set element '${selector} with value: '${value}'`);
            yield waitForEnabled(selector);
            tryBlock(() => __awaiter(this, void 0, void 0, function* () { return yield $(selector).setValue(value); }), `Failed to set value: '${value}' to '${selector}'`);
        });
    }
    BrowserUtils.setValue = setValue;
    function click(selector, options) {
        return __awaiter(this, void 0, void 0, function* () {
            log.debug(`Click an element '${selector}'`);
            yield waitForEnabled(selector);
            //assert.ok(isDisplayed && isEnabled, errorMessage);
            yield waitForClickable(selector);
            tryBlock(() => $(selector).click(options), `Failed to click on '${selector}'`);
        });
    }
    BrowserUtils.click = click;
    function isEnabled(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return $(selector).isEnabled();
        });
    }
    BrowserUtils.isEnabled = isEnabled;
    function waitForEnabled(selector, options) {
        return __awaiter(this, void 0, void 0, function* () {
            log.debug(`Wait for an element to be enabled '${selector}'`);
            yield waitForDisplayed(selector, options);
            tryBlock(() => $(selector).waitForEnabled(Object.assign({ timeout: DEFAULT_TIME_OUT }, options)), `Element not enabled '${selector}'`);
        });
    }
    BrowserUtils.waitForEnabled = waitForEnabled;
    function isDisplayed(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            log.debug(`Is element visible by '${selector}'`);
            return yield $(selector).isDisplayed();
        });
    }
    BrowserUtils.isDisplayed = isDisplayed;
    /**
     * Wait for an element to be visible by given selector
     * @param selector element selector
     * @param options WaitForOptions options (optional) { timeout, reverse, timeoutMsg, interval }
     */
    function waitForDisplayed(selector, options) {
        return __awaiter(this, void 0, void 0, function* () {
            log.debug(`Wait for an element to be visible '${selector}'`);
            tryBlock(() => __awaiter(this, void 0, void 0, function* () {
                return yield $(selector).waitForDisplayed(Object.assign({ timeout: DEFAULT_TIME_OUT }, options));
            }), `Element not visible '${selector}'`);
        });
    }
    BrowserUtils.waitForDisplayed = waitForDisplayed;
    function waitForExist(selector, options) {
        return __awaiter(this, void 0, void 0, function* () {
            log.debug(`Expect an element exist '${selector}'`);
            tryBlock(() => $(selector).waitForExist(Object.assign({ timeout: DEFAULT_TIME_OUT }, options)), `Wait for exist '${selector}' with options ${JSON.stringify(options)} failed`);
        });
    }
    BrowserUtils.waitForExist = waitForExist;
    /**
     * Search for an element on the page, starting from the document root
     * @param selectorType - enum type of selector (XPATH, ID, etc')
     * @param selector - element locator
     */
    function findElement(selectorType, selector) {
        log.debug(`Find element '${selector}' of type '${selectorType}'`);
        return tryBlock(() => browser.findElement(selectorType, selector), 'Failed to find element');
    }
    BrowserUtils.findElement = findElement;
    /**
     * Search for multiple elements on the page, starting from the document root. The located elements will be returned as a WebElement JSON objects
     * @param selectorType - enum type of selector (XPATH, ID, etc')
     * @param selector - element locator
     */
    function findElements(selectorType, selector) {
        return tryBlock(() => browser.findElements(selectorType, selector), 'Failed to find elements');
    }
    BrowserUtils.findElements = findElements;
    function switchToFrame(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            log.debug(`Validate iframe with selector ${selector} exist`);
            yield waitForExist(selector);
            //Reporter.debug(`Switching to an Iframe by selector '${selector}'`);
            tryBlock(() => __awaiter(this, void 0, void 0, function* () { return yield browser.switchToFrame($(selector)); }), 'Failed to switch frame');
        });
    }
    BrowserUtils.switchToFrame = switchToFrame;
    /**
     * Change focus to the parent context.
     * If the current context is the top level browsing context, the context remains unchanged.
     */
    function switchToParentFrame() {
        return __awaiter(this, void 0, void 0, function* () {
            log.debug(`Switching to parent frame`);
            tryBlock(() => __awaiter(this, void 0, void 0, function* () { return yield browser.switchToParentFrame(); }), 'Failed to switch to parent frame');
        });
    }
    BrowserUtils.switchToParentFrame = switchToParentFrame;
    /**
     * The Switch To Window command is used to select the current top-level browsing context for the current session,
     * i.e. the one that will be used for processing commands.
     *
     * @param handle a string representing a window handle, should be one of the strings that was returned in a call to getWindowHandles
     */
    function switchToWindow(handle) {
        return __awaiter(this, void 0, void 0, function* () {
            log.debug(`Switching window by id: '${handle}'`);
            tryBlock(() => __awaiter(this, void 0, void 0, function* () { return yield browser.switchToWindow(handle); }), `Failed switch to window by id: '${handle}'`);
        });
    }
    BrowserUtils.switchToWindow = switchToWindow;
    function getWindowHandles() {
        return __awaiter(this, void 0, void 0, function* () {
            log.debug('Get all ids of all open tabs');
            return tryBlock(() => __awaiter(this, void 0, void 0, function* () { return yield browser.getWindowHandles(); }), 'Failed to get window handles');
        });
    }
    BrowserUtils.getWindowHandles = getWindowHandles;

    /**
     * The Close Window command closes the current top-level browsing context.
     * Once done, if there are no more top-level browsing contexts open, the WebDriver session itself is closed.
     */
    async function closeWindow(){
        return __awaiter(this, void 0, void 0, function* () {
            log.debug('Close current window');
            return tryBlock(() => __awaiter(this, void 0, void 0, function* () { return yield browser.closeWindow(); }), 'Failed to close current window');
        });

    }
    BrowserUtils.closeWindow = closeWindow;

    /**
     * Get the value of a <textarea>, <select> or text <input> found by given selector.
     * If multiple elements are found via the given selector,
     * an array of values is returned instead. For input with checkbox or radio type use isSelected.
     * @param selector element's selector
     */
    function getValue(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            log.debug(`Get element's value by selector '${selector}'`);
            yield waitForDisplayed(selector);
            return tryBlock(() => __awaiter(this, void 0, void 0, function* () { return yield $(selector).getValue(); }), `Failed to get value from element '${selector}'`);
        });
    }
    BrowserUtils.getValue = getValue;
    /**
     * Get the text content from a DOM-element.
     * Make sure the element you want to request the text from is interactable
     * otherwise you will get an empty string as return value.
     * @param selector element's selector
     */
    function getText(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            log.debug(`Get element's text by selector '${selector}'`);
            yield waitForDisplayed(selector);
            return tryBlock(() => __awaiter(this, void 0, void 0, function* () { return yield $(selector).getText(); }), `Failed to get text from element '${selector}'`);
        });
    }
    BrowserUtils.getText = getText;
    /**
     * Scrolls the element to a particular place.
     * @param selector element selector
     * @param x is the pixel along the horizontal axis of the element.
     * @param y is the pixel along the vertical axis of the element.
     * @private
     */
    function scrollTo(selector, x, y) {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitForDisplayed(selector);
            const script = `(document.evaluate("${selector}", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue).scroll(${x}, ${y})`;
            execute(script);
        });
    }
    BrowserUtils.scrollTo = scrollTo;
    /**
     * Get an attribute from a DOM-element based on the attribute name.
     * @param selector element's selector to search for attribute
     * @param attributeName requested attribute name
     */
    function getAttribute(selector, attributeName) {
        return __awaiter(this, void 0, void 0, function* () {
            log.debug(`Getting attribute element '${selector}' has name of '${attributeName}'`);
            yield waitForExist(selector);
            return tryBlock(() => __awaiter(this, void 0, void 0, function* () { return yield $(selector).getAttribute(attributeName); }), `Failed to get '${attributeName}' attribute from '${selector}'`);
        });
    }
    BrowserUtils.getAttribute = getAttribute;
    /**
     * Wait for value of element to be as requested
     * @param selector element's selector to check the value
     * @param value expected value
     */
    function waitForValue(selector, value) {
        return __awaiter(this, void 0, void 0, function* () {
            log.debug(`Validate element '${selector}' has value of '${value}'`);
            let currValue;
            tryBlock(() => __awaiter(this, void 0, void 0, function* () {
                return yield browser.waitUntil(() => __awaiter(this, void 0, void 0, function* () {
                    currValue = yield getValue(selector);
                    return currValue.trim() === value;
                }));
            }), `Incorrect value '${currValue}' from '${selector}' ${os_1.EOL}Expected: value '${value}' not found`);
        });
    }
    BrowserUtils.waitForValue = waitForValue;
    /**
     * Wait for attribute to contain requested value
     * @param selector element's selector to search for attribute
     * @param attributeName attribute name to search for
     * @param value value in attribute
     * @param revert indicate either the requested value should or should not be contained
     */
    function waitForAttributeValue(selector, attributeName, value, revert = false) {
        return __awaiter(this, void 0, void 0, function* () {
            log.debug(`Validate element '${selector}' has ${revert ? 'not ' : ''}attribute '${attributeName}' that contains '${value}'`);
            let attributeValue;
            tryBlock(() => __awaiter(this, void 0, void 0, function* () {
                return yield browser.waitUntil(() => __awaiter(this, void 0, void 0, function* () {
                    attributeValue = yield getAttribute(selector, attributeName);
                    return revert != isContainWord(attributeValue, value);
                }));
            }), `Incorrect attribute '${attributeName}' value from '${selector}'`);
        });
    }
    BrowserUtils.waitForAttributeValue = waitForAttributeValue;
    /**
     * Wait for page to load.
     * Inject event listener that waits for document.readyState === 'complete'
     *
     * @param additionalWaitAfterLoad - Since this will be used mostly for image comparison, additional timeout
     * added with default value of 1000 milliseconds
     */
    function waitForPageToLoad(additionalWaitAfterLoad = 1000) {
        return __awaiter(this, void 0, void 0, function* () {
            log.debug("Wait for document.readyState === 'complete'");
            yield browser.waitUntil(() => __awaiter(this, void 0, void 0, function* () { return yield browser.execute("return document.readyState === 'complete'"); }), {
                timeout: DEFAULT_TIME_OUT,
                timeoutMsg: "document.readyState !== 'complete'",
            });
            log.debug(`Pause for ${additionalWaitAfterLoad} milliseconds`);
            yield browser.pause(additionalWaitAfterLoad);
        });
    }
    BrowserUtils.waitForPageToLoad = waitForPageToLoad;
    /**
     * Check if word is a substring of given text
     * @param fullText string to search in
     * @param word word to search
     */
    function isContainWord(fullText, word) {
        if (fullText === null || word === null) {
            chai_1.assert.fail(`Some of the strings or all are null. fullText: '${fullText}', word: '${word}`);
        }
        // escape special characters from user input
        const wordEscapedChars = word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regexStr = `(^|\\s)${wordEscapedChars}(?=\\s|$)`;
        return new RegExp(regexStr).test(fullText);
    }
    /**
     * Get a css property from a DOM-element selected by given selector.
     * The return value is formatted to be testable.
     * Colors gets parsed via rgb2hex and all other properties get parsed via css-value.
     * @param selector element selector
     * @param cssPropertyName  css property name
     */
    function getCssProperty(selector, cssPropertyName) {
        return __awaiter(this, void 0, void 0, function* () {
            log.debug(`Get css property '${cssPropertyName}' from element by '${selector}'`);
            return tryBlock(() => __awaiter(this, void 0, void 0, function* () { return yield $(selector).getCSSProperty(cssPropertyName); }), `Failed to get css Property '${cssPropertyName}' from '${selector}'`);
        });
    }
    BrowserUtils.getCssProperty = getCssProperty;
    /**
     * Get the width and height for an DOM-element.
     * @param selector requested element selector
     */
    /**export async function getSize(selector: string): Promise<Size | number>{
      log.debug(`Get Element: '${selector}' size`);
      await waitForDisplayed(selector);
      return await $(selector).getSize();
  }*/
    /**
     * Resizes browser window outer size according to provided width and height.
     * @param width - Width (px)
     * @param height - Height (px)
     */
    function setWindowSize(width, height) {
        return __awaiter(this, void 0, void 0, function* () {
            log.debug(`Set window size to '${width}X${height}'`);
            tryBlock(() => __awaiter(this, void 0, void 0, function* () { return yield browser.setWindowSize(width, height); }), 'Chrome: Failed to resize window');
        });
    }
    BrowserUtils.setWindowSize = setWindowSize;
    /**
     * Returns browser window size.
     * output example `{ width: 1280, height: 767 }`
     */
    function getWindowSize() {
        return __awaiter(this, void 0, void 0, function* () {
            log.debug('Get window size');
            return tryBlock(() => __awaiter(this, void 0, void 0, function* () { return yield browser.getWindowSize(); }), 'Failed to get window size');
        });
    }
    BrowserUtils.getWindowSize = getWindowSize;
    function moveTo(selector, options) {
        return __awaiter(this, void 0, void 0, function* () {
            log.debug(`Move mouse cursor to element: '${selector}' with offset '${JSON.stringify(options)}'`);
            yield waitForExist(selector);
            yield $(selector).moveTo(options);
        });
    }
    BrowserUtils.moveTo = moveTo;
    /**export async function dragAndDrop(selector: string, target: string | DragAndDropCoordinate): Promise<void> {
      log.debug(`Drag and drop element '${selector}' to ${inspect(target)}.`);
      const isTargetSelector: boolean = typeof target === 'string';

      await waitForDisplayed(selector);
      if (isTargetSelector) {
          await waitForExist(target as string);
      }
      tryBlock(
          async () => await $(selector).dragAndDrop(isTargetSelector ? $(target as string) : (target as DragAndDropCoordinate)),
          `Failed to drag and drop ${selector} to '${inspect(target)}'`
      );
  }*/
    function waitForClickable(selector, options) {
        return __awaiter(this, void 0, void 0, function* () {
            log.debug(`Wait for the element '${selector}' to be clickable`);
            tryBlock(() => __awaiter(this, void 0, void 0, function* () { return yield $(selector).waitForClickable(options === undefined ? { timeout: DEFAULT_TIME_OUT } : options); }), `Timeout waiting for element '${selector}' to be clickable`);
        });
    }
    BrowserUtils.waitForClickable = waitForClickable;
    /**
     * Inject a snippet of JavaScript into the page
     * for execution in the context of the currently selected frame
     * @param script - js script to execute in string format
     */
    function execute(script) {
        log.debug(`Executing script: '${script}'`);
        return tryBlock(() => __awaiter(this, void 0, void 0, function* () { return yield browser.execute(script); }), `Failed to execute script: ${script}`);
    }
    BrowserUtils.execute = execute;
    /**
     *  Wait Until - Will Return true in case condition met within the timeout or false if condition isn't met or not met within the timeout
     * @param condition condition to wait on
     * @param options WaitForOptions options (optional) { timeout, timeoutMsg, interval }
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function waitUntil(condition, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return browser.waitUntil(() => condition(), Object.assign({ timeout: DEFAULT_TIME_OUT }, options));
        });
    }
    BrowserUtils.waitUntil = waitUntil;
    /**
     * Throw error with custom error message
     * @param customErrorMessage custom error message
     * @param error original error
     */
    function handleError(customErrorMessage, error) {
        chai_1.assert.fail(`${customErrorMessage} ${os_1.EOL} ${error}`);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function tryBlock(action, errorMessage) {
        try {
            return action();
        }
        catch (e) {
            handleError(errorMessage, e);
        }
    }
})(BrowserUtils = exports.BrowserUtils || (exports.BrowserUtils = {}));
