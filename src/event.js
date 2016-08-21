"use strict";

var Event = class {
    constructor(id) {
        if(typeof id === 'undefined') {
            throw new Error('Event requires an id');
        }
        this._id = id;
        this._nextEvent = undefined;
    }

    equals(otherEvent) {
        return (this.id === otherEvent.id) &&
            ((!this.nextEvent && !otherEvent.nextEvent) || (this.nextEvent.equals(otherEvent.nextEvent)))
    }

    isSubtree(otherEvent) {
        var output = false, nextEvent;
        nextEvent = this;
        while(nextEvent) {
            if(nextEvent.equals(otherEvent)) {
                output = true;
                break;
            }
            nextEvent = nextEvent.nextEvent;
        }
        return output;
    }

    get id() {
        return this._id;
    }

    get nextEvent() {
        return this._nextEvent;
    }

    set nextEvent(event) {
        this._nextEvent = event;
    }
};

module.exports = Event;
