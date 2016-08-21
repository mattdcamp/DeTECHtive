"use strict";

var assert = require('chai').assert,
    eventFactory = require('../src/eventFactory.js');

describe('integration tests', () => {
    afterEach(() => {
        // TODO consider refactoring this clear to be a method. We need to know too much about the implementation right
        //      now
        eventFactory._eventMap = {};
        eventFactory._roots = [];
    });

    //function testScenario(input, expected) {
    //    var i, roots, actual = []
    //    for (i = 0; i < input.length; i++) {
    //        eventFactory.createTimeline(input[i]);
    //    }
    //
    //    roots = eventFactory.getRoots();
    //    for (i = 0; i < roots.length; i++) {
    //        actual = actual.concat(roots[i].traverse());
    //    }
    //    console.log(actual);
    //    console.log('------')
    //    console.log(expected);
    //    assert.sameDeepMembers(actual, expected);
    //}

    //it('should complete the mergePossible correctly', () => {
    //    var input = [
    //            ["fight", "gunshot", "fleeing"],
    //            ["gunshot", "falling", "fleeing"]
    //        ],
    //        expected = [
    //            ["fight", "gunshot", "falling", "fleeing"]
    //        ];
    //    testScenario(input, expected);
    //});

    // it('should complete the partialMerge correctly', () => {
    //    var input = [
    //            ["shadowy figure", "demands", "scream", "siren"],
    //            ["shadowy figure", "pointed gun", "scream"]
    //        ],
    //        expected = [
    //            ["shadowy figure", "demands", "scream", "siren"],
    //            ["shadowy figure", "pointed gun", "scream", "siren"]
    //        ];
    //    testScenario(input, expected);
    //});

    //it('should complete the noMerge correctly', () => {
    //    var input = [
    //            ["argument", "coverup", "pointing"],
    //            ["press brief", "scandal", "pointing"],
    //            ["argument", "bribe"]
    //        ],
    //        expected = [
    //            ["argument", "coverup", "pointing"],
    //            ["press brief", "scandal", "pointing"],
    //            ["argument", "bribe"]
    //        ];
    //    testScenario(input, expected);
    //});
});