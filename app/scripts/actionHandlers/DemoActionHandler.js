"use strict";

class DemoActionHandler {

    route(action) {

        Log.debug(`Handler processing event ${action.type}`, "HANDLER");

        switch (action.type) {

            case "DemoObservableElement_UpdateButton_Click":
                App.store.demo.observableData.demoClickCount += 1;
                App.store.demo.emitNotifications();
                break;

            case "DemoObservableElement_ResetButton_Click":
                App.store.demo.observableData.demoClickCount = 0;
                App.store.demo.emitNotifications();
                break;
        }
    }
}