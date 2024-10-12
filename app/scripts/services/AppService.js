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
        AppService.BindComponentsToDispatcher();
        
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

        App.components.presentation = new CCPresentation();

        let element = document.getElementById(id);
        element.appendChild(App.components.presentation);

    }

    static DefinePresentation() {

        let background = App.components.presentation.newBackground("taptuBackground");
        background.contentClass("TestBackgroundContent");
        background.positionRange(3, 1);
        background.transitionStyle("all 1.0s ease-in-out");

        let page1 = App.components.presentation.newPage("intro1", "taptuBackground", 0.0, 0, null);
        let page2 = App.components.presentation.newPage("intro2", "taptuBackground", 0.2, 0, null);
        let page3 = App.components.presentation.newPage("intro3", "taptuBackground", 0.4, 0, null);
        let hubPage = App.components.presentation.newPage("hub");

        page1.next(page2, PageTransition.SlideLeft, PageTransition.SlideRight, 2);
        page2.next(page3, PageTransition.SlideLeft, PageTransition.SlideRight, 2);
        page3.next(hubPage, PageTransition.SlideLeft, null, 2);

        App.components.presentation.activePage = page1;

    }

    static BindComponentsToDispatcher() {

        App.components.presentation.attachNavigationCallback(App.dispatcher.newEventDispatchCallback("Presentation_PageTransition"));

    }
}