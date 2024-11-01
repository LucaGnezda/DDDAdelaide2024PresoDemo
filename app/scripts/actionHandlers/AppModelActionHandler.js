/**
 * @class
 * @public
 * @constructor
 */
class AppModelActionHandler {
    /**
     * Handler metod for incoming actions
     * @param {Action} action 
     */
    route(action) {

        Log.debug(`${this.constructor.name} processing event ${action.type}`, "HANDLER");

        switch (action.type) {

            case "Hub_AppModel_AppStructure_OnClick":
                this.SolveApp(action.payload);
                break;
            
            case "Hub_AppModel_Components_OnClick":
                this.SolveComponents(action.payload);
                break;
            
            case "Hub_AppModel_EventBindings_OnClick":
                this.SolveEventBindings(action.payload);
                break;

            case "Hub_AppModel_ActionDispatchers_OnClick":
                this.SolveActionDispatchers(action.payload);
                break;
            
            case "Hub_AppModel_Handlers_OnClick":
                this.SolveHandlers(action.payload);
                break;

            case "Hub_AppModel_Store_OnClick":
                this.SolveStore(action.payload);
                break;

            case "Hub_AppModel_DataBindings_OnClick":
                this.SolveDataBindings(action.payload);
                break;

            case "Hub_AppModel_Observables_OnClick":
                this.SolveObservables(action.payload);
                break;

            case "Hub_AppModel_Helpers_OnClick":
                this.SolveHelpers(action.payload);
                break;

            case "Hub_AppModel_Logging_OnClick":
                this.SolveLogging(action.payload);
                break;

            case "Hub_DemoButton_OnClick":
                this.ZoomInToSection("demo");
                break;
            
            default:
                // do nothing

        }
    }

    /**
     * Solve the app element
     * @param {*} payload 
     * @returns {void}
     */
    SolveApp(payload) {

        if (App.store?.appModel["app"].observableData.state == FrameworkElementState.Unknown || 
            App.store?.appModel["app"].observableData.state == FrameworkElementState.KnownUnknown || 
            !(App.elements.AppModelAppStructure instanceof CCFrameworkElement)) {
                return;
        }

        if (App.store?.appModel["helpers"].observableData.state == FrameworkElementState.Unknown) {
            App.store.appModel["helpers"].observableData.state = FrameworkElementState.SolvableUnknown;
            App.store.appModel["app"].observableData.state = FrameworkElementState.KnownUnknown;
            App.elements?.AppModelAppStructure?.setPlacement(null, null, "38vmin", "38vmin", "1.5vmin");
            App.store.appModel.emitNotifications();
        }
        else if (App.store?.appModel["components"].observableData.state == FrameworkElementState.Unknown) {
            App.store.appModel["components"].observableData.state = FrameworkElementState.KnownUnknown;
            App.elements?.AppModelAppStructure?.setPlacement(null, null, "36vmin", "36vmin", "1.5vmin");
            App.store.appModel.emitNotifications();
        }
        else if (App.store?.appModel["handlers"].observableData.state == FrameworkElementState.Unknown) {
            App.store.appModel["handlers"].observableData.state = FrameworkElementState.KnownUnknown;
            App.store.appModel["handlers"].observableData.title = "Logic";
            App.elements?.AppModelAppStructure?.setPlacement(null, null, "34vmin", "34vmin", "1.5vmin");
            App.store.appModel.emitNotifications();
        }
        else if (App.store?.appModel["store"].observableData.state == FrameworkElementState.Unknown) {
            App.store.appModel["app"].observableData.state = FrameworkElementState.KnownUnknown;
            App.store.appModel["store"].observableData.state = FrameworkElementState.SolvableUnknown;
            App.elements?.AppModelAppStructure?.setPlacement(null, null, "32vmin", "32vmin", "1.5vmin");
            App.store.appModel.emitNotifications();
        }
        else if (App.store?.appModel["app"].observableData.state == FrameworkElementState.SolvableUnknown) {
            App.store.appModel["app"].observableData.state = FrameworkElementState.Solved;
            App.elements?.AppModelAppStructure?.solvedImageStylingClassList?.add("Rotating");
            App.elements?.AppModelAppStructure?.setPlacement(null, null, "50vmin", "50vmin", "1.5vmin");
            App.store.appModel.emitNotifications();
        }

    }

