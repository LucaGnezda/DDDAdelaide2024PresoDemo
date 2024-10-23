/**
 * @class
 * @constructor
 * @public
 */
class CCPageContent extends CCBase {

    /**
     * Member attributes
     */
    
    /**
     * @typedef {('pagePrimary'|'pageOverlay'|'pageRoot'|'pageTransformer')} PageElement
     */
    
    /**
     * The elements that make up this component
     * @typedef {{[key in PageElement]:HTMLElement?}} PageElements
     */
         
    /**
     * @type {PageElements}
     */
    #elements = {
        pageRoot: null,
        pageTransformer: null,
        pagePrimary: null,
        pageOverlay: null,
    };
    
    /**
     * The properties of this component
     * @typedef {Object} propertybag
     * @property {Animations} animations
     * @property {boolean} hasOverlay
     * @property {OverlayState} overlayState
     */
    
    /**
     * @typedef {{[index: string]: AnimationProperty}} Animations
     */
    
    /**
     * An animation property for a page
     * @typedef {Object} AnimationProperty
     * @property {boolean} animationEnabled
     * @property {Array<AnimationDefinition>} animationSteps
     * @property {number} currentAnimationStep
     */
    
    /**
     * @type {propertybag}
     */
    #propertybag = {
        animations: {
            pagePrimary: {
                animationEnabled: false,
                animationSteps: [],
                currentAnimationStep: 0,
            },
            pageOverlay: {
                animationEnabled: false,
                animationSteps: [],
                currentAnimationStep: 0,
            },
        },
        hasOverlay: false,
        overlayState: 'closed',
    };

    /**
     * The html template for the component
     * @property {string} #htmlTemplate  
     */
    static #htmlTemplate = `
        <div class="CCPageRoot" data-page-root>
            <div class="CCPageTransformer" data-page-transformer>
                <div class="CCPagePrimary" data-page-primary></div>
                <div class="CCPageOverlay" data-page-overlay></div>
            </div>
        </div>
    `

    /**
     * Constructor
     * @constructs CCPageContent
     */
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

    /**
     * Checks whether the element has forward animations remaining
     * @param {PageElement} [element=pagePrimary] 
     * @returns {boolean} 
     */
    hasForwardAnimationsRemaining(element = "pagePrimary") {
        return (
            this.#propertybag.animations[element].animationEnabled 
            && this.#propertybag.animations[element].animationSteps != null 
            && this.#propertybag.animations[element].animationSteps.length - this.#propertybag.animations[element].currentAnimationStep > 0
        );
    }

    /**
     * Checks whether the element has backward animations remaining
     * @param {PageElement} [element=pagePrimary] 
     * @returns {boolean}
     */
    hasBackAnimationsRemaining(element = "pagePrimary") {
        return (
            this.#propertybag.animations[element].animationEnabled 
            && this.#propertybag.animations[element].animationSteps != null 
            && this.#propertybag.animations[element].currentAnimationStep > 0
        );
    }

    /**
     * Does this page have an overlay defined
     * @returns {boolean}
     */
    get hasOverlay() {
        return this.#propertybag.hasOverlay;
    }

    /**
     * @typedef {('open'|'closed')} OverlayState
     */
    
    /**
     * Sets the overlayState for this page
     * @param {OverlayState} val 
     */
    set overlayState(val) {
        this.#propertybag.overlayState = val;
    }

    /**
     * What is the overlayState for this page
     * @returns {OverlayState}
     */
    get overlayState() {
        return this.#propertybag.overlayState;
    }
    
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

            let fragment = getDOMFragmentFromString(CCPageContent.#htmlTemplate);

            this.#elements.pageRoot = fragment.querySelector('[data-page-root]');
            this.#elements.pageTransformer = fragment.querySelector('[data-page-transformer]');
            this.#elements.pagePrimary = fragment.querySelector('[data-page-primary]');
            this.#elements.pageOverlay = fragment.querySelector('[data-page-overlay]');

            this.appendChild(fragment);
        }
    }

    /**
     * Initialises the attributes for the pgae
     */
    #initialiseAttributes() { }

    /**
     * Resets the positional classes for the element
     * @param {PageElement} [element=pageRoot] 
     */
    #resetPositionalClasses(element = 'pageRoot') {
        this.#elements[element]?.classList.remove("EnterFromLeft", "EnterFromRight", "EnterFromTop", "EnterFromBottom");
        this.#elements[element]?.classList.remove("ExitToLeft", "ExitToRight", "ExitToTop", "ExitToBottom");
    }

    /**
     * Resets the transformational classes for the page
     */
    #resetTransformationalClasses() {
        if (this.#elements.pageTransformer)
            this.#elements.pageTransformer.classList.remove("WithZoomInEntry", "WithZoomOutEntry", "WithZoomInExit", "WithZoomOutExit");
    }
    
    /**
     * Resets the fading classes for the element
     * @param {PageElement} [element=pageRoot] 
     */
    #resetFadingClasses(element = "pageRoot") {
        if (this.#elements[element])
            this.#elements[element].classList.remove("withFadeIn", "WithFadeOut");
    }

    /**
     * Processes the given animation step for the given element in the given direction
     * @param {AnimationDefinition} stepToAnimate 
     * @param {boolean} [inReverse=false] 
     * @param {PageElement} [elementToAnimate=pagePrimary] 
     */
    #processAnimationStep(stepToAnimate, inReverse = false, elementToAnimate = 'pagePrimary') {
        stepToAnimate.add?.forEach((step) => {
            if (!this.#elements[elementToAnimate]) return;

            [...this.#elements[elementToAnimate].querySelectorAll(`[${step.key}]`)].forEach((element) => {
                if (inReverse) {
                    element.classList.remove(...step.classes);
                } else {
                    element.classList.add(...step.classes);
                }
            });
        });
        
        stepToAnimate.remove?.forEach((step) => {
            if (!this.#elements[elementToAnimate]) return;

            [...this.#elements[elementToAnimate].querySelectorAll(`[${step.key}]`)].forEach((element) => {
                if (inReverse) {
                    element.classList.add(...step.classes);
                } else {
                    element.classList.remove(...step.classes);
                }
            });
        });
    }


    /*
     * Public Methods
     */

    render() {
        // No dynamic rendering required.
    }

    /**
     * Sets the content source for the pages primary element
     * @param {Array<Node>} source 
     */
    setContents(source) {
        this.#confirmUXIsInitialised();
        if (this.#elements.pagePrimary) {
            this.#elements.pagePrimary.append(...source);
            this.hide('pageOverlay');
        }
    }
    
    /**
     * Sets the content source for the pages overlay element
     * @param {Array<Node>} source 
     */
    setOverlay(source) {
        this.#confirmUXIsInitialised();
        if (this.#elements.pageOverlay) {
            this.#elements.pageOverlay.append(...source);
            this.#propertybag.hasOverlay = true;
            this.hide('pageOverlay');
        }
    }

    /**
     * Sets the animation definition for the element
     * @param {Array<AnimationDefinition>} definition 
     * @param {PageElement} [element=pagePrimary]
     * @returns 
     */
    setAnimation(definition, element = "pagePrimary") {
        this.#confirmUXIsInitialised();

        this.#propertybag.animations[element].animationEnabled = (definition != null);
        this.#propertybag.animations[element].animationSteps = definition;
        this.#propertybag.animations[element].currentAnimationStep = 0;
    }

    /**
     * Resets the element's animation to its initial state
     * @param {PageElement} [element=pagePrimary] 
     */
    resetAnimationInitial(element = "pagePrimary") {

        this.#confirmUXIsInitialised();

        if (this.#propertybag.animations[element].animationSteps != null) {

            // note we're setting it to length NOT length - 1, because this signifies 'after the last animation'
            this.#propertybag.animations[element].currentAnimationStep = this.#propertybag.animations[element].animationSteps.length;

            for (let i = this.#propertybag.animations[element].animationSteps.length - 1; i >= 0; i--) {
                this.stepAnimationBack(element);
            }
        }
    }

    /**
     * Resets the element's animation to its final state 
     * @param {PageElement} [element=pagePrimary] 
     */
    resetAnimationFinal(element = "pagePrimary") {
        
        this.#confirmUXIsInitialised();

        if (this.#propertybag.animations[element].animationSteps != null) {

            // note we're setting it to 0, because this signifies 'before the first animation'
            this.#propertybag.animations[element].currentAnimationStep = 0;
            
            for (let i = 0; i < this.#propertybag.animations[element].animationSteps.length; i++) {
                this.stepAnimationForward(element);
            }
        }
    }

    /**
     * Steps the element's animation forward
     * @param {PageElement} [element=pagePrimary] 
     * @returns {void}
     */
    stepAnimationForward(element = "pagePrimary") {

        this.#confirmUXIsInitialised();
        
        if (this.#propertybag.animations[element].animationSteps != null) {
            if (this.#propertybag.animations[element].currentAnimationStep >= this.#propertybag.animations[element].animationSteps.length) {
                // nothing left to animate
                return;
            }

            this.#processAnimationStep(this.#propertybag.animations[element].animationSteps[this.#propertybag.animations[element].currentAnimationStep], false, element);
            this.#propertybag.animations[element].currentAnimationStep++;
        }
    }

    /**
     * Steps the element's animation backward
     * @param {PageElement} [element=pagePrimary] 
     * @returns {void}
     */
    stepAnimationBack(element = "pagePrimary") {
        
        this.#confirmUXIsInitialised();
        
        if (this.#propertybag.animations[element].animationSteps != null) {
            if (this.#propertybag.animations[element].currentAnimationStep <= 0) {
                // nothing left to animate
                return;
            }

            this.#propertybag.animations[element].currentAnimationStep--;
            this.#processAnimationStep(this.#propertybag.animations[element].animationSteps[this.#propertybag.animations[element].currentAnimationStep], true, element);
        }
        
    }

    /**
     * Disable animation for the element
     * @param {PageElement} [element=pagePrimary] 
     */
    disableAnimation(element = "pagePrimary") {
        this.#propertybag.animations[element].animationEnabled = false;
    }

    /**
     * Enables animation for the element
     * @param {PageElement} [element=pagePrimary] 
     */
    enableAnimation(element = "pagePrimary") {
        this.#propertybag.animations[element].animationEnabled = true;
    }

    /**
     * @typedef {'ease'|'ease-in'|'ease-out'|'ease-in-out'|'linear'|'step-start'|'step-end'} TimingFunction
     */

    /**
     * Sets the styling inforamiotn for transitions/animations for the base page elements
     * @param {number} duration 
     * @param {TimingFunction} timingFunction 
     * @param {number} delay 
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
        
        if (!this.#elements.pageTransformer || !this.#elements.pageRoot || !this.#elements.pagePrimary || !this.#elements.pageOverlay) return;
        
        this.#elements.pageTransformer.style.transitionDuration = sDuration;
        this.#elements.pageTransformer.style.transitionTimingFunction = timingFunction;
        this.#elements.pageTransformer.style.transitionDelay = sDelay;
        this.#elements.pageRoot.style.transitionDuration = sDuration;
        this.#elements.pageRoot.style.transitionTimingFunction = timingFunction;
        this.#elements.pageRoot.style.transitionDelay = sDelay;

        // Disable overlay transitions while the page itself is transitioning in.
        this.#elements.pagePrimary.style.transition = "";
        this.#elements.pageOverlay.style.transition = "";

    }

    /**
     * Sets the styling information for transitions/animations for the page content elements
     * @param {number} primaryDuration 
     * @param {TimingFunction} primaryTimingFunction 
     * @param {number} primaryDelay 
     * @param {number} overlayDuration 
     * @param {TimingFunction} overlayTimingFunction 
     * @param {number} overlayDelay 
     */
    usingOverlayTransition(primaryDuration, primaryTimingFunction, primaryDelay, overlayDuration, overlayTimingFunction, overlayDelay) {
        this.#confirmUXIsInitialised();
        
        let pdur = "", pdel = "", odur = "", odel = "";

        if (typeof primaryDuration == "number") {
            pdur = primaryDuration + "s";
        }

        if (typeof primaryDelay == "number") {
            pdel = primaryDelay + "s";
        }

        if (overlayDuration == null) {
            odur = pdur;
        } 
        else if (typeof overlayDuration == "number") {
            odur = overlayDuration + "s";
        }

        if (overlayDelay == null) {
            odel = pdel;
        } 
        else if (typeof overlayDelay == "number") {
            odel = overlayDelay + "s";
        }
        
        if (!this.#elements.pageOverlay || !this.#elements.pagePrimary) return;
        
        this.#elements.pagePrimary.style.transitionDuration = pdur;
        this.#elements.pagePrimary.style.transitionTimingFunction = primaryTimingFunction;
        this.#elements.pagePrimary.style.transitionDelay = pdel;
        this.#elements.pageOverlay.style.transitionDuration = odur;
        this.#elements.pageOverlay.style.transitionTimingFunction = overlayTimingFunction;
        this.#elements.pageOverlay.style.transitionDelay = odel;
    }

    /**
     * Hides the given element through CSS manipulation
     * @param {PageElement} [element=pageRoot]
     */
    hide(element = 'pageRoot') {
        this.#confirmUXIsInitialised();
        if (this.#elements[element])
            this.#elements[element].classList.add("Hide");
    }

    /**
     * Shows the given element through CSS manipulation
     * @param {PageElement} [element=pageRoot]
     */
    show(element = 'pageRoot') {
        this.#confirmUXIsInitialised();
        if (this.#elements[element])
            this.#elements[element].classList.remove("Hide");
    }

    /**
     * Sets the zoom in entry animation for given element through CSS manipulation
     */
    withZoomInEntry() {
        this.#confirmUXIsInitialised();
        this.#resetTransformationalClasses()
        if (this.#elements.pageTransformer)
            this.#elements.pageTransformer.classList.add("WithZoomInEntry");
    }

    /**
     * Sets the zoom out entry animation for given element through CSS manipulation
     */
    withZoomOutEntry() {
        this.#confirmUXIsInitialised();
        this.#resetTransformationalClasses()
        if (this.#elements.pageTransformer)
            this.#elements.pageTransformer.classList.add("WithZoomOutEntry");
    }

    /**
     * Sets the zoom in exit animation for given element through CSS manipulation
     */
    withZoomInExit() {
        this.#confirmUXIsInitialised();
        this.#resetTransformationalClasses()
        if (this.#elements.pageTransformer) {
            this.#elements.pageTransformer.classList.add("WithZoomInExit");
        }
    }

    /**
     * Sets the zoom out exit animation for given element through CSS manipulation
     */
    withZoomOutExit() {
        this.#confirmUXIsInitialised();
        this.#resetTransformationalClasses()
        if (this.#elements.pageTransformer)
            this.#elements.pageTransformer.classList.add("WithZoomOutExit");
    }

    /**
     * Resets the zoom animations removing them through CSS manipulation
     */
    withoutZoom() {
        this.#confirmUXIsInitialised();
        this.#resetTransformationalClasses()
    }

    /**
     * Sets the fade in animation for the element through CSS manipulation
     * @param {PageElement} [element=pageRoot] 
     */
    withFadeIn(element = "pageRoot") {
        this.#confirmUXIsInitialised();
        this.#resetFadingClasses(element)
        if (this.#elements[element])
            this.#elements[element].classList.add("withFadeIn");
    }

    /**
     * Sets no fade in animation for the element through CSS manipulation
     * @param {PageElement} [element=pageRoot] 
     */
    withoutFadeIn(element = "pageRoot") {
        this.#confirmUXIsInitialised();
        this.#resetFadingClasses(element)
    }

    /**
     * Sets the fade out animation for the element through CSS manipulation
     * @param {PageElement} [element=pageRoot] 
     */
    withFadeOut(element = "pageRoot") {
        this.#confirmUXIsInitialised();
        this.#resetFadingClasses(element)
        if (this.#elements[element])
            this.#elements[element].classList.add("WithFadeOut");
    }

    /**
     * Sets no fade out animation for the element through CSS manipulation
     * @param {PageElement} [element=pageRoot] 
     */
    withoutFadeOut(element = "pageRoot") {
        this.#confirmUXIsInitialised();
        this.#resetFadingClasses(element)
    }

    /**
     * Sets the enter left animation for the element through CSS manipulation
     */
    enterLeft() {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses();
        if (this.#elements.pageRoot)
            this.#elements.pageRoot.classList.add("EnterFromLeft");
    }

    /**
     * Sets the enter right animation for the element through CSS manipulation
     */
    enterRight() {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses();
        if (this.#elements.pageRoot)
            this.#elements.pageRoot.classList.add("EnterFromRight");
    }

    /**
     * Sets the enter top animation for the element through CSS manipulation
     * @param {PageElement} [element=pageRoot] 
     */
    enterTop(element = 'pageRoot') {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses(element);
        if (this.#elements[element])
            this.#elements[element].classList.add("EnterFromTop");
    }

    /**
     * Sets the enter bottom animation for the element through CSS manipulation
     * @param {PageElement} [element=pageRoot] 
     */
    enterBottom(element = 'pageRoot') {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses(element);
        if (this.#elements[element])
            this.#elements[element].classList.add("EnterFromBottom");
    }

    /**
     * Sets the exit left animation for the element through CSS manipulation
     */
    exitLeft() {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses();
        if (this.#elements.pageRoot)
            this.#elements.pageRoot.classList.add("ExitToLeft");
    }

    /**
     * Sets the exit right animation for the element through CSS manipulation
     */
    exitRight() {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses();
        if (this.#elements.pageRoot)
            this.#elements.pageRoot.classList.add("ExitToRight");
    }

    /**
     * Sets the exit top animation for the element through CSS manipulation
     * @param {PageElement} [element=pageRoot] 
     */
    exitTop(element = 'pageRoot') {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses(element);
        if (this.#elements[element])
            this.#elements[element].classList.add("ExitToTop");
    }

    /**
     * Sets the exit bottom animation for the element through CSS manipulation
     * @param {PageElement} [element=pageRoot] 
     */
    exitBottom(element = 'pageRoot') {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses(element);
        if (this.#elements[element])
            this.#elements[element].classList.add("ExitToBottom");
    }

    /**
     * Sets the in place animation for the element through CSS manipulation
     */
    inPlace() {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses();
    }
    
    /**
     * Sets the fade in animation for the element through CSS manipulation
     * @param {number|string} value the % opacity to fade the element to
     * @param {PageElement} [element=pageRoot] 
     */
    fadeTo(value, element = "pageRoot") {
        this.#confirmUXIsInitialised();

        if (this.#elements[element]){
            if (typeof value === 'number') {
                this.#elements[element].style.opacity = value + "%";
            } else {
                this.#elements[element].style.opacity = value;
            }
        }               
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