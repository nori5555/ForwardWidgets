var WidgetMetadata = {
    id: "hanimel_me_style",
    title: "Hanime1完美版",
    description: "全局搜索+优先1080P+消灭数据缺失警告",
    author: "skywazzle + AI",
    site: "https://hanime1.me",
    version: "2.5.1", 
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
const REQUEST_TIMEOUT = 10000; // 10秒超时

function getCommonHeaders() {
    return {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": BASE_URL,
        "Accept-Language": "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7"
    };
}

/**
 * 带超时的 HTTP GET 请求
 */
async function httpGetWithTimeout(url) {
    return Widget.http.get(url, {
        headers: getCommonHeaders(),
        timeout: REQUEST_TIMEOUT
    });
}

/**
 * 标准化图片 URL
 */
function normalizeImageUrl(src) {
    if (!src) return "";
    if (src.startsWith("//")) return "https:" + src;
    if (src.startsWith("/")) return BASE_URL + src;
    if (!src.startsWith("http")) return BASE_URL + "/" + src;
    return src;
}

/**
 * 解析列表页面
 */
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
                if (poster.includes('background.jpg')) poster = "";
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
            if (!title) title = $img.attr('alt') || $a.attr('title') || "";
            if (!title) return; 

            const duration = $a.find('.card-mobile-duration, .duration, [class*="time"]').first().text().trim();
            const author = $a.find('.card-mobile-user, .author, [class*="user"]').first().text().trim();

            items.push({
                id: link,
                type: "url", 
                videoUrl: null, // 🔴 修复核心：显式占位，防止退出时 APP 反序列化抛警告
                title: title,
                posterPath: poster,
                backdropPath: poster,
                mediaType: "movie",
                durationText: duration,
                description: author,
                link: link
            });
        });

        return items;
    } catch (e) {
        return [{ id: "err", type: "text", title: "加载失败", subTitle: "请检查网络" }];
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

// --- 模块功能函数 ---

async function searchVideos(params) {
    const page = params.page || 1;
    const keyword = params.keyword || "";
    const sort = mapSortToApi(params.sort_by);

    let url = `${BASE_URL}/search?query=${encodeURIComponent(keyword)}`;
    if (sort) url += `&sort=${encodeURIComponent(sort)}`;
    if (page > 1) url += `&page=${page}`;
    return fetchAndParse(url);
}

async function globalSearch(params) {
    const page = params.page || 1;
    const keyword = params.keyword || params.query || params.wd || "";
    if (!keyword) return [{ id: "tip", type: "text", title: "请输入关键词开始搜索" }];
    
    let url = `${BASE_URL}/search?query=${encodeURIComponent(keyword)}`;
    if (page > 1) url += `&page=${page}`;
    return fetchAndParse(url);
}

async function loadDailyHot(params) {
    const page = params.page || 1;
    let url = `${BASE_URL}/search?sort=${encodeURIComponent('本日排行')}`;
    if (page > 1) url += `&page=${page}`;
    return fetchAndParse(url);
}

async function loadWeeklyHot(params) {
    const page = params.page || 1;
    let url = `${BASE_URL}/search?sort=${encodeURIComponent('本週排行')}`;
    if (page > 1) url += `&page=${page}`;
    return fetchAndParse(url);
}

async function loadMonthlyHot(params) {
    const page = params.page || 1;
    let url = `${BASE_URL}/search?sort=${encodeURIComponent('本月排行')}`;
    if (page > 1) url += `&page=${page}`;
    return fetchAndParse(url);
}

async function loadNewRelease(params) {
    const page = params.page || 1;
    let url = `${BASE_URL}/search?sort=${encodeURIComponent('最新上市')}`;
    if (page > 1) url += `&page=${page}`;
    return fetchAndParse(url);
}

async function loadChineseSubtitle(params) {
    const page = params.page || 1;
    const sort = mapSortToApi(params.sort_by);
    const genre = mapGenreToApi(params.genre);

    let url = `${BASE_URL}/search?tags%5B%5D=${encodeURIComponent('中文字幕')}`;

    if (sort) url += `&sort=${encodeURIComponent(sort)}`;
    if (genre) url += `&genre=${encodeURIComponent(genre)}`;
    if (page > 1) url += `&page=${page}`;

    return fetchAndParse(url);
}

async function loadByGenre(params) {
    const page = params.page || 1;
    const genre = mapGenreToApi(params.genre);
    const sort = mapSortToApi(params.sort_by);

    let url = `${BASE_URL}/search`;
    const queryParts = [];
    if (genre) queryParts.push(`genre=${encodeURIComponent(genre)}`);
    if (sort) queryParts.push(`sort=${encodeURIComponent(sort)}`);
    if (page > 1) queryParts.push(`page=${page}`);

    if (queryParts.length > 0) {
        url += '?' + queryParts.join('&');
    }

    return fetchAndParse(url);
}

function parsePreviewsHtml(html) {
    const $ = Widget.html.load(html);
    const items = [];

    $('.hidden-sm.hidden-md.hidden-lg .preview-image-modal-trigger').each((i, el) => {
        const $img = $(el);
        const poster = $img.attr('src') || $img.attr('data-src');
        if (!poster) return;

        let title = $img.attr('alt') || "";
        if (!title) {
            const $caption = $img.closest('div').find('h5.caption');
            if ($caption.length) {
                title = $caption.text().trim();
                title = title.split('\n')[0];
            }
        }
        if (!title) title = "新番预告";
        if (title.length > 40) title = title.substring(0, 40) + "...";

        const link = window.location.href; 

        items.push({
            id: link,
            type: "url",
            videoUrl: null, // 🔴 修复核心：显式占位
            title: title,
            posterPath: normalizeImageUrl(poster),
            backdropPath: normalizeImageUrl(poster),
            mediaType: "movie",
            description: "新番预告",
            link: link
        });
    });

    return items;
}

async function loadPreviews(params) {
    const d = new Date();
    const year = d.getFullYear();
    let month = d.getMonth() + 1;
    if (month < 10) month = '0' + month;

    const url = `${BASE_URL}/previews/${year}${month}`;

    try {
        const response = await httpGetWithTimeout(url);
        return parsePreviewsHtml(response.data);
    } catch (e) {
        return [];
    }
}

async function loadDetail(item) {
    let targetId = typeof item === 'object' ? (item.id || item.link) : item;
    if (!targetId || typeof targetId !== 'string') throw new Error("参数错误");

    let fetchUrl = targetId;
    if (fetchUrl.includes("_ep")) {
        fetchUrl = fetchUrl.split("_ep")[0];
    }

    try {
        const response = await httpGetWithTimeout(fetchUrl);
        const $ = Widget.html.load(response.data);

        let videoUrl = "";
        const qualityIds = ['#video-1080p', '#video-720p', '#video-hd', '#video-sd'];
        for (const id of qualityIds) {
            const val = $(id).val();
            if (val) {
                videoUrl = val;
                break;
            }
        }

        if (!videoUrl) {
            const match = response.data.match(/source\s*=\s*['"](https:\/\/[^'"]+)['"]/);
            if (match) videoUrl = match[1];
        }

        if (!videoUrl) {
            videoUrl = $('video source').attr('src');
        }

        if (!videoUrl) {
            throw new Error("可能需要登录或资源已失效");
        }

        videoUrl = videoUrl.replace(/&amp;/g, '&');

        const title = $('meta[property="og:title"]').attr('content') || "标题未知";
        const desc = $('meta[property="og:description"]').attr('content') || "";
        const cover = $('meta[property="og:image"]').attr('content') || "";

        const childItems = [];
        $('.home-rows-videos-div a[href*="/watch?v="]').each((i, el) => {
            if (i >= 10) return false; 

            const $a = $(el);
            let recLink = $a.attr('href');
            if (!recLink) return;
            if (!recLink.startsWith('http')) {
                recLink = BASE_URL + (recLink.startsWith('/') ? '' : '/') + recLink;
            }

            const $img = $a.find('img').first();
            let recPoster = $img.attr('data-src') || $img.attr('src') || "";
            recPoster = normalizeImageUrl(recPoster);

            let recTitle = $a.find('.home-rows-videos-title, [class*="title"]').first().text().trim();
            if (!recTitle) recTitle = $img.attr('alt') || "相关视频";

            childItems.push({
                id: recLink,
                type: "url", 
                videoUrl: null, // 🔴 修复核心：显式占位
                title: recTitle,
                posterPath: recPoster,
                backdropPath: recPoster,
                mediaType: "movie",
                link: recLink
            });
        });

        return {
            id: fetchUrl,
