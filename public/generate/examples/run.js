'use strict';

// DO NOT USE THIS CODE
// It's only for demonstration purposes and not tested nor complete.
// If you need a function like this, consider the Q library and it's 
// similarly named function:
// https://github.com/kriskowal/q/wiki/API-Reference#qspawngeneratorfunction

module.exports = function run(generator) {
    var genObj = generator();
    
    function runGen(result) {
        
        var item = genObj.next(result);
        
        if (!item.done) {
            item.value
                .then(
                    function(data) {
                        runGen(data);
                    },
                    function(err) {
                        genObj.throw(err);
                        runGen();
                    }
                );
        }
    }
    
    runGen();
}
