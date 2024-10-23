// @ts-nocheck

"use strict"

class CCDemoObservingElement extends CCBase {
    #elements = {
        root: null,
    }
    
    #propertyBag = {
        count: 0,
        threshold: null,
        color: null,
    }
    
    static #htmlTemplate = `
        <div class="CCDemoObservingElement" data-element-root> </div>
    `

    constructor() {
        super();

        // allocate a guid
        if (this.id === "") {
            this.id = crypto.randomUUID();
        }
    }
    
    /**
     * Private Methods
     */
    #confirmUXIsInitialised() {
        if (this.children.length == 0) {
            let fragment = getDOMFragmentFromString(CCDemoObservingElement.#htmlTemplate);
            this.#elements.root = fragment.querySelector('[data-element-root]');
            this.appendChild(fragment);
        }
    }
    
    #initialiseAttributes() {
        if (!this.hasAttribute("[data-input-threshold]")) {
            Log.warn("Input: 'threshold' not set, assuming intentional setting to 'null'.", "COMPONENT");
        }

        if (!this.hasAttribute("[data-input-color]")) {
            Log.warn("Input: 'color' not set, assuming intentional setting to 'null'.", "COMPONENT");
        }

        this.#propertyBag.threshold = this.getAttribute("[data-input-threshold]");
        this.#propertyBag.color = this.getAttribute("[data-input-color]");
    }
    
    /**
     * Public Methods
     */
    render() {
        if (this.#propertyBag.count % this.#propertyBag.threshold == 0 && this.#propertyBag.count != 0) {
            this.#elements.root.style.backgroundColor = this.#propertyBag.color;
        } else {
            this.#elements.root.style.backgroundColor = null;
        }
    }
    
    /**
    * Callbacks
    */
    connectedCallback() {
        this.#confirmUXIsInitialised();
        this.#initialiseAttributes();

        this.render();
        Log.debug(`${this.constructor.name} connected to DOM`, "COMPONENT");
    }
    
    disconnectedCallback() {
        Log.debug(`${this.constructor.name} disconnected from DOM`, "COMPONENT");
    }

    dataChangedCallback(event) {
        this.#propertyBag.count = event.newValue;
        this.render();
        Log.debug(`Data change callback on component ${event.originatingObject.constructor.name} with new value ${event.newValue}`, "COMPONENT");
    }
}