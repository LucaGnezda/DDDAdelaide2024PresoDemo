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
    static pageOverlayCallback = null;

    // Referenced elements 
    static elements = {
        pagesContainer: null,
        backgroundsContainer: null,
        AppModelAppStructure: null,
        appModelComponents: null,
        appModelEventBindings: null,
        appModelActionDispatch: null,
        appModelHandlers: null,
        appModelStore: null,
        appModelDataBindings: null,
        appModelObservables: null,
        appModelLogging: null,
        appModelHelpers: null,
        demoButton: null,
    };

    // Referecned components
    static pageContent = {};
    static backgrounds = {};
    static pages = {};
    static components = {};

    static activePage = null;
}