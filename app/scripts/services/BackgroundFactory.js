"use strict";

class BackgroundFactory {

    #intoLibrary = null;
    #addtoDOMElement = null;

    constructor(intoLibrary, addtoDOMElement) {
       
        if (intoLibrary != null) {
            this.#intoLibrary = intoLibrary;
        }

        if (addtoDOMElement != null && isElement(addtoDOMElement)) {
            this.#addtoDOMElement = addtoDOMElement;
        }
    }

    newBackground(id) {

        if (this.#intoLibrary != null && this.#intoLibrary.hasOwnProperty("id")) {
            Log.error("A background with this name already exists in the specified library, unable to add", "FACTORY");
            return null;
        }

        let component = document.createElement("cc-background");
        component.id = id;
        
        if (this.#intoLibrary != null) {
            this.#intoLibrary[id] = component;
        }

        if (this.#addtoDOMElement != null) {
            this.#addtoDOMElement.appendChild(component);
        }

        return component;

    }
}
