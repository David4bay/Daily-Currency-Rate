const credentials = {
    Google_Client_Id: process.env.GOOGLE_CLIENT_ID,
    Google_Client_Secret: process.env.GOOGLE_CLIENT_SECRET,
    Twitter_Client_Id: process.env.TWITTER_CONSUMER_KEY,
    Twitter_Client_Secret: process.env.TWITTER_CONSUMER_SECRET,
    DBUsername: process.env.DB_USERNAME,
    DBPassword: encodeURIComponent(process.env.DB_PASSWORD),
    DB_URL: process.env.SESSION_DATABASE,
    DB_NAME: process.env.SESSION_DATABASE_NAME,
    SESSION_COLLECTION: process.env.SESSION_COLLECTION,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    CURRENCY_API: process.env.CURRENCY_API,
    CURRENCIES_API: process.env.CURRENCIES_API,
    CURRENCIES_CHART_API: process.env.CURRENCIES_CHART_API
}

module.exports = credentials