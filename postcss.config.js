module.exports = {
    plugins: {
        autoprefixer: {},
        "postcss-px-to-viewport": {
            viewportWidth: 375, //视窗的宽度
            viewportHeight: 667, //视窗的高度
            unitPrecision: 5, //指定px转换为视窗单位制的小数位数
            viewportUnit: 'vw', //指定需要转换的视窗单位，建议用vw
            selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'], //指定不需要装换的类
            minPixelValue: 1,
            mediaQuery: false //允许在媒体查询中使用px
        }
    }
}