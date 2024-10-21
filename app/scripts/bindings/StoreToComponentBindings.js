

let AppModel_AppModelElement_OnStoreChanged = function(event) {
    Log.debug(`Component Data Listener Callback Extension`, "COMPONENT BINDING");

    for (let [key, value] of Object.entries(this.observableData)) {
        if (event.originatingObject.observableData.hasOwnProperty(key)) {
            this.observableData[key] = event.originatingObject.observableData[key];
        }                 
    }
}

let Demo_DemoObservingElement_OnClickCountChanged = function(event) {
    Log.debug(`Component Data Listener Callback Extension`, "COMPONENT BINDING");
    event.newValue = event.originatingObject.observableData.demoClickCount;
    this.dataChangedCallback(event)
}