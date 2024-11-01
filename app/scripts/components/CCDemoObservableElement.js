/**
 * @class
 * @public
 * @constructor
 */
class CCDemoObservableElement extends CCObservableBase {
    /**
     * Definitions for internal elements
     * @typedef {('root'|'updateButton'|'resetButton'|'count')} DemoObservableElementElement
     */

    /**
     * The properties of this component
     * @typedef {Object} DemoObservableElementPropertybag
     * @property {Function?} updateCallback
     * @property {Function?} resetCallback
     */
         
    /**
     * The elements that make up this component
     * @type {LimitedDictionary<DemoObservableElementElement, HTMLElement?>}
     */
    #elements = {
        root: null,
        updateButton: null,
        resetButton: null,
        count: null,
    }
     
    /**
     * @type {DemoObservableElementPropertybag}
     */
    #propertybag = {
        updateCallback: null,
        resetCallback: null,
    }
    
    /**
     * The html template for the component
     * @property {string} #htmlTemplate  
     */
    static #htmlTemplate = `
        <div class="CCDemoObservableElement" data-element-root> 
            <div data-element-button-update id="DemoUpdateButton" class="PresentationButton Filled Show">Update</div>
            <div data-element-button-reset id="DemoResetButton" class="PresentationButton Filled Show">Reset</div>
            <li data-element-count></li>
        </div>
    `

    constructor() {
        // construct the object, need to call `super` before you can use `this` 
        let state = new ObservableCore();
        super(state);

        state.originatingObject = this;
        state.addSubscriber(this, this.dataChangedCallback);

        // allocate a guid
        if (this.id === "") {
            this.id = crypto.randomUUID();
        }

        // initialise the observables data structure
        this.observableData.clickCount = 0;
    }
    
    /*
     * Getters and Setters
     */
    
    /**
     * @param {Function} fn 
     */
    set resetCallback(fn) {
        this.#elements.resetButton?.addEventListener("click", this.resetButtonClick.bind(this), true);
        this.#propertybag.resetCallback = fn;
    }
    
    /**
     * @param {Function} fn 
     */
    set updateCallback(fn) {
        this.#elements.updateButton?.addEventListener("click", this.updateButtonClick.bind(this), true);
        this.#propertybag.updateCallback = fn;
    }
    
    /*
     * Private Methods
     */

    /**
     * Checks whether the UI is initialised, if not
     * the named elements are pulled from the htmlTemplate and
     * inserted into the page elements.
     */
    #confirmUXIsInitialised() {

        if (this.children.length == 0) {

            let fragment = getDOMFragmentFromString(CCDemoObservableElement.#htmlTemplate);

            this.#elements.root = fragment.querySelector('[data-element-root]');
            this.#elements.updateButton = fragment.querySelector('[data-element-button-update]');
            this.#elements.resetButton = fragment.querySelector('[data-element-button-reset]');
            this.#elements.count = fragment.querySelector('[data-element-count]');
            
            this.appendChild(fragment);
            
        }
    }
    
    /**
     * Initialises the attributes for the pgae
     */
    #initialiseAttributes() { }
    
    /*
     * Public Methods
     */

    /**
     * Dynamically renders the component content
     * @returns {void}
     */
    render() {
        if (this.#elements.count) {
            this.#elements.count.innerText = this.observableData.clickCount;
        }
    }
    
    /*
    * Callbacks
    */

    /**
     * Callback called when the component is connected to the DOM
     */
    connectedCallback() {
        this.#confirmUXIsInitialised();
        this.#initialiseAttributes();

        this.notificationStatus = NotificationStatus.Active;

        this.render();
        Log.debug(`${this.constructor.name} connected to DOM`, "COMPONENT");
    }
    
    /**
     * Callback called when the component is disconnected from the DOM
     */
    disconnectedCallback() {
        Log.debug(`${this.constructor.name} disconnected from DOM`, "COMPONENT");
    }

    /**
     * Callback for observable data changed events
     * @param {ObservableDataEvent} event
     */
    dataChangedCallback(event) {
        this.render();
        Log.debug(`Data change callback on component ${event.originatingObject.constructor.name} with id:${event.originatingObject.id} updated property ${event.path} from ${event.oldValue} to ${event.newValue}`, "COMPONENT");
    }
    
    /**
     * Callback for update button click event
     */
    updateButtonClick() {
        this.observableData.clickCount += 1;
        if (this.#propertybag.updateCallback) {
            this.#propertybag.updateCallback();
        } else {
            Log.fatal("No update callback has been registered", "", this)
        }
    }
    
    /**
     * Callback for reset button click event
     */
    resetButtonClick() {
        this.observableData.clickCount = 0;
        if (this.#propertybag.resetCallback) {
            this.#propertybag.resetCallback();           
        } else {
            Log.fatal("No update callback has been registered", "", this)
        }
    }
}