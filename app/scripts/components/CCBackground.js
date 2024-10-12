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
            <div class="CCBackgroundTransformerDefault" data-background-transformer>
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
    #ConfirmUXIsInitialised() {

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

    /**
     * Public Methods
     */
    contentClass(className) {
        this.#ConfirmUXIsInitialised();
        this.#elements.backgroundContent.className = className;
    }

    contentPositionRange(xPages, yPages) {
        this.#ConfirmUXIsInitialised();
        this.#elements.backgroundContent.style.width = (xPages * 100).toString() + '%';
        this.#elements.backgroundContent.style.height = (yPages * 100).toString() + '%';
        this.#elements.backgroundContent.style.left = '-0%';
        this.#elements.backgroundContent.style.top = '-0%';
    }

    contentPosition(pageX, pageY) {
        this.#ConfirmUXIsInitialised();
        this.#elements.backgroundContent.style.left = (-pageX * 100).toString() + '%';
        this.#elements.backgroundContent.style.top = (-pageY * 100).toString() + '%';
    }

    rootPosition(left, top) {
        this.#ConfirmUXIsInitialised();
        this.#elements.backgroundRoot.style.left = left;
        this.#elements.backgroundRoot.style.top = top;
    }

    transformationClass(cssClass) {
        this.#ConfirmUXIsInitialised();
        this.#elements.backgroundTransformer.className = "CCBackgroundTransformerDefault";
        if (cssClass != null) {
            this.#elements.backgroundTransformer.classList.add(cssClass);
        }
    }

    transitionStyle(style) {
        this.#ConfirmUXIsInitialised();
        this.#elements.backgroundContent.style.transition = style;
        this.#elements.backgroundTransformer.style.transition = style;
        this.#elements.backgroundRoot.style.transition = style;
        this.#elements.backgroundRoot.style.transitionBehavior = "allow-discrete";
        this.#propertybag.defaultTransitionDuration = this.#elements.backgroundRoot.style.transitionDuration;
    }

    transitionDuration(sec) {
        this.#ConfirmUXIsInitialised();
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
        this.#ConfirmUXIsInitialised();
        this.#elements.backgroundRoot.classList.add("Hide");
    }

    show() {
        this.#ConfirmUXIsInitialised();
        this.#elements.backgroundRoot.classList.remove("Hide");
    }

    withfadeIn() {
        this.#ConfirmUXIsInitialised();
        this.#elements.backgroundRoot.classList.add("WithFadeIn");
        this.#elements.backgroundRoot.classList.remove("WithFadeOut");
    }

    withoutfadeIn() {
        this.#ConfirmUXIsInitialised();
        this.#elements.backgroundRoot.classList.remove("WithFadeIn");
        this.#elements.backgroundRoot.classList.remove("WithFadeOut");
    }

    withfadeOut() {
        this.#ConfirmUXIsInitialised();
        this.#elements.backgroundRoot.classList.remove("WithFadeIn");
        this.#elements.backgroundRoot.classList.add("WithFadeOut");
    }

    withoutfadeOut() {
        this.#ConfirmUXIsInitialised();
        this.#elements.backgroundRoot.classList.remove("WithFadeIn");
        this.#elements.backgroundRoot.classList.remove("WithFadeOut");
    }

    enterLeft() {
        this.#ConfirmUXIsInitialised();
        this.#elements.backgroundRoot.classList.add("EnterFromLeft");
        this.#elements.backgroundRoot.classList.remove("EnterFromRight");
        this.#elements.backgroundRoot.classList.remove("EnterFromTop");
        this.#elements.backgroundRoot.classList.remove("EnterFromBottom");
        this.#elements.backgroundRoot.classList.remove("ExitToLeft");
        this.#elements.backgroundRoot.classList.remove("ExitToRight");
        this.#elements.backgroundRoot.classList.remove("ExitToTop");
        this.#elements.backgroundRoot.classList.remove("ExitToBottom");
    }

    enterRight() {
        this.#ConfirmUXIsInitialised();
        this.#elements.backgroundRoot.classList.remove("EnterFromLeft");
        this.#elements.backgroundRoot.classList.add("EnterFromRight");
        this.#elements.backgroundRoot.classList.remove("EnterFromTop");
        this.#elements.backgroundRoot.classList.remove("EnterFromBottom");
        this.#elements.backgroundRoot.classList.remove("ExitToLeft");
        this.#elements.backgroundRoot.classList.remove("ExitToRight");
        this.#elements.backgroundRoot.classList.remove("ExitToTop");
        this.#elements.backgroundRoot.classList.remove("ExitToBottom");
    }

    enterTop() {
        this.#ConfirmUXIsInitialised();
        this.#elements.backgroundRoot.classList.remove("EnterFromLeft");
        this.#elements.backgroundRoot.classList.remove("EnterFromRight");
        this.#elements.backgroundRoot.classList.add("EnterFromTop");
        this.#elements.backgroundRoot.classList.remove("EnterFromBottom");
        this.#elements.backgroundRoot.classList.remove("ExitToLeft");
        this.#elements.backgroundRoot.classList.remove("ExitToRight");
        this.#elements.backgroundRoot.classList.remove("ExitToTop");
        this.#elements.backgroundRoot.classList.remove("ExitToBottom");
    }

    enterBottom() {
        this.#ConfirmUXIsInitialised();
        this.#elements.backgroundRoot.classList.remove("EnterFromLeft");
        this.#elements.backgroundRoot.classList.remove("EnterFromRight");
        this.#elements.backgroundRoot.classList.remove("EnterFromTop");
        this.#elements.backgroundRoot.classList.add("EnterFromBottom");
        this.#elements.backgroundRoot.classList.remove("ExitToLeft");
        this.#elements.backgroundRoot.classList.remove("ExitToRight");
        this.#elements.backgroundRoot.classList.remove("ExitToTop");
        this.#elements.backgroundRoot.classList.remove("ExitToBottom");
    }

    exitLeft() {
        this.#ConfirmUXIsInitialised();
        this.#elements.backgroundRoot.classList.remove("EnterFromLeft");
        this.#elements.backgroundRoot.classList.remove("EnterFromRight");
        this.#elements.backgroundRoot.classList.remove("EnterFromTop");
        this.#elements.backgroundRoot.classList.remove("EnterFromBottom");
        this.#elements.backgroundRoot.classList.add("ExitToLeft");
        this.#elements.backgroundRoot.classList.remove("ExitToRight");
        this.#elements.backgroundRoot.classList.remove("ExitToTop");
        this.#elements.backgroundRoot.classList.remove("ExitToBottom");
    }

    exitRight() {
        this.#ConfirmUXIsInitialised();
        this.#elements.backgroundRoot.classList.remove("EnterFromLeft");
        this.#elements.backgroundRoot.classList.remove("EnterFromRight");
        this.#elements.backgroundRoot.classList.remove("EnterFromTop");
        this.#elements.backgroundRoot.classList.remove("EnterFromBottom");
        this.#elements.backgroundRoot.classList.remove("ExitToLeft");
        this.#elements.backgroundRoot.classList.add("ExitToRight");
        this.#elements.backgroundRoot.classList.remove("ExitToTop");
        this.#elements.backgroundRoot.classList.remove("ExitToBottom");
    }

    exitTop() {
        this.#ConfirmUXIsInitialised();
        this.#elements.backgroundRoot.classList.remove("EnterFromLeft");
        this.#elements.backgroundRoot.classList.remove("EnterFromRight");
        this.#elements.backgroundRoot.classList.remove("EnterFromTop");
        this.#elements.backgroundRoot.classList.remove("EnterFromBottom");
        this.#elements.backgroundRoot.classList.remove("ExitToLeft");
        this.#elements.backgroundRoot.classList.remove("ExitToRight");
        this.#elements.backgroundRoot.classList.add("ExitToTop");
        this.#elements.backgroundRoot.classList.remove("ExitToBottom");
    }

    exitBottom() {
        this.#ConfirmUXIsInitialised();
        this.#elements.backgroundRoot.classList.remove("EnterFromLeft");
        this.#elements.backgroundRoot.classList.remove("EnterFromRight");
        this.#elements.backgroundRoot.classList.remove("EnterFromTop");
        this.#elements.backgroundRoot.classList.remove("EnterFromBottom");
        this.#elements.backgroundRoot.classList.remove("ExitToLeft");
        this.#elements.backgroundRoot.classList.remove("ExitToRight");
        this.#elements.backgroundRoot.classList.remove("ExitToTop");
        this.#elements.backgroundRoot.classList.add("ExitToBottom");
    }

    inPlace() {
        this.#ConfirmUXIsInitialised();
        this.#elements.backgroundRoot.classList.remove("EnterFromLeft");
        this.#elements.backgroundRoot.classList.remove("EnterFromRight");
        this.#elements.backgroundRoot.classList.remove("EnterFromTop");
        this.#elements.backgroundRoot.classList.remove("EnterFromBottom");
        this.#elements.backgroundRoot.classList.remove("ExitToLeft");
        this.#elements.backgroundRoot.classList.remove("ExitToRight");
        this.#elements.backgroundRoot.classList.remove("ExitToTop");
        this.#elements.backgroundRoot.classList.remove("ExitToBottom");
    }

    render() {
        // no dynamic re-rendering required.
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