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
        AppService.DefinePresentationStructure();
        AppService.LoadPresentationContent();

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

    static DefinePresentationStructure() {

        let backgroundFactory = new BackgroundFactory(App.backgrounds, App.elements.backgroundsContainer);
        let pageFactory = new PageFactory(App.pages, App.elements.pagesContainer);

        // Define & configure Backgrounds
        backgroundFactory.newBackground("taptuBackground1");
        backgroundFactory.newBackground("taptuBackground2");
        backgroundFactory.newBackground("taptuBackground2Alt");
        
        App.backgrounds.taptuBackground1.contentClass("TestBackgroundContent1");
        App.backgrounds.taptuBackground1.contentPositionRange(3, 1);
        App.backgrounds.taptuBackground1.transitionStyle("all 1.0s ease-in-out");

        App.backgrounds.taptuBackground2.contentClass("TestBackgroundContent2");
        App.backgrounds.taptuBackground2.contentPositionRange(1, 1);
        App.backgrounds.taptuBackground2.transitionStyle("all 1.0s ease-in-out");

        App.backgrounds.taptuBackground2Alt.contentClass("TestBackgroundContent2");
        App.backgrounds.taptuBackground2Alt.contentPositionRange(1, 1);
        App.backgrounds.taptuBackground2Alt.transitionStyle("all 1.0s ease-in-out");

        // Define Pages & their Backgrounds
        pageFactory.newPage("intro1", "taptuBackground1", 0.0, 0, null);
        pageFactory.newPage("intro2", "taptuBackground1", 0.2, 0, null);
        pageFactory.newPage("intro3", "taptuBackground1", 0.4, 0, null);
        pageFactory.newPage("intro4", "taptuBackground2");
        pageFactory.newPage("intro5", "taptuBackground2");
        pageFactory.newPage("intro6", "taptuBackground2Alt");
        pageFactory.newPage("intro7", "taptuBackground2");
        pageFactory.newPage("intro8", "taptuBackground2");
        pageFactory.newPage("intro9", "taptuBackground2");

        // Interrelate Pages with transitions
        App.pages.intro1.next(App.pages.intro2, PageTransition.SlideLeft, PageTransition.SlideRight, 1);
        App.pages.intro2.next(App.pages.intro3, PageTransition.SlideLeft, PageTransition.SlideRight, 1);
        App.pages.intro3.next(App.pages.intro4, PageTransition.ZoomOut, PageTransition.ZoomIn, 1);
        App.pages.intro4.next(App.pages.intro5, PageTransition.Fade, PageTransition.Fade, 1);
        App.pages.intro5.next(App.pages.intro6, PageTransition.SlideUp, PageTransition.SlideDown, 1);
        App.pages.intro6.next(App.pages.intro7, PageTransition.FadeSlideLeft, PageTransition.FadeSlideRight, 1);
        App.pages.intro7.next(App.pages.intro8, PageTransition.FadeSlideUp, PageTransition.FadeSlideDown, 1);
        App.pages.intro8.next(App.pages.intro9, PageTransition.None, PageTransition.None, 1);

        // Set page 1
        App.activePage = App.pages.intro1;
        App.backgrounds[App.activePage.backgroundId].transitionDuration(2);
        App.backgrounds[App.activePage.backgroundId].withFadeIn();
        App.backgrounds[App.activePage.backgroundId].show();
        App.activePage.usingTransition(1, "ease-in", 0);
        App.activePage.withFadeIn();
        App.activePage.show();

    }

    static LoadPresentationContent() {

        for (let property in App.pages) {
            let source = document.querySelector(`data[value='${property}']`);
            if (source != null) {
                App.pages[property].setContents(source.childNodes);
            }
        }

        document.getElementById("ContentSource").remove();
    }

    static keydownCallback(keyEvent) {

        Log.debug(`${this.constructor.name} captured keydown event`, "APPSERVICE");

        if (App.navigationCallback != null) {

            if (keyEvent.key == "ArrowRight" && App.activePage.nextPage != null) {

                let event = {};
                event.originatingObject = this;
                event.originatingEvent = keyEvent;
                event.transitionFromPage = App.activePage;
                event.transitionToPage = App.activePage.nextPage;
                event.usingTransition = App.activePage.transitionForward;
                event.withDuration = App.activePage.transitionForwardDuration;

                App.navigationCallback(event);

            }
            else if (keyEvent.key == "ArrowLeft" && App.activePage.previousPage != null) {

                let event = {};
                event.originatingObject = this;
                event.originatingEvent = keyEvent;
                event.transitionFromPage = App.activePage;
                event.transitionToPage = App.activePage.previousPage;
                event.usingTransition = App.activePage.transitionBack;
                event.withDuration = App.activePage.transitionBackDuration;

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
                event.withDuration = App.activePage.transitionForwardDuration;

                App.navigationCallback(event);

            }
        }
    }
}