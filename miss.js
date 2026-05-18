var WidgetMetadata = {
    id: "missav_makka_play",
    title: "MissAV",
    author: "Forward_User",
    description: "大一统标准详情页版 (完美对齐VOD规范)",
    version: "3.6.0",
    requiredVersion: "0.0.1",
    site: "https://missav.ai",
    modules: [
        {
            title: "浏览视频",
            functionName: "loadList",
            type: "video",
            params: [
                { name: "page", title: "页码", type: "page" },
                { 
                    name: "category", 
                    title: "分类", 
                    type: "enumeration", 
                    value: "dm588/cn/release", 
                    enumOptions: [
                        { title: "🆕 最新发布", value: "dm588/cn/release" },
                        { title: "🔥 本周热门", value: "dm169/cn/weekly-hot" },
                        { title: "🌟 月度热门", value: "dm257/cn/monthly-hot" },
                        { title: "🔞 无码流出", value: "dm621/cn/uncensored-leak" },
                        { title: "🇯🇵 东京热", value: "dm29/cn/tokyohot" },
                        { title: "🇨🇳 中文字幕", value: "dm265/cn/chinese-subtitle" }
                    ] 
                },
                {
                    name: "sort",
                    title: "排序",
                    type: "enumeration",
                    value: "released_at",
                    enumOptions: [
                        { title: "发布日期", value: "released_at" },
                        { title: "今日浏览", value: "today_views" },
                        { title: "总浏览量", value: "views" },
                        { title: "收藏数", value: "saved" }
                    ]
                }
            ]
        },
        {
            title: "🔍 模块内搜索",
            functionName: "searchList",
            type: "video",
            params: [
                { name: "keyword", title: "关键词", type: "input", value: "" },
                { name: "page", title: "页码", type: "page" }
            ]
        }
    ],
    search: {
        title: "MissAV 搜索",
        functionName: "globalSearch",
        params: [
            { name: "keyword", title: "输入番号或关键词", type: "input", value: "" },
            { name: "page", title: "页码", type: "page" }
        ]
    },
    detail: {
        title: "视频详情",
        functionName: "loadDetail"
    }
};

const BASE_URL = "https://missav.ai";

// 🔴 关键修复1：100% 恢复您原版强大的请求头，防止 Cloudflare 拦截和抓取失败
const HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    "Referer": "https://missav.ai/",
    "Connection": "keep-alive"
};

const PLAY_HEADERS = {
    "Referer": "https://missav.ai/",
    "User-Agent": HEADERS["User-Agent"],
    "Origin": "https://missav.ai"
};

// 解析列表（完全对齐 VOD.js 的纯净格式）
function parseVideoList(html) {
    if (!html || html.includes("Just a moment") || html.includes("Cloudflare")) {
        return [{ id: "err", type: "text", title: "被拦截", subTitle: "请稍后重试" }];
    }

    const $ = Widget.html.load(html);
    const results = [];

    $("div.group").each((i, el) => {
        const $el = $(el);
        const $link = $el.find("a.text-secondary");
        let href = $link.attr("href");
        
        if (href) {
            // 确保是绝对路径
            if (href.startsWith("/")) href = BASE_URL + href;

            const title = $link.text().trim();
            const $img = $el.find("img");
            const imgSrc = $img.attr("data-src") || $img.attr("src");
            const duration = $el.find(".absolute.bottom-1.right-1").text().trim();
            const videoId = href.split('/').pop().replace(/-uncensored-leak|-chinese-subtitle/g, '').toUpperCase();
            const coverUrl = `https://fourhoi.com/${videoId.toLowerCase()}/cover-t.jpg` || imgSrc;

            results.push({
                id: href, 
                // 🔴 关键修复2：严格参照 VOD.js 规范，使用 url 和 movie
                type: "url", 
                mediaType: "movie", 
                videoUrl: null, // VOD 规范：列表必须声明 videoUrl 为 null
                title: title,
                coverUrl: coverUrl, 
                posterPath: coverUrl,
                backdropPath: coverUrl,
                link: href,
                description: `时长: ${duration} | 番号: ${videoId}`,
                customHeaders: HEADERS
            });
        }
    });
    return results.length > 0 ? results : [{ id: "empty", type: "text", title: "未找到内容" }];
}

