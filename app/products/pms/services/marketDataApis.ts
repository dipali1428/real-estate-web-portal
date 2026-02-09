const REAL_APIS = {
    // === INDIAN MARKET DATA ===
    NSE_INDIA: {
        baseURL: 'https://www.nseindia.com/api',
        endpoints: {
            equityIndices: '/equity-stockIndices?index=',
            quote: '/quote-equity?symbol=',
            chartData: '/chart-databyindex?index=',
            optionChain: '/option-chain-indices?symbol='
        },
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
        }
    },

    BSE_INDIA: {
        baseURL: 'https://api.bseindia.com/BseIndiaAPI/api',
        endpoints: {
            getQuote: '/GetQuote/w',
            marketWatch: '/MarketWatch/w',
            indices: '/getIndexw',
            sectoralIndices: '/SectoralIndices/w'
        }
    },

    // === SEBI REGULATORY DATA ===
    SEBI_API: {
        baseURL: 'https://www.sebi.gov.in/',
        endpoints: {
            pmsData: 'sebiweb/other/OtherAction.do?doPms=yes',
            aifData: 'sebiweb/other/OtherAction.do?doAif=yes',
            registeredEntities: 'api/registered-entities'
        }
    },

    // === COMMERCIAL MARKET DATA APIS ===
    ALPHA_VANTAGE: {
        baseURL: 'https://www.alphavantage.co/query',
        params: {
            apikey: process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY
        }
    },

    YAHOO_FINANCE: {
        baseURL: 'https://yahoo-finance15.p.rapidapi.com/api/v1',
        headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
        }
    },

    // === PMS SPECIFIC DATA ===
    PMS_BAZAAR: {
        baseURL: 'https://pmsbazaar.com/api/v1',
        endpoints: {
            pmsList: '/pms-list',
            performance: '/performance',
            aumData: '/aum-data'
        }
    },

    // === ALTERNATIVE DATA SOURCES ===
    TRADING_ECONOMICS: {
        baseURL: 'https://api.tradingeconomics.com',
        endpoints: {
            markets: '/markets',
            indicators: '/indicators'
        },
        params: {
            c: process.env.NEXT_PUBLIC_TE_KEY
        }
    },

    // === MUTUAL FUND DATA ===
    MFAPI: {
        baseURL: 'https://api.mfapi.in/mf',
        endpoints: {
            schemeList: '/schemes',
            navHistory: '/{schemeCode}/latest'
        }
    }
};

export default REAL_APIS;
