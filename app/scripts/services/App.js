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
     * @type {LimitedDictionary<AppElements, HTMLElement?>}
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
        solveIcon: null,
    };

    // Referenced components
    /**
     * @type {LimitedDictionary<PageContentId,CCPageContent>}
     */
    static pageContent = /** @type {LimitedDictionary<PageContentId,CCPageContent>} */ ({});

    /**
     * @type {LimitedDictionary<PageBackgroundId, CCBackground>}
     */
    static backgrounds = /** @type {LimitedDictionary<PageBackgroundId, CCBackground>} */ ({});

    /**
     * @type {LimitedDictionary<PageNodeId, PageNode>}
     */
    static pages = /** @type {LimitedDictionary<PageNodeId, PageNode>} */ ({});

    /**
     * @type {LimitedDictionary<AppComponents, CCBase | CCObservableBase>}
     */
    static components = /** @type {LimitedDictionary<AppComponents, CCBase | CCObservableBase>} */ ({});

    /**
     * @type {PageNode?}
     */
    static activePage = null;
}
