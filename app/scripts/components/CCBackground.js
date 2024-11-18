/**
 * @class
 * @public
 * @constructor
 */
class CCBackground extends CCBase {
    /**
     * Definitions for internal elements
     * @typedef {('backgroundRoot'|'backgroundTransformer'|'backgroundContent')} BackgroundElement
     */

    /**
     * The properties of this component
     * @typedef {Object} BackgroundPropertybag
     * @property {BackgroundAnimationProperty} animation
     */

    /**
     * The elements that make up this component
     * @type {LimitedDictionary<BackgroundElement, HTMLElement?>}
     */
    #elements = {
        backgroundRoot: null,
        backgroundTransformer: null,
        backgroundContent: null
    };

    /**
     * @type {BackgroundPropertybag}
     */
    #propertybag = {
        animation: {
            animationEnabled: false,
            animationSteps: [],
            currentAnimationStep: 0,
        }
    }

    /**
     * The html template for the component
     * @property {string} #htmlTemplate
     */
    static #htmlTemplate = `
        <div class="CCBackgroundRoot" data-background-root>
            <div class="CCBackgroundTransformer" data-background-transformer>
                <div class="CCBackgroundContent" data-background-content></div>
            </div>
        </div>
    `

    constructor() {
        super();

        // Allocate a guid
        if (this.id === "") {
            this.id = crypto.randomUUID();
        }
    }

    /*
     * Standard Component Methods
     */

    /**
     * Gets all attributes observed by the property
     * @return {Array<any>} A list of attributes
     */
    static get observedAttributes() {
        return [];
    }

    /*
     * Getters & Setters
     */

    /*
     * Private Methods
     */

    /**
     * Checks whether the UI is initialised, if not
     * the named elements are pulled from the htmlTemplate and
     * inserted into the page elements.
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

    /**
     * Initialises the attributes for the pgae
     */
    #initialiseAttributes() { }

    /**
     * Resets the positional classes for the element
     */
    #resetPositionalClasses() {
        this.#elements.backgroundRoot?.classList.remove("EnterFromLeft", "EnterFromRight", "EnterFromTop", "EnterFromBottom");
        this.#elements.backgroundRoot?.classList.remove("ExitToLeft", "ExitToRight", "ExitToTop", "ExitToBottom");
    }

    /**
     * Resets the transformational classes for the page
     */
    #resetTransformationalClasses() {
        this.#elements.backgroundTransformer?.classList.remove("WithZoomInEntry", "WithZoomOutEntry", "WithZoomInExit", "WithZoomOutExit");
    }

    /**
     * Resets the fading classes for the element
     */
    #resetFadingClasses() {
        this.#elements.backgroundRoot?.classList.remove("WithFadeIn", "WithFadeOut");
    }

    /**
     * Processes the given animation step for the given element in the given direction
     * @param {BackgroundAnimationDefinition} stepToAnimate
     * @param {boolean} [inReverse=false]
     */
    #processAnimationStep(stepToAnimate, inReverse = false) {
        stepToAnimate.add?.forEach((step) => {
            if (!this.#elements) return;

            if (inReverse) {
                this.#elements.backgroundTransformer?.classList.remove(...step.classes);
            } else {
                this.#elements.backgroundTransformer?.classList.add(...step.classes);
            }
        });

        stepToAnimate.remove?.forEach((step) => {
            if (!this.#elements) return;

            if (inReverse) {
                this.#elements.backgroundTransformer?.classList.add(...step.classes);
            } else {
                this.#elements.backgroundTransformer?.classList.remove(...step.classes);
            }
        });
    }

    /*
     * Public Methods
     */

    /**
     * Dynamically renders the component content
     * @returns {void}
     */
    render() {
        // no dynamic re-rendering required.
    }

    /**
     * Sets the classname on the backgroundContent
     * @param {string} className
     * @returns {void}
     */
    setContentClass(className) {
        this.#confirmUXIsInitialised();
        if (this.#elements.backgroundContent) {
            this.#elements.backgroundContent.className = className;
        }
    }

    /**
     * Sets the content position range for the background content element
     * @param {number} xPages
     * @param {number} yPages
     * @returns {void}
     */
    setContentPositionRange(xPages, yPages) {
        this.#confirmUXIsInitialised();
        if (this.#elements.backgroundContent) {
            this.#elements.backgroundContent.style.width = (xPages * 100).toString() + '%';
            this.#elements.backgroundContent.style.height = (yPages * 100).toString() + '%';
            this.#elements.backgroundContent.style.left = '-0%';
            this.#elements.backgroundContent.style.top = '-0%';
        }
    }

    /**
     * Sets the animation definition for the element
     * @param {Array<BackgroundAnimationDefinition>} definition
     * @returns {void}
     */
    setAnimation(definition) {
        this.#confirmUXIsInitialised();

        this.#propertybag.animation.animationEnabled = (definition != null);
        this.#propertybag.animation.animationSteps = definition;
        this.#propertybag.animation.currentAnimationStep = 0;
    }

    /**
     * Resets the element's animation to its initial state
     * @param {PageContentElement} [element=pagePrimary]
     * @returns {void}
     */
    resetAnimationInitial(element = "pagePrimary") {
        this.#confirmUXIsInitialised();

        if (this.#propertybag.animation.animationSteps != null) {
            // note we're setting it to length NOT length - 1, because this signifies 'after the last animation'
            this.#propertybag.animation.currentAnimationStep = this.#propertybag.animation.animationSteps.length;

            for (let i = this.#propertybag.animation.animationSteps.length - 1; i >= 0; i--) {
                this.stepAnimationBack();
            }
        }
    }

    /**
     * Resets the element's animation to its final state
     * @returns {void}
     */
    resetAnimationFinal() {
        this.#confirmUXIsInitialised();

        if (this.#propertybag.animation.animationSteps != null) {

            // note we're setting it to 0, because this signifies 'before the first animation'
            this.#propertybag.animation.currentAnimationStep = 0;

            for (let i = 0; i < this.#propertybag.animation.animationSteps.length; i++) {
                this.stepAnimationForward();
            }
        }
    }

    /**
     * Steps the element's animation forward
     * @returns {void}
     */
    stepAnimationForward() {
        this.#confirmUXIsInitialised();

        if (this.#propertybag.animation.animationSteps != null) {
            if (this.#propertybag.animation.currentAnimationStep >= this.#propertybag.animation.animationSteps.length) {
                // nothing left to animate
                return;
            }

            this.#processAnimationStep(this.#propertybag.animation.animationSteps[this.#propertybag.animation.currentAnimationStep], false);
            this.#propertybag.animation.currentAnimationStep++;
        }
    }

    /**
     * Steps the element's animation backward
     * @returns {void}
     */
    stepAnimationBack() {
        this.#confirmUXIsInitialised();

        if (this.#propertybag.animation.animationSteps != null) {
            if (this.#propertybag.animation.currentAnimationStep <= 0) {
                // nothing left to animate
                return;
            }

            this.#propertybag.animation.currentAnimationStep--;
            this.#processAnimationStep(this.#propertybag.animation.animationSteps[this.#propertybag.animation.currentAnimationStep], true);
        }

    }

    /**
     * Disable animation for the element
     * @returns {void}
     */
    disableAnimation() {
        this.#propertybag.animation.animationEnabled = false;
    }

    /**
     *
     * @param {number} pageX
     * @param {number} pageY
     * @returns {void}
     */
    usingContentPosition(pageX, pageY) {
        this.#confirmUXIsInitialised();
        if (this.#elements.backgroundContent) {
            this.#elements.backgroundContent.style.left = (-pageX * 100).toString() + '%';
            this.#elements.backgroundContent.style.top = (-pageY * 100).toString() + '%';
        }
    }

    /**
     * Set the root element position
     * @param {number} left
     * @param {number} top
     * @returns {void}
     */
    usingRootPosition(left, top) {
        this.#confirmUXIsInitialised();
        if (this.#elements.backgroundRoot) {
            this.#elements.backgroundRoot.style.left = left.toString();
            this.#elements.backgroundRoot.style.top = top.toString();
        }
    }

    /**
     * Sets the transformation class for the background
     * @param {string?} cssClass
     * @returns {void}
     */
    usingTransformationClass(cssClass) {
        this.#confirmUXIsInitialised();
        if (this.#elements.backgroundTransformer) {
            this.#elements.backgroundTransformer.className = "CCBackgroundTransformer";
            if (cssClass != null) {
                this.#elements.backgroundTransformer.classList.add(cssClass);
            }
        }
    }

    /**
     * Sets the styling inforamiotn for transitions/animations for the base page elements
     * @param {number} duration
     * @param {TimingFunction} timingFunction
     * @param {number} delay
     * @returns {void}
     */
    usingTransition(duration, timingFunction, delay) {
        this.#confirmUXIsInitialised();

        let sDuration = "", sDelay = ""

        if (typeof duration == "number") {
            sDuration = duration + "s";
        }

        if (typeof delay == "number") {
            sDelay = delay + "s";
        }

        if (!this.#elements.backgroundTransformer || !this.#elements.backgroundRoot || !this.#elements.backgroundContent) return;

        this.#elements.backgroundContent.style.transitionDuration = sDuration;
        this.#elements.backgroundContent.style.transitionTimingFunction = timingFunction;
        this.#elements.backgroundContent.style.transitionDelay = sDelay;
        this.#elements.backgroundTransformer.style.transitionDuration = sDuration;
        this.#elements.backgroundTransformer.style.transitionTimingFunction = timingFunction;
        this.#elements.backgroundTransformer.style.transitionDelay = sDelay;
        this.#elements.backgroundRoot.style.transitionDuration = sDuration;
        this.#elements.backgroundRoot.style.transitionTimingFunction = timingFunction;
        this.#elements.backgroundRoot.style.transitionDelay = sDelay;
    }

    /**
     * Hides the given element through CSS manipulation
     * @returns {void}
     */
    hide() {
        this.#confirmUXIsInitialised();
        this.#elements.backgroundRoot?.classList.add("Hide");
    }

    /**
     * Shows the given element through CSS manipulation
     * @returns {void}
     */
    show() {
        this.#confirmUXIsInitialised();
        this.#elements.backgroundRoot?.classList.remove("Hide");
    }

    /**
     * Sets the zoom in entry animation for given element through CSS manipulation
     * @returns {void}
     */
    withZoomInEntry() {
        this.#confirmUXIsInitialised();
        this.#resetTransformationalClasses()
        this.#elements.backgroundTransformer?.classList.add("WithZoomInEntry");
    }

    /**
     * Sets the zoom out entry animation for given element through CSS manipulation
     * @returns {void}
     */
    withZoomOutEntry() {
        this.#confirmUXIsInitialised();
        this.#resetTransformationalClasses()
        this.#elements.backgroundTransformer?.classList.add("WithZoomOutEntry");
    }

    /**
     * Sets the zoom in exit animation for given element through CSS manipulation
     * @returns {void}
     */
    withZoomInExit() {
        this.#confirmUXIsInitialised();
        this.#resetTransformationalClasses()
        this.#elements.backgroundTransformer?.classList.add("WithZoomInExit");
    }

    /**
     * Sets the zoom out exit animation for given element through CSS manipulation
     * @returns {void}
     */
    withZoomOutExit() {
        this.#confirmUXIsInitialised();
        this.#resetTransformationalClasses()
        this.#elements.backgroundTransformer?.classList.add("WithZoomOutExit");
    }

    /**
     * Resets the zoom animations removing them through CSS manipulation
     * @returns {void}
     */
    withoutZoom() {
        this.#confirmUXIsInitialised();
        this.#resetTransformationalClasses()
    }

    /**
     * Sets the fade in animation for the element through CSS manipulation
     * @returns {void}
     */
    withFadeIn() {
        this.#confirmUXIsInitialised();
        this.#resetFadingClasses()
        this.#elements.backgroundRoot?.classList.add("WithFadeIn");
    }

    /**
     * Sets no fade in animation for the element through CSS manipulation
     * @returns {void}
     */
    withoutFadeIn() {
        this.#confirmUXIsInitialised();
        this.#resetFadingClasses()
    }

    /**
     * Sets the fade out animation for the element through CSS manipulation
     * @returns {void}
     */
    withFadeOut() {
        this.#confirmUXIsInitialised();
        this.#resetFadingClasses()
        this.#elements.backgroundRoot?.classList.add("WithFadeOut");
    }

    /**
     * Sets no fade out animation for the element through CSS manipulation
     * @returns {void}
     */
    withoutFadeOut() {
        this.#confirmUXIsInitialised();
        this.#resetFadingClasses()
    }

    /**
     * Sets the enter left animation for the element through CSS manipulation
     * @returns {void}
     */
    enterLeft() {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses();
        this.#elements.backgroundRoot?.classList.add("EnterFromLeft");
    }

    /**
     * Sets the enter right animation for the element through CSS manipulation
     * @returns {void}
     */
    enterRight() {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses();
        this.#elements.backgroundRoot?.classList.add("EnterFromRight");
    }

    /**
     * Sets the enter top animation for the element through CSS manipulation
     * @returns {void}
     */
    enterTop() {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses();
        this.#elements.backgroundRoot?.classList.add("EnterFromTop");
    }

    /**
     * Sets the enter bottom animation for the element through CSS manipulation
     * @returns {void}
     */
    enterBottom() {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses();
        this.#elements.backgroundRoot?.classList.add("EnterFromBottom");
    }

    /**
     * Sets the exit left animation for the element through CSS manipulation
     * @returns {void}
     */
    exitLeft() {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses();
        this.#elements.backgroundRoot?.classList.add("ExitToLeft");
    }

    /**
     * Sets the exit right animation for the element through CSS manipulation
     * @returns {void}
     */
    exitRight() {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses();
        this.#elements.backgroundRoot?.classList.add("ExitToRight");
    }

    /**
     * Sets the exit top animation for the element through CSS manipulation
     * @returns {void}
     */
    exitTop() {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses();
        this.#elements.backgroundRoot?.classList.add("ExitToTop");
    }

    /**
     * Sets the exit bottom animation for the element through CSS manipulation
     * @returns {void}
     */
    exitBottom() {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses();
        this.#elements.backgroundRoot?.classList.add("ExitToBottom");
    }

    /**
     * Sets the in place animation for the element through CSS manipulation
     */
    inPlace() {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses();
    }

    /*
    * Callbacks
    */

    /**
     * Callback called when the component is connected to the DOM
     */
    connectedCallback() {
        this.#confirmUXIsInitialised();
        this.#initialiseAttributes();
        this.render();
        Log.debug(`${this.constructor.name} connected to DOM`, "COMPONENT");
    }

    /**
     * Callback called when the component is disconnected from the DOM
     */
    disconnectedCallback() {
        Log.debug(`${this.constructor.name} disconnected from DOM`, "COMPONENT");
    }

    /**
     * Callback called when component attributes change
     * @param {string} name
     * @param {*} oldValue
     * @param {*} newValue
     */
    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
        Log.debug(`${this.constructor.name}, value ${name} changed from ${oldValue} to ${newValue}`, "COMPONENT");
    }
}
