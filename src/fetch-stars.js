import axios from 'axios'

export const fetchAllStarredRepositoriesReleaseUrls = async (githubUsername) => {
    const limit = 100
    let page = 1
    let starredRepositories = []

    let lastPage = false

    while (!lastPage) {
        let responseData = await getStarredRepositories(githubUsername, page, limit)
        starredRepositories = starredRepositories.concat(responseData.map(extractReleasesUrlFromRepository))

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

const extractReleasesUrlFromRepository = (repository) => {
    return repository.html_url + '/releases.atom'
}