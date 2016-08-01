"use strict";

var Event = class {
    constructor(id) {
        if(typeof id === 'undefined') {
            throw new Error('Event requires an id');
        }
        this._id = id;
        this._nextEvents = [];
    }

    addChild(event) {
        this._nextEvents.push(event);
    }

    traverse() {
        var i, j, output = [], childrenOutput = [], childOutput, currentChildArray;

        for(i=0; i<this._nextEvents.length; i++) {
            childOutput = this._nextEvents[i].traverse();
            if(Array.isArray(childOutput[0])) {
                for(j=0; j<childOutput.length; j++) {
                    childOutput[j].unshift(this.id);
                    childrenOutput.push(childOutput[j]);
                }
            } else {
                childOutput.unshift(this.id);
                childrenOutput.push(childOutput);
            }
        }

        if(childrenOutput.length === 0) {
            output = [this.id];
        } else if(childrenOutput.length === 1) {
            output = childrenOutput[0];
        } else {
            output = childrenOutput;
        }
        return output;
    }

    get id() {
        return this._id;
    }

};

module.exports = Event;
