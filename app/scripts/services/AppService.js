/**
 * @class
 * @public
 */
class AppService {
    static Initialise() {
        Log.setLoggingLevel(LogLevel.Error);
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
        App.store = new Store(NotificationMode.Default, NotificationStatus.Default);
    }

    static InitialiseAppEventProcessing() {
        // Initialise event processing
        App.dispatcher = new Dispatcher();
        App.dispatcher.addDispatchHandler(new PresentationActionHandler(), "route");
        App.dispatcher.addDispatchHandler(new AppModelActionHandler(), "route");
        App.dispatcher.addDispatchHandler(new DemoActionHandler(), "route");
    }

    static IndexKeyDOMElements() {
        App.elements["backgroundsContainer"] = document.getElementById("BackgroundsContainer");
        App.elements["pagesContainer"] = document.getElementById("PagesContainer");
    }

    static InitialiseCoreEventBindings() {
        if (!App.dispatcher) {
            Log.fatal("App Dispatcher must be initialised before Core Event Bindings", "", this);
            return;
        }

        document.body.addEventListener("keydown", this.keydownCallback);
        document.body.addEventListener("click", this.clickCallback);

        App.pageNavigationCallback = App.dispatcher.newEventDispatchCallback("App_PageTransition");
        App.pageAnimationCallback = App.dispatcher.newEventDispatchCallback("App_PageAnimation");
        App.pageOverlayCallback = App.dispatcher.newEventDispatchCallback("App_OverlayAnimation");
    }

    static LoadStore() {
        if (!App.store) {
            Log.fatal("App Store must be initialised before Store content can be loaded", "", this);
            return;
        }
        
        App.store.addObservablesDictionary("appModel");
        App.store.appModel.add("app");
        App.store.appModel.add("components");
        App.store.appModel.add("eventBindings");
        App.store.appModel.add("actionDispatchers");
        App.store.appModel.add("handlers");
        App.store.appModel.add("dataBindings");
        App.store.appModel.add("observables");
        App.store.appModel.add("store");
        App.store.appModel.add("logging");
        App.store.appModel.add("helpers");

        App.store.appModel["app"].observableData.title = "App Core";
        App.store.appModel["app"].observableData.state = FrameworkElementState.SolvableUnknown;
        App.store.appModel["components"].observableData.title = "UI / Components";
        App.store.appModel["components"].observableData.state = FrameworkElementState.Unknown;
        App.store.appModel["eventBindings"].observableData.title = "Event Bindings";
        App.store.appModel["eventBindings"].observableData.state = FrameworkElementState.Unknown;
        App.store.appModel["actionDispatchers"].observableData.title = "Action / Dispatchers";
        App.store.appModel["actionDispatchers"].observableData.state = FrameworkElementState.Unknown;
        App.store.appModel["handlers"].observableData.title = "Handlers";
        App.store.appModel["handlers"].observableData.state = FrameworkElementState.Unknown;
        App.store.appModel["store"].observableData.title = "Store";
        App.store.appModel["store"].observableData.state = FrameworkElementState.Unknown;
        App.store.appModel["dataBindings"].observableData.title = "Data Bindings";
        App.store.appModel["dataBindings"].observableData.state = FrameworkElementState.Unknown;
        App.store.appModel["observables"].observableData.title = "Observables";
        App.store.appModel["observables"].observableData.state = FrameworkElementState.Unknown;
        App.store.appModel["logging"].observableData.title = "Logging";
        App.store.appModel["logging"].observableData.state = FrameworkElementState.Unknown;
        App.store.appModel["helpers"].observableData.title = "Helpers";
        App.store.appModel["helpers"].observableData.state = FrameworkElementState.Unknown;

        App.store.addObservable("demo");
    }

