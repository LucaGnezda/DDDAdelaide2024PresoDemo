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
        animationSteps: null,
        currentAnimationStep: null,
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

    get hasForwardAnimationsRemaining() {
        return (this.#propertybag.animationSteps != null && this.#propertybag.animationSteps.length - this.#propertybag.currentAnimationStep > 0);
    }

    get hasBackAnimationsRemaining() {
        return (this.#propertybag.animationSteps != null && this.#propertybag.currentAnimationStep > 0);
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

    #processAnimationStep(stepToAnimate, inReverse = false) {
        let i, key, classArray, elements, e, element;

        for (i in stepToAnimate.add) {
            key = stepToAnimate.add[i].key;
            classArray = stepToAnimate.add[i].classes;
            elements = [...this.#elements.pageTransformer.querySelectorAll(`[${key}]`)];
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
            elements = [...this.#elements.pageTransformer.querySelectorAll(`[${key}]`)];
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

    setAnimation(definition) {
        
        this.#confirmUXIsInitialised();
        
        if (!this.#isValidAminationStructure(definition)) {
            Log.warn(`${this.constructor.name}, was unable to set animation as the datastructure was non-conformant.`, "COMPONENT");
            return;
        }

        this.#propertybag.animationSteps = definition;
        this.#propertybag.currentAnimationStep = 0;

    }

    resetAnimationInitial() {

        this.#confirmUXIsInitialised();

        if (this.#propertybag.animationSteps != null) {

            // note we're setting it to length NOT length - 1, because this signifies 'after the last animation'
            this.#propertybag.currentAnimationStep = this.#propertybag.animationSteps.length;

            for (let i = this.#propertybag.animationSteps.length - 1; i >= 0; i--) {
                this.stepAnimationBack();
            }
        }
    }

    resetAnimationFinal() {
        
        this.#confirmUXIsInitialised();

        if (this.#propertybag.animationSteps != null) {

            // note we're setting it to 0, because this signifies 'before the first animation'
            this.#propertybag.currentAnimationStep = 0;
            
            for (let i = 0; i < this.#propertybag.animationSteps.length; i++) {
                this.stepAnimationForward();
            }
        }
    }

    stepAnimationForward() {

        this.#confirmUXIsInitialised();
        
        if (this.#propertybag.animationSteps != null) {
            if (this.#propertybag.currentAnimationStep >= this.#propertybag.animationSteps.length) {
                // nothing left to animate
                return;
            }

            this.#processAnimationStep(this.#propertybag.animationSteps[this.#propertybag.currentAnimationStep]);
            this.#propertybag.currentAnimationStep++;
        }
    }

    stepAnimationBack() {
        
        this.#confirmUXIsInitialised();
        
        if (this.#propertybag.animationSteps != null) {
            if (this.#propertybag.currentAnimationStep <= 0) {
                // nothing left to animate
                return;
            }

            this.#propertybag.currentAnimationStep--;
            this.#processAnimationStep(this.#propertybag.animationSteps[this.#propertybag.currentAnimationStep], true);
        }
        
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