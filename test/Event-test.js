"use strict";

var assert = require('chai').assert,
    Event = require('../src/Event.js');

describe('Event', () => {
    describe('Constructor', () => {
        it('should accept an event id', () => {
            var expected = 'an event id',
                actual = new Event(expected);
            assert.equal(actual.id, expected);
        });

        it('should throw an error if the id is not passed', () => {
            assert.throws(
                () => {new Event();},
                Error, 'Event requires an id'
            );
        });
    });

    describe('traverse', () => {
        it('should return itself if no children', () => {
            var expected = ['id'],
                event = new Event(expected[0]),
                actual = event.traverse();
            assert.deepEqual(actual, expected);
        });

        it('should return array if single child', () => {
            var expected = ['a', 'b'],
                root, actual;

                root = new Event(expected[0]);
                root.addChild(new Event(expected[1]));
                actual = root.traverse();
            assert.deepEqual(actual, expected);
        });

        it('should return array of arrays with more than one child', () => {
            var expected = [['a', 'b'], ['a', 'c']],
                root, actual;

            root = new Event(expected[0][0]);
            root.addChild(new Event(expected[0][1]));
            root.addChild(new Event(expected[1][1]));
            actual = root.traverse();

            assert.deepEqual(actual, expected);
        });

        it('should support arrays that split down the tree', () => {
            var expected = [['a', 'b', 'c'], ['a', 'b', 'd'], ['a', 'e']],
                a, b, c, d, e, actual;

            a = new Event(expected[0][0]);
            b = new Event(expected[0][1]);
            c = new Event(expected[0][2]);
            d = new Event(expected[1][2]);
            e = new Event(expected[2][1]);

            a.addChild(b);
            a.addChild(e);
            b.addChild(c);
            b.addChild(d);

            actual = a.traverse();

            assert.deepEqual(actual, expected);
        });
    });
});