var WidgetMetadata = {
    id: "hanimel_me_style",
    title: "Hanime1",
    description: "全局搜索+优先1080P+历史防掉链+横版封面",
    author: "skywazzle + AI",
    site: "https://hanime1.me",
    version: "2.6.0", // 版本号升级
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
                        { title: "全部", value: "all" },
                        { title: "最新上市", value: "new_release" },
                        { title: "最新上传", value: "latest_upload" },
                        { title: "本日排行", value: "daily_rank" },
                        { title: "本周排行", value: "weekly_rank" },
                        { title: "本月排行", value: "monthly_rank" },
                        { title: "他们在看", value: "watching" }
                    ]
                },
                { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
            ]
        },
        {
            title: "本日热门",
            description: "本日热门影片",
            requiresWebView: false,
            functionName: "loadDailyHot",
            cacheDuration: 1800,
            params: [
                { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
            ]
        },
        {
            title: "本周热门",
            description: "本周热门影片",
            requiresWebView: false,
            functionName: "loadWeeklyHot",
            cacheDuration: 1800,
            params: [
                { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
            ]
        },
        {
            title: "本月热门",
            description: "本月热门影片",
            requiresWebView: false,
            functionName: "loadMonthlyHot",
            cacheDuration: 1800,
            params: [
                { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
            ]
        },
        {
            title: "最新上市",
            description: "最新上市影片",
            requiresWebView: false,
            functionName: "loadNewRelease",
            cacheDuration: 1800,
            params: [
                { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
            ]
        },
        {
            title: "中文字幕",
            description: "中文字幕影片",
            requiresWebView: false,
            functionName: "loadChineseSubtitle",
            cacheDuration: 1800,
            params: [
                {
                    name: "genre",
                    title: "分类",
                    type: "enumeration",
                    description: "筛选分类",
                    value: "all",
                    enumOptions: [
                        { title: "全部", value: "all" },
                        { title: "里番", value: "rifan" },
                        { title: "泡面番", value: "paomian" },
                        { title: "Motion Anime", value: "motion" },
                        { title: "3DCG", value: "3dcg" },
                        { title: "2D 动画", value: "2d" },
                        { title: "Cosplay", value: "cosplay" }
                    ]
                },
                {
                    name: "sort_by",
                    title: "排序",
                    type: "enumeration",
                    description: "排序方式",
                    value: "all
