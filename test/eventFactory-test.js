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

        it('should throw an exception if id is undefined', () => {
            assert.throws(() => {
                eventFactory.create();
            }, Error, 'Event requires an id');

            // TODO consider refactoring this to be less coupled to the actual implementation.
            assert.deepEqual(eventFactory._eventMap, {});
        });
    });

    describe('createTimeline', () => {
        it('should create a timeline with multiple events', () => {
            var input = ["e1", "e2", "e3"],
                e1 = new Event(input[0]),
                e2 = new Event(input[1]),
                e3 = new Event(input[2]),
                actual = eventFactory.createTimeline(input);
            e1.nextEvent = e2;
            e2.nextEvent = e3;

            assert.deepEqual(actual, e1);
        });
    });

    describe('merge lists', () => {
        function createBaseTree() {
            var e1 = new Event('1'),
                e2 = new Event('2'),
                e3 = new Event('3');
            e1.nextEvent = e2;
            e2.nextEvent = e3;
            return e1;
        }

        it('should push a new timeline if _roots is empty', () => {
            var event = new Event('1'),
                expectedRoots = [event],
                actual = eventFactory.merge(event);
            assert.isFalse(actual);
            assert.deepEqual(eventFactory.getRoots(), expectedRoots);
        });

        it('should merge lists if they are the same', () => {
            var o1 = createBaseTree(),
                n1 = createBaseTree(),
                actual;
            eventFactory.merge(o1);
            actual = eventFactory.merge(n1);

            assert.isTrue(actual);
            assert.deepEqual([o1], eventFactory._roots);
        });

        it('should merge if existing root is a subtree of the newTimeline', () => {
            var o1 = createBaseTree(),
                n1 = createBaseTree(),
                newEvent = new Event('NEW'),
                actual;
            eventFactory.merge(o1);

            newEvent.nextEvent = n1;
            n1 = newEvent;
            actual = eventFactory.merge(n1);

            assert.isTrue(actual);
            assert.deepEqual([n1], eventFactory._roots);
        });

        it('should merge if newTimeline is a subtree of an existing root', () => {
            var o1 = createBaseTree(),
                n1 = createBaseTree(),
                newEvent = new Event('NEW'),
                actual;
            newEvent.nextEvent = o1;
            o1 = newEvent;
            eventFactory.merge(o1);
            actual = eventFactory.merge(n1);

            assert.isTrue(actual);
            assert.deepEqual([o1], eventFactory._roots);
        });

        it('can merge an element to the end of the list', () => {

        });

        it('should merge if newTimeline is a subset of existing root', () => {

        });
    })
});