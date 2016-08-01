"use strict";

var parameter = require('./parameter.js'),
    eventFactory = require('./eventFactory.js');

console.log(process.argv);

fs.readFile(process.argv, 'utf8', function(err, data) {
    var parsedParameters, eventTreeRoots, output=[], i;

    if(err) {
        console.error("Could not open file: %s", err);
        return;
    }

    parsedParameters = parameter.parseParameters(data);
    for(i=0; i<parsedParameters.length; i++) {
        eventFactory.createTimeline(parsedParameters[i]);
    }

    eventTreeRoots = eventFactory.getRoots();
    for(i=0; i<eventTreeRoots.length; i++) {
        output.push(eventTreeRoots[i].traverse());
    }
    console.log(JSON.stringify(output));
});