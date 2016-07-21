"use strict";

var Event = class {
    constructor(id) {
        if(typeof id === 'undefined') {
            throw new Error('Event requires an id');
        }
        this.id = id;
    }

    toString() {
        return this.id
    }
};

module.exports = Event;
