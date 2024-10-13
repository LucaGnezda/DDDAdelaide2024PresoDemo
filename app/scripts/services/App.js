/**
 * Core app object, acts as a globals host for neatness and readability.
 */

"use strict";

class App {

    // Flux Pattern objects
    static store = null;
    static dispatcher = null;

    // Core dispatch callbacks
    static pageNavigationCallback = null;
    static pageAnimationCallback = null;

    // Referenced elements 
    static elements = {
        pagesContainer: null,
        backgroundsContainer: null,
        uxButton: null,
        logicButton: null,
        dataButton: null,
        appModelContainer: null,
        appModelElementUX: null,
        appModelElementLogic: null,
        appModelElementData: null
    };

    // Referecned components
    static pages = {};
    static backgrounds = {};
    static activePage = null;
}