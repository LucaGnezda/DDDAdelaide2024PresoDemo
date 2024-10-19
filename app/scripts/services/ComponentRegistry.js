"use strict";

class ComponentRegistry {

    static registerComponents() {
        customElements.define("cc-appmodelelement", CCAppModelElement);
        customElements.define("cc-background", CCBackground);
        customElements.define("cc-pagecontent", CCPageContent);        
        customElements.define("cc-demoobservableelement", CCDemoObservableElement);
        customElements.define("cc-demoobservingelement", CCDemoObservingElement);
    }

}
