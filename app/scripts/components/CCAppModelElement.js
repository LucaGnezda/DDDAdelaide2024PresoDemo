/**
 * @class
 * @public
 * @constructor
 */
class CCAppModelElement extends CCObservableBase {
    /**
     * Definitions for internal elements
     * @typedef {('root'|'title'|'unknown'|'known'|'knownIcon')} AppModelElementElement
     */
         
    /**
     * The elements that make up this component
     * @type {LimitedDictionary<AppModelElementElement, HTMLElement?>}
     */
    #elements = {
        root: null,
        title: null,
        unknown: null,
        known: null,
        knownIcon: null
    };

    /**
     * The html template for the component
     * @property {string} #htmlTemplate  
     */
    static #htmlTemplate = `
        <div class="CCAppModelElementRoot" data-element-root>
            <div class="CCAppModelElementTitle" data-element-title></div>
            <div class="CCAppModelElementIconcontainer" data-element-unknown>
                <img src="./app/assets/clouds.svg" class="CCAppModelElementIcon Grey" data-element-unknownicon>
            </div>
            <div class="CCAppModelElementIconcontainer" data-element-known>
                <img src="./app/assets/clouds.svg" class="CCAppModelElementIcon Green" data-element-knownicon>
            </div>
        </div>
    `

    constructor() {
        // construct the core object. Note, order of operation matters here as you can't call 'this' before 'super'
        let state = new ObservableCore();
        super(state);

        state.originatingObject = this;
        state.addSubscriber(this, this.dataChangedCallback);

        // Allocate a guid
        if (this.id === "") {
            this.id = crypto.randomUUID();
        }

        // Initialise the observables data structure that the object will need to operate 
        this.observableData.title = null;
        this.observableData.isUnlocked = null;
        this.observableData.knownIconSrc = null;

    }

    /*
     * Standard Component Methods
     */
    static get observedAttributes() {
        return [];
    }

    /*
     * Getters & Setters
     */
    get title() {
        return this.observableData.title;
    }

    set title(s) {
        this.observableData.title = s;
    }

    get knownIconSrc() {
        return this.observableData.knownIconSrc;
    }

    set knownIconSrc(s) {
        this.observableData.knownIconSrc = s;
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
            let fragment = getDOMFragmentFromString(CCAppModelElement.#htmlTemplate);

            this.#elements.root = fragment.querySelector('[data-element-root]');
            this.#elements.title = fragment.querySelector('[data-element-title]');
            this.#elements.unknown = fragment.querySelector('[data-element-unknown]');
            this.#elements.known = fragment.querySelector('[data-element-known]');
            this.#elements.knownIcon = fragment.querySelector('[data-element-knownicon]');
            
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
        // Title
        if (this.#elements.title) {
            if (this.observableData.title != null) {
                this.#elements.title.innerText = this.observableData.title;
            }
            else {
                this.#elements.title.innerText = "Unnamed";
            } 
        }

        // KnownIconSrc
        if (this.#elements.knownIcon && this.#elements.knownIcon instanceof HTMLImageElement) {
            if (this.observableData.knownIconSrc != null) {
                this.#elements.knownIcon.src = this.observableData.knownIconSrc;
            }
            else {
                this.#elements.knownIcon.src = "./app/assets/clouds.svg";
            }
        }
        
        // Is Unlocked
        if (this.#elements.known && this.#elements.unknown) {
            if (this.observableData.isUnlocked) {
                this.#elements.known.classList.remove("Hide");
                this.#elements.unknown.classList.add("Hide");
            }
            else {
                this.#elements.known.classList.add("Hide");
                this.#elements.unknown.classList.remove("Hide");
            }
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
     * Callback for attribute changed events
     * @param {string} name 
     * @param {*} oldValue 
     * @param {*} newValue 
     */
    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
        Log.debug(`${this.constructor.name}, value ${name} changed from ${oldValue} to ${newValue}`, "COMPONENT");
    }

    /**
     * Callback for observable data changed events
     * @param {ObservableDataEvent} event 
     */
    dataChangedCallback(event) {
        this.render();
        Log.debug(`Data change callback on component ${event.originatingObject.constructor.name} with id:${event.originatingObject.id} updated property ${event.path} from ${event.oldValue} to ${event.newValue}`, "COMPONENT");
    }
}