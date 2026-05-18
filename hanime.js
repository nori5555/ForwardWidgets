var WidgetMetadata = {
    id: "hanimel_me_style",
    title: "Hanime1",
    description: "全局搜索+1080P优先+历史防掉链 (完美去警告)",
    author: "skywazzle + AI",
    site: "https://hanime1.me",
    version: "2.6.0",
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
                    value: "all",
                    enumOptions: [
                        { title: "全部", value: "all" },
                        { title: "最新上市", value: "new_release" },
                        { title: "最新上传", value: "latest_upload" },
                        { title: "本日排行", value: "daily_rank" },
                        { title: "本月排行", value: "monthly_rank" }
                    ]
                },
                { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
            ]
        },
        {
            title: "影片分类",
            description: "浏览不同分类的影片",
            requiresWebView: false,
            functionName: "loadByGenre",
            cacheDuration: 1800,
            params: [
                {
                    name: "genre",
                    title: "选择分类",
                    type: "enumeration",
                    description: "选择具体分类",
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
                    value: "all",
                    enumOptions: [
                        { title: "全部", value: "all" },
                        { title: "最新上市", value: "new_release" },
                        { title: "最新上传", value: "latest_upload" },
                        { title: "本日排行", value: "daily_rank" },
                        { title: "本月排行", value: "monthly_rank" }
                    ]
                },
                { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
            ]
        },
        {
            title: "新番预告",
            description: "查看即将上映的新番",
            requiresWebView: false,
            functionName: "loadPreviews",
            cacheDuration: 3600,
            params: []
        }
    ],
    search: {
        title: "Hanime1 搜索",
        functionName: "globalSearch",
        params: [
            { name: "keyword", title: "搜索关键词", type: "input", value: "" },
            { name: "page", title: "页码", type: "page", value: "1" }
        ]
    },
    detail: {
        title: "视频详情",
        functionName: "loadDetail"
    }
};

const BASE_URL = "https://hanime1.me";
const REQUEST_TIMEOUT = 10000; 

function getCommonHeaders() {
    return {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": BASE_URL,
        "Accept-Language": "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7"
    };
}

async function httpGetWithTimeout(url) {
    return Widget.http.get(url, {
        headers: getCommonHeaders(),
        timeout: REQUEST_TIMEOUT
    });
}

function normalizeImageUrl(src) {
    if (!src) return "";
    if (src.startsWith("//")) return "https:" + src;
    if (src.startsWith("/")) return BASE_URL + src;
    if (!src.startsWith("http")) return BASE_URL + "/" + src;
    return src;
}

async function fetchAndParse(url) {
    try {
        const response = await httpGetWithTimeout(url);
        const $ = Widget.html.load(response.data);
        const items = [];

        $('a[href*="/watch?v="]').each((i, el) => {
            const $a = $(el);
            const href = $a.attr('href');
            if (!href) return;

            let link = href;
            if (!link.startsWith('http')) {
                link = BASE_URL + (link.startsWith('/') ? '' : '/') + link;
            }

            if (items.some(it => it.link === link)) return;

            let poster = "";
            const $img = $a.find('img').first();
            if ($img.length) {
                poster = $img.attr('data-src') || $img.attr('src') || "";
                if (poster.includes('background.jpg')) {
                    poster = "";
                }
            }
            if (!poster) {
                const $cardImg = $a.closest('.search-doujin-videos, .home-rows-videos-div').find('img').first();
                if ($cardImg.length) {
                    poster = $cardImg.attr('data-src') || $cardImg.attr('src') || "";
                    if (poster.includes('background.jpg')) poster = "";
                }
            }
            poster = normalizeImageUrl(poster);

            let title = $a.find('.card-mobile-title, .home-rows-videos-title, [class*="title"]').first().text().trim();
            if (!title) {
                title = $img.attr('alt') || $a.attr('title') || "";
            }
            if (!title) return; 

            const duration = $a.find('.card-mobile-duration, .duration, [class*="time"]').first().text().trim();
            const author = $a.find('.card-mobile-user, .author, [class*="user"]').first().text().trim();

            items.push({
                id: link,
                type: "url",
                title: title,
                posterPath: poster,
                backdropPath: poster,
                mediaType: "movie",
                durationText: duration,
                description: author,
                link: link
                // 🔴 剔除画蛇添足的 videoUrl: null
            });
        });

        return items;
    } catch (e) {
        return [];
    }
}

function mapSortToApi(sortValue) {
    const map = {
        "new_release": "最新上市",
        "latest_upload": "最新上傳",
        "daily_rank": "本日排行",
        "weekly_rank": "本週排行",
        "monthly_rank": "本月排行",
        "watching": "他們在看"
    };
    return map[sortValue] || "";
}

function mapGenreToApi(genreValue) {
    const map = {
        "rifan": "裏番",
        "paomian": "泡麵番",
        "motion": "Motion Anime",
        "3dcg": "3DCG",
        "2d": "2D動畫",
        "cosplay": "Cosplay"
    };
    return map[genreValue] || "";
}

async function searchVideos(params) {
    const page = params.page || 1;
    const keyword = params.keyword || "";
    const sort = mapSortToApi(params.sort_by);

    let url = `${BASE_URL}/search?query=${encodeURIComponent(keyword)}`;
    if (sort) url += `&sort=${encodeURIComponent(sort)}`;
    if (page > 1) url += `&page=${page}`;
    return fetchAndParse(url);
}

// 供全局搜索调用的独立通道
async function globalSearch(params) {
    const page = params.page || 1;
    const keyword = params.keyword || params.query || params.wd || "";
    if (!keyword) return [{ id: "tip", type: "text", title: "请输入关键词开始搜索" }];
    
    let url = `${BASE_URL}/search?query=${encodeURIComponent(keyword)}`;
    if (page > 1
