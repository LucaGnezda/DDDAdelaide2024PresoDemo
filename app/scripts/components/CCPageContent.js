"use strict";

class CCPageContent extends CCBase {

    /**
     * Member attributes
     */

    #elements = {
        pageRoot: null,
        pageTransformer: null,
        pagePrimary: null,
        pageOverlay: null,
    };

    #propertybag = {
        pagePrimary : {
            animationEnabled: null,
            animationSteps: null,
            currentAnimationStep: null,
        },
        pageOverlay: {
            animationEnabled: null,
            animationSteps: null,
            currentAnimationStep: null,
        },
        hasOverlay: false,
        overlayState: null,
    };

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
    hasForwardAnimationsRemaining(element = "pagePrimary") {
        return (
            this.#propertybag[element].animationEnabled 
            && this.#propertybag[element].animationSteps != null 
            && this.#propertybag[element].animationSteps.length - this.#propertybag[element].currentAnimationStep > 0
        );
    }

    hasBackAnimationsRemaining(element = "pagePrimary") {
        return (
            this.#propertybag[element].animationEnabled 
            && this.#propertybag[element].animationSteps != null 
            && this.#propertybag[element].currentAnimationStep > 0
        );
    }

    get hasOverlay() {
        return this.#propertybag.hasOverlay;
    }

    set overlayState(val) {
        this.#propertybag.overlayState = val;
    }

    get overlayState() {
        return this.#propertybag.overlayState;
    }
    
    /**
     * Private Methods
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

    #initialiseAttributes() {

    }

    #resetPositionalClasses(element = 'pageRoot') {
        this.#elements[element].classList.remove("EnterFromLeft", "EnterFromRight", "EnterFromTop", "EnterFromBottom");
        this.#elements[element].classList.remove("ExitToLeft", "ExitToRight", "ExitToTop", "ExitToBottom");
    }

    #resetTransformationalClasses() {
        this.#elements.pageTransformer.classList.remove("WithZoomInEntry", "WithZoomOutEntry", "WithZoomInExit", "WithZoomOutExit");
    }

    #resetFadingClasses(element = "pageRoot") {
        this.#elements[element].classList.remove("withFadeIn", "WithFadeOut");
    }

    #isValidAminationStructure(definition) {
        
        let s, step;
        let i, item;
        
        if (!(definition instanceof Array)) {
            return false;
        }
        for (s in definition) {
            step = definition[s];
            if (step.add != null) {
                if (!(step.add instanceof Array)) {
                    return false
                }
                for (i in step.add) {
                    item = step.add[i];
                    if (!(item instanceof Object)) {
                        return false
                    }
                    if (typeof item.key != "string") {
                        return false
                    }
                    if (!(item.classes instanceof Array)) {
                        return false
                    }
                }
                for (i in step.remove) {
                    item = step.remove[i];
                    if (!(item instanceof Object)) {
                        return false
                    }
                    if (typeof item.key != "string") {
                        return false
                    }
                    if (!(item.classes instanceof Array)) {
                        return false
                    }
                }
            }
        }
        return true;
    }

    #processAnimationStep(stepToAnimate, inReverse = false, elementToAnimate = 'pagePrimary') {
        let i, key, classArray, elements, e, element;

        for (i in stepToAnimate.add) {
            key = stepToAnimate.add[i].key;
            classArray = stepToAnimate.add[i].classes;
            elements = [...this.#elements[elementToAnimate].querySelectorAll(`[${key}]`)];
            for (e in elements) {
                element = elements[e];
                if (inReverse) {
                    element.classList.remove(...classArray);
                }
                else {
                    element.classList.add(...classArray);
                }
            }
        }

        for (i in stepToAnimate.remove) {
            key = stepToAnimate.remove[i].key;
            classArray = stepToAnimate.remove[i].classes;
            elements = [...this.#elements[elementToAnimate].querySelectorAll(`[${key}]`)];
            for (e in elements) {
                element = elements[e];
                if (inReverse) {
                    element.classList.add(...classArray);
                }
                else {
                    element.classList.remove(...classArray);
                }
            }
        }
    }


    /**
     * Public Methods
     */

    render() {
        // No dynamic rendering required.
    }

    setContents(source) {
        this.#confirmUXIsInitialised();
        this.#elements.pagePrimary.append(...source);
        this.hide('pageOverlay');
    }
    
    setOverlay(source) {
        this.#confirmUXIsInitialised();
        this.#elements.pageOverlay.append(...source);
        this.#propertybag.hasOverlay = true;
        this.hide('pageOverlay');
    }

    setAnimation(definition, element = "pagePrimary") {
        
        this.#confirmUXIsInitialised();
        
        if (!this.#isValidAminationStructure(definition)) {
            Log.warn(`${this.constructor.name}, was unable to set animation as the datastructure was non-conformant.`, "COMPONENT");
            return;
        }

        this.#propertybag[element].animationEnabled = (definition != null);
        this.#propertybag[element].animationSteps = definition;
        this.#propertybag[element].currentAnimationStep = 0;

    }

    resetAnimationInitial(element = "pagePrimary") {

        this.#confirmUXIsInitialised();

        if (this.#propertybag[element].animationSteps != null) {

            // note we're setting it to length NOT length - 1, because this signifies 'after the last animation'
            this.#propertybag[element].currentAnimationStep = this.#propertybag[element].animationSteps.length;

            for (let i = this.#propertybag[element].animationSteps.length - 1; i >= 0; i--) {
                this.stepAnimationBack(element);
            }
        }
    }

    resetAnimationFinal(element = "pagePrimary") {
        
        this.#confirmUXIsInitialised();

        if (this.#propertybag[element].animationSteps != null) {

            // note we're setting it to 0, because this signifies 'before the first animation'
            this.#propertybag[element].currentAnimationStep = 0;
            
            for (let i = 0; i < this.#propertybag[element].animationSteps.length; i++) {
                this.stepAnimationForward(element);
            }
        }
    }

    stepAnimationForward(element = "pagePrimary") {

        this.#confirmUXIsInitialised();
        
        if (this.#propertybag[element].animationSteps != null) {
            if (this.#propertybag[element].currentAnimationStep >= this.#propertybag[element].animationSteps.length) {
                // nothing left to animate
                return;
            }

            this.#processAnimationStep(this.#propertybag[element].animationSteps[this.#propertybag[element].currentAnimationStep], false, element);
            this.#propertybag[element].currentAnimationStep++;
        }
    }

    stepAnimationBack(element = "pagePrimary") {
        
        this.#confirmUXIsInitialised();
        
        if (this.#propertybag[element].animationSteps != null) {
            if (this.#propertybag[element].currentAnimationStep <= 0) {
                // nothing left to animate
                return;
            }

            this.#propertybag[element].currentAnimationStep--;
            this.#processAnimationStep(this.#propertybag[element].animationSteps[this.#propertybag[element].currentAnimationStep], true, element);
        }
        
    }

    disableAnimation(element = "pagePrimary") {
        this.#propertybag[element].animationEnabled = false;
    }

    enableAnimation(element = "pagePrimary") {
        this.#propertybag[element].animationEnabled = true;
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

        // Disable overlay transitions while the page itself is transitioning in.
        this.#elements.pagePrimary.style.transition = null;
        this.#elements.pageOverlay.style.transition = null;

    }

    usingOverlayTransition(primaryDuration, primaryTimingFunction, primaryDelay, overlayDuration, overlayTimingFunction, overlayDelay) {
        this.#confirmUXIsInitialised();

        if (typeof primaryDuration == "number") {
            primaryDuration = primaryDuration + "s";
        }

        if (typeof primaryDelay == "number") {
            primaryDelay = primaryDelay + "s";
        }

        if (overlayDuration == null) {
            overlayDuration = primaryDuration;
        } 
        else if (typeof overlayDuration == "number") {
            overlayDuration = overlayDuration + "s";
        }

        if (overlayDelay == null) {
            overlayDelay = primaryDelay;
        } 
        else if (typeof overlayDelay == "number") {
            overlayDelay = overlayDelay + "s";
        }
        
        this.#elements.pagePrimary.style.transitionDuration = primaryDuration;
        this.#elements.pagePrimary.style.transitionTimingFunction = primaryTimingFunction;
        this.#elements.pagePrimary.style.transitionDelay = primaryDelay;
        this.#elements.pageOverlay.style.transitionDuration = overlayDuration;
        this.#elements.pageOverlay.style.transitionTimingFunction = overlayTimingFunction;
        this.#elements.pageOverlay.style.transitionDelay = overlayDelay;
    }

    hide(element = 'pageRoot') {
        this.#confirmUXIsInitialised();
        this.#elements[element].classList.add("Hide");
    }

    show(element = 'pageRoot') {
        this.#confirmUXIsInitialised();
        this.#elements[element].classList.remove("Hide");
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

    withFadeIn(element = "pageRoot") {
        this.#confirmUXIsInitialised();
        this.#resetFadingClasses(element)
        this.#elements[element].classList.add("withFadeIn");
    }

    withoutFadeIn(element = "pageRoot") {
        this.#confirmUXIsInitialised();
        this.#resetFadingClasses(element)
    }

    withFadeOut(element = "pageRoot") {
        this.#confirmUXIsInitialised();
        this.#resetFadingClasses(element)
        this.#elements[element].classList.add("WithFadeOut");
    }

    withoutFadeOut(element = "pageRoot") {
        this.#confirmUXIsInitialised();
        this.#resetFadingClasses(element)
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

    enterTop(element = 'pageRoot') {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses(element);
        this.#elements[element].classList.add("EnterFromTop");
    }

    enterBottom(element = 'pageRoot') {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses(element);
        this.#elements[element].classList.add("EnterFromBottom");
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

    exitTop(element = 'pageRoot') {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses(element);
        this.#elements[element].classList.add("ExitToTop");
    }

    exitBottom(element = 'pageRoot') {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses(element);
        this.#elements[element].classList.add("ExitToBottom");
    }

    inPlace() {
        this.#confirmUXIsInitialised();
        this.#resetPositionalClasses();
    }
    
    fadeTo(element = "pageRoot", value) {
        this.#confirmUXIsInitialised();
        
        if (typeof value === 'number') {
            this.#elements[element].style.opacity = value + "%";
        } else {
            this.#elements[element].style.opacity = value;
        }
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