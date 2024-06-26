import xmlbuilder from "xmlbuilder";

export const createOpmlFile = (releaseURLs) => {
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
    releaseURLs.forEach(releaseUrl => {
        let outline = body.ele('outline')
        outline.att('text', 'Test Name') // TODO: Pull from object
        outline.att('description', 'Test Description') // TODO: Pull from object
        outline.att('htmlUrl', 'http://google.com') // TODO: Pull from object
        outline.att('type', 'rss')
        outline.att('xmlUrl', releaseUrl)
    });

    var xmlString = root.end({ pretty: true});

    // Display XML string
    console.log(xmlString);
}