    /**
     * Solve the helpers element
     * @param {*} payload 
     * @returns {void}
     */
    SolveHelpers(payload) {

        if (App.store?.appModel["helpers"].observableData.state == FrameworkElementState.Unknown || 
            App.store?.appModel["helpers"].observableData.state == FrameworkElementState.KnownUnknown) {
                return;
        }

        if (App.store?.appModel["helpers"].observableData.state == FrameworkElementState.SolvableUnknown) {
            App.store.appModel["helpers"].observableData.state = FrameworkElementState.Solved;
            App.store.appModel["app"].observableData.state = FrameworkElementState.SolvableUnknown;
            App.store.appModel.emitNotifications();
        }

    }

    /**
     * Solve the observables element
     * @param {*} payload 
     * @returns {void}
     */
    SolveObservables(payload) {

        if (App.store?.appModel["observables"].observableData.state == FrameworkElementState.Unknown || 
            App.store?.appModel["observables"].observableData.state == FrameworkElementState.KnownUnknown) {
                return;
        }

        if (App.store?.appModel["observables"].observableData.state == FrameworkElementState.SolvableUnknown) {
            App.store.appModel["observables"].observableData.state = FrameworkElementState.Solved;
            App.store.appModel["logging"].observableData.state = FrameworkElementState.SolvableUnknown;
            App.store.appModel.emitNotifications();
            this.ZoomInToSection("observables1");
        }
        else {
            this.ZoomInToSection("observables1");
        }

    }

    /**
     * Solve the logging element
     * @param {*} payload 
     * @returns {void}
     */
    SolveLogging(payload) {

        if (App.store?.appModel["logging"].observableData.state == FrameworkElementState.Unknown || 
            App.store?.appModel["logging"].observableData.state == FrameworkElementState.KnownUnknown) {
                return;
        }

        if (App.store?.appModel["logging"].observableData.state == FrameworkElementState.SolvableUnknown) {
            App.store.appModel["logging"].observableData.state = FrameworkElementState.Solved;
            App.store.appModel["store"].observableData.state = FrameworkElementState.SolvableUnknown;
            App.store.appModel.emitNotifications();
            this.ZoomInToSection("logging1");
        }
        else {
            this.ZoomInToSection("logging1");
        }

    }

    /**
     * Solve the store element
     * @param {*} payload 
     * @returns {void}
     */
    SolveStore(payload) {

        if (App.store?.appModel["store"].observableData.state == FrameworkElementState.Unknown || 
            App.store?.appModel["store"].observableData.state == FrameworkElementState.KnownUnknown) {
                return;
        }

        if (App.store?.appModel["observables"].observableData.state == FrameworkElementState.Unknown) {
            App.store.appModel["observables"].observableData.state = FrameworkElementState.SolvableUnknown;
            App.store.appModel["store"].observableData.state = FrameworkElementState.KnownUnknown;

            App.store.appModel.emitNotifications();
        }
        else if (App.store?.appModel["store"].observableData.state == FrameworkElementState.SolvableUnknown) {
            App.store.appModel["store"].observableData.state = FrameworkElementState.Solved;
            App.store.appModel["components"].observableData.state = FrameworkElementState.SolvableUnknown;
            App.store.appModel.emitNotifications();
            this.ZoomInToSection("store1");
        }
        else {
            this.ZoomInToSection("store1");
        }
    }

    /**
     * Solve the components element
     * @param {*} payload 
     * @returns {void}
     */
    SolveComponents(payload) {
    
        if (App.store?.appModel["components"].observableData.state == FrameworkElementState.Unknown || 
            App.store?.appModel["components"].observableData.state == FrameworkElementState.KnownUnknown) {
                return;
        }

        if (App.store?.appModel["components"].observableData.state == FrameworkElementState.SolvableUnknown) {
            App.store.appModel["components"].observableData.state = FrameworkElementState.Solved;
            App.store.appModel["handlers"].observableData.state = FrameworkElementState.SolvableUnknown;
            App.store.appModel.emitNotifications();
            this.ZoomInToSection("components1");
        }
        else {
            this.ZoomInToSection("components1");
        }

    }

