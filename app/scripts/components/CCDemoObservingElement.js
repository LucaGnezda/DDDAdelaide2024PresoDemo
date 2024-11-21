/**
 * @class
 * @public
 * @constructor
 */
class CCDemoObservingElement extends CCBase {
    /**
     * Definitions for internal elements
     * @typedef {('root'|'id'|'title')} DemoObservingElementElement
     */
    
    /**
     * The properties of this component
     * @typedef {Object} DemoObservingElementPropertybag
     * @property {number} count
     * @property {number} threshold
     * @property {string} color
     */
         
    /**
     * The elements that make up this component
     * @type {LimitedDictionary<DemoObservingElementElement, HTMLElement?>}
     */
    #elements = {
        root: null,
        id: null,
        title: null,
    }
    
    /**
     * @type {DemoObservingElementPropertybag}
     */
    #propertyBag = {
        count: 0,
        threshold: -1,
        color: 'aliceblue',
    }
    
    /**
     * The html template for the component
     * @property {string} #htmlTemplate  
     */
    static #htmlTemplate = `
        <div class="CCDemoObservingElement" data-element-root>
            <p data-element-title class="M Green">Observing</p>
            <div class="ObservingElementIdContainer">
                <p class="ObservingElementId" data-element-id></p>
            </div>
        </div>
    `

    constructor() {
        super();

        // allocate a guid
        if (this.id === "") {
            this.id = crypto.randomUUID();
        }
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
            let fragment = getDOMFragmentFromString(CCDemoObservingElement.#htmlTemplate);
            this.#elements.root = fragment.querySelector('[data-element-root]');
            this.#elements.id = fragment.querySelector('[data-element-id]');
            this.#elements.title = fragment.querySelector('[data-element-title]');
            this.appendChild(fragment);
        }
    }
    
    /**
     * Initialises the attributes for the pgae
     */
    #initialiseAttributes() {
        if (!this.hasAttribute("[data-input-threshold]")) {
            Log.warn("Input: 'threshold' not set, assuming intentional setting to 'null'.", "COMPONENT");
        }

        if (!this.hasAttribute("[data-input-color]")) {
            Log.warn("Input: 'color' not set, assuming intentional setting to 'null'.", "COMPONENT");
        }

        this.#propertyBag.threshold = parseInt(this.getAttribute("[data-input-threshold]") ?? '');
        this.#propertyBag.color = this.getAttribute("[data-input-color]") ?? this.#propertyBag.color;
    }
    
    /*
     * Public Methods
     */

    /**
     * Dynamically renders the component content
     * @returns {void}
     */
    render() {
        if (!this.#elements.root || !this.#elements.id || !this.#elements.title) {
            return;
        }
        
        this.#elements.id.innerText = `ID: ${this.#propertyBag.threshold.toString()}`;

        if (this.#propertyBag.count % this.#propertyBag.threshold == 0 && this.#propertyBag.count != 0 && CSS.supports('color', this.#propertyBag.color)) {
            this.#elements.root.style.backgroundColor = this.#propertyBag.color;
            this.#elements.root.style.borderColor = this.#propertyBag.color;
            this.#elements.title.style.color = 'white';
        } else {
            this.#elements.root.style.backgroundColor = "";
            this.#elements.root.style.borderColor = 'var(--colourBlue)'; // default
            this.#elements.title.style.color = 'var(--colourBlue)'; // default
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
        this.#propertyBag.count = event.newValue;
        this.render();
        Log.debug(`Data change callback on component ${event.originatingObject.constructor.name} with new value ${event.newValue}`, "COMPONENT");
    }
}