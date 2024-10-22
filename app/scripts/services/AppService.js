"use strict";

class AppService {

    static Initialise() {
        
        Log.setLoggingLevel(LogLevel.Trace);
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
        App.dispatcher.addDispatchHandler(new DemoActionHandler(), "route");
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
        App.pageOverlayCallback = App.dispatcher.newEventDispatchCallback("App_OverlayAnimation");
        
    }

    static LoadStore() {

        App.store.addObservablesDictionary("appModel");

        App.store.addObservable("demo");
        App.store.demo.observableData.demoClickCount = 0;

    }

    static DefinePresentation() {

        let factory = new PresentationFactory(App.pages, App.pageContent, App.backgrounds, App.elements.pagesContainer, App.elements.backgroundsContainer);

        // Define & configure Backgrounds
        factory.newBackground("introBackground");
        factory.newBackground("hubBackground");
        factory.newBackground("sectionBackground1");
        factory.newBackground("demoBackground");

        // Define Pages Content
        factory.newPageContent("intro1");
        factory.newPageContent("intro2");
        factory.newPageContent("intro3");

        factory.newPageContent("hub");

        factory.newPageContent("logging1");

        factory.newPageContent("components1");
        factory.newPageContent("components2");

        factory.newPageContent("observables1");
        factory.newPageContent("observables2");

        factory.newPageContent("store1");
        factory.newPageContent("store2");

        factory.newPageContent("eventBinding1");

        factory.newPageContent("dispatchActionHandling1");
        factory.newPageContent("dispatchActionHandling2");
        factory.newPageContent("dispatchActionHandling3");

        factory.newPageContent("dataBinding1");

        factory.newPageContent("demo");

        // Define Pages
        factory.newPageNode("intro1");
        factory.newPageNode("intro2");
        factory.newPageNode("intro3");

        factory.newPageNode("hub");

        factory.newPageNode("logging1");

        factory.newPageNode("components1");
        factory.newPageNode("components2");

        factory.newPageNode("observables1");
        factory.newPageNode("observables2");

        factory.newPageNode("store1");
        factory.newPageNode("store2");

        factory.newPageNode("eventBinding1");

        factory.newPageNode("dispatchActionHandling1");
        factory.newPageNode("dispatchActionHandling2");
        factory.newPageNode("dispatchActionHandling3");

        factory.newPageNode("dataBinding1");

        factory.newPageNode("demo");
        
        // Configure Backgrounds
        App.backgrounds.introBackground.setContentClass("PageBackground");
        App.backgrounds.introBackground.setContentPositionRange(1.6, 1);

        App.backgrounds.hubBackground.setContentClass("PageBackground");
        App.backgrounds.hubBackground.setContentPositionRange(1, 1);

        App.backgrounds.sectionBackground1.setContentClass("PageBackground");
        App.backgrounds.sectionBackground1.setContentPositionRange(3, 1);

        App.backgrounds.demoBackground.setContentClass("PageBackground");
        App.backgrounds.demoBackground.setContentPositionRange(1, 1);        

        // Configure Pages
        App.pages.intro1.setPageContentAndBackground(App.pageContent.intro1, App.backgrounds.introBackground, 0.0, 0, null);
        App.pages.intro2.setPageContentAndBackground(App.pageContent.intro2, App.backgrounds.introBackground, 0.3, 0, null);
        App.pages.intro3.setPageContentAndBackground(App.pageContent.intro3, App.backgrounds.introBackground, 0.6, 0, null);

        App.pages.hub.setPageContentAndBackground(App.pageContent.hub, App.backgrounds.hubBackground);

        App.pages.logging1.setPageContentAndBackground(App.pageContent.logging1, App.backgrounds.sectionBackground1, 0.0, 0, null);

        App.pages.components1.setPageContentAndBackground(App.pageContent.components1, App.backgrounds.sectionBackground1, 0.0, 0, null);
        App.pages.components2.setPageContentAndBackground(App.pageContent.components2, App.backgrounds.sectionBackground1, 0.3, 0, null);

        App.pages.observables1.setPageContentAndBackground(App.pageContent.observables1, App.backgrounds.sectionBackground1, 0.0, 0, null);
        App.pages.observables2.setPageContentAndBackground(App.pageContent.observables2, App.backgrounds.sectionBackground1, 0.3, 0, null);

        App.pages.store1.setPageContentAndBackground(App.pageContent.store1, App.backgrounds.sectionBackground1, 0.0, 0, null);
        App.pages.store2.setPageContentAndBackground(App.pageContent.store2, App.backgrounds.sectionBackground1, 0.3, 0, null);

        App.pages.eventBinding1.setPageContentAndBackground(App.pageContent.eventBinding1, App.backgrounds.sectionBackground1, 0.4, 0, null);

        App.pages.dispatchActionHandling1.setPageContentAndBackground(App.pageContent.dispatchActionHandling1, App.backgrounds.sectionBackground1, 0.0, 0, null);
        App.pages.dispatchActionHandling2.setPageContentAndBackground(App.pageContent.dispatchActionHandling2, App.backgrounds.sectionBackground1, 0.3, 0, null);
        App.pages.dispatchActionHandling3.setPageContentAndBackground(App.pageContent.dispatchActionHandling3, App.backgrounds.sectionBackground1, 0.6, 0, null);

        App.pages.dataBinding1.setPageContentAndBackground(App.pageContent.dataBinding1, App.backgrounds.sectionBackground1, 0.4, 0, null);

        App.pages.demo.setPageContentAndBackground(App.pageContent.demo, App.backgrounds.demoBackground);


        // Interrelate Pages with transitions
        App.pages.intro1.setNextPage(App.pages.intro2, PageTransition.FadeSlideLeft, PageTransition.FadeSlideRight, 1.25);
        App.pages.intro2.setNextPage(App.pages.intro3, PageTransition.FadeSlideLeft, PageTransition.FadeSlideRight, 1.25);
        App.pages.intro3.setNextPage(App.pages.hub, PageTransition.Fade, PageTransition.Fade, 2);

        App.pages.logging1.setPreviousPage(App.pages.hub, PageTransition.ZoomOut, 1.75);
        App.pages.logging1.setNextPage(App.pages.hub, PageTransition.ZoomOut, null, 1.75);

        App.pages.components1.setPreviousPage(App.pages.hub, PageTransition.ZoomOut, 1.75);
        App.pages.components1.setNextPage(App.pages.components2, PageTransition.FadeSlideLeft, PageTransition.FadeSlideRight, 1.75);
        App.pages.components2.setNextPage(App.pages.hub, PageTransition.ZoomOut, null, 1.75);

        App.pages.observables1.setPreviousPage(App.pages.hub, PageTransition.ZoomOut, 1.75);
        App.pages.observables1.setNextPage(App.pages.observables2, PageTransition.FadeSlideLeft, PageTransition.FadeSlideRight, 1.75);
        App.pages.observables2.setNextPage(App.pages.hub, PageTransition.ZoomOut, null, 1.75);

        App.pages.store1.setPreviousPage(App.pages.hub, PageTransition.ZoomOut, 1.75);
        App.pages.store1.setNextPage(App.pages.store2, PageTransition.FadeSlideLeft, PageTransition.FadeSlideRight, 1.75);
        App.pages.store2.setNextPage(App.pages.hub, PageTransition.ZoomOut, null, 1.75);

        App.pages.eventBinding1.setPreviousPage(App.pages.hub, PageTransition.ZoomOut, 1.75);
        App.pages.eventBinding1.setNextPage(App.pages.hub, PageTransition.ZoomOut, null, 1.75);

        App.pages.dispatchActionHandling1.setPreviousPage(App.pages.hub, PageTransition.ZoomOut, 1.75);
        App.pages.dispatchActionHandling1.setNextPage(App.pages.dispatchActionHandling2, PageTransition.FadeSlideLeft, PageTransition.FadeSlideRight, 1.25);
        App.pages.dispatchActionHandling2.setNextPage(App.pages.dispatchActionHandling3, PageTransition.FadeSlideLeft, PageTransition.FadeSlideRight, 1.25);
        App.pages.dispatchActionHandling3.setNextPage(App.pages.hub, PageTransition.ZoomOut, null, 1.75);

        App.pages.dataBinding1.setPreviousPage(App.pages.hub, PageTransition.ZoomOut, 1.75);
        App.pages.dataBinding1.setNextPage(App.pages.hub, PageTransition.ZoomOut, null, 1.75);

        App.pages.demo.setPreviousPage(App.pages.hub, PageTransition.ZoomOut, 1.75);
    }

