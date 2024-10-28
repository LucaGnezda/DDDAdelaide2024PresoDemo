/**
 * Enum used to define state for Framework Elements.
 * @enum {number}
 * @readonly
 * @property {number} Default
 * @property {number} Unknown
 * @property {number} KnownUnknown
 * @property {number} SolvableUnknown
 * @property {number} Solved
 */
const FrameworkElementState = {
    Default: 0,
    Unknown: 0,
    KnownUnknown: 1,
    SolvableUnknown: 2,
    Solved: 3
}
