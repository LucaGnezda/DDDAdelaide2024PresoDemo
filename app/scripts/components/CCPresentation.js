"use strict";

class CCPresentation extends CCBase {

    /**
     * Member attributes
     */

    #elements = {
        backgroundsContainer: null,
        pagesContainer: null
    };

    #propertybag = {
        navigationCallback: null,
        activePage: null
    };

    #backgrounds = {};

    #pages = {};

    static #htmlTemplate = `
        <div class="CCPresentationRoot">
            <div class="CCPresentationBackgroundsContainer" data-backgrounds-container></div>
            <div class="CCPresentationPagesContainer" data-pages-container></div>
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

    get pages() {
        return this.#pages;
    }

    get activePage() {
        return this.#propertybag.activePage;
    }

    set activePage(page) {
        this.#propertybag.activePage = page;
    }


    /**
     * Private Methods
     */
    #initialiseComponent() {

        let fragment = getDOMFragmentFromString(CCPresentation.#htmlTemplate);

        this.#elements.backgroundsContainer = fragment.querySelector('[data-backgrounds-container]');
        this.#elements.pagesContainer = fragment.querySelector('[data-pages-container]');
        
        this.appendChild(fragment);

        document.body.addEventListener("keydown", this.keydownCallback.bind(this));
        document.body.addEventListener("click", this.clickCallback.bind(this));

    }

    #initialiseAttributes() {

    }

    /**
     * Public Methods
     */
    newBackground(id) {

        if (this.#elements.backgroundsContainer.hasOwnProperty("id")) {
            Log.error("A background with this name already exists, unable to add", "COMPONENT");
            return null;
        }

        let component = document.createElement("cc-background");
        component.id = id;
        this.#backgrounds[id] = component;
        this.#elements.backgroundsContainer.appendChild(component);

        return component;

    }

    newPage(id, background, pageX, pageY, transformerClass) {

        if (this.#elements.pagesContainer.hasOwnProperty("id")) {
            Log.error("A page with this name already exists, unable to add", "COMPONENT");
            return null;
        }

        let component = document.createElement("cc-page");
        component.id = id;
        component.background(background, pageX, pageY, transformerClass);
        this.#pages[id] = component;
        this.#elements.pagesContainer.appendChild(component);

        return component;

    }

    show() {

    }

    hide() {
    
    }

    render() {

    }

    attachNavigationCallback(callback) {

        if (callback != null && typeof callback === "function") {
            this.#propertybag.navigationCallback = callback;
        }
        else {
            this.#propertybag.navigationCallback = null;
        }

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

    keydownCallback(keyEvent) {

        Log.debug(`${this.constructor.name} captured keydown event`, "COMPONENT");

        if (this.#propertybag.navigationCallback != null) {

            if (keyEvent.key == "ArrowRight" && this.activePage.nextPage != null) {

                let event = {};
                event.originatingObject = this;
                event.originatingEvent = keyEvent;
                event.transitionFromPage = this.activePage;
                event.transitionToPage = this.activePage.nextPage;
                event.usingTransition = this.activePage.transitionForward;

                this.#propertybag.navigationCallback(event);

            }
            else if (keyEvent.key == "ArrowLeft" && this.activePage.previousPage != null) {

                let event = {};
                event.originatingObject = this;
                event.originatingEvent = keyEvent;
                event.transitionFromPage = this.activePage;
                event.transitionToPage = this.activePage.previousPage;
                event.usingTransition = this.activePage.transitionBackward;

                this.#propertybag.navigationCallback(event);

            }
        }
    }

    clickCallback(clickEvent) {

        Log.debug(`${this.constructor.name} captured click event`, "COMPONENT");

        if (this.#propertybag.navigationCallback != null) {

            if (this.activePage.nextPage != null) {

                let event = {};
                event.originatingObject = this;
                event.originatingEvent = clickEvent;
                event.transitionFromPage = this.activePage;
                event.transitionToPage = this.activePage.nextPage;
                event.usingTransition = this.activePage.transitionForward;

                this.#propertybag.navigationCallback(event);

            }
        }
    }
}