var WidgetMetadata = {
    id: "hanimel_me_style",
    title: "Hanime1修复",
    description: "全局搜索 + 1080P优先 + 解决退出报缺失数据",
    author: "skywazzle",
    site: "[https://hanime1.me](https://hanime1.me)",
    version: "2.4.2",
    requiredVersion: "0.0.2",
    detailCacheDuration: 300,
    modules: [
        {
            title: "搜索影片",
            description: "搜索 Hanime1 影片内容",
            requiresWebView: false,
            functionName: "searchVideos",
            cacheDuration: 1800,
            params: [
                {
                    name: "keyword",
                    title: "搜索关键词",
                    type: "input",
                    description: "输入搜索关键词（标题、番号、作者等）",
                    value: ""
                },
                {
                    name: "sort_by",
                    title: "排序",
                    type: "enumeration",
                    description: "排序方式",
                    value: "all",
                    enumOptions: [
                        { title: "全部", value:
