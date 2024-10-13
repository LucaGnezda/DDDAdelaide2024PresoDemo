"use strict";

class CCPage extends CCBase {

    /**
     * Member attributes
     */

    #elements = {
        pageRoot: null,
        pageTransformer: null
    };

    #propertybag = {
        backgroundId: null,
        backgroundX: null,
        backgroundY: null,
        backgroundTransformer: null,
        nextPage: null,
        previousPage: null,
        transitionForward: null,
        transitionForwardDuration: null,
        transitionBack: null,
        transitionBackDuration: null,
    };

    static #htmlTemplate = `
        <div class="CCPageRoot" data-page-root>
            <div class="CCPageTransformer" data-page-transformer></div>
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
    #confirmUXIsInitialised() {

        if (this.children.length == 0) {

            let fragment = getDOMFragmentFromString(CCPage.#htmlTemplate);

            this.#elements.pageRoot = fragment.querySelector('[data-page-root]');
            this.#elements.pageTransformer = fragment.querySelector('[data-page-transformer]');

            this.appendChild(fragment);

        }
    }

    #initialiseAttributes() {

    }

    #resetPositionalClasses() {
        this.#elements.pageRoot.classList.remove("EnterFromLeft", "EnterFromRight", "EnterFromTop", "EnterFromBottom");
        this.#elements.pageRoot.classList.remove("ExitToLeft", "ExitToRight", "ExitToTop", "ExitToBottom");
    }

    #resetTransformationalClasses() {
        this.#elements.pageTransformer.classList.remove("WithZoomInEntry", "WithZoomOutEntry", "WithZoomInExit", "WithZoomOutExit");
    }

    #resetFadingClasses() {
        this.#elements.pageRoot.classList.remove("withFadeIn", "WithFadeOut");
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

        this.#confirmUXIsInitialised();
        this.#elements.pageTransformer.append(...source);

    }

    usingTransition(duration, timingFunction, delay) {

        this.#confirmUXIsInitialised();

        if (typeof duration == "number") {
            duration = duration + "s";
        }

        if (typeof delay == "number") {
            delay = delay + "s";
        }
        
        this.#elements.pageTransformer.style.transitionDuration = duration;
        this.#elements.pageTransformer.style.transitionTimingFunction = timingFunction;
        this.#elements.pageTransformer.style.transitionDelay = delay;
        this.#elements.pageRoot.style.transitionDuration = duration;
        this.#elements.pageRoot.style.transitionTimingFunction = timingFunction;
        this.#elements.pageRoot.style.transitionDelay = delay;

    }

    hide() {
        this.#confirmUXIsInitialised();
        this.#elements.pageRoot.classList.add("Hide");
    }

    show() {
        this.#confirmUXIsInitialised();
        this.#elements.pageRoot.classList.remove("Hide");
    }

    withZoomInEntry() {
        this.#confirmUXIsInitialised();
        this.#resetTransformationalClasses()
        this.#elements.pageTransformer.classList.add("WithZoomInEntry");
    }

    withZoomOutEntry() {
        this.#confirmUXIsInitialised();
        this.#resetTransformationalClasses()
        this.#elements.pageTransformer.classList.add("WithZoomOutEntry");
    }

    withZoomInExit() {
        this.#confirmUXIsInitialised();
        this.#resetTransformationalClasses()
        this.#elements.pageTransformer.classList.add("WithZoomInExit");
    }

    withZoomOutExit() {
        this.#confirmUXIsInitialised();
        this.#resetTransformationalClasses()
        this.#elements.pageTransformer.classList.add("WithZoomOutExit");
    }

    withoutZoom() {
        this.#confirmUXIsInitialised();
        this.#resetTransformationalClasses()
    }

    withFadeIn() {
        this.#confirmUXIsInitialised();
        this.#resetFadingClasses()
        this.#elements.pageRoot.classList.add("withFadeIn");
    }

    withoutFadeIn() {
        this.#confirmUXIsInitialised();
        this.#resetFadingClasses()
    }

    withFadeOut() {
        this.#confirmUXIsInitialised();
        this.#resetFadingClasses()
        this.#elements.pageRoot.classList.add("WithFadeOut");
    }

    withoutFadeOut() {
        this.#confirmUXIsInitialised();
        this.#resetFadingClasses()
    }

    enterLeft() {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses();
        this.#elements.pageRoot.classList.add("EnterFromLeft");
    }

    enterRight() {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses();
        this.#elements.pageRoot.classList.add("EnterFromRight");
    }

    enterTop() {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses();
        this.#elements.pageRoot.classList.add("EnterFromTop");
    }

    enterBottom() {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses();
        this.#elements.pageRoot.classList.add("EnterFromBottom");
    }

    exitLeft() {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses();
        this.#elements.pageRoot.classList.add("ExitToLeft");
    }

    exitRight() {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses();
        this.#elements.pageRoot.classList.add("ExitToRight");
    }

    exitTop() {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses();
        this.#elements.pageRoot.classList.add("ExitToTop");
    }

    exitBottom() {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses();
        this.#elements.pageRoot.classList.add("ExitToBottom");
    }

    inPlace() {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses();
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

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
        Log.debug(`${this.constructor.name}, value ${name} changed from ${oldValue} to ${newValue}`, "COMPONENT");
    }
}