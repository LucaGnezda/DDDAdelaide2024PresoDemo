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
 * @typedef {{key: string, classes: Array<string>}} AnimationStep
 */

/**
 * An object to standardise animation step collections for in page content
 * @typedef {{add: Array<AnimationStep>?, remove: Array<AnimationStep>?}} AnimationDefinition
 */

/**
 * An object to standardise in page animations
 * @typedef {{[k: string]: AnimationProperty}} InPageAnimations
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
