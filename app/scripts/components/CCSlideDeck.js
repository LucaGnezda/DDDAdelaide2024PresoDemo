"use strict";

class CCSlideDeck extends CCBase {

    /**
     * Member attributes
     */

    #elements = {
        backgrounds: null,
        contentLayers: null
    };

    #backgrounds = {};

    static #htmlTemplate = `
        <div class="CCSlideDeckRoot">
            <div class="CCSlideDeckBackgrounds" data-backgrounds-container></div>
            <div class="CCSlideDeckContentLayers" data-content-layer-container></div>
        </div>
    `

    /**
     * Constructor
     */
    constructor() {
        super();

        // Allocate a guid
        if (isEmptyOrNull(this.id)) {
            this.id = crypto.randomUUID();
        }
    }


    /**
     * Standard Component Methods
     */
    static get observedAttributes() {
        return [];
    }


    /**
     * Getters & Setters
     */
    get backgrounds() {
        return this.#backgrounds;
    }


    /**
     * Private Methods
     */
    #initialiseComponent() {

        let fragment = getDOMFragmentFromString(CCSlideDeck.#htmlTemplate);

        this.#elements.backgrounds = fragment.querySelector('[data-backgrounds-container]');
        this.#elements.contentLayers = fragment.querySelector('[data-content-layer-container]');
        
        this.appendChild(fragment);

    }

    #initialiseAttributes() {

    }

    /**
     * Public Methods
     */
    newSlideBackground(id) {

        let component = document.createElement("cc-slidebackground");
        this.#backgrounds[id] = component;
        this.#elements.backgrounds.appendChild(component);

        return this.#backgrounds[id];

    }

    newSlideContentLayer(id) {

    }

    show() {

    }

    hide() {
    
    }

    render() {

    }

     /**
     * Callbacks
     */
     connectedCallback() {

        this.#initialiseComponent();
        this.#initialiseAttributes();
        this.render();
        Log.debug(`${this.constructor.name} connected to DOM`, "COMPONENT");

    }
    
    disconnectedCallback() {
        Log.debug(`${this.constructor.name} disconnected from DOM`, "COMPONENT");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
        Log.debug(`${this.constructor.name}, value ${name} changed from ${oldValue} to ${newValue}`, "COMPONENT");
    }
}