"use strict"

class CCDemoObservableElement extends CCObservableBase {
    #elements = {
        root: null,
        updateButton: null,
        resetButton: null,
        count: null,
    }

    #propertybag = {
        updateCallback: null,
        resetCallback: null,
    }
    
    static #htmlTemplate = `
        <div id="CCDemoObservableElementRoot" class="CCDemoObservableElement" data-element-root> 
            <div data-element-button-update id="DemoUpdateButton" class="TestButton Filled Show">Update</div>
            <div data-element-button-reset id="DemoResetButton" class="TestButton Filled Show">Reset</div>
            <li data-element-count></li>
        </div>
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

        // initialise the observables data structure
        this.observableData.clickCount = 0;
    }
    
    /**
     * Getters and Setters
     */
    set resetCallback(fn) {
        this.#elements.resetButton.addEventListener("click", this.resetButtonClick.bind(this), true);
        this.#propertybag.resetCallback = fn;
    }
    
    set updateCallback(fn) {
        this.#elements.updateButton.addEventListener("click", this.updateButtonClick.bind(this), true);
        this.#propertybag.updateCallback = fn;
    }
    
    /**
     * Private Methods
     */
    #confirmUXIsInitialised() {

        if (this.children.length == 0) {

            let fragment = getDOMFragmentFromString(CCDemoObservableElement.#htmlTemplate);

            this.#elements.root = fragment.querySelector('[data-element-root]');
            this.#elements.updateButton = fragment.querySelector('[data-element-button-update]');
            this.#elements.resetButton = fragment.querySelector('[data-element-button-reset]');
            this.#elements.count = fragment.querySelector('[data-element-count]');
            
            this.appendChild(fragment);
            
        }
    }
    
    #initialiseAttributes() { }
    
    /**
     * Public Methods
     */
    render() {
        this.#elements.count.innerText = this.observableData.clickCount;
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
    
    updateButtonClick() {
        this.observableData.clickCount += 1;
        this.#propertybag.updateCallback();
    }
    
    resetButtonClick() {
        this.observableData.clickCount = 0;
        this.#propertybag.resetCallback();
    }
}