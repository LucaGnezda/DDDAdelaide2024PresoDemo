/**
 * Enum used to define page transitions
 */

"use strict";

const PageTransition = AsEnum(
    {
        None:              0, 
        SlideLeft:         1,
        SlideRight:        2,
        SlideUp:           3,
        SlideDown:         4,
        FadeSlideLeft:     5,
        FadeSlideRight:    6,
        FadeSlideUp:       7,
        FadeSlideDown:     8,
        Fade:              9
    }
);