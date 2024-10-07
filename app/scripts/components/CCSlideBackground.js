"use strict";

class CCSlideBackground extends CCBase {

    /**
     * Member attributes
     */

    #elements = {
        backgroundRoot: null,
        backgroundModifier: null,
        backgroundContent: null
    };

    #propertybag = {
        backgroundColor: "#ffffff",
        backgroundImage: null,
        slidewith: 1,
        slideheight: 1,
    }

    static #htmlTemplate = `
        <div class="CCSlideBackgroundRoot" data-background-root>
            <div class="CCSlideBackgroundModifier" data-background-modifier>
                <div class="CCSlideBackgroundContent" data-background-content></div>
            </div>
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



    /**
     * Private Methods
     */
    #initialiseComponent() {

        let fragment = getDOMFragmentFromString(CCSlideBackground.#htmlTemplate);

        this.#elements.backgroundRoot = fragment.querySelector('[data-background-root]');
        this.#elements.backgroundModifier = fragment.querySelector('[data-background-modifier]');
        this.#elements.backgroundContent = fragment.querySelector('[data-background-content]');
        
        this.appendChild(fragment);

    }

    #initialiseAttributes() {

    }

    /**
     * Public Methods
     */

    setBackgroundContentClass(className) {
        this.#elements.backgroundContent.className = className;
    }

    setBackgroundSlidingRange(xPages, yPages) {
        this.#elements.backgroundContent.style.width = (xPages * 100).toString() + '%';
        this.#elements.backgroundContent.style.height = (yPages * 100).toString() + '%';
        this.#elements.backgroundContent.style.left = '-0%';
        this.#elements.backgroundContent.style.top = '-0%';
    }

    slideTo(pageX, pageY) {
        this.#elements.backgroundContent.style.left = (-pageX * 100).toString() + '%';
        this.#elements.backgroundContent.style.top = (-pageY * 100).toString() + '%';
    }

    transitionIn() {
        this.#elements.backgroundRoot.className = "CCSlideBackgroundRoot";
    }

    transitionOut(className) {
        this.#elements.backgroundRoot.classList.add(className);
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