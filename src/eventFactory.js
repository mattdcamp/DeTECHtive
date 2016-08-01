"use strict";
var Event = require('./Event.js'),
    _ = require('lodash');

var eventFactory = {
    _eventMap: {},
    _roots: [],
    create: (id) => {
        var output;

        if(!id) {
            throw new Error('Event requires an id');
        }

        output = eventFactory._eventMap[id]
        if(!output) {
            output = new Event(id);
            eventFactory._eventMap[id] = output;
        }
        return output;
    },
    createTimeline: (idArray) => {
        var event, previousEvent, i, newNode;

        if(!idArray || !Array.isArray(idArray) || idArray.length === 0) {
            throw new Error('idArray must be an array');
        }

        for(i=0; i<idArray.length; i++) {
            newNode = !!eventFactory._eventMap[idArray[i]];
            event = eventFactory.create(idArray[i]);
            if(i === 0) {
                if(!newNode && !_.find(eventFactory._roots, event)) {
                    eventFactory._roots.push(event);
                }
            } else {
                previousEvent.addChild(event);
            }
            previousEvent = event;
        }
    },
    getRoots: () => {
        return eventFactory._roots;
    }
};

module.exports = eventFactory