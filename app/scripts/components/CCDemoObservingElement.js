"use strict"

class CCDemoObservingElement extends CCBase {
    #elements = {
        root: null,
    }
    
    #propertyBag = {
        count: 0,
    }
    
    static #htmlTemplate = `
        <div id="CCDemoObservingElementRoot" class="CCDemoObservingElement" data-element-root> </div>
    `

    constructor() {
        super();

        // allocate a guid
        if (isEmptyOrNull(this.id)) {
            this.id = crypto.randomUUID();
        }
        
    }
    
    /**
     * Private Methods
     */
    #confirmUXIsInitialised() {

        if (this.children.length == 0) {

            let fragment = getDOMFragmentFromString(CCDemoObservingElement.#htmlTemplate);

            this.#elements.root = fragment.querySelector('[data-element-root]');
            
            this.appendChild(fragment);
        }
    }
    
    #initialiseAttributes() { }
    
    /**
     * Public Methods
     */
    render() { }
    
    /**
    * Callbacks
    */
    connectedCallback() {
        this.#confirmUXIsInitialised();
        this.#initialiseAttributes();

        if (App.store) {
            App.store.demo.addSubscriber(this, this.dataChangedCallback);    
        }

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
}