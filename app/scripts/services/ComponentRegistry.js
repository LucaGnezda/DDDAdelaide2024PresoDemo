"use strict";

class ComponentRegistry {

    static registerComponents() {
        customElements.define("cc-background", CCBackground);
        customElements.define("cc-page", CCPage);        
    }

}
