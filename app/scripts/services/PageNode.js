/**
 * @class
 * @public
 * @constructor
 */
class PageNode {
    /*
     * Member attributes
     */
    /**
     * @type {string}
     */
    #nodeId;

    /**
     * @type {CCBackground?}
     */
    #background = null;

    /**
     * @type {number}
     */
    #backgroundX = 0;

    /**
     * @type {number}
     */
    #backgroundY = 0;

    /**
     * @type {string?}
     */
    #backgroundTransformer = null;

    /**
     * @type {PageTransition}
     */
    #backgroundTransitionForward = PageTransition.None;

    /**
     * @type {PageTransition}
     */
    #backgroundTransitionBack = PageTransition.None;

    /**
     * @type {CCPageContent?}
     */
    #pageContent = null;

    /**
     * @type {PageNode?}
     */
    #nextNode = null;

    /**
     * @type {PageNode?}
     */
    #previousNode = null;

    /**
     * @type {PageTransition?}
     */
    #transitionForward = null;

    /**
     * @type {number?}
     */
    #transitionForwardDuration = null;

    /**
     * @type {PageTransition?}
     */
    #transitionBack = null;

    /**
     * @type {number?}
     */
    #transitionBackDuration = null;

    /**
     * @param {string} nodeId
     */
    constructor(nodeId) {
        this.#nodeId = nodeId;
    }

    /*
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

    /*
     * Public Methods
     */

    /**
     * Sets the page content for the node
     * @param {CCPageContent} pageContent
     * @returns {void}
     */
    setPageContent(pageContent) {
        this.#pageContent = pageContent;
    }

    /**
     * Sets the background for the node
     * @param {CCBackground} background
     * @param {number} pageX
     * @param {number} pageY
     * @param {string?} transformerClass
     * @returns {void}
     */
    setBackground(background, pageX = 0, pageY = 0, transformerClass) {
        this.#background = background;
        this.#backgroundX = pageX;
        this.#backgroundY = pageY;
        this.#backgroundTransformer = transformerClass;
    }

    /**
     * Sets the page content and background for the node
     * @param {CCPageContent} pageContent
     * @param {CCBackground} background
     * @param {number} pageX
     * @param {number} pageY
     * @param {string?} transformerClass
     * @returns {void}
     */
    setPageContentAndBackground(pageContent, background, pageX, pageY, transformerClass) {
        this.setPageContent(pageContent);
        this.setBackground(background, pageX, pageY, transformerClass);
    }

    /**
     * Sets the next page for the node along with transtition classes/info
     * @param {PageNode} node
     * @param {PageTransition?} transitionForward
     * @param {PageTransition?} transitionBack
     * @param {number} duration
     * @returns
     */
    setNextPage(node, transitionForward, transitionBack, duration) {
        if (transitionForward != null) {
            this.#nextNode = node;
            this.#transitionForward = transitionForward;
            this.#transitionForwardDuration = duration;
        }

        node.setPreviousPage(this, transitionBack, duration)
    }

    /**
     * Sets the previous page for the node along with transtition classes/info
     * @param {PageNode} node
     * @param {PageTransition?} transitionBack
     * @param {number} duration
     * @returns
     */
    setPreviousPage(node, transitionBack, duration) {
        if (transitionBack != null) {
            this.#previousNode = node;
            this.#transitionBack = transitionBack;
            this.#transitionBackDuration = duration;
        }
    }
}
