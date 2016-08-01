"use strict";

var assert = require('chai').assert,
    eventFactory = require('../src/eventFactory.js'),
    Event = require('../src/Event.js'),
    _ = require('lodash');

describe('eventFactory', () => {
    afterEach(() => {
        // TODO consider refactoring this clear to be a method. We need to know too much about the implementation right
        //      now
        eventFactory._eventMap = {};
        eventFactory._roots = [];
    });

    describe('create', () => {
        it('should return an Event object with matching ID', () => {
            var expectedId = 'some event',
                actual = eventFactory.create(expectedId);

            assert.instanceOf(actual, Event);
            assert.equal(actual.id, expectedId);
        });

        it('should return the same instance of an object if it already exists', () => {
            var e1 = eventFactory.create('e1'),
                e2 = eventFactory.create('e1');

            // by changing something in e1, before we compare we are making sure we are looking at the same instance
            // because the reference is the same, both should have the new ID
            e1._id = 'something changed';
            assert.deepEqual(e1, e2);
        });

        it('should throw an exception if id is undefined', () => {
            assert.throws(() => {
                eventFactory.create();
            }, Error, 'Event requires an id');

            // TODO consider refactoring this to be less coupled to the actual implementation.
            assert.deepEqual(eventFactory._eventMap, {});
        });
    });

    describe('createTimeline', () => {
        it('should create a new root for new timelines', () => {
            var expectedRoots = ['e1', 'e2'], actual;
            eventFactory.createTimeline([expectedRoots[0]]);
            eventFactory.createTimeline([expectedRoots[1]]);
            actual = eventFactory.getRoots();

            assert.deepEqual(_.map(actual, 'id'), expectedRoots);
        });

        it('should reuse roots if one already exists', () => {
            var expectedRoots = ['e1'], actual;
            eventFactory.createTimeline([expectedRoots[0]]);
            eventFactory.createTimeline([expectedRoots[0], 'e2']);
            actual = eventFactory.getRoots();

            assert.deepEqual(_.map(actual, 'id'), expectedRoots);
        });

        it('should create create a simple chain', () => {
            var expectedNodes = ['e1', 'e2', 'e3'], roots;
            eventFactory.createTimeline(expectedNodes);
            roots = eventFactory.getRoots();

            assert.equal(roots.length, 1);
            assert.equal(roots[0].id, expectedNodes[0]);
            assert.equal(roots[0]._nextEvents[0].id, expectedNodes[1]);
            assert.equal(roots[0]._nextEvents[0]._nextEvents[0].id, expectedNodes[2]);
        });

        it('should not create a root if already defined', () => {
            var expectedRoots = 'e1', roots;
            eventFactory.createTimeline([expectedRoots, 'e2']);
            eventFactory.createTimeline(['e2']);

            roots = eventFactory.getRoots();
            assert.equal(roots.length, 1);
            assert.equal(roots[0].id, expectedRoots);
        });

        it('should throw an exception if not an array', () => {
            assert.throws(() => {
                eventFactory.createTimeline();
            }, Error, 'idArray must be an array');

            assert.throws(() => {
                eventFactory.createTimeline('id');
            }, Error, 'idArray must be an array');

            assert.throws(() => {
                eventFactory.createTimeline({});
            }, Error, 'idArray must be an array');
        });
    });
});