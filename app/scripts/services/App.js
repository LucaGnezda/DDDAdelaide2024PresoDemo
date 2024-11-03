/**
 * Core app object, acts as a globals host for neatness and readability.
 * @class
 * @public
 */
class App {
    /**
     * @typedef {'ddd'|'title'|'dddSponsors'|'intro1'|'intro2'|'intro3'|'intro4'|'hub'|'logging1'|'components1'|'components2'|'observables1'|'observables2'|'store1'|'store2'|'eventBinding1'|'dispatchActionHandling1'|'dispatchActionHandling2'|'dispatchActionHandling3'|'dataBinding1'|'demo'} AppPages
     */

    /**
     * @typedef {'dddBackground'|'titleBackground'|'introBackground'|'hubBackground'|'sectionBackground1'|'demoBackground'} AppBackgrounds
     */

    /**
     * @typedef {AppPages} AppPageContents
     */

    /**
     * @typedef {'demoObservableElement'|'demoObservingElement1'|'demoObservingElement2'|'demoObservingElement3'} AppComponents
     */

    /**
     * @typedef {'pagesContainer'|'backgroundsContainer'|'AppModelAppStructure'|'appModelComponents'|'appModelEventBindings'|'appModelActionDispatch'|'appModelHandlers'|'appModelStore'|'appModelDataBindings'|'appModelObservables'|'appModelLogging'|'appModelHelpers'|'solveIcon'} AppElements
     */

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

    // Referecned components
    /**
     * @type {LimitedDictionary<AppPageContents,CCPageContent>}
     */
    static pageContent = /** @type {LimitedDictionary<AppPageContents,CCPageContent>} */ ({});

    /**
     * @type {LimitedDictionary<AppBackgrounds, CCBackground>}
     */
    static backgrounds = /** @type {LimitedDictionary<AppBackgrounds, CCBackground>} */ ({});

    /**
     * @type {LimitedDictionary<AppPages, PageNode>}
     */
    static pages = /** @type {LimitedDictionary<AppPages, PageNode>} */ ({});

    /**
     * @type {LimitedDictionary<AppComponents, CCBase | CCObservableBase>}
     */
    static components = /** @type {LimitedDictionary<AppComponents, CCBase | CCObservableBase>} */ ({});

    /**
     * @type {PageNode?}
     */
    static activePage = null;
}
