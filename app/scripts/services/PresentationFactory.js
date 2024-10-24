/**
 * @class
 * @public
 * @constructor
 */
class PresentationFactory {
    #intoPageNodeLibrary;
    #intoPageContentLibrary;
    #intoBackgroundLibrary;
    #addPageContentToDOMElement;
    #addBackgroundToDOMElement;

    /**
     * @param {Dictionary<PageNode>} intoPageNodeLibrary 
     * @param {Dictionary<CCPageContent>} intoPageContentLibrary 
     * @param {Dictionary<CCBackground>} intoBackgroundLibrary 
     * @param {HTMLElement?} addPageContentToDOMElement 
     * @param {HTMLElement?} addBackgroundToDOMElement 
     */
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

    /**
     * Creates a new {@link PageNode} element and appends it to the given library
     * @param {string} name 
     * @returns {PageNode?}
     */
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
    
    /**
     * Creates a new {@link CCPageContent} element and appends it to the given library
     * @param {String} name 
     * @returns {HTMLElement?}
     */
    newPageContent(name) {
        if (this.#intoPageContentLibrary != null && this.#intoPageContentLibrary.hasOwnProperty(name)) {
            Log.error("A CCPage component with this name already exists in the specified library, unable to add", "FACTORY");
            return null;
        }

        let component = document.createElement("cc-pagecontent");
        component.id = name;
        // @ts-ignore due to create element returning a HTMLElement type (which is actually a CCPageContent)
        component.hide();

        if (this.#intoPageContentLibrary != null) {
            // @ts-ignore due to create element returning a HTMLElement type (which is actually a CCPageContent)
            this.#intoPageContentLibrary[name] = component;
        }

        if (this.#addPageContentToDOMElement != null) {
            this.#addPageContentToDOMElement.appendChild(component);
        }
        
        return component;
    }

    /**
     * Creates a new {@link CCBackground} element and appends it to the given library
     * @param {string} name 
     * @returns {HTMLElement?}
     */
    newBackground(name) {
        if (this.#intoBackgroundLibrary != null && this.#intoBackgroundLibrary.hasOwnProperty(name)) {
            Log.error("A background with this name already exists in the specified library, unable to add", "FACTORY");
            return null;
        }

        let component = document.createElement("cc-background");
        component.id = name;
        // @ts-ignore due to create element returning a HTMLElement type (which is actually a CCBackground)
        component.hide();
        
        if (this.#intoBackgroundLibrary != null) {
            // @ts-ignore due to create element returning a HTMLElement type (which is actually a CCBackground)
            this.#intoBackgroundLibrary[name] = component;
        }

        if (this.#addBackgroundToDOMElement != null) {
            this.#addBackgroundToDOMElement.appendChild(component);
        }

        return component;
    }
}
