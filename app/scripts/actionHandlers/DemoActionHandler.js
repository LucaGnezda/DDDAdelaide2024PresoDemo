/**
 * @class
 * @public
 * @constructor
 */
class DemoActionHandler {
    /**
     * Handler metod for incoming actions
     * @param {Action} action 
     */
    route(action) {

        Log.debug(`${this.constructor.name} processing event ${action.type}`, "HANDLER");

        switch (action.type) {
            case "DemoObservableElement_UpdateButton_Click":
                if (App.store?.demo) {
                    App.store.demo.observableData.demoClickCount += 1;
                    App.store.demo.emitNotifications();
                } else {        
                    Log.fatal("App has not been correctly initialised", "", this);
                    return;
                }
                break;

            case "DemoObservableElement_ResetButton_Click":
                if (App.store?.demo) {
                    App.store.demo.observableData.demoClickCount = 0;
                    App.store.demo.emitNotifications();
                } else {        
                    Log.fatal("App has not been correctly initialised", "", this);
                    return;
                }
                break;
        }
    }
}
