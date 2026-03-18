module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            '@babel/plugin-syntax-import-meta',
            'babel-plugin-transform-import-meta', // 이게 핵심!
            'react-native-reanimated/plugin',     // 맨 마지막!
        ]
    };
};

