/**
 * @class
 * @public
 * @constructor
 */
class CCFrameworkElement extends CCObservableBase {
    /**
     * Definitions for internal elements
     * @typedef {('root'|'unknownContainer'|'solvedContainer'|'solvedImage'|'solvedImageStyling'|'title'|'titleStyling')} FrameworkElementElement
     */
    
    /**
     * The properties of this component
     * @typedef {Object} FrameworkElementPropertybag
     * @property {string?} top
     * @property {string?} left
     * @property {string?} width
     * @property {string?} height
     * @property {string?} fontSize
     * @property {boolean?} multiCLouds
     * @property {string?} solvedImage
     * @property {Function?} clickCallback
     */

    /**
     * The elements that make up this component
     * @type {LimitedDictionary<FrameworkElementElement, HTMLElement?>}
     */
    #elements = {
        root: null,
        unknownContainer: null,
        solvedContainer: null,
        solvedImage: null,
        solvedImageStyling: null,
        title: null,
        titleStyling: null,
    }

    /**
     * @type {FrameworkElementPropertybag}
     */
    #propertybag = {
        top: null,
        left: null,
        width: null,
        height: null,
        fontSize: null,
        multiCLouds: null,
        solvedImage: null,
        clickCallback: null,
    }
    
    /**
     * The html template for the component
     * @property {string} #htmlTemplate  
     */
    static #htmlTemplate = `
        <div class="CCFrameworkElement" data-element-root>
            <div class="CCFrameworkElementSolved Hide" data-element-solved-container>
                <div data-element-solved-imagestyle>
                    <img class="CCFrameworkElementSolvedImage" data-element-solved-image></img>
                </div>
            </div>
            <div class="CCFrameworkElementUnknown" data-element-unkonwn-container></div>
            <div class="CCFrameworkElementTitle" data-element-Title>
                <div data-element-titlestyling></div>
            </div>
        </div>
    `

    /**
     * The dynamic CSS template for the component
     * @property {string} #dynamicCSSTemplate  
     */
    static #dynamicCSSTemplate = `
        .
    `

    constructor() {
        // construct the object, need to call `super` before you can use `this` 
        let state = new ObservableCore();
        super(state);

        state.originatingObject = this;
        state.addSubscriber(this, this.dataChangedCallback);

        // allocate a guid
        if (isEmptyOrNull(this.id)) {
            this.id = crypto.randomUUID();
        }

        // Initialise the observables data structure that the object will need to operate 
        this.observableData.title = null;
        this.observableData.state = null;
    }
    
    /*
     * Getters and Setters
     */

    get titleStylingClassList() {
        return this.#elements.titleStyling?.classList;
    }

    get solvedImageStylingClassList() {
        return this.#elements.solvedImageStyling?.classList;
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

            let fragment = getDOMFragmentFromString(CCFrameworkElement.#htmlTemplate);

            this.#elements.root = fragment.querySelector('[data-element-root]');
            this.#elements.unknownContainer = fragment.querySelector('[data-element-unkonwn-container]');
            this.#elements.solvedContainer = fragment.querySelector('[data-element-solved-container]');
            this.#elements.solvedImage = fragment.querySelector('[data-element-solved-image]');
            this.#elements.solvedImageStyling = fragment.querySelector('[data-element-solved-imagestyle]');
            this.#elements.title = fragment.querySelector('[data-element-title]');
            this.#elements.titleStyling = fragment.querySelector('[data-element-titlestyling]');

            fragment.firstChild?.addEventListener("mousedown", /** @type {Function} */(this.clickCallback).bind(this));
            
            this.appendChild(fragment);
            
        }
    }
    
    /**
     * Initialises the attributes for the pgae
     */
    #initialiseAttributes() { }
    
    /*
     * Public Methods
     */
    
    /**
     * Dynamically renders the component content
     * @returns {void}
     */
    render() {

        let element;
        
        if (this.#elements.root) {
            if (this.#propertybag.top != null) {
                this.#elements.root.style.top = this.#propertybag.top;
            }

            if (this.#propertybag.left != null) {
                this.#elements.root.style.left = this.#propertybag.left;
            }
                
            if (this.#propertybag.width != null) {
                this.#elements.root.style.width = this.#propertybag.width;
            }
            
            if (this.#propertybag.height != null) {
                this.#elements.root.style.height = this.#propertybag.height;
            }
        }
        
        if (this.#elements.title) {
            if (this.#propertybag.fontSize != null) {
                this.#elements.title.style.fontSize = this.#propertybag.fontSize;
            }
        }

        if (this.#propertybag.multiCLouds && this.#elements.unknownContainer?.childNodes.length != 3) {

            if (this.#elements.unknownContainer) {
                this.#elements.unknownContainer.innerHTML = "";
            }

            element = document.createElement("img");
            element.src = "./app/assets/svg/clouds.svg";
            element.classList.add("CCFrameworkElementUnknownMultiCloud", "Pos1");
            this.#elements.unknownContainer?.appendChild(element);

            element = document.createElement("img");
            element.src = "./app/assets/svg/clouds.svg";
            element.classList.add("CCFrameworkElementUnknownMultiCloud", "Pos2");
            this.#elements.unknownContainer?.appendChild(element);

            element = document.createElement("img");
            element.src = "./app/assets/svg/clouds.svg";
            element.classList.add("CCFrameworkElementUnknownMultiCloud", "Pos3");
            this.#elements.unknownContainer?.appendChild(element);
        }
        else if (!this.#propertybag.multiCLouds && this.#elements.unknownContainer?.childNodes.length != 1) {
            if (this.#elements.unknownContainer) {
                this.#elements.unknownContainer.innerHTML = "";
            }

            element = document.createElement("img");
            element.src = "./app/assets/svg/clouds.svg";
            element.classList.add("CCFrameworkElementUnknownSimpleCloud");
            this.#elements.unknownContainer?.appendChild(element);
        }

        if (this.#propertybag.solvedImage != null && this.#elements.solvedImage instanceof HTMLImageElement) {
            this.#elements.solvedImage.src = `./app/assets/svg/${this.#propertybag.solvedImage}`;
        }

        if (this.#elements.titleStyling) {
            this.#elements.titleStyling.innerText = this.observableData.title;
        }

        switch (this.observableData.state) {
            case FrameworkElementState.Unknown:
                this.#elements.unknownContainer?.childNodes.forEach(e => /** @type {HTMLElement} */(e).classList.add("Hide"));
                this.#elements.solvedContainer?.classList.add("Hide");
                this.#elements.title?.classList.add("Hide");
                this.#elements.title?.classList.remove("Glowing");
                break;

            case FrameworkElementState.KnownUnknown:
                this.#elements.unknownContainer?.childNodes.forEach(e => /** @type {HTMLElement} */(e).classList.remove("Hide"));
                this.#elements.solvedContainer?.classList.add("Hide");
                this.#elements.title?.classList.remove("Hide");
                this.#elements.title?.classList.remove("Glowing");
                break;

            case FrameworkElementState.SolvableUnknown:
                this.#elements.unknownContainer?.childNodes.forEach(e => /** @type {HTMLElement} */(e).classList.remove("Hide"));
                this.#elements.solvedContainer?.classList.add("Hide");
                this.#elements.title?.classList.remove("Hide");
                this.#elements.title?.classList.add("Glowing");
                break;

            case FrameworkElementState.Solved:
                this.#elements.unknownContainer?.childNodes.forEach(e => /** @type {HTMLElement} */(e).classList.add("Hide"));
                this.#elements.solvedContainer?.classList.remove("Hide");
                this.#elements.title?.classList.remove("Hide");
                this.#elements.title?.classList.remove("Glowing");
                break;

            default:
                this.#elements.unknownContainer?.childNodes.forEach(e => /** @type {HTMLElement} */(e).classList.add("Hide"));
                this.#elements.solvedContainer?.classList.add("Hide");
                this.#elements.title?.classList.add("Hide");
                this.#elements.title?.classList.remove("Glowing");
        }

    }

    /**
     * Attaches a callback to the click callback event
     * @param {EventListener} callback 
     */
    attachClickCallback(callback) {
        this.#propertybag.clickCallback = callback;
    }

    /**
     * Sets the known image for the element
     * @param {string} filename 
     */
    setKnownImage(filename) {

        this.#confirmUXIsInitialised();

        this.#propertybag.solvedImage = filename;
        
        this.render();
    
    }

    /**
     * Sets the placement for the element
     * @param {string?} x 
     * @param {string?} y 
     * @param {string} width 
     * @param {string} height 
     * @param {string} fontSize 
     */
    setPlacement(x, y, width, height, fontSize) {

        this.#confirmUXIsInitialised();
        
        if (!this.#elements.root || !this.#elements.title) return;

        this.#propertybag.left = x;
        this.#propertybag.top = y;
        this.#propertybag.width = width;
        this.#elements.root.style.height = height;
        this.#elements.title.style.fontSize = fontSize;

        this.render();

    }

    /**
     * Sets whether multi clouds should be used
     * @param {boolean?} val 
     */
    useMultiClouds(val) {

        this.#confirmUXIsInitialised();
        
        this.#propertybag.multiCLouds = val ? val : true;

        this.render();

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

        this.notificationStatus = NotificationStatus.Active;

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
     * Callback for observable data changed events
     * @param {ObservableDataEvent} event
     */
    dataChangedCallback(event) {
        this.render();
        Log.debug(`Data change callback on component ${event.originatingObject.constructor.name} with id:${event.originatingObject.id} updated property ${event.path} from ${event.oldValue} to ${event.newValue}`, "COMPONENT");
    }

    /**
     * Callback for click event
     * @param {MouseEvent} clickEvent 
     */
    clickCallback(clickEvent) {

        clickEvent.stopPropagation();

        if (this.#propertybag.clickCallback) {

            /**
             * @type {EventBase}
             */
            let event = {};
            event.originatingEvent = clickEvent;
            event.originatingObject = this;

            this.#propertybag.clickCallback(event);
        }
    }
}