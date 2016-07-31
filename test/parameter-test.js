"use strict";

var assert = require('chai').assert,
    parameter = require('../src/parameter.js');


describe('parameters', () => {
    var validInput = [
        ["e1", "e2", "e3"],
        ["e2", "e3"],
        ["e1", "e3"]
    ];

    describe('parseParameters', () => {
        it('should resolve an array', () => {
            var input = '[]',
                actual = parameter.parseParameters(input),
                expected = [];
            assert.deepEqual(actual, expected);
        });

        it('should resolve actual arrays', () => {
            var expected = validInput,
                input = JSON.stringify(expected),
                actual = parameter.parseParameters(input);
            assert.deepEqual(actual, expected);
        });

        it('should throw exception if missing parameter', () => {
            assert.throws(
                () => {parameter.parseParameters()},
                Error, 'Missing Parameter'
            );
        });

        it('should throw exception if malformed data', () => {
            assert.throws(
                () => {parameter.parseParameters('asdf')},
                Error, 'Malformed Parameter'
            );
        });
    });

    describe('validateParameter', () => {
        it('should be true with valid input', () => {
            var actual = parameter.validateParameter(validInput);
            assert.isTrue(actual);
        });

        it('should be true with simple input', () => {
            var actual = parameter.validateParameter([]);
            assert.isTrue(actual);
        });

        it('should be false if outer object is not an array', () => {
            var actual = parameter.validateParameter({});
            assert.isFalse(actual);
        });

        it('should be false if inner object is not an array', () => {
            var actual = parameter.validateParameter([{}]);
            assert.isFalse(actual);
        });

        it('should be false if any events are not strings', () => {
            var actual = parameter.validateParameter([["e1", "e2"], [{}]]);
            assert.isFalse(actual);
        });
    });
});