"use strict";

class AppService {

    static Initialise() {
        
        Log.setLoggingLevel(LogLevel.Debug);
        Log.debug("AppService.Initialise - Begin", "APPSERVICE");

        // Bootstrap
        ComponentRegistry.registerComponents();
        AppService.InitialiseAppStore();
        AppService.InitialiseAppEventProcessing();
        AppService.IndexKeyDOMElements();
        AppService.InitialiseCoreEventBindings();
        
        // Define Presentation
        AppService.DefinePresentation();

        Log.debug("AppService.Initialise - Complete", "APPSERVICE");
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

    static IndexKeyDOMElements() {

        App.elements["backgroundsContainer"] = document.getElementById("BackgroundsContainer");
        App.elements["pagesContainer"] = document.getElementById("PagesContainer");

    }

    static InitialiseCoreEventBindings() {

        document.body.addEventListener("keydown", this.keydownCallback);
        document.body.addEventListener("click", this.clickCallback);

        App.navigationCallback = App.dispatcher.newEventDispatchCallback("App_PageTransition");

    }

    static DefinePresentation() {

        let backgroundFactory = new BackgroundFactory(App.backgrounds, App.elements.backgroundsContainer);
        let pageFactory = new PageFactory(App.pages, App.elements.pagesContainer);

        // Define & configure Backgrounds
        backgroundFactory.newBackground("taptuBackground");
        
        App.backgrounds.taptuBackground.contentClass("TestBackgroundContent");
        App.backgrounds.taptuBackground.positionRange(3, 1);
        App.backgrounds.taptuBackground.transitionStyle("all 1.0s ease-in-out");

        // Define Pages & their Backgrounds
        pageFactory.newPage("intro1", "taptuBackground", 0.0, 0, null);
        pageFactory.newPage("intro2", "taptuBackground", 0.2, 0, null);
        pageFactory.newPage("intro3", "taptuBackground", 0.4, 0, null);
        pageFactory.newPage("hub");

        // Interrelate Pages with transitions
        App.pages.intro1.next(App.pages.intro2, PageTransition.SlideLeft, PageTransition.SlideRight, 2);
        App.pages.intro2.next(App.pages.intro3, PageTransition.SlideLeft, PageTransition.SlideRight, 2);
        App.pages.intro3.next(App.pages.hub, PageTransition.SlideLeft, null, 2);

        App.activePage = App.pages.intro1;

    }

    static keydownCallback(keyEvent) {

        Log.debug(`${this.constructor.name} captured keydown event`, "APPSERVICE");

        if (App.navigationCallback != null) {

            if (keyEvent.key == "ArrowRight" && App.activePage.nextPage != null) {

                let event = {};
                event.originatingObject = this;
                event.originatingEvent = keyEvent;
                event.transitionFromPage = this.activePage;
                event.transitionToPage = this.activePage.nextPage;
                event.usingTransition = this.activePage.transitionForward;

                App.navigationCallback(event);

            }
            else if (keyEvent.key == "ArrowLeft" && App.activePage.previousPage != null) {

                let event = {};
                event.originatingObject = this;
                event.originatingEvent = keyEvent;
                event.transitionFromPage = App.activePage;
                event.transitionToPage = App.activePage.previousPage;
                event.usingTransition = App.activePage.transitionBackward;

                App.navigationCallback(event);

            }
        }
    }

    static clickCallback(clickEvent) {

        Log.debug(`${this.constructor.name} captured click event`, "APPSERVICE");

        if (App.navigationCallback != null) {

            if (App.activePage.nextPage != null) {

                let event = {};
                event.originatingObject = this;
                event.originatingEvent = clickEvent;
                event.transitionFromPage = App.activePage;
                event.transitionToPage = App.activePage.nextPage;
                event.usingTransition = App.activePage.transitionForward;

                App.navigationCallback(event);

            }
        }
    }
}