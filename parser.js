var xmldoc = require('xmldoc');

exports.parse = function (xml, tagToNotParse) {
    var document = new xmldoc.XmlDocument(xml)
    return processElement(document, tagToNotParse)
}

var processElement = function (element, tagToNotParse) {
    var jsonObject = {}

    if (element.name == tagToNotParse) {  // do not process anything under the particular tag. Return as it is.
        jsonObject = element.toString().replace(/undefined/g, '').replace(/\n/g, '').replace(/\t/g, '') // remove extraneous characters
    } else if (element.children) {
        for (var i = 0; i < element.children.length; i++) {
            if (element.children[i].name && getChildCount(element)[element.children[i].name] > 1) { // a duplicate child
                if (!jsonObject[element.children[i].name]) {
                    jsonObject[element.children[i].name] = []
                }

                var processedItem = processElement(element.children[i], tagToNotParse)

                if (!Object.keys(element.children[i].attr).length == 0) {
                    processedItem.attr = element.children[i].attr
                }

                var text = element.children[i].val.replace(/(\r\n|\n|\r)/gm, "").trim()
                if (text) {
                    processedItem.text = text
                }

                jsonObject[element.children[i].name].push(processedItem)
            } else if (element.children[i].name) { // not a duplicate child
                {
                    jsonObject[element.children[i].name] = processElement(element.children[i], tagToNotParse)

                    if (!Object.keys(element.children[i].attr).length == 0) {
                        jsonObject[element.children[i].name].attr = element.children[i].attr
                    }

                    var text = element.children[i].val.replace(/(\r\n|\n|\r)/gm, "").trim()
                    if (text) {
                        jsonObject[element.children[i].name].text = text
                    }
                }
            }
        }
    }

    return jsonObject
}


// check if duplicate tags - // multiple children with same name. e.g. multiple <book> tags in <books>
var getChildCount = function (element) {
    var existingNames = {}
    for (var i = 0; i < element.children.length; i++) {
        if (element.children[i].name && existingNames[element.children[i].name]) {
            existingNames[element.children[i].name] += 1
        } else if (element.children[i].name) {
            existingNames[element.children[i].name] = 1
        }
    }
    return existingNames
}