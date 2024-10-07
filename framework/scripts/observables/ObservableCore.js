/** 
 * ObservableCore is a object that is intended to be used within another
 * object, such as a component or Observable. It's purpose is to provide
 * and object that triggers change callbacks through use of a proxy.
*/
"use strict";

class ObservableCore {
    
    #originatingObject = null;
    data = null;
    dataProxy = null;
    #subscribers = [];
    #subscriptionsTo = [];
    #notificationMode = NotificationMode.Default;
    #notificationStatus = NotificationStatus.NotStarted;
    #pendingNotification = false;

    constructor(notificationMode, notificationStatus) {

        let self = this;
        this.#originatingObject = this;
        this.data = new ObservableData();

        if (!isEmptyOrNull(notificationMode) && NotificationMode.hasValue(notificationMode)) {
            this.#notificationMode = notificationMode;
        }

        if (!isEmptyOrNull(notificationStatus)  && NotificationStatus.hasValue(notificationStatus)) {
            this.#notificationStatus = notificationStatus;
        }

        let handler = (path = []) => ({
            get(target, property, reciever) {

                if (typeof property === 'symbol'){
                    Log.trace(`Proxied Get. Getting ${target.constructor.name}.UnknownSymbol`, "PROXY");
                }
                else {
                    Log.trace(`Proxied Get. Getting ${target.constructor.name}.${property}`, "PROXY");
                }

                // return from subproxies if they already exist, otherwise create then the target property is an object and not yet a proxy.
                if (property === '_isProxy') {
                    return true;
                }
                // or if its an object without a proxy, create one
                else if (target[property] != null && typeof target[property] === 'object' && !target[property]._isProxy) {
                    Log.debug(`Sub object proxy created for ${target[property].constructor.name} in parent object ${self.originatingObject.constructor.name}`, "PROXY");
                    target[property] = new Proxy(target[property], handler(path.concat(property)));
                }
                
                // or return the data. Use reflect to ensure the get works correctly in all use cases.
                return Reflect.get(target, property, reciever);
            },

            set(target, property, newValue, reciever) {
                
                Log.debug(`(${self.#originatingObject.constructor.name}.ObservableData): Proxied Set. Update observed for ${target.constructor.name}.${property} from ${target[property]} to ${newValue}`, "PROXY");

                let oldValue = target[property];

                let newValueJSON = JSONstringifyOrder(newValue);
                
                // compare the sorted json strings of the old and new structure, if we're making no change, then just return. Sorting is essential in the comparison to avoid misinterpreting differing property orders as different objects.
                if (newValueJSON == JSONstringifyOrder(target[property])) {
                    Log.debug(`  No change event required`, "PROXY");
                    return true;
                }

                // Note: I'm stripping back to base objects when setting.  Because it's too hard to reliably strip proxies from objects and their entire children tree.
                // Stripping achives three things:
                //  - We know we're working with data sttuctures only, not smart objects.
                //  - We can't accidently form proxies around proxies, or absorb proxies from other things, especially for nested objects
                //  - Behaviour will be consistent and predictable across proxies, arrays and objects.
                // Its a reasonable solution considering these are supposed to be simple data structures anyway.
                if (newValue != null) {
                    newValue = JSON.parse(newValueJSON);
                }
                
                let result = Reflect.set(target, property, newValue, reciever);
                
                if (self.#notificationStatus == NotificationStatus.Active && self.subscribers.length > 0 && newValue != oldValue) {
                    switch(self.notificationMode){
                        case NotificationMode.PropertyNotifyOnChange:
                            
                            let event = new ObservableDataEvent();
                            event.notificationMode = NotificationMode.PropertyNotifyOnChange;
                            event.originatingObject = self.#originatingObject;
                            event.path = path.concat(property);
                            event.oldValue = oldValue;
                            event.newValue = newValue;

                            Log.debug(`  Propagating change event to subscribers`, "PROXY");
                            self.subscribers.map(obj => obj.callback(event));
                            break;

                        case NotificationMode.ObjectNotifyOnEmit:
                            Log.debug(`  Backlog change event for later propagation.`, "PROXY");
                            self.notificationRequired();
                            break;

                        default:
                            // Shouldn't be here!!!!
                            Log.debug("Error: Invalid NotificationMode", "PROXY")

                    }
                }
                
                return result
            },
        });

        Log.debug(`Object proxy created for ${this.data.constructor.name} in parent object ${self.#originatingObject.constructor.name}`, "PROXY");
        self.dataProxy = new Proxy(this.data, handler());

    }

