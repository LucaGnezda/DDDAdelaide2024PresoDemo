"use strict";

class PresentationFactory {

    #intoPageNodeLibrary = null;
    #intoPageContentLibrary = null;
    #intoBackgroundLibrary = null;
    #addPageContentToDOMElement = null;
    #addBackgroundToDOMElement = null;

    constructor(intoPageNodeLibrary, intoPageContentLibrary, intoBackgroundLibrary, addPageContentToDOMElement, addBackgroundToDOMElement) {
       
        if (intoPageNodeLibrary != null) {
            this.#intoPageNodeLibrary = intoPageNodeLibrary;
        }

        if (intoPageContentLibrary != null) {
            this.#intoPageContentLibrary = intoPageContentLibrary;
        }

        if (intoBackgroundLibrary != null) {
            this.#intoBackgroundLibrary = intoBackgroundLibrary;
        }

        if (addPageContentToDOMElement != null && isElement(addPageContentToDOMElement)) {
            this.#addPageContentToDOMElement = addPageContentToDOMElement;
        }

        if (addBackgroundToDOMElement != null && isElement(addBackgroundToDOMElement)) {
            this.#addBackgroundToDOMElement = addBackgroundToDOMElement;
        }
    }

    newPageNode(name) {

        if (this.#intoPageNodeLibrary != null && this.#intoPageNodeLibrary.hasOwnProperty(name)) {
            Log.error("A pageNode with this name already exists in the specified library, unable to add", "FACTORY");
            return null;
        }

        let pageNode = new PageNode(name);

        if (this.#intoPageNodeLibrary != null) {
            this.#intoPageNodeLibrary[name] = pageNode;
        }

        return pageNode;

    }
    
    newPageContent(name) {

        if (this.#intoPageContentLibrary != null && this.#intoPageContentLibrary.hasOwnProperty(name)) {
            Log.error("A CCPage component with this name already exists in the specified library, unable to add", "FACTORY");
            return null;
        }

        let component = document.createElement("cc-pagecontent");
        component.id = name;
        component.hide();

        if (this.#intoPageContentLibrary != null) {
            this.#intoPageContentLibrary[name] = component;
        }

        if (this.#addPageContentToDOMElement != null) {
            this.#addPageContentToDOMElement.appendChild(component);
        }

        return component;

    }

    newBackground(name) {

        if (this.#intoBackgroundLibrary != null && this.#intoBackgroundLibrary.hasOwnProperty(name)) {
            Log.error("A background with this name already exists in the specified library, unable to add", "FACTORY");
            return null;
        }

        let component = document.createElement("cc-background");
        component.id = name;
        component.hide();
        
        if (this.#intoBackgroundLibrary != null) {
            this.#intoBackgroundLibrary[name] = component;
        }

        if (this.#addBackgroundToDOMElement != null) {
            this.#addBackgroundToDOMElement.appendChild(component);
        }

        return component;

    }

}
