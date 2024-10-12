/**
 * Core app object, acts as a globals host for neatness and readability.
 */

"use strict";

class App {

    // Flux Pattern objects
    static store = null;
    static dispatcher = null;

    // Core dispatch callbacks
    static navigationCallback = null;

    // Referenced elements 
    static elements = {
        pagesContainer: null,
        backgroundsContainer: null
    };

    // Referecned components
    static pages = {};
    static backgrounds = {};
    static activePage = null;
}