var WidgetMetadata = {
    id: "hanime1",
    title: "Hanime1",
    description: "统一版：全局搜索、排行、分类、高级检索、新番预告",
    author: "TaYhu|EL",
    site: "https://hanime1.me",
    version: "3.0.0",
    requiredVersion: "0.0.2",
    detailCacheDuration: 300,
    search: {
        title: "🌐 全局搜索",
        functionName: "searchGlobal",
        params: [
            { name: "keyword", title: "关键词", type: "input", description: "搜索的关键词", value: "" },
            { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
        ]
    },
    modules: [
        {
            title: "统一搜索",
            description: "普通搜索、日常精选、手动翻页",
            requiresWebView: false,
            functionName: "searchVideos",
            cacheDuration: 600,
            params: [
                { name: "keyword", title: "搜索关键词", type: "input", description: "输入关键词", value: "" },
                {
                    name: "mode",
                    title: "搜索模式",
                    type: "enumeration",
                    description: "选择检索方式",
                    value: "normal",
                    enumOptions: [
                        { title: "普通搜索", value: "normal" },
                        { title: "日常精选", value: "daily" },
                        { title: "手动翻页", value: "manual" }
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
                        { title: "本周排行", value: "weekly_rank" },
                        { title: "本月排行", value: "monthly_rank" },
                        { title: "他们在看", value: "watching" }
                    ]
                },
                { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
            ]
        },
        {
            title: "高级筛选",
            description: "多标签组合过滤",
            requiresWebView: false,
            functionName: "loadAdvancedGenre",
            cacheDuration: 600,
            params: [
                {
                    name: "genre",
                    title: "基础大分类",
                    type: "enumeration",
                    description: "选择主分类",
                    value: "all",
                    enumOptions: [
                        { title: "全部", value: "all" },
                        { title: "里番", value: "rifan" },
                        { title: "泡面番", value: "paomian" },
                        { title: "Motion Anime", value: "motion" },
                        { title: "3DCG", value: "3dcg" },
                        { title: "2D 动画", value: "2d" },
                        { title: "2.5D", value: "2_5d" },
                        { title: "AI 生成", value: "ai" },
                        { title: "MMD", value: "mmd" },
                        { title: "Cosplay", value: "cosplay" }
                    ]
                },
                {
                    name: "sort_by",
                    title: "排序方式",
                    type: "enumeration",
                    description: "排序规则",
                    value: "all",
                    enumOptions: [
                        { title: "全部", value: "all" },
                        { title: "最新上市", value: "new_release" },
                        { title: "最新上传", value: "latest_upload" },
                        { title: "本日排行", value: "daily_rank" },
                        { title: "本周排行", value: "weekly_rank" },
                        { title: "本月排行", value: "monthly_rank" },
                        { title: "观看次数", value: "views" },
                        { title: "点赞比例", value: "likes" },
                        { title: "时长最长", value: "duration" },
                        { title: "他们在看", value: "watching" }
                    ]
                },
                {
                    name: "upload_time",
                    title: "发布日期",
                    type: "enumeration",
                    description: "筛选发布时间",
                    value: "all",
                    enumOptions: [
                        { title: "全部", value: "all" },
                        { title: "过去 24 小时", value: "24h" },
                        { title: "过去 2 天", value: "2d" },
                        { title: "过去 1 周", value: "1w" },
                        { title: "过去 1 个月", value: "1m" },
                        { title: "过去 3 个月", value: "3m" },
                        { title: "过去 1 年", value: "1y" }
                    ]
                },
                {
                    name: "duration_filter",
                    title: "时长范围",
                    type: "enumeration",
                    description: "筛选影片时长",
                    value: "all",
                    enumOptions: [
                        { title: "全部", value: "all" },
                        { title: "1 分钟 +", value: "1m_plus" },
                        { title: "5 分钟 +", value: "5m_plus" },
                        { title: "10 分钟 +", value: "10m_plus" },
                        { title: "20 分钟 +", value: "20m_plus" },
                        { title: "30 分钟 +", value: "30m_plus" },
                        { title: "60 分钟 +", value: "60m_plus" },
                        { title: "0 - 10 分钟", value: "0_10m" },
                        { title: "0 - 20 分钟", value: "0_20m" }
                    ]
                },
                { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
            ]
        },
        {
            title: "排行榜",
            description: "热门与最新影片榜单",
            requiresWebView: false,
            functionName: "loadHotRankings",
            cacheDuration: 300,
            params: [
                {
                    name: "list_type",
                    title: "榜单类型",
                    type: "enumeration",
                    description: "选择你想看的榜单",
                    value: "watching",
                    enumOptions: [
                        { title: "他们在看", value: "watching" },
                        { title: "最新上传", value: "latest_upload" },
                        { title: "本日排行", value: "daily_rank" },
                        { title: "本周排行", value: "weekly_rank" },
                        { title: "本月排行", value: "monthly_rank" },
                        { title: "最新上市", value: "new_release" }
                    ]
                },
                { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
            ]
        },
        {
            title: "分类浏览",
            description: "按分类浏览影片",
            requiresWebView: false,
            functionName: "loadByGenre",
            cacheDuration: 600,
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
    ]
};

const BASE_URL = "https://hanime1.me";
const REQUEST_TIMEOUT = 10000;

function getCommonHeaders(refererUrl = BASE_URL + "/") {
    return {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": refererUrl,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1"
    };
}

async function httpGetWithTimeout(url, referer) {
    return Widget.http.get(url, {
        headers: getCommonHeaders(referer),
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

function normalizeWatchUrl(href) {
    if (!href) return "";
    if (href.startsWith("http")) return href;
    if (href.startsWith("/")) return BASE_URL + href;
    return BASE_URL + "/" + href;
}

function stripHtmlText(text) {
    return (text || "").replace(/\s+/g, " ").trim();
}

function safeText(text, fallback = "") {
    const value = stripHtmlText(text);
    return value || fallback;
}

function convertToTraditional(text) {
    if (!text) return "";
    const map = {
        "无码": "無碼",
        "AI解码": "AI解碼",
        "断面图": "斷面圖",
        "里番": "裏番",
        "泡面番": "泡麵番",
        "中文字幕": "中文字幕",
        "中文配音": "中文配音",
        "傲娇": "傲嬌",
        "病娇": "病嬌",
        "性奴隶": "性奴隸",
        "出轨": "出軌",
        "性转换": "性轉換",
        "婚纱": "婚紗",
        "淫纹": "淫紋",
        "身体写字": "身體寫字",
        "舔脚": "舔腳",
        "一字马": "一字馬"
    };
    let result = text;
    for (const [s, t] of Object.entries(map)) result = result.split(s).join(t);
    return result;
}

function mapSortToApi(v) {
    const m = {
        "new_release": "最新上市",
        "latest_upload": "最新上傳",
        "daily_rank": "本日排行",
        "weekly_rank": "本週排行",
        "monthly_rank": "本月排行",
        "views": "觀看次數",
        "likes": "點讚比例",
        "duration": "時長最長",
        "watching": "他們在看"
    };
    return m[v] || "";
}

function mapGenreToApi(v) {
    const m = {
        "rifan": "裏番",
        "paomian": "泡麵番",
        "motion": "Motion Anime",
        "3dcg": "3DCG",
        "2d": "2D動畫",
        "2_5d": "2.5D",
        "ai": "AI生成",
        "mmd": "MMD",
        "cosplay": "Cosplay"
    };
    return m[v] || "";
}

function mapTimeToApi(v) {
    const m = { "24h": "過去 24 小時", "2d": "過去 2 天", "1w": "過去 1 週", "1m": "過去 1 個月", "3m": "過去 3 個月", "1y": "過去 1 年" };
    return m[v] || "";
}

function mapDurationToApi(v) {
    const m = { "1m_plus": "1 分鐘 +", "5m_plus": "5 分鐘 +", "10m_plus": "10 分鐘 +", "20m_plus": "20 分鐘 +", "30m_plus": "30 分鐘 +", "60m_plus": "60 分鐘 +", "0_10m": "0 - 10 分鐘", "0_20m": "0 - 20 分鐘" };
    return m[v] || "";
}

function buildSiteUrl(path, queryParts = []) {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const query = queryParts.filter(Boolean).join('&');
    return query ? `${BASE_URL}${cleanPath}?${query}` : `${BASE_URL}${cleanPath}`;
}

function appendTagsToQuery(params, queryParts) {
    ['tag_attr', 'tag_rel', 'tag_role', 'tag_body', 'tag_plot', 'tag_loc', 'tag_pos'].forEach(field => {
        const raw = params[field];
        if (!raw || raw === 'all') return;
        raw.split(/[\s,，]+/).forEach(tag => {
            if (tag && tag !== 'all') queryParts.push(`tags%5B%5D=${encodeURIComponent(convertToTraditional(tag))}`);
        });
    });
}

function extractPoster($a) {
    let poster = "";
    const selectors = ['img', 'source'];
    for (const selector of selectors) {
        const $node = $a.find(selector).first();
        if ($node.length) {
            poster = $node.attr('data-src') || $node.attr('data-original') || $node.attr('data-lazy-src') || $node.attr('src') || "";
            if (poster && !poster.includes('background.jpg')) break;
            poster = "";
        }
    }
    if (!poster) {
        const $fallback = $a.closest('article, .search-doujin-videos, .home-rows-videos-div, .video-card, li, div').find('img, source').first();
        if ($fallback.length) {
            poster = $fallback.attr('data-src') || $fallback.attr('data-original') || $fallback.attr('data-lazy-src') || $fallback.attr('src') || "";
            if (poster.includes('background.jpg')) poster = "";
        }
    }
    return normalizeImageUrl(poster);
}

function extractTitle($a) {
    return stripHtmlText(
        $a.find('.card-mobile-title, .home-rows-videos-title, .video-card-title, [class*="title"]').first().text() ||
        $a.attr('title') ||
        $a.find('img').attr('alt') ||
        $a.text()
    );
}

function parseListHtml(html) {
    if (!html || !html.trim()) return [];
    const $ = Widget.html.load(html);
    const items = [];
    const seen = new Set();

    $('a[href*="/watch?v="]').each((i, el) => {
        const $a = $(el);
        const href = $a.attr('href') || "";
        const link = normalizeWatchUrl(href);
        if (!link || seen.has(link)) return;
        if (!/\/watch\?v=\d+/.test(link)) return;
        seen.add(link);

        const title = safeText(extractTitle($a));
        if (!title) return;

        const poster = extractPoster($a);
        const cardText = stripHtmlText($a.closest('article, .search-doujin-videos, .home-rows-videos-div, .video-card, li, div').text());
        const durationMatch = cardText.match(/(\d{1,2}:\d{2}(?::\d{2})?)/);
        const duration = durationMatch ? durationMatch[1] : '';
        const author = stripHtmlText(($a.closest('article, .search-doujin-videos, .home-rows-videos-div, .video-card, li, div').find('a[href*="/search?query="]').first().text() || ""));

        items.push({
            id: link,
            type: "url",
            title,
            posterPath: poster,
            backdropPath: poster,
            mediaType: "movie",
            durationText: duration,
            description: author || cardText.replace(title, '').replace(duration, '').trim(),
            link
        });
    });

    return items;
}

async function fetchAndParse(url, referer) {
    try {
        const response = await httpGetWithTimeout(url, referer);
        return parseListHtml(response.data || "");
    } catch (e) {
        return [];
    }
}

async function performSearch(params = {}, options = {}) {
    const page = parseInt(params.page) || 1;
    const keyword = convertToTraditional(params.keyword || "").trim();
    const sort = mapSortToApi(params.sort_by || 'all');
    const mode = options.mode || params.mode || 'normal';
    const requireKeyword = options.requireKeyword !== false;
    const queryParts = [];

    if (requireKeyword && !keyword) {
        return [{ id: "tip", type: "text", title: "请输入关键词开始搜索" }];
    }

    if (keyword) queryParts.push(`query=${encodeURIComponent(keyword)}`);
    if (sort) queryParts.push(`sort=${encodeURIComponent(sort)}`);
    if (page > 1) queryParts.push(`page=${page}`);

    if (mode === 'daily' && !sort) queryParts.push(`sort=${encodeURIComponent('本日排行')}`);
    if (mode === 'manual' && page > 1) queryParts.push(`page=${page}`);

    return fetchAndParse(buildSiteUrl('/search', queryParts), BASE_URL + '/');
}

async function searchVideos(params) {
    return performSearch(params, { requireKeyword: false });
}

async function searchGlobal(params = {}) {
    const result = await performSearch(params, { requireKeyword: true });
    if (Array.isArray(result) && result.length === 1 && result[0] && result[0].id === 'tip') {
        result[0].title = '请输入关键词开始全局搜索';
    }
    return result;
}

async function loadHotRankings(params) {
    const page = parseInt(params.page) || 1;
    const sortVal = {
        watching: '他們在看',
        latest_upload: '最新上傳',
        daily_rank: '本日排行',
        weekly_rank: '本週排行',
        monthly_rank: '本月排行',
        new_release: '最新上市'
    }[params.list_type || 'watching'];

    const queryParts = [];
    if (sortVal) queryParts.push(`sort=${encodeURIComponent(sortVal)}`);
    if (page > 1) queryParts.push(`page=${page}`);

    return fetchAndParse(buildSiteUrl('/search', queryParts), BASE_URL + '/');
}

async function loadByGenre(params) {
    const page = parseInt(params.page) || 1;
    const genre = mapGenreToApi(params.genre);
    const sort = mapSortToApi(params.sort_by || 'all');
    const queryParts = [];

    if (genre) queryParts.push(`genre=${encodeURIComponent(genre)}`);
    if (sort) queryParts.push(`sort=${encodeURIComponent(sort)}`);
    if (page > 1) queryParts.push(`page=${page}`);

    return fetchAndParse(buildSiteUrl('/search', queryParts), BASE_URL + '/');
}

async function loadAdvancedGenre(params) {
    const page = parseInt(params.page) || 1;
    const genre = mapGenreToApi(params.genre);
    const sort = mapSortToApi(params.sort_by || 'all');
    const time = mapTimeToApi(params.upload_time);
    const duration = mapDurationToApi(params.duration_filter);
    const queryParts = [];

    if (genre) queryParts.push(`genre=${encodeURIComponent(genre)}`);
    if (sort) queryParts.push(`sort=${encodeURIComponent(sort)}`);
    if (time) queryParts.push(`time=${encodeURIComponent(time)}`);
    if (duration) queryParts.push(`duration=${encodeURIComponent(duration)}`);
    appendTagsToQuery(params, queryParts);
    if (page > 1) queryParts.push(`page=${page}`);

    return fetchAndParse(buildSiteUrl('/search', queryParts), BASE_URL + '/');
}

function parsePreviewsHtml(html, pageUrl) {
    if (!html || !html.trim()) return [];
    const $ = Widget.html.load(html);
    const items = [];
    const seen = new Set();

    const selectors = [
        '.preview-image-modal-trigger',
        '.preview-item img',
        '.preview-item a',
        '[class*="preview"] img',
        '[class*="preview"] a',
        'a[href*="/previews/"]',
        'a[href*="/watch?v="]'
    ];

    $(selectors.join(',')).each((i, el) => {
        const $node = $(el);
        const $anchor = $node.is('a') ? $node : $node.closest('a');
        const poster = $node.attr('src') || $node.attr('data-src') || $node.attr('data-original') || $node.find('img').attr('src') || $anchor.find('img').attr('src') || $anchor.find('img').attr('data-src') || "";
        const link = normalizeWatchUrl($anchor.attr('href') || $node.attr('href') || pageUrl || BASE_URL + '/search');
        const rawTitle = stripHtmlText(
            $anchor.attr('title') ||
            $node.attr('alt') ||
            $anchor.find('img').attr('alt') ||
            $node.closest('a').find('img').attr('alt') ||
            $node.closest('div').find('h5.caption, .caption, .title, h5, h4').first().text() ||
            $anchor.text() ||
            $node.text() ||
            ''
        );
        const title = rawTitle.replace(/^(thumb_up|play_arrow|info)\s*/i, '').replace(/^(?:\d{1,2}:\d{2}(?::\d{2})?)\s*/g, '').trim() || '新番預告';

        if (!link || seen.has(link)) return;
        if (!poster && title === '新番預告') return;
        seen.add(link);

        items.push({
            id: link,
            type: 'url',
            title: title.length > 40 ? title.substring(0, 40) + '...' : title,
            posterPath: normalizeImageUrl(poster),
            backdropPath: normalizeImageUrl(poster),
            mediaType: 'movie',
            description: '新番預告',
            link
        });
    });

    return items;
}

async function loadPreviews() {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const ym = `${year}${month}`;

    const urls = [
        `${BASE_URL}/previews/${ym}`,
        `${BASE_URL}/previews/${year}-${month}`,
        `${BASE_URL}/previews/${year}${month}`,
        `${BASE_URL}/previews`,
        BASE_URL + "/"
    ];

    for (const url of urls) {
        try {
            const response = await httpGetWithTimeout(url, BASE_URL + '/');
            const html = response.data || "";
            const items = parsePreviewsHtml(html, url);
            if (items.length) return items;

            if (url === BASE_URL + "/") {
                const $ = Widget.html.load(html);
                const previewLinks = [];
                $('a[href*="/previews/"]').each((i, el) => {
                    const href = $(el).attr('href');
                    if (href) previewLinks.push(normalizeWatchUrl(href));
                });
                for (const previewUrl of [...new Set(previewLinks)]) {
                    try {
                        const previewResp = await httpGetWithTimeout(previewUrl, url);
                        const previewItems = parsePreviewsHtml(previewResp.data || "", previewUrl);
                        if (previewItems.length) return previewItems;
                    } catch (innerErr) {
                        console.error('Preview subpage load failed', innerErr);
                    }
                }
            }
        } catch (e) {
            console.error('Preview load failed', e);
        }
    }
    return [];
}

async function loadDetail(link) {
    try {
        const response = await httpGetWithTimeout(link, link);
        const html = response.data || "";
        const $ = Widget.html.load(html);

        let videoUrl = "";
        const candidates = [
            $('video source').attr('src'),
            $('source[type="application/x-mpegURL"]').attr('src'),
            $('[data-src*="m3u8"]').attr('data-src'),
            $('[data-hls*="m3u8"]').attr('data-hls'),
            $('#video-sd').val(),
            $('#video-hd').val(),
            $('#video-720p').val(),
            $('#video-1080p').val(),
            $('[src*="m3u8"]').attr('src')
        ];
        for (const candidate of candidates) {
            if (candidate) { videoUrl = candidate; break; }
        }
        if (!videoUrl) {
            const match = html.match(/https?:\/\/[^"'\s]+\.m3u8[^"'\s]*/);
            if (match) videoUrl = match[0];
        }
        if (!videoUrl) {
            const match = html.match(/source\s*=\s*['"](https?:\/\/[^'"]+)['"]/);
            if (match) videoUrl = match[1];
        }
        if (!videoUrl) throw new Error('video_url_not_found');

        videoUrl = videoUrl.replace(/&amp;/g, '&');

        const title = safeText(convertToTraditional($('meta[property="og:title"]').attr('content') || $('title').text() || '标题未知'), '标题未知');
        const desc = safeText($('meta[property="og:description"]').attr('content') || '');
        const cover = $('meta[property="og:image"]').attr('content') || '';

        const childItems = [];
        $('a[href*="/watch?v="]').each((i, el) => {
            if (i >= 12) return false;
            const $a = $(el);
            const recLink = normalizeWatchUrl($a.attr('href'));
            if (!recLink || recLink === link) return;
            const recPoster = extractPoster($a);
            const recTitle = safeText(convertToTraditional(stripHtmlText($a.find('.home-rows-videos-title, .card-mobile-title, [class*="title"]').first().text() || $a.attr('title') || $a.find('img').attr('alt') || '相关视频')), '相关视频');

            childItems.push({
                id: recLink,
                type: 'url',
                title: recTitle,
                posterPath: recPoster,
                backdropPath: recPoster,
                mediaType: 'movie',
                link: recLink
            });
        });

        return {
            id: link,
            type: 'detail',
            videoUrl,
            title,
            description: desc,
            posterPath: normalizeImageUrl(cover),
            backdropPath: normalizeImageUrl(cover),
            mediaType: 'movie',
            link,
            childItems,
            headers: getCommonHeaders(link)
        };
    } catch (error) {
        let errorMsg = '无法加载视频，请重试。';
        if (error.message === 'video_url_not_found') errorMsg = '未找到视频地址，可能需登录或该视频已失效。';
        return {
            id: link,
            type: 'detail',
            videoUrl: link,
            title: '加载失败',
            description: errorMsg,
            posterPath: '',
            mediaType: 'movie',
            link
        };
    }
}
