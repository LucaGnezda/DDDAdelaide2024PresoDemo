/**
 * Observable is a usable object that wraps ObservableCore, exposing its
 * proxy as .observableData, as well as key subscription methods. It is
 * used by the ObservablesDictionary.
 * @class
 * @public
 * @constructor
*/
class Observable {
    /**
     * @type {ObservableCore?}
     */
    #state = null;

    /**
     * @memberof Observable
     * @type {string}
     */
    id = "";

    /**
     * @memberof Observable
     * @type {ObservableData?}
     */
    observableData = null;

    /**
     * @constructs Observable
     * @param {string} id
     * @param {NotificationMode} notificationMode
     */
    constructor(id, notificationMode) {
        this.#state = new ObservableCore(notificationMode, NotificationStatus.Active);
        this.id = id;
        this.#state.originatingObject = this;
        this.observableData = this.#state.dataProxy;
    }

    /**
     * @returns {NotificationMode?}
     */
    get notificationMode() {
        if (!this.#state) return null;
        return this.#state.notificationMode;
    }

    /**
     * @param {NotificationMode} val
     */
    set notificationMode(val) {
        if (this.#state) {
            this.#state.notificationMode = val;
        }
    }

    /**
     * @returns {NotificationStatus?}
     */
    get notificationStatus() {
        if (!this.#state) return null;
        return this.#state.notificationStatus;
    }

    /**
     * @param {NotificationStatus} val
     */
    set notificationStatus(val) {
        if (this.#state) {
            if (val != null) {
                this.#state.notificationStatus = val;
            }
            else {
                this.#state.notificationStatus = NotificationStatus.Default;
            }
        }
    }

    get subscribers() {
        if (!this.#state) return null;
        return this.#state.subscribers;
    }

    get subscriptionsTo() {
        if (!this.#state) return null;
        return this.#state.subscriptionsTo;
    }

    /**
     * @param {*} obj
     * @param {Function} callbackToAdd
     */
    addSubscriber(obj, callbackToAdd) {
        if (!this.#state) return;
        this.#state.addSubscriber(obj, callbackToAdd);
    }

    /**
     * @param {*} obj
     * @param {Function} callbackToAdd
     */
    subscribeTo(obj, callbackToAdd) {
        if (!this.#state) return;
        this.#state.subscribeTo(obj, callbackToAdd);
    }

    /**
     * @param {*} obj
     */
    removeSubscriber(obj) {
        if (!this.#state) return;
        this.#state.removeSubscriber(obj);
    }

    /**
     * @param {*} obj
     */
    unsubscribeFrom(obj) {
        if (!this.#state) return;
        this.#state.unsubscribeFrom(obj);
    }

    removeAllSubscriptions() {
        if (!this.#state) return;
        this.#state.removeAllSubscriptions();
    }

    /**
     * @param {boolean} force
     */
    emitNotifications(force) {
        if (!this.#state) return;
        this.#state.emitNotifications(force);
    }
}
