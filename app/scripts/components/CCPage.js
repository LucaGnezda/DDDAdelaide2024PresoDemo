"use strict";

class CCPage extends CCBase {

    /**
     * Member attributes
     */

    #elements = {
        pageRoot: null
    };

    #propertybag = {
        title: null,
        backgroundId: null,
        backgroundX: null,
        backgroundY: null,
        backgroundTransformer: null,
        nextPage: null,
        previousPage: null,
        transitionForward: null,
        transitionForwardDuration: null,
        transitionBack: null,
        transitionBackDuration: null
    };

    static #htmlTemplate = `
        <div class="CCPageRoot" data-page-root></div>
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

    get transitionForwardDuration() {
        return this.#propertybag.transitionForwardDuration;
    }

    get transitionBackDuration() {
        return this.#propertybag.transitionBackDuration;
    } 

    get backgroundId() {
        return this.#propertybag.backgroundId;
    }

    get backgroundX() {
        return this.#propertybag.backgroundX;
    }

    get backgroundY() {
        return this.#propertybag.backgroundY
    }
    
    get backgroundTransformer() {
        return this.#propertybag.background;
    }

    /**
     * Private Methods
     */
    #ConfirmUXIsInitialised() {

        if (this.children.length == 0) {

            let fragment = getDOMFragmentFromString(CCPage.#htmlTemplate);

            this.#elements.pageRoot = fragment.querySelector('[data-page-root]');

            this.appendChild(fragment);

        }
    }

    #initialiseAttributes() {

    }

    /**
     * Public Methods
     */

    render() {

    }

    background(backgroundId, pageX, pageY, transformerClass) {
        this.#propertybag.backgroundId = backgroundId;
        this.#propertybag.backgroundX = pageX;
        this.#propertybag.backgroundY = pageY;
        this.#propertybag.backgroundTransformer = transformerClass;
    }

    next(page, transitionForward, transitionBack, duration) {

        if (page.constructor.name != "CCPage") {
            Log.error('Page is not of type CCPage', "COMPONENT");
            return;
        }

        if (transitionForward != null) {
            this.#propertybag.nextPage = page;
            this.#propertybag.transitionForward = transitionForward;
            this.#propertybag.transitionForwardDuration = duration;
        }

        if (transitionBack != null) {
            page.previous(this, transitionBack, duration)
        }
    }

    previous(page, transitionBack, duration) {

        if (page.constructor.name != "CCPage") {
            Log.error('Page is not of type CCPage', "COMPONENT");
            return;
        }

        this.#propertybag.previousPage = page;
        this.#propertybag.transitionBack = transitionBack;
        this.#propertybag.transitionBackDuration = duration;
    }

    setContents(source) {

        this.#ConfirmUXIsInitialised();
        this.#elements.pageRoot.append(...source);

    }

     /**
     * Callbacks
     */
     connectedCallback() {

        this.#ConfirmUXIsInitialised();
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