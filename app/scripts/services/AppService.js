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

        // Add Data to Store
        AppService.LoadStore();
        
        // Define Presentation
        AppService.DefinePresentationPagesAndBackgrounds();
        AppService.LoadPresentationContent();
        AppService.DefineInPageAnimations();
        AppService.InitialiseInteractiveContent();
        AppService.InterrelatePages();

        AppService.ActivateFirstPage();


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

        App.pageNavigationCallback = App.dispatcher.newEventDispatchCallback("App_PageTransition");
        App.pageAnimationCallback = App.dispatcher.newEventDispatchCallback("App_PageAnimation");

    }

    static LoadStore() {

        App.store.addObservablesDictionary("appModel");

        let uxData = App.store.appModel.add("UX");
        uxData.observableData.isUnlocked = false;

        let logicData = App.store.appModel.add("Logic");
        logicData.observableData.isUnlocked = false;

        let dataData = App.store.appModel.add("Data");
        dataData.observableData.isUnlocked = false;

    }

    static DefinePresentationPagesAndBackgrounds() {

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
        pageFactory.newPage("hub", "taptuBackground1", 0, 0, null);
        pageFactory.newPage("hubedit", "taptuBackground1", 1, 0, null);

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

    static DefineInPageAnimations() {
        
        // Add animations to Pages
        App.pages.intro2.setAnimation(
            [
                {
                    add: [
                        {key:"data-line1", classes:["Show"]},
                    ],
                    remove: [
                        {key:"data-line1", classes:["Hide"]},
                    ] 
                },
                {
                    add: [
                        {key:"data-line2", classes:["Show"]},
                    ],
                    remove: [
                        {key:"data-line2", classes:["Hide"]},
                    ] 
                },
                {
                    add: [
                        {key:"data-line3", classes:["Show"]},
                    ],
                    remove: [
                        {key:"data-line3", classes:["Hide"]},
                    ] 
                },
            ]
        )
    }

    static InitialiseInteractiveContent() {

        // Hub edit page
        App.elements.uxButton = document.getElementById("UserExperienceButton");
        App.elements.logicButton = document.getElementById("LogicButton");
        App.elements.dataButton = document.getElementById("DataButton");

        App.elements.uxButton.addEventListener("click", App.dispatcher.newEventDispatchCallback("HubEdit_UXButton_OnClick"));
        App.elements.logicButton.addEventListener("click", App.dispatcher.newEventDispatchCallback("HubEdit_LogicButton_OnClick"));
        App.elements.dataButton.addEventListener("click", App.dispatcher.newEventDispatchCallback("HubEdit_DataButton_OnClick"));

        // Hub page
        App.elements.appModelContainer = document.getElementById("AppModel");

        App.elements.appModelElementUX = document.createElement("cc-appmodelelement");
        App.elements.appModelElementLogic = document.createElement("cc-appmodelelement");
        App.elements.appModelElementData = document.createElement("cc-appmodelelement");

        App.elements.appModelContainer.appendChild(App.elements.appModelElementUX);
        App.elements.appModelContainer.appendChild(App.elements.appModelElementLogic);
        App.elements.appModelContainer.appendChild(App.elements.appModelElementData);

        App.elements.appModelElementUX.title = "UX";
        App.elements.appModelElementUX.knownIconSrc  = "./app/assets/web-design.svg";

        App.elements.appModelElementLogic.title = "Logic";
        App.elements.appModelElementLogic.knownIconSrc  = "./app/assets/programming.svg";

        App.elements.appModelElementData.title = "Data";
        App.elements.appModelElementData.knownIconSrc  = "./app/assets/database.svg";

        App.store.appModel["UX"].addSubscriber(App.elements.appModelElementUX, AppModel_AppModelElement_OnStoreChanged);
        App.store.appModel["Logic"].addSubscriber(App.elements.appModelElementLogic, AppModel_AppModelElement_OnStoreChanged);
        App.store.appModel["Data"].addSubscriber(App.elements.appModelElementData, AppModel_AppModelElement_OnStoreChanged);
        

    }


    static InterrelatePages() {

        // Interrelate Pages with transitions
        App.pages.intro1.next(App.pages.intro2, PageTransition.SlideLeft, PageTransition.SlideRight, 1);
        App.pages.intro2.next(App.pages.intro3, PageTransition.SlideLeft, PageTransition.SlideRight, 1);
        App.pages.intro3.next(App.pages.intro4, PageTransition.ZoomOut, PageTransition.ZoomIn, 1);
        App.pages.intro4.next(App.pages.intro5, PageTransition.Fade, PageTransition.Fade, 1);
        App.pages.intro5.next(App.pages.intro6, PageTransition.SlideUp, PageTransition.SlideDown, 1);
        App.pages.intro6.next(App.pages.intro7, PageTransition.FadeSlideLeft, PageTransition.FadeSlideRight, 1);
        App.pages.intro7.next(App.pages.intro8, PageTransition.FadeSlideUp, PageTransition.FadeSlideDown, 1);
        App.pages.intro8.next(App.pages.intro9, PageTransition.None, PageTransition.None, 1);
        App.pages.intro9.next(App.pages.hub, PageTransition.SlideLeft, PageTransition.SlideRight, 1);
        App.pages.hub.next(App.pages.hubedit, PageTransition.SlideLeft, PageTransition.SlideRight, 1);

    }

    static ActivateFirstPage() {

        // Activate and transition page 1
        App.activePage = App.pages.intro1;
        App.backgrounds[App.activePage.backgroundId].transitionDuration(2);
        App.backgrounds[App.activePage.backgroundId].withFadeIn();
        App.backgrounds[App.activePage.backgroundId].show();
        App.activePage.usingTransition(1, "ease-in", 0);
        App.activePage.withFadeIn();
        App.activePage.show();

    }

    static keydownCallback(keyEvent) {

        Log.debug(`${this.constructor.name} captured keydown event`, "APPSERVICE");

        if (keyEvent.key == "ArrowRight") {

            if (App.activePage.hasForwardAnimationsRemaining && App.pageAnimationCallback != null) {

                let event = {};
                event.originatingObject = this;
                event.originatingEvent = keyEvent;
                event.activePage = App.activePage;
                event.inReverse = false;

                App.pageAnimationCallback(event);

            }
            else if (App.activePage.nextPage != null && App.pageNavigationCallback != null) {

                let event = {};
                event.originatingObject = this;
                event.originatingEvent = keyEvent;
                event.transitionFromPage = App.activePage;
                event.transitionToPage = App.activePage.nextPage;
                event.usingTransition = App.activePage.transitionForward;
                event.withDuration = App.activePage.transitionForwardDuration;
                event.inReverse = false;

                App.pageNavigationCallback(event);

            }
        }
        else if (keyEvent.key == "ArrowLeft") {

            if (App.activePage.hasBackAnimationsRemaining && App.pageAnimationCallback != null) {

                let event = {};
                event.originatingObject = this;
                event.originatingEvent = keyEvent;
                event.activePage = App.activePage;
                event.inReverse = true;

                App.pageAnimationCallback(event);

            }
            else if (App.activePage.previousPage != null && App.pageNavigationCallback != null) {

                let event = {};
                event.originatingObject = this;
                event.originatingEvent = keyEvent;
                event.transitionFromPage = App.activePage;
                event.transitionToPage = App.activePage.previousPage;
                event.usingTransition = App.activePage.transitionBack;
                event.withDuration = App.activePage.transitionBackDuration;
                event.inReverse = true;

                App.pageNavigationCallback(event);

            }

        }
    }

    static clickCallback(clickEvent) {

        Log.debug(`${this.constructor.name} captured click event`, "APPSERVICE");

        if (App.activePage.hasForwardAnimationsRemaining && App.pageAnimationCallback != null) {

            let event = {};
            event.originatingObject = this;
            event.originatingEvent = keyEvent;
            event.activePage = App.activePage;
            event.inReverse = false;

            App.pageAnimationCallback(event);

        }
        else if (App.activePage.nextPage != null && App.pageNavigationCallback != null) {

            let event = {};
            event.originatingObject = this;
            event.originatingEvent = clickEvent;
            event.transitionFromPage = App.activePage;
            event.transitionToPage = App.activePage.nextPage;
            event.usingTransition = App.activePage.transitionForward;
            event.withDuration = App.activePage.transitionForwardDuration;
            event.inReverse = false;

            App.pageNavigationCallback(event);

        }
    }
}