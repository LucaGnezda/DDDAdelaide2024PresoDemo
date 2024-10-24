/**
 * @template T
 * @typedef {(arg0: T) => void} Binding<T>
 */

/**
 * @typedef {Object} AppModelBindingEvent
 * @property {*} observableData
 * @property {*} originatingObject
 */

/**
 * @type {Binding<AppModelBindingEvent>}
 * @this {*}
 */
let AppModel_OnDataChange = function(event) {
    Log.debug(`Component Data Listener Callback Extension`, "COMPONENT BINDING");

    for (let [key, value] of Object.entries(this.observableData)) {
        if (event.originatingObject.observableData.hasOwnProperty(key)) {
            this.observableData[key] = event.originatingObject.observableData[key];
        }
    }
}

/**
 * @typedef {Object} DemoBindingEvent
 * @property {number} newValue
 * @property {*} originatingObject
 */

/**
 * @type {Binding<DemoBindingEvent>}
 * @this {*}
 */
let Demo_DemoObservingElement_OnClickCountChanged = function(event) {
    Log.debug(`Component Data Listener Callback Extension`, "COMPONENT BINDING");
    event.newValue = event.originatingObject.observableData.demoClickCount;
    this.dataChangedCallback(event)
}
