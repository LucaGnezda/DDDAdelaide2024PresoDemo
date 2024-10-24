"use strict"

class CCFrameworkElement extends CCObservableBase {
    #elements = {
        root: null,
        unknownContainer: null,
        solvedContainer: null,
        solvedImage: null,
        title: null,
        titleStyling: null,
    }

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
    
    static #htmlTemplate = `
        <div class="CCFrameworkElement" data-element-root>
            <div class="CCFrameworkElementSolved Hide" data-element-solved-container>
                <img class="CCFrameworkElementSolvedImage" data-element-solved-image></img>
            </div>
            <div class="CCFrameworkElementUnknown" data-element-unkonwn-container></div>
            <div class="CCFrameworkElementTitle" data-element-Title>
                <div data-element-titlestyling></div>
            </div>
        </div>
    `

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
    
    /**
     * Getters and Setters
     */
    get titleStylingClassList() {
        return this.#elements.titleStyling.classList;
    }

    
    /**
     * Private Methods
     */
    #confirmUXIsInitialised() {

        if (this.children.length == 0) {

            let fragment = getDOMFragmentFromString(CCFrameworkElement.#htmlTemplate);

            this.#elements.root = fragment.querySelector('[data-element-root]');
            this.#elements.unknownContainer = fragment.querySelector('[data-element-unkonwn-container]');
            this.#elements.solvedContainer = fragment.querySelector('[data-element-solved-container]');
            this.#elements.solvedImage = fragment.querySelector('[data-element-solved-image]');
            this.#elements.title = fragment.querySelector('[data-element-title]');
            this.#elements.titleStyling = fragment.querySelector('[data-element-titlestyling]');

            fragment.firstChild.addEventListener("click", this.clickCallback.bind(this));
            
            this.appendChild(fragment);
            
        }
    }
    
    #initialiseAttributes() { }
    
    /**
     * Public Methods
     */
    render() {

        let element;

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
        if (this.#propertybag.fontSize != null) {
            this.#elements.title.style.fontSize = this.#propertybag.fontSize;
        }

        if (this.#propertybag.multiCLouds && this.#elements.unknownContainer.childNodes.length != 3) {

            this.#elements.unknownContainer.innerHTML = "";

            element = document.createElement("img");
            element.src = "./app/assets/svg/clouds.svg";
            element.classList.add("CCFrameworkElementUnknownMultiCloud", "Pos1");
            this.#elements.unknownContainer.appendChild(element);

            element = document.createElement("img");
            element.src = "./app/assets/svg/clouds.svg";
            element.classList.add("CCFrameworkElementUnknownMultiCloud", "Pos2");
            this.#elements.unknownContainer.appendChild(element);

            element = document.createElement("img");
            element.src = "./app/assets/svg/clouds.svg";
            element.classList.add("CCFrameworkElementUnknownMultiCloud", "Pos3");
            this.#elements.unknownContainer.appendChild(element);
        }
        else if (!this.#propertybag.multiCLouds && this.#elements.unknownContainer.childNodes.length != 1) {
            this.#elements.unknownContainer.innerHTML = "";

            element = document.createElement("img");
            element.src = "./app/assets/svg/clouds.svg";
            element.classList.add("CCFrameworkElementUnknownSimpleCloud");
            this.#elements.unknownContainer.appendChild(element);
        }

        if (this.#propertybag.solvedImage != null) {
            this.#elements.solvedImage.src = `./app/assets/svg/${this.#propertybag.solvedImage}`;
        }

        this.#elements.titleStyling.innerText = this.observableData.title;

        switch (this.observableData.state) {
            case FrameworkElementState.Unknown:
                this.#elements.unknownContainer.childNodes.forEach(e => e.classList.add("Hide"));
                this.#elements.solvedContainer.classList.add("Hide");
                this.#elements.title.classList.add("Hide");
                this.#elements.title.classList.remove("Glowing");
                break;

            case FrameworkElementState.KnownUnknown:
                this.#elements.unknownContainer.childNodes.forEach(e => e.classList.remove("Hide"));
                this.#elements.solvedContainer.classList.add("Hide");
                this.#elements.title.classList.remove("Hide");
                this.#elements.title.classList.remove("Glowing");
                break;

            case FrameworkElementState.SolvableUnknown:
                this.#elements.unknownContainer.childNodes.forEach(e => e.classList.remove("Hide"));
                this.#elements.solvedContainer.classList.add("Hide");
                this.#elements.title.classList.remove("Hide");
                this.#elements.title.classList.add("Glowing");
                break;

            case FrameworkElementState.SolvedUnknown:
                this.#elements.unknownContainer.childNodes.forEach(e => e.classList.remove("Hide"));
                this.#elements.solvedContainer.classList.add("Hide");
                this.#elements.title.classList.remove("Hide");
                this.#elements.title.classList.add("Glowing");
                break;

            case FrameworkElementState.Solved:
                this.#elements.unknownContainer.childNodes.forEach(e => e.classList.add("Hide"));
                this.#elements.solvedContainer.classList.remove("Hide");
                this.#elements.title.classList.remove("Hide");
                this.#elements.title.classList.remove("Glowing");
                break;

            default:
                this.#elements.unknownContainer.childNodes.forEach(e => e.classList.add("Hide"));
                this.#elements.solvedContainer.classList.add("Hide");
                this.#elements.title.classList.add("Hide");
                this.#elements.title.classList.remove("Glowing");
        }

    }

    attachClickCallback(callback) {

        if (callback != null && typeof callback === "function") {
            this.#propertybag.clickCallback = callback;
        }
        else {
            this.#propertybag.clickCallback = null;
        }
    }

    setKnownImage(filename) {

        this.#confirmUXIsInitialised();

        this.#propertybag.solvedImage = filename;
        
        this.render();
    
    }

    setPlacement(x, y, width, height, fontSize) {

        this.#confirmUXIsInitialised();

        if (x != null) {
            this.#propertybag.left = x;
        }
        if (y != null) {
            this.#propertybag.top = y;
        }
        if (width != null) {
            this.#propertybag.width = width;
        }
        if (height != null) {
            this.#elements.root.style.height = height;
        }
        if (fontSize != null) {
            this.#elements.title.style.fontSize = fontSize;
        }

        this.render();

    }

    useMultiClouds(val) {

        this.#confirmUXIsInitialised();

        if (val != null) {
            this.#propertybag.multiCLouds = (val == true);
        }
        else {
            this.#propertybag.multiCLouds = true;
        }

        this.render();

    }
    
    /**
    * Callbacks
    */
    connectedCallback() {
        this.#confirmUXIsInitialised();
        this.#initialiseAttributes();

        this.notificationStatus = NotificationStatus.Active;

        this.render();
        Log.debug(`${this.constructor.name} connected to DOM`, "COMPONENT");
    }
    
    disconnectedCallback() {
        Log.debug(`${this.constructor.name} disconnected from DOM`, "COMPONENT");
    }

    dataChangedCallback(event) {
        this.render();
        Log.debug(`Data change callback on component ${event.originatingObject.constructor.name} with id:${event.originatingObject.id} updated property ${event.path} from ${event.oldValue} to ${event.newValue}`, "COMPONENT");
    }

    clickCallback(clickEvent) {

        clickEvent.stopPropagation();

        if (this.#propertybag.clickCallback) {

            let event = {};
            event.originatingEvent = clickEvent;
            event.originatingObject = this;

            this.#propertybag.clickCallback(event);
        }
    }
}