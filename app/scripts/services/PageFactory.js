"use strict";

class PageFactory {

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
    
    newPage(id, background, pageX, pageY, transformerClass) {

        if (this.#intoLibrary != null && this.#intoLibrary.hasOwnProperty("id")) {
            Log.error("A page with this name already exists in the specified library, unable to add", "FACTORY");
            return null;
        }

        let component = document.createElement("cc-page");
        component.id = id;
        component.hide();
        component.background(background, pageX, pageY, transformerClass);

        if (this.#intoLibrary != null) {
            this.#intoLibrary[id] = component;
        }

        if (this.#addtoDOMElement != null) {
            this.#addtoDOMElement.appendChild(component);
        }

        return component;

    }

}
