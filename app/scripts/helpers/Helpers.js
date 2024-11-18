/**
 * Defines a basic for 'count' many elements with simple 'Show'/'Hide' classes.
 * Assumes that the data attribute targets are 'data-line-<number>' 
 * @param {number} count 
 * @returns {Array<PageAnimationDefinition>}
 */
function defineBasicAnimationSeries(count) {
    let animations = [];
    for (let i = 0; i < count; i++) {
        /** @type {PageAnimationDefinition} */
        let animation = {
            add:[
                { key: `data-line${i+1}`, classes: ["Show"] },
            ],
            remove:[
                { key: `data-line${i+1}`, classes: ["Hide"] },
            ],
        }
        
        animations.push(animation)
    }
    
    return animations
}