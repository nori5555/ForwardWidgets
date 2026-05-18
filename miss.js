var WidgetMetadata = {
    id: "missav_play",
    title: "MissAV",
    author: "AI修复",
    description: "简易的missav模块 (完美双修版)",
    version: "3.3.9",
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
                    value: "dm588/cn/release", // 修正默认值匹配列表
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
            title: "🔍 搜索视频",
            functionName: "searchList",
            type: "video",
            params: [
                { name: "keyword", title: "关键词", type: "input", value: "" },
                { name: "page", title: "页码", type: "page" }
            ]
        }
    ],
    // --- 新增：全局搜索元数据入口 (参考 VOD.js 规范) ---
    search: {
        title: "MissAV 搜索",
        functionName: "globalSearch",
        params: [
            { name: "keyword", title: "关键词", type: "input", value: "" },
            { name: "page", title: "页码", type: "page", value: "1" }
        ]
    },
    // --- 新增：详情页入口 ---
    detail: {
        title: "视频详情",
        functionName: "loadDetail"
    }
};

const BASE_URL = "https://missav.ai";
const HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    "Referer": "https://missav.ai/",
    "Connection": "keep-alive"
};

// --- 公共解析逻辑 (增加 isGlobal 参数) ---
function parseVideoList(html, isGlobal = false) {
    if (!html || html.includes("Just a moment")) {
        return [{ id: "err_cf", type: "text", title: "被 Cloudflare 拦截", subTitle: "请稍后重试" }];
    }

    const $ = Widget.html.load(html);
    const results = [];

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
            const coverUrl = `https://fourhoi.com/${videoId.toLowerCase()}/cover-t.jpg`;

            // 【核心灵魂】：参考 VOD.js 使用合法的 URL Query 参数，绝不会被 APP 刷新时删掉！
            const suffix = isGlobal ? (href.includes("?") ? "&is_global=1" : "?is_global=1") : "";
            const finalId = href + suffix;

            results.push({
                id: finalId, // 携带合法参数的 ID
                // 全局搜索用 url 进详情页，模块内保持 link 实现你的秒播
                type: isGlobal ? "url" : "link", 
                mediaType: isGlobal ? "movie" : undefined, 
                videoUrl: isGlobal ? null : undefined, // VOD.js 规范：列表项显式声明 videoUrl 为 null
                title: title,
                coverUrl: coverUrl || imgSrc, 
                posterPath: coverUrl || imgSrc, // VOD 规范认 posterPath
                link: finalId,
                description: `时长: ${duration} | 番号: ${videoId}`,
                customHeaders: HEADERS
            });
        }
    });

    return results.length > 0 ? results : [{ id: "empty", type: "text", title: "没有找到相关视频" }];
}

// 1. 浏览列表 (纯原版，一字未动)
async function loadList(params = {}) {
    const { page = 1, category = "dm588/cn/release", sort = "released_at" } = params;
    
    let url = `${BASE_URL}/${category}?sort=${sort}`;
    if (page > 1) url += `&page=${page}`;

    try {
        const res = await Widget.http.get(url, { headers: HEADERS });
        return parseVideoList(res.data, false);
    } catch (e) {
        return [{ id: "err", type: "text", title: "加载失败", subTitle: e.message }];
    }
}

// 2. 搜索功能 (纯原版，一字未动)
async function searchList(params = {}) {
    const { page = 1, keyword } = params;
    
    if (!keyword) {
        return [{ id: "tip", type: "text", title: "请输入关键词开始搜索" }];
    }

    let url = `${BASE_URL}/cn/search/${encodeURIComponent(keyword)}`;
    if (page > 1) url += `?page=${page}`;

    try {
        const res = await Widget.http.get(url, { headers: HEADERS });
        return parseVideoList(res.data, false);
    } catch (e) {
        return [{ id: "err", type: "text", title: "搜索失败", subTitle: e.message }];
    }
}

// 3. 全局搜索 (全新增，专属通道)
async function globalSearch(params = {}) {
    // 兼容多种 keyword 传参命名
    const keyword = (params.keyword || params.wd || params.query || "").trim();
    if (!keyword) return [{ id: "tip", type: "text", title: "请输入关键词开始搜索" }];
    
    let url = `${BASE_URL}/cn/search/${encodeURIComponent(keyword)}`;
    if (params.page > 1) url += `?page=${params.page}`;

    try {
        const res = await Widget.http.get(url, { headers: HEADERS });
        return parseVideoList(res.data, true); // true 代表全局搜索打标记
    } catch (e) {
        return [{ id: "err", type: "text", title: "搜索失败", subTitle: e.message }];
    }
}

// 4. 详情解析 (双路分离，互不干扰)
async function loadDetail(item) {
    let targetUrl = typeof item === 'object' ? (item.id || item.link) : item;
    if (!targetUrl || typeof targetUrl !== 'string') return [];

    // 提取合法参数判断状态
    let isGlobal = targetUrl.includes("is_global=1");
    // 剥离参数用于真实的网络请求
    let fetchUrl = targetUrl.replace("?is_global=1", "").replace("&is_global=1", "");

    try {
        const res = await Widget.http.get(fetchUrl, { headers: HEADERS });
        const html = res.data;
        const $ = Widget.html.load(html);
        
        let title = $('meta[property="og:title"]').attr('content') || $('h1').text().trim();
        let videoUrl = "";
        
        $('script').each((i, el) => {
            const scriptContent = $(el).html() || "";
            
            // 1. surrit 直连
            if (scriptContent.includes('surrit.com') && scriptContent.includes('.m3u8')) {
                const matches = scriptContent.match(/https:\/\/surrit\.com\/[a-f0-9\-]+\/[^"'\s]*\.m3u8/g);
                if (matches && matches.length > 0) {
                    videoUrl = matches[0];
                    return false; 
                }
            }
            
            // 2. eval 混淆
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
            if (isGlobal) {
                // 【核心】：完全照搬 VOD.js 的详情页格式！刷新绝不会掉资源！
                return {
                    id: targetUrl, // 把带有 is_global=1 的完整URL传回去，锁定状态
                    videoUrl: videoUrl,
                    type: "url", 
                    mediaType: "movie", 
                    title: title,
                    posterPath: typeof item === 'object' ? (item.posterPath || item.coverUrl || "") : "",
                    customHeaders: {
                        "Referer": "https://missav.ai/",
                        "User-Agent": HEADERS["User-Agent"],
                        "Origin": "https://missav.ai"
                    },
                    childItems: [
                        {
                            id: fetchUrl + "_ep1",
                            type: "url", // 选集类型必须为 url
                            title: "▶ 点击播放正片",
                            videoUrl: videoUrl,
                            mediaType: "episode", 
                            customHeaders: {
                                "Referer": "https://missav.ai/",
                                "User-Agent": HEADERS["User-Agent"],
                                "Origin": "https://missav.ai"
                            }
                        }
                    ],
                    link: targetUrl
                };
            } else {
                // 如果是模块点进来的，原封不动返回你的“秒播”数组！
                return [{
                    id: fetchUrl,
                    type: "video",
                    title: title,
                    videoUrl: videoUrl,
                    playerType: "system",
                    customHeaders: {
                        "Referer": "https://missav.ai/",
                        "User-Agent": HEADERS["User-Agent"],
                        "Origin": "https://missav.ai"
                    }
                }];
            }
        } else {
            return [{ id: "err", type: "text", title: "解析失败", subTitle: "未找到播放地址" }];
        }

    } catch (e) {
        return [{ id: "err", type: "text", title: "请求错误", subTitle: e.message }];
    }
}
