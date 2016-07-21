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
});