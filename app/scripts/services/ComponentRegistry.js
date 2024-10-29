/**
 * @class
 * @public
 * @constructor
 */
class ComponentRegistry {
    /**
     * Adds all of the apps custom components as custom elements
     * @static
     * @returns {void}
     */
    static registerComponents() {
        customElements.define("cc-background", CCBackground);      
        customElements.define("cc-demoobservableelement", CCDemoObservableElement);
        customElements.define("cc-demoobservingelement", CCDemoObservingElement);
        customElements.define("cc-frameworkelement", CCFrameworkElement);  
        customElements.define("cc-pagecontent", CCPageContent);  
    }
}