    static DefinePresentation() {
        let factory = new PresentationFactory(App.pages, App.pageContent, App.backgrounds, App.elements.pagesContainer, App.elements.backgroundsContainer);

        // Define & configure Backgrounds
        factory.newBackground("dddBackground");
        factory.newBackground("titleBackground");
        factory.newBackground("introBackground");
        factory.newBackground("hubBackground");
        factory.newBackground("sectionBackground1");
        factory.newBackground("demoBackground");

        // Define Pages Content
        factory.newPageContent("ddd");
        factory.newPageContent("title");
        factory.newPageContent("dddSponsors");
        
        factory.newPageContent("intro1");
        factory.newPageContent("intro2");
        factory.newPageContent("intro3");
        factory.newPageContent("intro4");

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
        factory.newPageNode("ddd");
        factory.newPageNode("title");
        factory.newPageNode("dddSponsors");

        factory.newPageNode("intro1");
        factory.newPageNode("intro2");
        factory.newPageNode("intro3");
        factory.newPageNode("intro4");

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
        App.backgrounds.dddBackground.setContentClass("DDDPageBackground");
        App.backgrounds.dddBackground.setContentPositionRange(1, 1);

        App.backgrounds.titleBackground.setContentClass("PageBackground");
        App.backgrounds.titleBackground.setContentPositionRange(1, 1);

        App.backgrounds.introBackground.setContentClass("PageBackground");
        App.backgrounds.introBackground.setContentPositionRange(1.6, 1);

        App.backgrounds.hubBackground.setContentClass("PageBackground");
        App.backgrounds.hubBackground.setContentPositionRange(1, 1);

        App.backgrounds.sectionBackground1.setContentClass("PageBackground");
        App.backgrounds.sectionBackground1.setContentPositionRange(3, 1);

        App.backgrounds.demoBackground.setContentClass("PageBackground");
        App.backgrounds.demoBackground.setContentPositionRange(1, 1);

        // Configure Pages
        App.pages.ddd.setPageContentAndBackground(App.pageContent.ddd, App.backgrounds.dddBackground, 0.0, 0, null);
        App.pages.title.setPageContentAndBackground(App.pageContent.title, App.backgrounds.titleBackground, 0.0, 0, null);
        App.pages.dddSponsors.setPageContentAndBackground(App.pageContent.dddSponsors, App.backgrounds.dddBackground, 0.0, 0, null);

        App.pages.intro1.setPageContentAndBackground(App.pageContent.intro1, App.backgrounds.introBackground, 0.0, 0, null);
        App.pages.intro2.setPageContentAndBackground(App.pageContent.intro2, App.backgrounds.introBackground, 0.2, 0, null);
        App.pages.intro3.setPageContentAndBackground(App.pageContent.intro3, App.backgrounds.introBackground, 0.4, 0, null);
        App.pages.intro4.setPageContentAndBackground(App.pageContent.intro4, App.backgrounds.introBackground, 0.6, 0, null);

        App.pages.hub.setPageContentAndBackground(App.pageContent.hub, App.backgrounds.hubBackground, 0.0, 0, null);

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

        App.pages.demo.setPageContentAndBackground(App.pageContent.demo, App.backgrounds.demoBackground, 0.0, 0, null);

        // Interrelate Pages with transitions
        App.pages.ddd.setNextPage(App.pages.title, PageTransition.Fade, PageTransition.Fade, 1.25);
        App.pages.title.setNextPage(App.pages.dddSponsors, PageTransition.Fade, PageTransition.Fade, 1.25);
        App.pages.dddSponsors.setNextPage(App.pages.intro1, PageTransition.Fade, PageTransition.Fade, 1.25);

        App.pages.intro1.setNextPage(App.pages.intro2, PageTransition.FadeSlideLeft, PageTransition.FadeSlideRight, 1.25);
        App.pages.intro2.setNextPage(App.pages.intro3, PageTransition.FadeSlideLeft, PageTransition.FadeSlideRight, 1.25);
        App.pages.intro3.setNextPage(App.pages.intro4, PageTransition.FadeSlideLeft, PageTransition.FadeSlideRight, 1.25);
        App.pages.intro4.setNextPage(App.pages.hub, PageTransition.Fade, PageTransition.Fade, 2);

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
                        // @ts-ignore cant index by variable name
                        if (App.pageContent[name]) {
                            // @ts-ignore cant index by variable name
                            App.pageContent[name].setOverlay(overlaySource.childNodes);
                        } else {
                            Log.fatal(`Failed to assign page ovelay ${name} to a CCContentPage}`, "PRESENTATION", this)
                        }
                    } else {
                        Log.fatal(`Failed to load overlay content for ${name}, which has the [data-hasoverlay] attribute`, "PRESENTATION", this)
                    }
                }
                // @ts-ignore cant index by variable name
                if (App.pageContent[name]) {
                    // @ts-ignore cant index by variable name
                    App.pageContent[name].setContents(source.childNodes);
                } else {
                    Log.fatal(`Failed to assign page content ${name} to a CCContentPage}`, "PRESENTATION", this)
                }
            } else {
                Log.fatal(`Failed to load content for PageNode: ${name}`, "PRESENTATION", this)
            }
        }

        document.getElementById("ContentSource")?.remove();
    }


    static DefineInPageAnimations() {
        // Add animations to Pages
        App.pageContent.title.setAnimation(
            [
                {
                    add: [
                        { key: "data-contents", classes: ["Shake"] }
                    ],
                    remove: [
                        { key: "data-subtitle", classes: ["Hide"] },
                        { key: "data-flyin", classes: ["OffScreen"]},
                    ]
                },
            ]
        )

        App.backgrounds.titleBackground.setAnimation(
            [
                {
                    add: [
                        { classes: ["Shake"] }
                    ],
                    remove: []
                },
            ]
        )

        App.pageContent.intro2.setAnimation(
            [
                {
                    add: [],
                    remove: [
                        { key: "data-photo1", classes: ["OffScreen"] },
                    ]
                },
                {
                    add: [],
                    remove: [
                        { key: "data-photo2", classes: ["OffScreen"] },
                    ]
                },
                {
                    add: [],
                    remove: [
                        { key: "data-photo3", classes: ["OffScreen"] },
                    ]
                },
                {
                    add: [],
                    remove: [
                        { key: "data-photo4", classes: ["OffScreen"] },
                    ]
                },
                {
                    add: [],
                    remove: [
                        { key: "data-photo5", classes: ["OffScreen"] },
                    ]
                },
                {
                    add: [
                        { key: "data-shake", classes: ["Shake"] },
                    ],
                    remove: [
                        { key: "data-photo6", classes: ["FarOffScreen"] },
                    ]
                },
                {
                    add: [
                        { key: "data-motion1", classes: ["Motion1"] },
                    ],
                    remove: []
                },
                {
                    add: [
                        { key: "data-motion2", classes: ["Motion2"] },
                    ],
                    remove: [
                        { key: "data-motion1", classes: ["Motion1"] },
                    ]
                },
                {
                    add: [
                        { key: "data-motion3", classes: ["Motion3"] },
                    ],
                    remove: [
                        { key: "data-motion2", classes: ["Motion2"] },
                    ]
                },
            ]
        )

        App.backgrounds.introBackground.setAnimation(
            [
                {
                    add: [],
                    remove: []
                },
                {
                    add: [],
                    remove: []
                },
                {
                    add: [],
                    remove: []
                },
                {
                    add: [],
                    remove: []
                },
                {
                    add: [],
                    remove: []
                },
                {
                    add: [
                        { classes: ["Shake"] }
                    ],
                    remove: []
                },
            ]
        )

        App.pageContent.intro3.setAnimation(
            [
                {
                    add: [],
                    remove: [
                        { key: "data-icon1", classes: ["Hide"] },
                    ]
                },
                {
                    add: [],
                    remove: [
                        { key: "data-icon2", classes: ["Hide"] },
                    ]
                },
                {
                    add: [],
                    remove: [
                        { key: "data-icon3", classes: ["Hide"] },
                    ]
                },
                {
                    add: [],
                    remove: [
                        { key: "data-icon4", classes: ["Hide"] },
                    ]
                },
            ]
        )

        // overlay definition
        App.pageContent.intro1.setAnimation(defineBasicAnimationSeries(4), "pageOverlay");
        App.pageContent.intro4.setAnimation(
            [
                {
                    add: [
                        { key: "data-line1", classes: ["Show"] },
                    ],
                    remove: [
                        { key: "data-line1", classes: ["Hide"] },
                    ]
                },
                {
                    add: [
                        { key: "data-line2", classes: ["Show"] },
                    ],
                    remove: [
                        { key: "data-line2", classes: ["Hide"] },
                    ]
                },
                {
                    add: [
                        { key: "data-peek1", classes: ["Peek"] },
                    ],
                    remove: [
                        { key: "data-peek1", classes: ["UnPeek"] },
                    ]
                },
                {
                    add: [
                        { key: "data-line3", classes: ["Show"] },
                    ],
                    remove: [
                        { key: "data-line3", classes: ["Hide"] },
                    ]
                },
            ]
            , "pageOverlay");
        App.pageContent.components2.setAnimation(
            [
                {
                    add: [
                        { key: "data-line1", classes: ["Hide"] },
                        { key: "data-line2", classes: ["Show"] }
                    ],
                    remove: [
                        { key: "data-line1", classes: ["Show"] },
                        { key: "data-line2", classes: ["Hide"] }
                    ]
                }
            ],
            "pageOverlay"
        )
        App.pageContent.observables2.setAnimation(defineBasicAnimationSeries(7), "pageOverlay");
    }

    static InitialiseInteractiveContent() {
        if (!App.dispatcher || !App.store) {
            Log.fatal("Both the Store and Dispatcher must be initialised before interactive content", "", this)
            return;
        }

        // Hub page
        App.elements.AppModelAppStructure = document.createElement("cc-frameworkelement");

        if (App.elements.AppModelAppStructure instanceof CCFrameworkElement) {
            App.elements.AppModelAppStructure.useMultiClouds(true);
            App.elements.AppModelAppStructure.setKnownImage("appStructure.svg");
            App.elements.AppModelAppStructure.setPlacement("50%", "45%", "40vmin", "40vmin", "1.5vmin");
            App.elements.AppModelAppStructure.titleStylingClassList?.add("DiagramFont");
            App.elements.AppModelAppStructure.attachClickCallback(App.dispatcher.newEventDispatchCallback("Hub_AppModel_AppStructure_OnClick"));
        }

        App.store.appModel["app"].addSubscriber(App.elements.AppModelAppStructure, AppModel_OnDataChange);
        document.getElementById("AppModel")?.appendChild(App.elements.AppModelAppStructure);

        App.elements.appModelComponents = document.createElement("cc-frameworkelement");

        if (App.elements.appModelComponents instanceof CCFrameworkElement) {
            App.elements.appModelComponents.useMultiClouds(true);
            App.elements.appModelComponents.setKnownImage("components.svg");
            App.elements.appModelComponents.setPlacement("50%", "8%", "10vmin", "10vmin", "1.5vmin");
            App.elements.appModelComponents.titleStylingClassList?.add("DiagramFont");
            App.elements.appModelComponents.attachClickCallback(App.dispatcher.newEventDispatchCallback("Hub_AppModel_Components_OnClick"));
        }

        App.store.appModel["components"].addSubscriber(App.elements.appModelComponents, AppModel_OnDataChange);
        document.getElementById("AppModel")?.appendChild(App.elements.appModelComponents);

        App.elements.appModelEventBindings = document.createElement("cc-frameworkelement");
        if (App.elements.appModelEventBindings instanceof CCFrameworkElement) {
            App.elements.appModelEventBindings.useMultiClouds(false);
            App.elements.appModelEventBindings.setKnownImage("bindings.svg");
            App.elements.appModelEventBindings.setPlacement("80%", "25%", "6vmin", "6vmin", "1.5vmin");
            App.elements.appModelEventBindings.titleStylingClassList?.add("DiagramFont");
            App.elements.appModelEventBindings.attachClickCallback(App.dispatcher.newEventDispatchCallback("Hub_AppModel_EventBindings_OnClick"));
        }

        App.store.appModel["eventBindings"].addSubscriber(App.elements.appModelEventBindings, AppModel_OnDataChange);
        document.getElementById("AppModel")?.appendChild(App.elements.appModelEventBindings);

        App.elements.appModelActionDispatch = document.createElement("cc-frameworkelement");

        if (App.elements.appModelActionDispatch instanceof CCFrameworkElement) {
            App.elements.appModelActionDispatch.useMultiClouds(true);
            App.elements.appModelActionDispatch.setKnownImage("actionDispatchers.svg");
            App.elements.appModelActionDispatch.setPlacement("90%", "50%", "10vmin", "10vmin", "1.5vmin");
            App.elements.appModelActionDispatch.titleStylingClassList?.add("DiagramFont");
            App.elements.appModelActionDispatch.attachClickCallback(App.dispatcher.newEventDispatchCallback("Hub_AppModel_ActionDispatchers_OnClick"));
        }

        App.store.appModel["actionDispatchers"].addSubscriber(App.elements.appModelActionDispatch, AppModel_OnDataChange);
        document.getElementById("AppModel")?.appendChild(App.elements.appModelActionDispatch);

        App.elements.appModelHandlers = document.createElement("cc-frameworkelement");

        if (App.elements.appModelHandlers instanceof CCFrameworkElement) {
            App.elements.appModelHandlers.useMultiClouds(true);
            App.elements.appModelHandlers.setKnownImage("handlers.svg");
            App.elements.appModelHandlers.setPlacement("85%", "60%", "10vmin", "10vmin", "1.5vmin");
            App.elements.appModelHandlers.titleStylingClassList?.add("DiagramFont");
            App.elements.appModelHandlers.attachClickCallback(App.dispatcher.newEventDispatchCallback("Hub_AppModel_Handlers_OnClick"));
        }

        App.store.appModel["handlers"].addSubscriber(App.elements.appModelHandlers, AppModel_OnDataChange);
        document.getElementById("AppModel")?.appendChild(App.elements.appModelHandlers);

        App.elements.appModelStore = document.createElement("cc-frameworkelement");

        if (App.elements.appModelStore instanceof CCFrameworkElement) {
            App.elements.appModelStore.useMultiClouds(true);
            App.elements.appModelStore.setKnownImage("store.svg");
            App.elements.appModelStore.setPlacement("15%", "60%", "10vmin", "10vmin", "1.5vmin");
            App.elements.appModelStore.titleStylingClassList?.add("DiagramFont");
            App.elements.appModelStore.attachClickCallback(App.dispatcher.newEventDispatchCallback("Hub_AppModel_Store_OnClick"));
        }

        App.store.appModel["store"].addSubscriber(App.elements.appModelStore, AppModel_OnDataChange);
        document.getElementById("AppModel")?.appendChild(App.elements.appModelStore);

        App.elements.appModelDataBindings = document.createElement("cc-frameworkelement");

        if (App.elements.appModelDataBindings instanceof CCFrameworkElement) {
            App.elements.appModelDataBindings.useMultiClouds(false);
            App.elements.appModelDataBindings.setKnownImage("bindings.svg");
            App.elements.appModelDataBindings.setPlacement("20%", "25%", "6vmin", "6vmin", "1.5vmin");
            App.elements.appModelDataBindings.titleStylingClassList?.add("DiagramFont");
            App.elements.appModelDataBindings.attachClickCallback(App.dispatcher.newEventDispatchCallback("Hub_AppModel_DataBindings_OnClick"));
        }

        App.store.appModel["dataBindings"].addSubscriber(App.elements.appModelDataBindings, AppModel_OnDataChange);
        document.getElementById("AppModel")?.appendChild(App.elements.appModelDataBindings);

        App.elements.appModelObservables = document.createElement("cc-frameworkelement");

        if (App.elements.appModelObservables instanceof CCFrameworkElement) {
            App.elements.appModelObservables.useMultiClouds(false);
            App.elements.appModelObservables.setKnownImage("observables.svg");
            App.elements.appModelObservables.setPlacement("35%", "90%", "6vmin", "6vmin", "1.5vmin");
            App.elements.appModelObservables.titleStylingClassList?.add("DiagramFont");
            App.elements.appModelObservables.attachClickCallback(App.dispatcher.newEventDispatchCallback("Hub_AppModel_Observables_OnClick"));
        }

        App.store.appModel["observables"].addSubscriber(App.elements.appModelObservables, AppModel_OnDataChange);
        document.getElementById("AppModel")?.appendChild(App.elements.appModelObservables);

        App.elements.appModelLogging = document.createElement("cc-frameworkelement");

        if (App.elements.appModelLogging instanceof CCFrameworkElement) {
            App.elements.appModelLogging.useMultiClouds(false);
            App.elements.appModelLogging.setKnownImage("logging.svg");
            App.elements.appModelLogging.setPlacement("65%", "90%", "6vmin", "6vmin", "1.5vmin");
            App.elements.appModelLogging.titleStylingClassList?.add("DiagramFont");
            App.elements.appModelLogging.attachClickCallback(App.dispatcher.newEventDispatchCallback("Hub_AppModel_Logging_OnClick"));
        }

        App.store.appModel["logging"].addSubscriber(App.elements.appModelLogging, AppModel_OnDataChange);
        document.getElementById("AppModel")?.appendChild(App.elements.appModelLogging);

        App.elements.appModelHelpers = document.createElement("cc-frameworkelement");

        if (App.elements.appModelHelpers instanceof CCFrameworkElement) {
            App.elements.appModelHelpers.useMultiClouds(false);
            App.elements.appModelHelpers.setKnownImage("helpers.svg");
            App.elements.appModelHelpers.setPlacement("50%", "90%", "6vmin", "6vmin", "1.5vmin");
            App.elements.appModelHelpers.titleStylingClassList?.add("DiagramFont");
            App.elements.appModelHelpers.attachClickCallback(App.dispatcher.newEventDispatchCallback("Hub_AppModel_Helpers_OnClick"));
        }

        App.store.appModel["helpers"].addSubscriber(App.elements.appModelHelpers, AppModel_OnDataChange);
        document.getElementById("AppModel")?.appendChild(App.elements.appModelHelpers);

        App.store.appModel.emitNotifications(true);

        // Goto demo button
        App.elements.solveIcon = document.getElementById("SolveIcon");
        App.elements.solveIcon?.addEventListener("click", App.dispatcher.newEventDispatchCallback("Hub_SolveIcon_OnClick", true));

        // @ts-ignore getElementById gets a HTMLElement, which is technically our CC but the type is wrong.
        App.components.demoObservableElement = document.getElementById("DemoObservableElement");
        // @ts-ignore
        App.components.demoObservingElement1 = document.getElementById("DemoObservingElement1");
        // @ts-ignore
        App.components.demoObservingElement2 = document.getElementById("DemoObservingElement2");
        // @ts-ignore
        App.components.demoObservingElement3 = document.getElementById("DemoObservingElement3");

        if (App.components.demoObservableElement instanceof CCDemoObservableElement) {
            let updateCallback = App.dispatcher?.newEventDispatchCallback("DemoObservableElement_UpdateButton_Click");
            let resetCallback = App.dispatcher?.newEventDispatchCallback("DemoObservableElement_ResetButton_Click");
            if (updateCallback && resetCallback) {
                App.components.demoObservableElement.updateCallback = updateCallback;
                App.components.demoObservableElement.resetCallback = resetCallback;
            }
        }

        if (App.store) {
            App.store.demo.observableData.demoClickCount = 0;
        }

        App.store.demo.addSubscriber(App.components.demoObservingElement1, Demo_DemoObservingElement_OnClickCountChanged);
        App.store.demo.addSubscriber(App.components.demoObservingElement2, Demo_DemoObservingElement_OnClickCountChanged);
        App.store.demo.addSubscriber(App.components.demoObservingElement3, Demo_DemoObservingElement_OnClickCountChanged);
    }

    static ActivateFirstPage() {
        // Activate and transition page 1
        App.activePage = App.pages.components2;
        App.activePage.background?.usingTransition(1, "ease-in", 0);
        App.activePage.background?.withFadeIn();
        App.activePage.background?.show();
        App.activePage.content?.usingTransition(1, "ease-in", 0);
        App.activePage.content?.withFadeIn();
        App.activePage.content?.show();
    }

    static SolveAppModel() {

        if (!App.store) {
            Log.fatal("The store must be initialised", "", this)
            return;
        }

        // attach demo page
        App.pages.hub.setNextPage(App.pages.demo, PageTransition.ZoomIn, null, 1.75);

        // set solve states
        App.store.appModel["app"].observableData.state = FrameworkElementState.Solved;
        App.store.appModel["components"].observableData.state = FrameworkElementState.Solved;
        App.store.appModel["eventBindings"].observableData.state = FrameworkElementState.Solved;
        App.store.appModel["actionDispatchers"].observableData.state = FrameworkElementState.Solved;
        App.store.appModel["handlers"].observableData.state = FrameworkElementState.Solved;
        App.store.appModel["store"].observableData.state = FrameworkElementState.Solved;
        App.store.appModel["dataBindings"].observableData.state = FrameworkElementState.Solved;
        App.store.appModel["observables"].observableData.state = FrameworkElementState.Solved;
        App.store.appModel["logging"].observableData.state = FrameworkElementState.Solved;
        App.store.appModel["helpers"].observableData.state = FrameworkElementState.Solved;

        if (App.elements.appModelHandlers instanceof CCFrameworkElement) {
            (App.elements.appModelHandlers).setPlacement("80%", "68%", "10vmin", "10vmin", "1.5vmin");
        }

        App.store.appModel["handlers"].observableData.title = "Handlers";
        
        if (App.elements.AppModelAppStructure instanceof CCFrameworkElement) {
            App.elements.AppModelAppStructure.setPlacement(null, null, "50vmin", "50vmin", "1.5vmin");
            App.elements.AppModelAppStructure.solvedImageStylingClassList?.add("Rotating");
        }

        App.store?.appModel.emitNotifications();
    }

    /**
     * @param {KeyboardEvent} keyEvent
     * @returns
     */
    static keydownCallback(keyEvent) {
        Log.debug(`${this.constructor.name} captured keydown event`, "APPSERVICE");

        if (keyEvent.key == "ArrowRight") {
            if (App.activePage?.content?.overlayState == 'open' && App.pageOverlayCallback) {
                if (!App.activePage.content.hasForwardAnimationsRemaining("pageOverlay")) {
                    return;
                }

                /** @type AnimateContentPageOverlayEvent */
                let event = {
                    originatingObject: this,
                    originatingEvent: keyEvent,
                    activePage: App.activePage,
                    inReverse: false,
                    usingAction: 'animate',
                    withDuration: 1
                };

                App.pageOverlayCallback(event)
                return;
            }

            if (App.activePage?.content?.hasForwardAnimationsRemaining() && App.pageAnimationCallback) {


                /** @type {AnimateContentPageEvent} */
                let event = {
                    originatingObject: this,
                    originatingEvent: keyEvent,
                    activePage: App.activePage,
                    inReverse: false
                }

                App.pageAnimationCallback(event);

            }
            else if (App.activePage?.nextPage != null && App.activePage.transitionForward && App.activePage.transitionForwardDuration && App.pageNavigationCallback != null) {
                /** @type {TransitionContentPageEvent} */
                let event = {
                    originatingObject: this,
                    originatingEvent: keyEvent,
                    transitionFromPage: App.activePage,
                    transitionToPage: App.activePage.nextPage,
                    usingTransition: App.activePage.transitionForward,
                    withDuration: App.activePage.transitionForwardDuration,
                    inReverse: false
                }

                App.pageNavigationCallback(event);

            }
        }
        else if (keyEvent.key == "ArrowLeft") {
            if (App.activePage?.content?.overlayState == 'open' && App.pageOverlayCallback) {
                if (!App.activePage.content.hasBackAnimationsRemaining("pageOverlay")) {
                    return;
                }

                /** @type {AnimateContentPageOverlayEvent} */
                let event = {
                    originatingObject: this,
                    originatingEvent: keyEvent,
                    activePage: App.activePage,
                    inReverse: true,
                    usingAction: 'animate',
                    withDuration: 1
                };

                App.pageOverlayCallback(event)
                return;
            }

            if (App.activePage?.content?.hasBackAnimationsRemaining() && App.pageAnimationCallback) {
                /** @type {AnimateContentPageEvent} */
                let event = {
                    originatingObject: this,
                    originatingEvent: keyEvent,
                    activePage: App.activePage,
                    inReverse: true
                }

                App.pageAnimationCallback(event);

            } else if (App.activePage?.previousPage != null && App.activePage.transitionBack && App.activePage.transitionBackDuration && App.pageNavigationCallback != null) {
                /** @type {TransitionContentPageEvent} */
                let event = {
                    originatingObject: this,
                    originatingEvent: keyEvent,
                    transitionFromPage: App.activePage,
                    transitionToPage: App.activePage.previousPage,
                    usingTransition: App.activePage.transitionBack,
                    withDuration: App.activePage.transitionBackDuration,
                    inReverse: true
                }

                App.pageNavigationCallback(event);
            }
        } else if (keyEvent.key == "ArrowUp") {
            if (App.activePage?.content?.hasOverlay && App.pageOverlayCallback) {
                /** @type {AnimateContentPageOverlayEvent} */
                let event = {
                    originatingObject: this,
                    originatingEvent: keyEvent,
                    activePage: App.activePage,
                    inReverse: false,
                    usingAction: 'open',
                    withDuration: 1
                };

                App.pageOverlayCallback(event)
            }
        } else if (keyEvent.key == "ArrowDown") {
            if (App.activePage?.content?.hasOverlay && App.pageOverlayCallback) {
                /** @type {AnimateContentPageOverlayEvent} */
                let event = {
                    originatingObject: this,
                    originatingEvent: keyEvent,
                    activePage: App.activePage,
                    inReverse: false,
                    usingAction: 'close',
                    withDuration: 1
                };

                App.pageOverlayCallback(event)
            }
        }
    }

    /**
     * @param {MouseEvent} clickEvent
     * @returns {void}
     */
    static clickCallback(clickEvent) {
        Log.debug(`${this.constructor.name} captured click event`, "APPSERVICE");

        if (App.activePage?.content?.overlayState == 'open') {
            return;
        }

        if (App.activePage?.content?.hasForwardAnimationsRemaining() && App.pageAnimationCallback) {
            /** @type {AnimateContentPageOverlayEvent} */
            let event = {
                originatingObject: this,
                originatingEvent: clickEvent,
                activePage: App.activePage,
                inReverse: false,
                usingAction: 'animate',
                withDuration: 1
            };

            App.pageAnimationCallback(event);

        } else if (App.activePage?.nextPage != null && App.activePage.transitionForward && App.activePage.transitionForwardDuration && App.pageNavigationCallback != null) {
            /** @type {TransitionContentPageEvent} */
            let event = {
                originatingObject: this,
                originatingEvent: clickEvent,
                transitionFromPage: App.activePage,
                transitionToPage: App.activePage.nextPage,
                usingTransition: App.activePage.transitionForward,
                withDuration: App.activePage.transitionForwardDuration,
                inReverse: false
            }

            App.pageNavigationCallback(event);
        }
    }
}
