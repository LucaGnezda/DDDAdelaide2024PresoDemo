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
    }

    static #htmlTemplate = `
        <div class="CCSlideBackgroundRoot" data-background-root>
            <div class="CCSlideBackgroundTransformer" data-background-transformer>
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

        let fragment = getDOMFragmentFromString(CCBackground.#htmlTemplate);

        this.#elements.backgroundRoot = fragment.querySelector('[data-background-root]');
        this.#elements.backgroundTransformer = fragment.querySelector('[data-background-transformer]');
        this.#elements.backgroundContent = fragment.querySelector('[data-background-content]');
        
        this.appendChild(fragment);

    }

    #initialiseAttributes() {

    }

    /**
     * Public Methods
     */

    contentClass(className) {
        this.#elements.backgroundContent.className = className;
    }

    positionRange(xPages, yPages) {
        this.#elements.backgroundContent.style.width = (xPages * 100).toString() + '%';
        this.#elements.backgroundContent.style.height = (yPages * 100).toString() + '%';
        this.#elements.backgroundContent.style.left = '-0%';
        this.#elements.backgroundContent.style.top = '-0%';
    }

    position(pageX, pageY) {
        this.#elements.backgroundContent.style.left = (-pageX * 100).toString() + '%';
        this.#elements.backgroundContent.style.top = (-pageY * 100).toString() + '%';
    }

    transformationClass(cssClass) {
        this.#elements.backgroundTransformer.className = "CCBackgroundTransformerDefault";
        if (cssClass != null) {
            this.#elements.backgroundTransformer.classList.add(cssClass);
        }
    }

    transitionStyle(style) {
        this.#elements.backgroundContent.style.transition = style;
        this.#elements.backgroundTransformer.style.transition = style;
        this.#elements.backgroundRoot.style.transition = style;
    }

    transitionDuration(sec) {
        if (typeof sec == "number") {
            sec = sec + "s";
        }
        this.#elements.backgroundContent.style.transitionDuration = sec;
        this.#elements.backgroundTransformer.style.transitionDuration = sec;
        this.#elements.backgroundRoot.style.transitionDuration = sec;
    }

    hide() {
        this.#elements.backgroundRoot.classList.add("Hide");
    }

    show() {
        this.#elements.backgroundRoot.classList.remove("Hide");
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