/** 
 * Stores data for your application.
 * 
 * There are two options for storing data, within a single Observable object 
 * accessed via ".appState", or within an ObservablesDictionary collection
 * accessed by ".observables[...]". 
*/

"use strict";

class Store {
    
    #appstate = null;
    appState = null;
    #dictionaries = [];

    constructor(notificationMode, notificationStatus) {        

        if (!NotificationMode.hasValue(notificationMode)) {
            notificationMode = NotificationMode.ObjectNotifyOnEmit;
        }

        if (!NotificationStatus.hasValue(notificationStatus)) {
            notificationStatus = NotificationStatus.Active;
        }

        this.#appstate = new ObservableCore(notificationMode, notificationStatus);
        this.#appstate.originatingObject = this;
        this.appState = this.#appstate.dataProxy;
    }

    addObservablesDictionary(name) {
        if (name in this) {
            return null
        }
    
        this[name] = new ObservablesDictionary(this.#appstate.notificationMode);
        this.#dictionaries.push(name);
        
        return this[name];
    }

    addObservable(name) {
        if (name in this) {
            return null
        }
    
        this[name] = new Observable(name, this.#appstate.notificationMode);
        this.#dictionaries.push(name);
        
        return this[name];
    }

    /**
     * Emits notifications if any have been backlogged.
     */
    emitNotifications(isforced) {
        this.#appstate.emitNotifications(isforced);
        this.#dictionaries.forEach(d => this[d].emitNotifications(isforced));
    }

    enableAllNotifications() {
        this.#appstate.notificationStatus = NotificationStatus.Active;
        this.#dictionaries.forEach(d => this[d].enableAllNotifications());
    }

    disableAllNotifications() {
        this.#appstate.notificationStatus = NotificationStatus.Inactive;
        this.#dictionaries.forEach(d => this[d].disableAllNotifications());
    }
}