import { fetchAllStarredRepositoriesReleaseUrls } from './fetch-stars.js'
import { createOpmlFile } from './opml.js'

const starredRepositoriesReleaseURLs = await fetchAllStarredRepositoriesReleaseUrls('luceleaftea')
createOpmlFile(starredRepositoriesReleaseURLs)

// console.log(starredRepositoriesReleaseURLs)