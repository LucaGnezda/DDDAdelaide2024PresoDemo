/** 
 * This class only really exists to proviee a well named object when checking the object's type.
 * It is used by the ObservableCore Proxy and .emitNotification, when creating a data change event.
 * @class
 * @public
 * @constructor
*/
class ObservableDataEvent {
    /**
     * @memberof ObservableDataEvent
     * @type {NotificationMode}
     */
    notificationMode;
    
    /**
     * @memberof ObservableDataEvent
     * @type {object}
     */
    originatingObject;

    /**
     * @memberof ObservableDataEvent
     * @type {Array<*>?}
     */
    path;

    /**
     * @memberof ObservableDataEvent
     * @type {*}
     */
    oldValue;

    /**
     * @memberof ObservableDataEvent
     * @type {*}
     */
    newValue;
    
    /**
     * @constructs ObservableDataEvent
     * @param {NotificationMode} notificationMode 
     * @param {object} originatingObject 
     * @param {Array<*>?} path 
     * @param {*} oldValue 
     * @param {*} newValue 
     */
    constructor(notificationMode, originatingObject, path, oldValue, newValue) { 
        this.notificationMode = notificationMode;
        this.originatingObject = originatingObject;
        this.path = path;
        this.oldValue = oldValue;
        this.newValue = newValue;
    }
}