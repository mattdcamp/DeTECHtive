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

    describe('equals', () => {
        it('should be equal if id matches and no children', () => {
            var e1, e2, id = 'one';
            e1 = new Event(id);
            e2 = new Event(id);

            assert.isTrue(e1.equals(e2));
            assert.isTrue(e2.equals(e1));
        });

        it('should not be equal if id does not match', () => {
            var e1, e2;
            e1 = new Event('one');
            e2 = new Event('two');

            assert.isFalse(e1.equals(e2));
            assert.isFalse(e2.equals(e1));
        });

        it('should be equal if id matches and children match', () => {
            var e1, e2, a1, a2;
            e1 = new Event('one');
            e2 = new Event('two');
            e1.nextEvent = e2;

            a1 = new Event('one');
            a2 = new Event('two');
            a1.nextEvent = a2;

            assert.isTrue(e1.equals(a1));
            assert.isTrue(a1.equals(e1));
        });

        it('should not be equal if children do not match', () => {
            var e1, e2, a1, a2;
            e1 = new Event('one');
            e2 = new Event('two');
            e1.nextEvent = e2;

            a1 = new Event('one');
            a2 = new Event('three');
            a1.nextEvent = a2;

            assert.isFalse(e1.equals(a1));
            assert.isFalse(a1.equals(e1));
        });
    });

    describe('isSubtree', () => {
        it('should return true if nodes match', () => {
            var e1, e2, a1, a2;
            e1 = new Event('one');
            e2 = new Event('two');
            e1.nextEvent = e2;

            a1 = new Event('one');
            a2 = new Event('two');
            a1.nextEvent = a2;

            assert.isTrue(e1.isSubtree(a1));
            assert.isTrue(e1.isSubtree(a1));
        });

        it('should return true if otherEvent is a subtree of the existing event', () => {
            var e1, e2, a1;
            e1 = new Event('one');
            e2 = new Event('two');
            e1.nextEvent = e2;

            a1 = new Event('two');

            assert.isTrue(e1.isSubtree(a1));
        });

        it('should return false if otherEvent is not a subtree', () => {
            var e1, e2, a1;
            e1 = new Event('one');
            e2 = new Event('two');
            e1.nextEvent = e2;

            a1 = new Event('three');

            assert.isFalse(e1.isSubtree(a1));
        })
    })
});