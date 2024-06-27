import axios from 'axios'
import xmlbuilder from "xmlbuilder";

export async function handler(event, context) {
    const starredRepositoriesReleaseURLs = await fetchAllStarredRepositoriesReleaseUrls(process.env.github_username)
    const opmlFile = createOpmlFile(starredRepositoriesReleaseURLs)

    return opmlFile
}

const fetchAllStarredRepositoriesReleaseUrls = async (githubUsername) => {
    const limit = 100
    let page = 1
    let starredRepositories = []

    let lastPage = false

    while (!lastPage) {
        let responseData = await getStarredRepositories(githubUsername, page, limit)
        starredRepositories = starredRepositories.concat(responseData.map(extractDataFromRepository))

        page += 1

        if (responseData.length < limit) {
            lastPage = true
        }
    }

    return starredRepositories
}

const getStarredRepositories = async (githubUsername, page, limit) => {
    const url = `https://api.github.com/users/${githubUsername}/starred?page=${page}&per_page=${limit}`

    return (await axios.get(url, {})).data
}

const extractDataFromRepository = (repository) => {
    return {
        name: repository.name,
        description: repository.description,
        htmlUrl: repository.html_url,
        xmlUrl: repository.html_url + '/releases.atom'
    }
}

const createOpmlFile = (releaseDatas) => {
    // Create XML document
    let root = xmlbuilder
        .create('opml')
        .att('version', '2.0')

    let head = root.ele('head')
    head.ele('title', process.env.opml_title)
    head.ele('dateModified', new Date().toUTCString())
    head.ele('ownerName', process.env.opml_owner_name)
    head.ele('ownerEmail', process.env.opml_owner_email)

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

    return xmlString
}