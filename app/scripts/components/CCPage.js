"use strict";

class CCPage extends CCBase {

    /**
     * Member attributes
     */

    #elements = {

    };

    #propertybag = {
        title: null,
        background: null,
        backgroundX: null,
        backgroundY: null,
        backgroundTransformer: null,
        nextPage: null,
        previousPage: null,
        transitionForward: null,
        transitionBack: null
    };

    static #htmlTemplate = `
        <div></div>
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
    get title() {
        return this.#propertybag.title;
    }

    set title(title) {
        this.#propertybag.title = title;
    }

    get nextPage() {
        return this.#propertybag.nextPage;
    }

    get previousPage() {
        return this.#propertybag.previousPage;
    }

    get transitionForward() {
        return this.#propertybag.transitionForward;
    }

    get transitionBack() {
        return this.#propertybag.transitionBack;
    }

    /**
     * Private Methods
     */
    #initialiseComponent() {

        let fragment = getDOMFragmentFromString(CCPage.#htmlTemplate);
        
        this.appendChild(fragment);

    }

    #initialiseAttributes() {

    }

    /**
     * Public Methods
     */

    render() {

    }

    background(background, pageX, pageY, transformerClass) {
        this.#propertybag.background = background;
        this.#propertybag.backgroundX = pageX;
        this.#propertybag.backgroundY = pageY;
        this.#propertybag.backgroundTransformer = transformerClass;
    }

    next(page, transitionForward, transitionBack) {

        if (page.constructor.name != "CCPage") {
            Log.error('Page is not of type CCPage', "COMPONENT");
            return;
        }

        if (transitionForward != null) {
            this.#propertybag.nextPage = page;
            this.#propertybag.transitionForward = transitionForward;
        }

        if (transitionBack != null) {
            page.previous(this, transitionBack)
        }
    }

    previous(page, transitionBack) {

        if (page.constructor.name != "CCPage") {
            Log.error('Page is not of type CCPage', "COMPONENT");
            return;
        }

        this.#propertybag.previousPage = page;
        this.#propertybag.transitionBack = transitionBack;
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