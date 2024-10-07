"use strict";

class ComponentRegistry {

    static registerComponents() {
        customElements.define("cc-slidedeck", CCSlideDeck);
        customElements.define("cc-slidebackground", CCSlideBackground);
    }

}