    get originatingObject() {
        return this.#originatingObject;
    }

    set originatingObject(val) {
        Log.debug(`${this.dataProxy.constructor.name} in ${this.constructor.name} assigned to parent ${val.constructor.name}`, "PROXY")
        this.#originatingObject = val;
    }

    get subscribers() {
        return this.#subscribers;
    }

    get subscriptionsTo() {
        return this.#subscriptionsTo;
    }

    get notificationMode() {
        return this.#notificationMode;
    }

    set notificationMode(val) {
        if (val != null && NotificationMode.hasValue(val)) {
            this.#notificationMode = val;
        }
        else {
            this.#notificationMode = NotificationMode.Default;
        }
    }

    get notificationStatus() {
        return this.#notificationStatus;
    }

    set notificationStatus(val) {
        if (val != null && NotificationStatus.hasValue(val)) {
            this.#notificationStatus = val;
        }
        else {
            this.#notificationStatus = NotificationStatus.Default;
        }
    }

    addSubscriber(obj, callbackToAdd) {
        
        if (this.#subscribers.find(e => e.subscriber == obj)) {
            return;
        }

        this.#subscribers.push({subscriber: obj, callback: callbackToAdd.bind(obj)});

        if (typeof obj.subscribeTo === 'function') {
            obj.subscribeTo(this.originatingObject, callbackToAdd);
        }
    }

    subscribeTo(obj, callbackToAdd) {

        if (typeof obj.addSubscriber != 'function' || this.#subscriptionsTo.includes(obj)) {
            return;
        }

        this.#subscriptionsTo.push(obj);
        obj.addSubscriber(this.originatingObject, callbackToAdd);
    
    }

    removeSubscriber(obj) {

        if (!this.#subscribers.find(e => e.subscriber == obj)) {
            return;
        }

        this.#subscribers = this.#subscribers.filter(e => e.subscriber != obj);
        
        if (typeof obj.unsubscribeFrom === 'function') {
            obj.unsubscribeFrom(this.originatingObject);
        }
    }

    unsubscribeFrom(obj) {

        if (typeof obj.removeSubscriber != 'function' || !this.#subscriptionsTo.includes(obj)) {
            return;
        }

        this.#subscriptionsTo = this.#subscriptionsTo.filter(e => e != obj);
        obj.removeSubscriber(this.originatingObject);

    }

    removeAllSubscriptions() {
        this.#subscribers.map(obj => this.removeSubscriber(obj.subscriber));
        this.#subscriptionsTo.map(obj => this.unsubscribeFrom(obj));
    }

    notificationRequired() {
        this.#pendingNotification = true;
    }

    emitNotifications(isforced) {
        if (this.#pendingNotification || isforced) {

            this.#pendingNotification = false;

            Log.debug(`Emitting notifications in ${this.constructor.name} for ${this.originatingObject.constructor.name}`, "STORE");

            let event = new ObservableDataEvent();
            event.notificationMode = NotificationMode.ObjectNotifyOnEmit;
            event.originatingObject = this.originatingObject;
            event.path = null;
            event.oldValue = null;
            event.newValue = null;

            if (typeof isforced == "string") {  
                // If a string was provided, use it as a key to target the recipient by id
                this.#subscribers.map(obj => obj.subscriber.id == isforced ? obj.callback(event) : null);
            }
            else if (typeof isforced == "object") {
                // If an object was provided, use it as a key to target the recipient
                this.#subscribers.map(obj => obj.subscriber == isforced ? obj.callback(event) : null);
            }
            else { 
                // Otherwise notify everyone
                this.#subscribers.map(obj => obj.callback(event));
            }
        }
        
    }
}