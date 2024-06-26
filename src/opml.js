import xmlbuilder from "xmlbuilder";

export const createOpmlFile = (releaseDatas) => {
    // Create XML document
    let root = xmlbuilder
        .create('opml')
        .att('version', '2.0')

    let head = root.ele('head')
    head.ele('title', 'github-stars.opml') // TODO: Move to variable
    head.ele('dateModified', new Date().toUTCString())
    head.ele('ownerName', 'Tyler Luce') // TODO: Move to variable
    head.ele('ownerEmail', 'tjluce@mac.com') // TODO: Move to variable

    let body = root.ele('body')
    releaseDatas.forEach(data => {
        let outline = body.ele('outline')
        outline.att('text', data.name)
        outline.att('description', data.description)
        outline.att('htmlUrl', data.htmlUrl)
        outline.att('type', 'rss')
        outline.att('xmlUrl', data.xmlUrl)
    });

    var xmlString = root.end({ pretty: true});

    // Display XML string
    console.log(xmlString);
}