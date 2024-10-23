// @ts-nocheck

"use strict";

class PageNode {

    /**
     * Member attributes
     */
    #nodeId = null;
    #background = null;
    #backgroundX = null;
    #backgroundY = null;
    #backgroundTransformer = null;
    #backgroundTransitionForward = null;
    #backgroundTransitionBack = null;
    #pageContent = null;
    #nextNode = null;
    #previousNode = null;
    #transitionForward = null;
    #transitionForwardDuration = null;
    #transitionBack = null;
    #transitionBackDuration = null;


    /**
     * Constructor
     */
    constructor(nodeId) {
        this.#nodeId = nodeId;
    }


    /**
     * Getters & Setters
     */
    get nodeId() {
        return this.#nodeId;
    }

    get content() {
        return this.#pageContent;
    }
    
    get nextPage() {
        return this.#nextNode;
    }

    get previousPage() {
        return this.#previousNode;
    }

    get transitionForward() {
        return this.#transitionForward;
    }

    get transitionBack() {
        return this.#transitionBack;
    }

    get backgroundTransitionForward() {
        return this.#backgroundTransitionForward;
    }

    get backgroundTransitionBack() {
        return this.#backgroundTransitionBack;
    }

    get transitionForwardDuration() {
        return this.#transitionForwardDuration;
    }

    get transitionBackDuration() {
        return this.#transitionBackDuration;
    } 

    get background() {
        return this.#background;
    }

    get backgroundX() {
        return this.#backgroundX;
    }

    get backgroundY() {
        return this.#backgroundY
    }
    
    get backgroundTransformer() {
        return this.#backgroundTransformer;
    }
    
    /**
     * Public Methods
     */
    setPageContent(pageContent) {

        if (pageContent.constructor.name != "CCPageContent") {
            Log.error('Page is not of type CCPage', "PAGENODE");
            return;
        }
        
        this.#pageContent = pageContent;
    }

    setBackground(background, pageX = 0, pageY = 0, transformerClass) {

        if (background.constructor.name != "CCBackground") {
            Log.error('Page is not of type CCBackground', "PAGENODE");
            return;
        }

        this.#background = background;
        this.#backgroundX = pageX;
        this.#backgroundY = pageY;
        this.#backgroundTransformer = transformerClass;
    }

    setPageContentAndBackground(pageContent, background, pageX, pageY, transformerClass) {
        this.setPageContent(pageContent);
        this.setBackground(background, pageX, pageY, transformerClass);
    }

    setNextPage(node, transitionForward, transitionBack, duration) {

        if (node.constructor.name != "PageNode") {
            Log.error('Page is not of type PageNode', "PAGENODE");
            return;
        }

        if (transitionForward != null) {
            this.#nextNode = node;
            this.#transitionForward = transitionForward;
            this.#transitionForwardDuration = duration;
        }

        if (transitionBack != null) {
            node.setPreviousPage(this, transitionBack, duration)
        }
    }

    setPreviousPage(node, transitionBack, duration) {

        if (node.constructor.name != "PageNode") {
            Log.error('Page is not of type PageNode', "PAGENODE");
            return;
        }

        this.#previousNode = node;
        this.#transitionBack = transitionBack;
        this.#transitionBackDuration = duration;
    }
    
}