    /**
     * Solve handlers element
     * @param {*} payload 
     * @returns {void}
     */
    SolveHandlers(payload) {
    
        if (App.store?.appModel["handlers"].observableData.state == FrameworkElementState.Unknown || 
            App.store?.appModel["handlers"].observableData.state == FrameworkElementState.KnownUnknown) {
                return;
        }

        if (App.store?.appModel["actionDispatchers"].observableData.state == FrameworkElementState.Unknown && 
            App.elements.appModelHandlers instanceof CCFrameworkElement) {
            App.store.appModel["handlers"].observableData.title = "Handlers";
            App.elements.appModelHandlers?.setPlacement("80%", "68%", "10vmin", "10vmin", "1.5vmin");
            App.store.appModel["actionDispatchers"].observableData.state = FrameworkElementState.SolvableUnknown;
            App.store.appModel.emitNotifications();
        }
        else if (App.store?.appModel["handlers"].observableData.state == FrameworkElementState.SolvableUnknown) {
            App.store.appModel["handlers"].observableData.state = FrameworkElementState.Solved;
            App.store.appModel["actionDispatchers"].observableData.state = FrameworkElementState.Solved;
            App.store.appModel["eventBindings"].observableData.state = FrameworkElementState.SolvableUnknown;
            App.store.appModel["dataBindings"].observableData.state = FrameworkElementState.SolvableUnknown;
            App.store.appModel.emitNotifications();
            this.ZoomInToSection("dispatchActionHandling1");
        }
        else {
            this.ZoomInToSection("dispatchActionHandling1");
        }

    }

    /**
     * Solve action dispatchers element
     * @param {*} payload 
     * @returns {void}
     */
    SolveActionDispatchers(payload) {
    
        if (App.store?.appModel["actionDispatchers"].observableData.state == FrameworkElementState.Unknown || 
            App.store?.appModel["actionDispatchers"].observableData.state == FrameworkElementState.KnownUnknown) {
                return;
        }

        if (App.store?.appModel["handlers"].observableData.state == FrameworkElementState.SolvableUnknown) {
            App.store.appModel["handlers"].observableData.state = FrameworkElementState.Solved;
            App.store.appModel["actionDispatchers"].observableData.state = FrameworkElementState.Solved;
            App.store.appModel["eventBindings"].observableData.state = FrameworkElementState.SolvableUnknown;
            App.store.appModel["dataBindings"].observableData.state = FrameworkElementState.SolvableUnknown;
            App.store?.appModel.emitNotifications();
            this.ZoomInToSection("dispatchActionHandling1");
        }
        else {
            this.ZoomInToSection("dispatchActionHandling1");
        }

    }

    /**
     * Solve data bindings element
     * @param {*} payload 
     * @returns {void}
     */
    SolveDataBindings(payload) {
    
        if (App.store?.appModel["dataBindings"].observableData.state == FrameworkElementState.Unknown || 
            App.store?.appModel["dataBindings"].observableData.state == FrameworkElementState.KnownUnknown) {
                return;
        }

        if (App.store?.appModel["dataBindings"].observableData.state == FrameworkElementState.SolvableUnknown) {
            App.store.appModel["dataBindings"].observableData.state = FrameworkElementState.Solved;

            if (App.store?.appModel["eventBindings"].observableData.state == FrameworkElementState.Solved) {
                App.store.appModel["app"].observableData.state = FrameworkElementState.SolvableUnknown;
            }

            App.store.appModel.emitNotifications();
            this.ZoomInToSection("dataBinding1");
        }
        else {
            this.ZoomInToSection("dataBinding1");
        }

    }

    /**
     * Solve the event bindings element
     * @param {*} payload 
     * @returns {void}
     */
    SolveEventBindings(payload) {
    
        if (App.store?.appModel["eventBindings"].observableData.state == FrameworkElementState.Unknown || 
            App.store?.appModel["eventBindings"].observableData.state == FrameworkElementState.KnownUnknown) {
                return;
        }

        if (App.store?.appModel["eventBindings"].observableData.state == FrameworkElementState.SolvableUnknown) {
            App.store.appModel["eventBindings"].observableData.state = FrameworkElementState.Solved;

            if (App.store.appModel["dataBindings"].observableData.state == FrameworkElementState.Solved) {
                App.store.appModel["app"].observableData.state = FrameworkElementState.SolvableUnknown;
            }

            App.store.appModel.emitNotifications();
            this.ZoomInToSection("eventBinding1");
        }
        else {
            this.ZoomInToSection("eventBinding1");
        }

    }

    /**
     * Handles zooming into a section
     * @param {AppPages} section 
     * @returns {void}
     */
    ZoomInToSection(section) {
        
        if (!App.activePage || !App.pages || !App.pages[section]) {
            Log.fatal("App has not been correctly initialised", "", this);
            return;
        }
        
        App.pages?.components1?.content?.resetAnimationInitial();
        
        AnimatorService.pageOutro(App.activePage.content, PageTransition.ZoomIn, 1.75);
        AnimatorService.transitionBackground(App.activePage.background, App.pages[section].background, 0, 0, null, PageTransition.ZoomIn, 1.75);
        AnimatorService.pageIntro(App.pages[section].content, PageTransition.ZoomIn, 1.75);

        App.activePage = App.pages[section];
    }

}
