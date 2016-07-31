"use strict";

var parameter = {
    validateParameter: (parameter) => {
        if(!Array.isArray(parameter)) {
            return false;
        }

        for(let i=0; i<parameter.length; i++) {
            if(!Array.isArray(parameter[i])) {
                return false;
            }

            for(let j=0; j<parameter[i].length; j++) {
                if(typeof parameter[i][j] !== 'string') {
                    return false;
                }
            }
        }

        return true;
    },
    parseParameters: (arg) => {
        var valid, output = [];
        if(!arg) {
            throw new Error('Missing Parameter');
        }

        try {
            output = JSON.parse(arg);
        } catch(e) {
            throw new Error('Malformed Parameter', e)
        }

        valid = parameter.validateParameter(output);
        if(!valid) {
            throw new Error('Invalid Parameter');
        }

        return output;
    }
};
module.exports = parameter;


