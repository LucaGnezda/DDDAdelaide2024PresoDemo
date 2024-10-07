/**
 * Enums used for the Logging solution
 */

"use strict";

const LogLevel = AsEnum(
    {
        Default:     0, 
        Off:         0,
        // Fatal     1 - not relevant in javascript
        Error:       2,
        Warning:     3,
        Infomation:  4,
        Debug:       5,
        Trace:       6
    }
);