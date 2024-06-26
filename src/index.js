import { fetchAllStarredRepositoriesReleaseUrls } from './fetch-stars.js'

const starredRepositoriesReleaseURLs = await fetchAllStarredRepositoriesReleaseUrls('luceleaftea')

console.log(starredRepositoriesReleaseURLs)