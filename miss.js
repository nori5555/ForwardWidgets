var WidgetMetadata = {
    id: "missav_makka_play",
    title: "MissAV",
    author: "Forward_User",
    description: "终极双修版：模块内维持秒播 + 全局搜索原生详情页",
    version: "3.2.0",
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
                }
            ]
        },
        // 保留你原版的模块内搜索（享受秒播）
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
    // 独立出来的全局搜索（享受原生页面）
    search: {
        title: "全局搜索",
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
const HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Referer": "https://missav.ai/",
};

// 核心改造1：加了一个 isGlobal 参数来打标记
function parseVideoList(html, isGlobal = false) {
    if (!html || html.includes("Just a moment")) return [];

    const $ = Widget.html.load(html);
    const results = [];
    const prefix = isGlobal ? "SEARCH::" : "MODULE::";

    $("div.group").each((i, el) => {
        const $el = $(el);
        const $link = $el.find("a.text-secondary");
        const href = $link.attr("href");
        
        if (href) {
            const title = $link.text().trim();
            const $img = $el.find("img");
            const imgSrc = $img.attr("data-src") || $img.attr("src");
            const duration = $el.find(".absolute.bottom-1.right-1").text().trim();
            const videoId = href.split('/').pop().replace(/-uncensored-leak|-chinese-subtitle/g, '').toUpperCase();
            
            results.push({
                // 把暗号藏在 ID 里传给详情页
                id: prefix + href,
                type: "link",    
                title: title,
                coverUrl: imgSrc, 
                description: `时长: ${duration} | 番号: ${videoId}`,
                customHeaders: HEADERS
            });
        }
    });
    return results;
}

// 模块浏览
async function loadList(params = {}) {
    const { page = 1, category = "dm588/cn/release" } = params;
    let url = `${BASE_URL}/${category}`;
    if (page > 1) url += `?page=${page}`;
    try {
        const res = await Widget.http.get(url, { headers: HEADERS });
        return parseVideoList(res.data, false);
    } catch (e) { return []; }
}

// 模块内搜索（原版）
async function searchList(params = {}) {
    const keyword = (params.keyword || params.query || "").trim();
    if (!keyword) return [];
    const page = params.page || 1;
    let url = `${BASE_URL}/cn/search/${encodeURIComponent(keyword)}`;
    if (page > 1) url += `?page=${page}`;
    try {
        const res = await Widget.http.get(url, { headers: HEADERS });
        return parseVideoList(res.data, false);
    } catch (e) { return []; }
}

// 全局主搜索（新版）
async function globalSearch(params = {}) {
    const keyword = (params.keyword || params.query || "").trim();
    if (!keyword) return [];
    const page = params.page || 1;
    let url = `${BASE_URL}/cn/search/${encodeURIComponent(keyword)}`;
    if (page > 1) url += `?page=${page}`;
    try {
        const res = await Widget.http.get(url, { headers: HEADERS });
        // 这里的 true 意味着会打上 SEARCH:: 标记
        return parseVideoList(res.data, true);
    } catch (e) { return []; }
}

// 核心改造2：智能分流（完美解决冲突）
async function loadDetail(item) {
    let targetUrl = "";
    if (item && typeof item === 'object') {
        targetUrl = item.id || item.link || item.url || "";
    } else {
        targetUrl = String(item || "");
    }

    let isGlobalSearch = false;
    // 识别是不是从全局搜索点进来的
    if (targetUrl.startsWith("SEARCH::")) {
        isGlobalSearch = true;
        targetUrl = targetUrl.substring(8); // 剥离标记还原真实网址
    } else if (targetUrl.startsWith("MODULE::")) {
        isGlobalSearch = false;
        targetUrl = targetUrl.substring(8);
    }

    if (!targetUrl.startsWith('http')) return [];

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
                if (matches && matches.length > 0) {
                    videoUrl = matches[0];
                    return false; 
                }
            }
            if (!videoUrl && scriptContent.includes('eval(function')) {
                const uuidMatches = scriptContent.match(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/g);
                if (uuidMatches && uuidMatches.length > 0) {
                    videoUrl = `https://surrit.com/${uuidMatches[0]}/playlist.m3u8`;
                    return false; 
                }
            }
        });
        if (!videoUrl) {
            const matchSimple = html.match(/source\s*=\s*['"]([^'"]+)['"]/);
            if (matchSimple) videoUrl = matchSimple[1];
        }

        if (videoUrl) {
            // 如果是从全局搜索进来的，喂给它原生页面格式！
            if (isGlobalSearch) {
                return {
                    title: title,
                    coverUrl: (typeof item === 'object') ? (item.coverUrl || "") : "",
                    episodes: [
                        {
                            title: "播放列表",
                            urls: [
                                {
                                    name: "▶ 点击播放正片",
                                    url: videoUrl,
                                    playerType: "system",
                                    customHeaders: { "Referer": "https://missav.ai/" }
                                }
                            ]
                        }
                    ]
                };
            } else {
                // 如果是从模块（原版）进来的，喂给它原汁原味的秒播格式！
                return [{
                    id: targetUrl,
                    type: "video",
                    title: title,
                    videoUrl: videoUrl,
                    playerType: "system",
                    customHeaders: { "Referer": "https://missav.ai/" }
                }];
            }
        }
    } catch (e) {}
    return [];
}
