var fs = require('fs');
const util = require('util')
var parser = require('./parser')

// var filename = __dirname + '/test-bigfile.xml'
var filename = __dirname + '/test-smallfile.xml'
fs.readFile(filename, function (err, data) {
    var xml = data.toString('utf8')
    var processedObject = parser.parse(xml, 'text')
    console.log( util.inspect(processedObject, {showHidden: false, depth: null}).replace(/([{,])(\s*)([A-Za-z0-9_\-]+?)\s*:/g, '$1"$3":'))
})
