var firstFollow = require('firstfollow');

var Production = function(symbol, derivation) {
    this.symbol = symbol;
    this.derivation = derivation;
};

var GetProductions = function(str) {
    return str.split(/;|\n/).map(function(line) {
        return line.trim();
    }).map(function(rule) {
        var data = rule.split(/->|→/);
        if (data.length < 2 || !data[0]) {
            throw 'Invalid rule ' + rule;
        }
        var symbol = data[0];
        var derivation = (data[1] || '').replace(/ε|ϵ/g, '').trim();

        return derivation.split(/\||∣/).map(function(d) {
            return new Production(
                symbol.replace(/\s+/, ''),
                d.trim().split(/\s+/)
            );
        });
    }).reduce(function(a, b) {
        return a.concat(b);
    }, []);
};




    function topDown(rules){
        var bruno = firstFollow(rules);
        var computedFirstSet = bruno.firstSet;
        var computedFollowSet = bruno.followSet;

        var productions= GetProductions(rules);
        var llTable = {};
        productions.forEach(function(prod){

            var rule=prod.symbol+'->';
            for(var j in prod.derivation){
                var x=prod.derivation[j];
                rule+=x;
            }

            if (!(prod.symbol in llTable)) {
                llTable[prod.symbol] = {};
            }

            var epsilon = false;
            prod.derivation.forEach(function(deri, index) {
                    if (deri === '') {
                        for(var i in computedFollowSet[prod.symbol]){
                            if (i === '') {
                                continue;
                            }
                            if(!(llTable[prod.symbol][i])){
                                llTable[prod.symbol][i] =[];
                            }
                            llTable[prod.symbol][i].push(rule) ;
                        }
                    }
                    else{

                            if (index === 0 || epsilon) {
                                var fSet = computedFirstSet[deri] ;
                                epsilon = '' in fSet;

                                for (var k in fSet) {
                                    if (k === '') {
                                        continue;
                                    }

                                    if(!(llTable[prod.symbol][k])){
                                        llTable[prod.symbol][k] =[];
                                    }
                                    llTable[prod.symbol][k].push(rule);
                                }

                            }
                    }
            });


            if(epsilon){
                for(var i in computedFollowSet[prod.symbol]){

                    if(!(llTable[prod.symbol][i])){
                        llTable[prod.symbol][i] =[];
                    }
                    llTable[prod.symbol][i].push(rule) ;
                }

            }

        });

        return llTable;
    }



module.exports=  topDown;





