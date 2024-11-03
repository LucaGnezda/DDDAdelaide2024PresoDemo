/**
 * A string key dictionary of any
 * @typedef {Dictionary<*>} AnyDictionary
 */

/**
 * An object to standardise action handlers in the system
 * @typedef {{handler: FunctionDictionary, routerName: string}} ActionHandler
 */

/**
 * A string key dictionary of functions
 * @typedef {Dictionary<Function>} FunctionDictionary
 */

/**
 * A object to standardise animation steps for in page content
 * @typedef {{key: string, classes: Array<string>}} PageAnimationStep
 */

/**
 * An object to standardise animation step collections for in page content
 * @typedef {{add: Array<PageAnimationStep>?, remove: Array<PageAnimationStep>?}} PageAnimationDefinition
 */

/**
 * An object to standardise in page animations
 * @typedef {{[k: string]: PageAnimationProperty}} InPageAnimations
 */

/**
 * An animation property for a page
 * @typedef {Object} PageAnimationProperty
 * @property {boolean} animationEnabled
 * @property {Array<PageAnimationDefinition>} animationSteps
 * @property {number} currentAnimationStep
 */

/**
 * An animation property for a page
 * @typedef {Object} BackgroundAnimationProperty
 * @property {boolean} animationEnabled
 * @property {Array<BackgroundAnimationDefinition>} animationSteps
 * @property {number} currentAnimationStep
 */

/**
 * An object to standardise animation step collections for in page content
 * @typedef {{add: Array<BackgroundAnimationStep>?, remove: Array<BackgroundAnimationStep>?}} BackgroundAnimationDefinition
 */

/**
 * A object to standardise animation steps for in page content
 * @typedef {{classes: Array<string>}} BackgroundAnimationStep
 */

/**
 * Options for CSS transition timing functions
 * @typedef {'ease'|'ease-in'|'ease-out'|'ease-in-out'|'linear'|'step-start'|'step-end'} TimingFunction
 */

/**
 * A dictionary of T
 * @template T Whatever you want :D
 * @typedef {{[k: string]: T}} Dictionary<T>
 */

/**
 * A dictionary of T with keys in K
 * @template {string} Key
 * @template Value
 * @typedef {{[k in Key]: Value}} LimitedDictionary<Key, Value>
 */

/**
 * A observable callback
 * @typedef {(event: ObservableDataEvent) => void} ObservableCallback
 */

/**
 * An input event callback
 * @template T
 * @typedef {(arg0: T) => void} Callback
 */

/**
 * @typedef {Object} EventBase
 * @property {Event} originatingEvent
 * @property {*} originatingObject
 */
            