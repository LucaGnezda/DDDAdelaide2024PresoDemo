/**
 * Core app object, acts as a globals host for neatness and readability.
 * @class
 * @public
 */
class App {
    // Flux Pattern objects
    /**
     * @static
     * @type {(Store&AnyDictionary)?}
     */
    static store = null;

    /**
     * @static
     * @type {Dispatcher?}
     */
    static dispatcher = null;

    // Core dispatch callbacks
    /**
     * @static
     * @type {Function?}
     */
    static pageNavigationCallback = null;

    /**
     * @static
     * @type {Function?}
     */
    static pageAnimationCallback = null;

    /**
     * @static
     * @type {Function?}
     */
    static pageOverlayCallback = null;

    // Referenced elements
    /**
     * @type {Dictionary<HTMLElement?>}
     */
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
    /**
     * @type {Dictionary<CCPageContent>}
     */
    static pageContent = {};

    /**
     * @type {Dictionary<CCBackground>}
     */
    static backgrounds = {};

    /**
     * @type {Dictionary<PageNode>}
     */
    static pages = {};

    /**
     * @type {Dictionary<CCBase | CCObservableBase>}
     */
    static components = {};

    /**
     * @type {PageNode?}
     */
    static activePage = null;
}
