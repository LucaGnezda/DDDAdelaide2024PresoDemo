/**
 * Enum used to define state for Framework Elements.
 */

"use strict";

const FrameworkElementState = AsEnum(
    {
        Default:           0,
        Unknown:           0,
        KnownUnknown:      1,
        SolvableUnknown:   2,
        Solved:            3
    }
);