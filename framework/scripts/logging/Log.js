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
        Log.#log("ERROR | ", msg, LogLevel.Error, null);
    }

    static warn(msg, category) {
        Log.#log(" Warn | ", msg, LogLevel.Warning, category);
    }

    static info(msg, category) {
        Log.#log(" Info | ", msg, LogLevel.Infomation, category);
    }

    static debug(msg, category) {
        Log.#log("Debug | ", msg, LogLevel.Debug, category);
    }

    static trace(msg, category) {
        Log.#log("Trace | ", msg, LogLevel.Trace, category);
    }

    static #log(prefix, msg, level, category) {
        if (Log.#logLevel >= level) {
            if (category == null) {
                console.log(prefix + msg);
            }
            else if (Log.#logCategories.length == 0 || Log.#logCategories.includes(category)) {
                console.log(prefix + "[" + category + "] " + msg);
            }
        }
    }
}