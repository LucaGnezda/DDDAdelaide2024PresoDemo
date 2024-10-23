class ComponentRegistry {
    static registerComponents() {
        customElements.define("cc-appmodelelement", CCAppModelElement);
        customElements.define("cc-background", CCBackground);      
        customElements.define("cc-demoobservableelement", CCDemoObservableElement);
        customElements.define("cc-demoobservingelement", CCDemoObservingElement);
        customElements.define("cc-frameworkelement", CCFrameworkElement);  
        customElements.define("cc-pagecontent", CCPageContent);  
    }
}