    static LoadPresentationContent() {

        for (let name in App.pages) {
            let source = document.querySelector(`data[value='${name}']`);
            if (source != null) {
                if (source.hasAttribute("data-hasoverlay")) {
                    let overlaySource = document.querySelector(`data[value='${name}_overlay']`);
                    if (overlaySource != null) {
                        App.pageContent[name].setOverlay(overlaySource.childNodes);
                    }
                }
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

        // Hub page
        App.elements.componentsButton = document.getElementById("ComponentsButton");
        App.elements.eventBindingButton = document.getElementById("EventBindingButton");
        App.elements.dispatchActionHandlingButton = document.getElementById("DispatchActionHandlingButton");
        App.elements.storeButton = document.getElementById("StoreButton");
        App.elements.dataBindingButton = document.getElementById("DataBindingButton");
        App.elements.loggingButton = document.getElementById("LoggingButton");
        App.elements.observablesButton = document.getElementById("ObservablesButton");
        App.elements.demoButton = document.getElementById("DemoButton");

        App.elements.componentsButton.addEventListener("click", App.dispatcher.newEventDispatchCallback("Hub_ComponentsButton_OnClick", true));
        App.elements.eventBindingButton.addEventListener("click", App.dispatcher.newEventDispatchCallback("Hub_EventBindingButton_OnClick", true));
        App.elements.dispatchActionHandlingButton.addEventListener("click", App.dispatcher.newEventDispatchCallback("Hub_DispatchActionHandlingButton_OnClick", true));
        App.elements.storeButton.addEventListener("click", App.dispatcher.newEventDispatchCallback("Hub_StoreButton_OnClick", true));
        App.elements.dataBindingButton.addEventListener("click", App.dispatcher.newEventDispatchCallback("Hub_DataBindingButton_OnClick", true));
        App.elements.loggingButton.addEventListener("click", App.dispatcher.newEventDispatchCallback("Hub_LoggingButton_OnClick", true));
        App.elements.observablesButton.addEventListener("click", App.dispatcher.newEventDispatchCallback("Hub_ObservablesButton_OnClick", true));
        App.elements.demoButton.addEventListener("click", App.dispatcher.newEventDispatchCallback("Hub_DemoButton_OnClick", true));
        
        // demo components
        App.components.demoObservableElement = document.getElementById("DemoObservableElement");       
        App.components.demoObservingElement1 = document.getElementById("DemoObservingElement1");       
        App.components.demoObservingElement2 = document.getElementById("DemoObservingElement2");       
        App.components.demoObservingElement3 = document.getElementById("DemoObservingElement3");       
         
        App.components.demoObservableElement.updateCallback = App.dispatcher.newEventDispatchCallback("DemoObservableElement_UpdateButton_Click");
        App.components.demoObservableElement.resetCallback = App.dispatcher.newEventDispatchCallback("DemoObservableElement_ResetButton_Click");
        
        App.store.demo.addSubscriber(App.components.demoObservingElement1, Demo_DemoObservingElement_OnClickCountChanged);
        App.store.demo.addSubscriber(App.components.demoObservingElement2, Demo_DemoObservingElement_OnClickCountChanged);
        App.store.demo.addSubscriber(App.components.demoObservingElement3, Demo_DemoObservingElement_OnClickCountChanged);

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
        else if (keyEvent.key == "ArrowUp") {
            if (App.activePage.content.hasOverlay && App.pageOverlayCallback != null) {
                let event= {};
                event.originatingObject = this;
                event.originatingEvent = keyEvent;
                event.usingAction = 'open';
                event.page = App.activePage
                event.withDuration = 1;
                
                App.pageOverlayCallback(event)
            }
        }
        else if (keyEvent.key == "ArrowDown") {
            if (App.activePage.content.hasOverlay && App.pageOverlayCallback != null) {
                let event= {};
                event.originatingObject = this;
                event.originatingEvent = keyEvent;
                event.usingAction = 'close';
                event.page = App.activePage;
                event.withDuration = 1;
                
                App.pageOverlayCallback(event)
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