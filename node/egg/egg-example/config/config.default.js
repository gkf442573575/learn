module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1523885852890_6722';

    // add your config here
    config.middleware = [];

    config.view = {
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.tpl': 'nunjucks',
        }
    }

    config.news = {
        pagesize: 5,
        serverUrl: 'https://hacker-news.firebaseio.com/v0',
    }

    return config;
};