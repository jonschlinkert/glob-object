var globObject = require('./');

console.log(globObject('a.*.f', {a: {b: {c: 'd'}, e: {f: 'g'}}}));
//=> { a: { e: { f: 'g' } } }
