"use strict";

class AppService {

    static Initialise() {
        
        Log.setLoggingLevel(LogLevel.Debug);
        Log.debug("AppService.Initialise - Begin", "SERVICE");

        // Bootstrap
        ComponentRegistry.registerComponents();
        AppService.InitialiseAppStore();
        AppService.InitialiseAppEventProcessing();
        AppService.InitialisePresentationAt("ComponentRoot");
        
        // Define Presentation
        AppService.DefinePresentation();

        Log.debug("AppService.Initialise - Complete", "SERVICE");
    }

    static InitialiseAppStore() {

        // Create Store & Observables
        App.store = new Store();

    }

    static InitialiseAppEventProcessing() {

        // Initialise event processing
        App.dispatcher = new Dispatcher();
        App.dispatcher.addDispatchHandler(new PresentationActionHandler(), "route");
    }

    static InitialisePresentationAt(id) {

        App.components.slideDeck = new CCSlideDeck();

        let element = document.getElementById(id);
        element.appendChild(App.components.slideDeck);

    }

    static DefinePresentation() {

        let background = App.components.slideDeck.newSlideBackground("TaptuBackground");
        background.setBackgroundContentClass("TestBackgroundContent");
        background.setBackgroundSlidingRange(4, 1);
        background.slideTo(0, 0);

    }
}