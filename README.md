# @prabhatsharma/xml2json

This is an XML to json converter that provides much more beautiful output than any other javascript converter that Ihave come across. I tried xml2js and others but each one of them gave me unweildy json from xml which was very difficult to read and consume.

I also needed the functionality where I want to skip parsing of a specific tag and return it as it is. This converter has this functionality too.

So here we go!

# sample usage 

```javascript
var fs = require('fs');
const util = require('util')
var parser = require('@prabhatsharma/xml2json')

// var filename = __dirname + '/test-bigfile.xml'
var filename = __dirname + '/test-smallfile.xml'
fs.readFile(filename, function (err, data) {
    var xml = data.toString('utf8')
    var processedObject = parser.parse(xml, 'text')
    console.log( util.inspect(processedObject, {showHidden: false, depth: null}).replace(/([{,])(\s*)([A-Za-z0-9_\-]+?)\s*:/g, '$1"$3":'))
})
```

```xml
<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet href="http://www.accessdata.fda.gov/spl/stylesheet/spl.xsl" type="text/xsl"?>
<document> 
    <publisher location="San Francisco">Manning</publisher>
    <author>
        <firstname aka="Bablu">Prabhat</firstname>
        <lastnmame>Sharma</lastnmame>
        <text> <p>Something in html</p> </text>
    </author>
    <books>
        <favoriteGenre>12345</favoriteGenre>
        <book>
            <title>A small book</title>
        </book>
        <book>
            <title>A big book</title>
        </book>
    </books>
</document>
```

will result in:

```json
{"publisher": {
  "attr": {"location": 'San Francisco' },
  "text": 'Manning' },
"author": {
  "firstname": {"attr": {"aka": 'Bablu' },"text": 'Prabhat' },
  "lastnmame": {"text": 'Sharma' },
  "text": '<text>    <p>Something in html</p>  </text>'
  },
"books": {
  "favoriteGenre": {"text": '12345' },
  "book": [
      {"title": {"text": 'A small book' } },
      {"title": {"text": 'A big book' } }
    ]
  }
}
```
