/**
 * @class
 * @public
 * @constructor
 */
class CCObservableBase extends HTMLElement {
    /**
     * @type {ObservableCore}
     */
    #state;
    
    /**
     * @type {Function?}
     */
    #dataChangedCallbackExtention = null;

    /**
     * @type {Function?}
     */
    #dataListnerCallbackExtention = null;

    /**
     * @type {string}
     */
    id = "";

    /**
     * @type {ObservableData}
     */
    observableData;
    
    /**
     * @constructs CCObservableBase
     * @param {ObservableCore} state 
     */
    constructor(state) {
        super();
        this.#state = state;
        this.observableData = state.dataProxy;
    }

    get dataChangedCallbackExtention() {
        return this.#dataChangedCallbackExtention;
    }

    set dataChangedCallbackExtention(val) {
        this.#dataChangedCallbackExtention = val;
    }

    get dataListnerCallbackExtention() {
        return this.#dataListnerCallbackExtention;
    }

    set dataListnerCallbackExtention(val) {
        this.#dataListnerCallbackExtention = val;
    }

    get subscribers() {
        return this.#state.subscribers;
    }

    get subscriptionsTo() {
        return this.#state.subscriptionsTo;
    }
    
    get notificationStatus() {
        return this.#state.notificationStatus
    }

    set notificationStatus(val) {
        this.#state.notificationStatus = val;
    }

    /**
     * @param {*} obj 
     * @param {Function} callbackToAdd 
     */
    addSubscriber(obj, callbackToAdd) {
        this.#state.addSubscriber(obj, callbackToAdd);
    }

    /**
     * @param {*} obj 
     * @param {Function} callbackToAdd 
     */
    subscribeTo(obj, callbackToAdd) {
        this.#state.subscribeTo(obj, callbackToAdd);
    }

    /**
     * @param {*} obj 
     */
    removeSubscriber(obj) {
        this.#state.removeSubscriber(obj);
    }

    /**
     * @param {*} obj 
     */
    unsubscribeFrom(obj) {
        this.#state.unsubscribeFrom(obj);
    }

    removeAllSubscriptions() {
        this.#state.removeAllSubscriptions();
    }
}
