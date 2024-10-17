"use strict";

class Log {

    static #logLevel = LogLevel.Default;
    static #logCategories = [];

    static setLoggingLevel(val) {
        if (val != null && LogLevel.hasValue(val)) {
            Log.#logLevel = val;
        }
        else {
            Log.error("Unable to set log level, invalid value supplied.")
        }
    }

    static restrictLoggingCategories(val) {
        if (value instanceof Array) {
            Log.#logLevel = val;
        }
    }

    static removeLoggingCategoryRestrictions() {
        this.#logCategories = [];
    }

    static error(msg) {
        Log.#log("Error", "color:#ffffff; background: #be333f", msg, LogLevel.Error, null);
    }

    static warn(msg, category) {
        Log.#log(" Warn", "color:#ec9e30;", msg, LogLevel.Warning, category);
    }

    static info(msg, category) {
        Log.#log(" Info", "color:#238ddd;", msg, LogLevel.Infomation, category);
    }

    static debug(msg, category) {
        Log.#log("Debug", "color:#a0a0a0;", msg, LogLevel.Debug, category);
    }

    static trace(msg, category) {
        Log.#log("Trace", "color:#808080;", msg, LogLevel.Trace, category);
    }

    static #log(prefix, prefixStyle, msg, level, category) {
        if (Log.#logLevel >= level) {
            if (category == null) {
                console.log("%c" + prefix + "%c | " + msg, prefixStyle, "");
            }
            else if (Log.#logCategories.length == 0 || Log.#logCategories.includes(category)) {
                console.log("%c" + prefix + "%c | [" + category + "] " + msg, prefixStyle, "");
            }
        }
    }
}