// 模块浏览
async function loadList(params = {}) {
    const { page = 1, category = "dm588/cn/release", sort = "released_at" } = params;
    let url = `${BASE_URL}/${category}?sort=${sort}`;
    if (page > 1) url += `&page=${page}`;
    try {
        const res = await Widget.http.get(url, { headers: HEADERS });
        return parseVideoList(res.data);
    } catch (e) { return [{ id: "err", type: "text", title: "加载失败" }]; }
}

// 模块搜索
async function searchList(params = {}) {
    const keyword = (params.keyword || params.query || "").trim();
    if (!keyword) return [{ id: "tip", type: "text", title: "请输入关键词" }];
    let url = `${BASE_URL}/cn/search/${encodeURIComponent(keyword)}` + (params.page > 1 ? `?page=${params.page}` : "");
    try {
        const res = await Widget.http.get(url, { headers: HEADERS });
        return parseVideoList(res.data);
    } catch (e) { return [{ id: "err", type: "text", title: "搜索失败" }]; }
}

// 全局搜索
async function globalSearch(params = {}) {
    const keyword = (params.keyword || params.query || "").trim();
    if (!keyword) return [{ id: "tip", type: "text", title: "请输入关键词" }];
    let url = `${BASE_URL}/cn/search/${encodeURIComponent(keyword)}` + (params.page > 1 ? `?page=${params.page}` : "");
    try {
        const res = await Widget.http.get(url, { headers: HEADERS });
        return parseVideoList(res.data); 
    } catch (e) { return [{ id: "err", type: "text", title: "搜索失败" }]; }
}

// 详情与播放解析
async function loadDetail(item) {
    let targetUrl = typeof item === 'object' ? (item.id || item.link) : item;
    if (!targetUrl || typeof targetUrl !== 'string') return [];

    try {
        const res = await Widget.http.get(targetUrl, { headers: HEADERS });
        const html = res.data;
        const $ = Widget.html.load(html);
        
        let title = $('meta[property="og:title"]').attr('content') || $('h1').text().trim();
        let videoUrl = "";
        
        $('script').each((i, el) => {
            const scriptContent = $(el).html() || "";
            if (scriptContent.includes('surrit.com') && scriptContent.includes('.m3u8')) {
                const matches = scriptContent.match(/https:\/\/surrit\.com\/[a-f0-9\-]+\/[^"'\s]*\.m3u8/g);
                if (matches && matches.length > 0) { videoUrl = matches[0]; return false; }
            }
            if (!videoUrl && scriptContent.includes('eval(function')) {
                const uuidMatches = scriptContent.match(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/g);
                if (uuidMatches && uuidMatches.length > 0) { videoUrl = `https://surrit.com/${uuidMatches[0]}/playlist.m3u8`; return false; }
            }
        });
        
        if (!videoUrl) {
            const matchSimple = html.match(/source\s*=\s*['"]([^'"]+)['"]/);
            if (matchSimple) videoUrl = matchSimple[1];
        }

        if (videoUrl) {
            // 🔴 关键修复3：100% 对齐 VOD.js 详情页对象结构，且带有强力的防盗链 Header
            return {
                id: targetUrl, 
                videoUrl: videoUrl, // 根级暴露
                type: "url", 
                mediaType: "movie", 
                title: title || "未知标题",
                posterPath: typeof item === 'object' ? (item.posterPath || item.coverUrl || "") : "",
                backdropPath: typeof item === 'object' ? (item.posterPath || item.coverUrl || "") : "",
                link: targetUrl,
                customHeaders: PLAY_HEADERS,
                childItems: [
                    {
                        id: targetUrl + "_ep1", 
                        type: "url", 
                        mediaType: "episode", // 选集专属
                        title: "▶ 点击播放正片",
                        videoUrl: videoUrl,
                        customHeaders: PLAY_HEADERS
                    }
                ]
            };
        } else {
            // 如果没抓到视频，提供保底骨架屏避免空白崩溃
            return { 
                id: targetUrl, type: "url", mediaType: "movie", 
                title: "视频解析失败，请下拉刷新", childItems: [] 
            };
        }
    } catch (e) {
        return { 
            id: targetUrl, type: "url", mediaType: "movie", 
            title: "网络加载错误，请下拉刷新", childItems: [] 
        };
    }
}
