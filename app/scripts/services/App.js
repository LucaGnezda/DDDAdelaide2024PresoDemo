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
        componentsButton: null,
        eventBindingButton: null,
        dispatchActionHandlingButton: null,
        storeButton: null,
        dataBindingButton: null,
        loggingButton: null,
        observablesButton: null,
        demoButton: null,
    };

    // Referecned components
    static pageContent = {};
    static backgrounds = {};
    static pages = {};

    static activePage = null;
}