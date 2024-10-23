/** 
 * Dispatcher dispatches an action to all registered handlers.
 * @class
 * @public
 * @constructor
*/
class Dispatcher {
    /**
     * @typedef {{handler: {[k:string]:Function}, routerName: string}} ActionHandler
     */

    /**
     * @type {Array<ActionHandler>}
     */
    #registeredHandlers = [];

    /**
     * Returns the list of currently registered handlers
     */
    get registeredHandlers() {
        return this.#registeredHandlers;
    }

    /**
     * Dispatches an action to all registered handlers.
     * @param {Action} action 
     * @returns {void}
     */
    dispatch(action) {
        if (action.constructor.name != Action.name) {
            Log.warn("Parameter provided is not an Action. Ignoring request.", "DISPATCHER");
            return;
        }
        
        Log.debug(`Dispatching action ${action.type} with payload ${action.payload}`, "DISPATCHER");
        this.#registeredHandlers.map(e => e.handler[e.routerName](action));
    }

    /**
     * Adds a handlers to the list of registered handlers.
     * Note: Only one of each type of handler can be added, as determined by its class name.
     * @param {{[k:string]:Function}} actionHandler 
     * @param {string} actionRouterName 
     * @returns {void}
     */
    addDispatchHandler(actionHandler, actionRouterName) {
        if (typeof actionHandler != "object") {
            Log.error("Hander must be an object. Unable to register", "DISPATCHER");
            return;
        }

        if (isEmptyOrNull(actionRouterName)) {
            Log.error("No routing method provided. Unable to register", "DISPATCHER");
            return;
        }

        if (actionHandler[actionRouterName] == null) {
            Log.error("Routing method does not exist. Unable to register", "DISPATCHER");
            return;
        }

        if (typeof actionHandler[actionRouterName] != "function") {
            Log.error("Routing target is not a method. Unable to register", "DISPATCHER");
            return;
        }
        
        if (this.#registeredHandlers.findIndex(e => e.handler.constructor.name == actionHandler.constructor.name) == -1) {
            this.#registeredHandlers.push({handler:actionHandler, routerName: actionRouterName});
        }
    }


    /**
     * @param {string} actionType 
     * @param {Array<*>} bundleArgumentsAs 
     * @returns {Function} a dispatcher callback that passes a payload based on callback arguments.
     */
    newArgsDispatchCallback(actionType, bundleArgumentsAs) {
        let self = this; // Closures babyyy!
        
        return function() {
            Log.debug(`Dispatch callback for Event ${actionType}`, "EVENT CALLBACK");
    
            /**
             * This probably needs to be more specific but it's not being used anywhere
             * yet so it's hard to say.
             * TODO: uplift this
             * @type {{[k:string|number|symbol]:*}}
             */
            let payload = {};

            for (let i = 0; i < bundleArgumentsAs.length; i++) {
                payload[bundleArgumentsAs[i]] = arguments[i];
            }
            
            self.dispatch(new Action(actionType, payload));
        }
    }

    /**
     * @param {string} actionType 
     * @param {boolean} stopPropagationIfDispatched a boolean that will stop propogfation if dispatched 
     * @param {(event:string)=>boolean} dispatchIf a function that is expected to consume an event and returns true or false to determine if a dispatch should occur
     * @returns {Function} a dispatcher callback that passes an event as its payload.
     */
    newEventDispatchCallback(actionType, stopPropagationIfDispatched, dispatchIf) {
        let self = this; // Closures babyyy!
        
        return function() {
            Log.debug(`Dispatch callback for Event ${actionType}`, "EVENT CALLBACK");
        
            let event = arguments[0];

            // Check the dispatch condition if supplied
            if (dispatchIf == null || dispatchIf(event)) {

                // stopProp
                if (stopPropagationIfDispatched) {
                    event.stopPropagation();
                }

                self.dispatch(new Action(actionType, event));
            }
        }
    }

    /**
     * Removes a handlers to the list of registered handlers.
     * Note: Removes by matching the class name of the supplied object or class defintiion
     * @param {ActionHandler} obj 
     */
    removeDispatchHandler(obj) {
        if (this.#registeredHandlers.findIndex(e => (e.handler.constructor.name == obj.constructor.name || e.handler.constructor.name == obj.routerName)) > -1) {
            this.#registeredHandlers = this.#registeredHandlers.filter(e => e != obj);
        }
    }
}