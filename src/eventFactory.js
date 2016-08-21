"use strict";
var Event = require('./Event.js'),
    _ = require('lodash');

var eventFactory = {
    _roots: [],
    create: (id) => {
        var output;

        if(!id) {
            throw new Error('Event requires an id');
        }

        output = new Event(id);
        return output;
    },
    createTimeline: (idArray) => {
        var i, event, root, previousEvent;

        if(!idArray || !Array.isArray(idArray) || idArray.length === 0) {
            throw new Error('idArray must be an array');
        }

        for(i=0; i<idArray.length; i++) {
            event = eventFactory.create(idArray[i]);
            if(i === 0) {
                root = event;
            } else if(previousEvent) {
                previousEvent.nextEvent = event;
            }

            previousEvent = event;
        }

        eventFactory._roots.push(root);
        return root;
    },
    merge: (newTimeline) => {
        var i, nextEvent, output = false;
        for(i=0; i<eventFactory._roots.length; i++) {
            var root = eventFactory._roots[i];
            if(root.equals(newTimeline)) {
                output = true;
                break;
            }

            // ------
            // Detects if newTimeline is a subtree of the current root
            if(root.isSubtree(newTimeline)) {
                output = true;
                break;
            }

            // -------
            // Detects if the root is a subtree of the nextElement
            if(newTimeline.isSubtree(root)) {
                eventFactory._roots[i] = newTimeline;
                output = true;
                break;
            }


        }

        if(!output) {
            eventFactory._roots.push(newTimeline);
        }

        return output;
    },
    getRoots: () => {
        return eventFactory._roots;
    }
};

module.exports = eventFactory