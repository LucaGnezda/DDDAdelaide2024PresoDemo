/** 
 * Action represents a payload that can be dispatched by the Dispatcher
 * @class
 * @public
 * @constructor
*/
class Action {
    /**
     * @memberof Action
     * @type {string}
     */
    type;
    
    /**
     * @memberof Action
     * @type {object}
     */
    payload;

    /**
     * @constructs Action
     * @param {string} type 
     * @param {object} payload 
     */
    constructor(type, payload) {
        this.type = type;
        this.payload = payload;
    }
}
