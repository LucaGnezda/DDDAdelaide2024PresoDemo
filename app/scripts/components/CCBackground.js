"use strict";

class CCBackground extends CCBase {

    /**
     * Member attributes
     */

    #elements = {
        backgroundRoot: null,
        backgroundTransformer: null,
        backgroundContent: null
    };

    #propertybag = {
        backgroundColor: "#ffffff",
        backgroundImage: null,
        slidewith: 1,
        slideheight: 1,
        defaultTransitionDuration: 1
    }

    static #htmlTemplate = `
        <div class="CCBackgroundRoot" data-background-root>
            <div class="CCBackgroundTransformer" data-background-transformer>
                <div class="CCBackgroundContent" data-background-content></div>
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
    #confirmUXIsInitialised() {

        if (this.children.length == 0) {

            let fragment = getDOMFragmentFromString(CCBackground.#htmlTemplate);

            this.#elements.backgroundRoot = fragment.querySelector('[data-background-root]');
            this.#elements.backgroundTransformer = fragment.querySelector('[data-background-transformer]');
            this.#elements.backgroundContent = fragment.querySelector('[data-background-content]');
            
            this.appendChild(fragment);

        }

    }

    #initialiseAttributes() {

    }

    #resetPositionalClasses() {
        this.#elements.backgroundRoot.classList.remove("EnterFromLeft", "EnterFromRight", "EnterFromTop", "EnterFromBottom");
        this.#elements.backgroundRoot.classList.remove("ExitToLeft", "ExitToRight", "ExitToTop", "ExitToBottom");
    }

    #resetTransformationalClasses() {
        this.#elements.backgroundTransformer.classList.remove("WithZoomInEntry", "WithZoomOutEntry", "WithZoomInExit", "WithZoomOutExit");
    }

    #resetFadingClasses() {
        this.#elements.backgroundRoot.classList.remove("withFadeIn", "WithFadeOut");
    }

    /**
     * Public Methods
     */
    contentClass(className) {
        this.#confirmUXIsInitialised();
        this.#elements.backgroundContent.className = className;
    }

    contentPositionRange(xPages, yPages) {
        this.#confirmUXIsInitialised();
        this.#elements.backgroundContent.style.width = (xPages * 100).toString() + '%';
        this.#elements.backgroundContent.style.height = (yPages * 100).toString() + '%';
        this.#elements.backgroundContent.style.left = '-0%';
        this.#elements.backgroundContent.style.top = '-0%';
    }

    contentPosition(pageX, pageY) {
        this.#confirmUXIsInitialised();
        this.#elements.backgroundContent.style.left = (-pageX * 100).toString() + '%';
        this.#elements.backgroundContent.style.top = (-pageY * 100).toString() + '%';
    }

    rootPosition(left, top) {
        this.#confirmUXIsInitialised();
        this.#elements.backgroundRoot.style.left = left;
        this.#elements.backgroundRoot.style.top = top;
    }

    transformationClass(cssClass) {
        this.#confirmUXIsInitialised();
        this.#elements.backgroundTransformer.className = "CCBackgroundTransformer";
        if (cssClass != null) {
            this.#elements.backgroundTransformer.classList.add(cssClass);
        }
    }

    transitionStyle(style) {
        this.#confirmUXIsInitialised();
        this.#elements.backgroundContent.style.transition = style;
        this.#elements.backgroundTransformer.style.transition = style;
        this.#elements.backgroundRoot.style.transition = style;
        this.#elements.backgroundRoot.style.transitionBehavior = "allow-discrete";
        this.#propertybag.defaultTransitionDuration = this.#elements.backgroundRoot.style.transitionDuration;
    }

    transitionDuration(sec) {
        this.#confirmUXIsInitialised();
        if (sec == null) {
            sec = this.#propertybag.defaultTransitionDuration;
        }
        
        if (typeof sec == "number") {
            sec = sec + "s";
        }
        this.#elements.backgroundContent.style.transitionDuration = sec;
        this.#elements.backgroundTransformer.style.transitionDuration = sec;
        this.#elements.backgroundRoot.style.transitionDuration = sec;
    }

    hide() {
        this.#confirmUXIsInitialised();
        this.#elements.backgroundRoot.classList.add("Hide");
    }

    show() {
        this.#confirmUXIsInitialised();
        this.#elements.backgroundRoot.classList.remove("Hide");
    }

    withZoomInEntry() {
        this.#confirmUXIsInitialised();
        this.#resetTransformationalClasses()
        this.#elements.backgroundTransformer.classList.add("WithZoomInEntry");
    }

    withZoomOutEntry() {
        this.#confirmUXIsInitialised();
        this.#resetTransformationalClasses()
        this.#elements.backgroundTransformer.classList.add("WithZoomOutEntry");
    }

    withZoomInExit() {
        this.#confirmUXIsInitialised();
        this.#resetTransformationalClasses()
        this.#elements.backgroundTransformer.classList.add("WithZoomInExit");
    }

    withZoomOutExit() {
        this.#confirmUXIsInitialised();
        this.#resetTransformationalClasses()
        this.#elements.backgroundTransformer.classList.add("WithZoomOutExit");
    }

    withoutZoom() {
        this.#confirmUXIsInitialised();
        this.#resetTransformationalClasses()
    }

    withFadeIn() {
        this.#confirmUXIsInitialised();
        this.#resetFadingClasses()
        this.#elements.backgroundRoot.classList.add("withFadeIn");
    }

    withoutFadeIn() {
        this.#confirmUXIsInitialised();
        this.#resetFadingClasses()
    }

    withFadeOut() {
        this.#confirmUXIsInitialised();
        this.#resetFadingClasses()
        this.#elements.backgroundRoot.classList.add("WithFadeOut");
    }

    withoutFadeOut() {
        this.#confirmUXIsInitialised();
        this.#resetFadingClasses()
    }

    enterLeft() {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses();
        this.#elements.backgroundRoot.classList.add("EnterFromLeft");
    }

    enterRight() {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses();
        this.#elements.backgroundRoot.classList.add("EnterFromRight");
    }

    enterTop() {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses();
        this.#elements.backgroundRoot.classList.add("EnterFromTop");
    }

    enterBottom() {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses();
        this.#elements.backgroundRoot.classList.add("EnterFromBottom");
    }

    exitLeft() {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses();
        this.#elements.backgroundRoot.classList.add("ExitToLeft");
    }

    exitRight() {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses();
        this.#elements.backgroundRoot.classList.add("ExitToRight");
    }

    exitTop() {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses();
        this.#elements.backgroundRoot.classList.add("ExitToTop");
    }

    exitBottom() {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses();
        this.#elements.backgroundRoot.classList.add("ExitToBottom");
    }

    inPlace() {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses();
    }

    render() {
        // no dynamic re-rendering required.
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