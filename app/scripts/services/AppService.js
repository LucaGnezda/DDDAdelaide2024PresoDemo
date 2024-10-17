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
        AppService.DefinePresentation();
        AppService.LoadPresentationContent();
        AppService.DefineInPageAnimations();
        AppService.InitialiseInteractiveContent();

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

    static DefinePresentation() {

        let factory = new PresentationFactory(App.pages, App.pageContent, App.backgrounds, App.elements.pagesContainer, App.elements.backgroundsContainer);

        // Define & configure Backgrounds
        factory.newBackground("taptuBackground1");
        factory.newBackground("taptuBackground2");
        factory.newBackground("taptuBackground2Alt");
        
        App.backgrounds.taptuBackground1.setContentClass("TestBackgroundContent1");
        App.backgrounds.taptuBackground1.setContentPositionRange(3, 1);

        App.backgrounds.taptuBackground2.setContentClass("TestBackgroundContent2");
        App.backgrounds.taptuBackground2.setContentPositionRange(1, 1);

        App.backgrounds.taptuBackground2Alt.setContentClass("TestBackgroundContent2");
        App.backgrounds.taptuBackground2Alt.setContentPositionRange(1, 1);

        // Define Pages Content
        factory.newPageContent("intro1");
        factory.newPageContent("intro2");
        factory.newPageContent("intro3");
        factory.newPageContent("intro4");
        factory.newPageContent("intro5");
        factory.newPageContent("intro6");
        factory.newPageContent("intro7");
        factory.newPageContent("intro8");
        factory.newPageContent("intro9");
        factory.newPageContent("hub");
        factory.newPageContent("hubedit");

        // Define PageNodes
        factory.newPageNode("intro1");
        factory.newPageNode("intro2");
        factory.newPageNode("intro3");
        factory.newPageNode("intro4");
        factory.newPageNode("intro5");
        factory.newPageNode("intro6");
        factory.newPageNode("intro7");
        factory.newPageNode("intro8");
        factory.newPageNode("intro9");
        factory.newPageNode("hub");
        factory.newPageNode("hubedit");

        App.pages.intro1.setPageContentAndBackground(App.pageContent.intro1, App.backgrounds.taptuBackground1, 0.0, 0, null);
        App.pages.intro2.setPageContentAndBackground(App.pageContent.intro2, App.backgrounds.taptuBackground1, 0.2, 0, null);
        App.pages.intro3.setPageContentAndBackground(App.pageContent.intro3, App.backgrounds.taptuBackground1, 0.4, 0, null);
        App.pages.intro4.setPageContentAndBackground(App.pageContent.intro4, App.backgrounds.taptuBackground2);
        App.pages.intro5.setPageContentAndBackground(App.pageContent.intro5, App.backgrounds.taptuBackground2);
        App.pages.intro6.setPageContentAndBackground(App.pageContent.intro6, App.backgrounds.taptuBackground2Alt);
        App.pages.intro7.setPageContentAndBackground(App.pageContent.intro7, App.backgrounds.taptuBackground2);
        App.pages.intro8.setPageContentAndBackground(App.pageContent.intro8, App.backgrounds.taptuBackground2);
        App.pages.intro9.setPageContentAndBackground(App.pageContent.intro9, App.backgrounds.taptuBackground2);
        App.pages.hub.setPageContentAndBackground(App.pageContent.hub, App.backgrounds.taptuBackground1, 0.0, 0, null);
        App.pages.hubedit.setPageContentAndBackground(App.pageContent.hubedit, App.backgrounds.taptuBackground1, 1.0, 0, null);

        // Interrelate Pages with transitions
        App.pages.intro1.setNextPage(App.pages.intro2, PageTransition.SlideLeft, PageTransition.SlideRight, 1);
        App.pages.intro2.setNextPage(App.pages.intro3, PageTransition.SlideLeft, PageTransition.SlideRight, 1);
        App.pages.intro3.setNextPage(App.pages.intro4, PageTransition.ZoomOut, PageTransition.ZoomIn, 1);
        App.pages.intro4.setNextPage(App.pages.intro5, PageTransition.Fade, PageTransition.Fade, 1);
        App.pages.intro5.setNextPage(App.pages.intro6, PageTransition.SlideUp, PageTransition.SlideDown, 1);
        App.pages.intro6.setNextPage(App.pages.intro7, PageTransition.FadeSlideLeft, PageTransition.FadeSlideRight, 1);
        App.pages.intro7.setNextPage(App.pages.intro8, PageTransition.FadeSlideUp, PageTransition.FadeSlideDown, 1);
        App.pages.intro8.setNextPage(App.pages.intro9, PageTransition.None, PageTransition.None, 1);
        App.pages.intro9.setNextPage(App.pages.hub, PageTransition.SlideLeft, PageTransition.SlideRight, 1);
        App.pages.hub.setNextPage(App.pages.hubedit, PageTransition.SlideLeft, PageTransition.SlideRight, 1);

    }

    static LoadPresentationContent() {

        for (let name in App.pages) {
            let source = document.querySelector(`data[value='${name}']`);
            if (source != null) {
                App.pageContent[name].setContents(source.childNodes);
            }
        }

        document.getElementById("ContentSource").remove();
    }

    static DefineInPageAnimations() {
        
        // Add animations to Pages
        App.pageContent.intro2.setAnimation(
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

        App.elements.uxButton.addEventListener("click", App.dispatcher.newEventDispatchCallback("HubEdit_UXButton_OnClick", true));
        App.elements.logicButton.addEventListener("click", App.dispatcher.newEventDispatchCallback("HubEdit_LogicButton_OnClick", true));
        App.elements.dataButton.addEventListener("click", App.dispatcher.newEventDispatchCallback("HubEdit_DataButton_OnClick", true));

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

    static ActivateFirstPage() {

        // Activate and transition page 1
        App.activePage = App.pages.intro1;
        App.activePage.background.usingTransition(1, "ease-in", 0);
        App.activePage.background.withFadeIn();
        App.activePage.background.show();
        App.activePage.content.usingTransition(1, "ease-in", 0);
        App.activePage.content.withFadeIn();
        App.activePage.content.show();

    }

    static keydownCallback(keyEvent) {

        Log.debug(`${this.constructor.name} captured keydown event`, "APPSERVICE");

        if (keyEvent.key == "ArrowRight") {

            if (App.activePage.content.hasForwardAnimationsRemaining && App.pageAnimationCallback != null) {

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

            if (App.activePage.content.hasBackAnimationsRemaining && App.pageAnimationCallback != null) {

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

        if (App.activePage.content.hasForwardAnimationsRemaining && App.pageAnimationCallback != null) {

            let event = {};
            event.originatingObject = this;
            event.originatingEvent = clickEvent;
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