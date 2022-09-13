import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'X-RapidAPI-Host': '',
    'X-RapidAPI-Key': '',
}

const cryptoApiParams = {
    referenceCurrencyUuid: 'yhjMzLPhuIDl',
    timePeriod: '24h',
    'tiers[0]': '1',
    orderBy: 'marketCap',
    orderDirection: 'desc',
    limit: '50',
    offset: '0'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com'

const createRequest = (url, count) => { 

    cryptoApiParams.limit = count || '10';

    return {
        url, headers: cryptoApiHeaders, params: cryptoApiParams         
    }
}

const cryptoApiParamsForCoin = {
    referenceCurrencyUuid: 'yhjMzLPhuIDl', 
    timePeriod: '24h'
}

const createRequestForCoin = (url, duration) => {

    cryptoApiParamsForCoin.timePeriod = duration || '24h';

    return {
        url, headers: cryptoApiHeaders, params: cryptoApiParams
    }
}
  
const cryptoApiParamsForExchanges = {
    referenceCurrencyUuid: 'yhjMzLPhuIDl',
    limit: '50',
    offset: '0',
    orderBy: '24hVolume',
    orderDirection: 'desc'
}
const createRequestForExchanges = (url, count) => {

    cryptoApiParamsForExchanges.limit = count || '50';

    return {
        url, headers: cryptoApiHeaders, params: cryptoApiParamsForExchanges
    }
}

export const cryptoApi = createApi ({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => {
        return {
            getCryptos: builder.query({
                query: (count) => createRequest('/coins', count)
            }),
            getCryptoDetails: builder.query ({
                query: ({ coinID }) => createRequestForCoin(`/coin/${coinID}`)
            }),
            getCryptoHistory: builder.query({
                query: ({ coinID, timePeriod }) => {
                    //console.log(timePeriod);
                    return createRequestForCoin(`/coin/${coinID}/history`, timePeriod)
                }
            }),
            getExchanges: builder.query ({
                query: () => createRequestForExchanges('/exchanges')
            })
        }
    }
})

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
    useGetExchangesQuery,
} = cryptoApi;
