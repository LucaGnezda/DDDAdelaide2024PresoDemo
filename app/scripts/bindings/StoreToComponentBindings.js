

let AppModel_AppModelElement_OnStoreChanged = function(event) {
    Log.debug(`Component Data Listener Callback Extension`, "COMPONENT BINDING");

    for (let [key, value] of Object.entries(this.observableData)) {
        if (event.originatingObject.observableData.hasOwnProperty(key)) {
            this.observableData[key] = event.originatingObject.observableData[key];
        }                 
    }
}