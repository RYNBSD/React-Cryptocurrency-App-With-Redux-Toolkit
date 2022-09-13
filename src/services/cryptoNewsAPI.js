import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'https://bing-news-search1.p.rapidapi.com'

const cryptoNewsApiHeaders = {
    'X-BingApis-SDK': '',
    'X-RapidAPI-Key': '',
    'X-RapidAPI-Host': ''    
}

/*
    News Category
*/
const cryptoNewsApiParamsForNewsCategory = {
    safeSearch: 'Off', textFormat: 'Raw'    
}

const createRequestForNewsCategory = (url) => {
    return {
        url, 
        headers: cryptoNewsApiHeaders, 
        params: cryptoNewsApiParamsForNewsCategory
    }
}

/*
    News Search
*/
const cryptoNewsApiParamsForNewsSearch = {
    q: 'crypto', 
    freshness: 'Day', 
    textFormat: 'Raw', 
    safeSearch: 'Off'
}
const createRequestForNewsSearch = (url, q) => {
    cryptoNewsApiParamsForNewsSearch.q = q || 'crypto';

    return {
        url, 
        headers: cryptoNewsApiHeaders, 
        params: cryptoNewsApiParamsForNewsSearch
    }
}

/*
    News Trending
*/
const cryptoNewsApiParamsForNewsTrending = {
    textFormat: 'Raw', 
    safeSearch: 'Off'
}
const createRequestForNewsTrending = (url) => {
    return {
        url, 
        headers: cryptoNewsApiHeaders, 
        params: cryptoNewsApiParamsForNewsTrending
    }
}

export const cryptoNewsApi = createApi ({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => {
        return {
            getCryptoNewsCategory: builder.query ({
                query: () => createRequestForNewsCategory('/news')
            }),
            getCryptoNewsSearch: builder.query ({
                query: (q) => createRequestForNewsSearch('/news/search', q)
            }),
            getCryptoNewsTrending: builder.query ({
                query: () => createRequestForNewsTrending('/news/trendingtopics')
            })
        }
    }
})

export const {
    useGetCryptoNewsCategoryQuery,
    useGetCryptoNewsSearchQuery,
    useGetCryptoNewsTrendingQuery,
} = cryptoNewsApi