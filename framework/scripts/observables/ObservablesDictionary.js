// @ts-nocheck

/**
 * ObservableDictionary is a name keyed list of Observables.
 */

"use strict";

class ObservablesDictionary {

    #defaultNotificationMode = null;

    constructor(defaultNotificationMode) {
        this.defaultNotificationMode = defaultNotificationMode;
    }

    get defaultNotificationMode() {
        return this.#defaultNotificationMode;
    }

    set defaultNotificationMode(val) {
        if (val != null && NotificationMode.hasValue(val)) {
            this.#defaultNotificationMode = val;
        }
        else {
            this.#defaultNotificationMode = NotificationMode.Default;
        }
    }

    add(key) {
        if (key in this) {
            return null
        }

        this[key] = new Observable(key, this.#defaultNotificationMode);

        return this[key];
    }

    remove(key) {
        if (!key in this) {
            return false
        }

        this[key].removeAllSubscriptions();
        delete this[key];
    }

    emitNotifications(isforced) {
        for (var property in this) {
            if (typeof this[property].emitNotifications !== "undefined") {
                this[property].emitNotifications(isforced);
            }
            else {
                // Ignore
                Log.warn("Object in observable dictionary does not have an emitNotificationsMethod().", "DICTIONARY")
            }
        }
    }

    enableAllNotifications() {
        for (var property in this) {
            if (typeof this[property].emitNotifications !== "undefined") {
                this[property].notificationStatus = NotificationStatus.Active;
            }
            else {
                // Ignore
                Log.error("Object in observable dictionary does not have an notificationStatus setter.", "DICTIONARY")
            }
        }
    }

    disableAllNotifications() {
        for (var property in this) {
            if (typeof this[property].emitNotifications !== "undefined") {
                this[property].notificationStatus = NotificationStatus.Inactive;
            }
            else {
                // Ignore
                Log.error("Object in observable dictionary does not have an notificationStatus setter.", "DICTIONARY")
            }
        }
    }

    toArray() {
        return Object.values(this).map(e => e.observableData);
    }
}