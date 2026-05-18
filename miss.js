var WidgetMetadata = {
    id: "missav_makka_play",
    title: "MissAV",
    author: "Forward_User",
    description: "完美版：100%保留原版模块秒播 + 独立全局搜索",
    version: "3.3.5",
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
const HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Referer": "https://missav.ai/"
};

// 解析列表
function parseVideoList(html, isGlobal = false) {
    if (!html || html.includes("Just a moment")) return [{ id: "err", type: "text", title: "被拦截", subTitle: "请稍后重试" }];

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
            const coverUrl = `https://fourhoi.com/${videoId.toLowerCase()}/cover-t.jpg` || imgSrc;

            // 🔴 核心修复 1：使用极端的物理前缀，保证 Forward 解析器绝对不会误删
            const finalId = isGlobal ? `global|||${href}` : href;

            results.push({
                id: finalId, 
                // 🔴 核心修复 2：严格区分类型，全局搜索使用 url+movie，模块依然用 link
                type: isGlobal ? "url" : "link", 
                mediaType: isGlobal ? "movie" : undefined, 
                title: title,
                coverUrl: coverUrl, 
                posterPath: coverUrl,
                link: finalId, // link 必须与 id 同步，防止刷新时状态偏移
                description: `时长: ${duration} | 番号: ${videoId}`,
                customHeaders: HEADERS
            });
        }
    });
    return results.length > 0 ? results : [{ id: "empty", type: "text", title: "未找到内容" }];
}

// 模块浏览
async function loadList(params = {}) {
    const { page = 1, category = "dm588/cn/release" } = params;
    let url = `${BASE_URL}/${category}`;
    if (page > 1) url += `?page=${page}`;
    try {
        const res = await Widget.http.get(url, { headers: HEADERS });
        return parseVideoList(res.data, false);
    } catch (e) { return [{ id: "err", type: "text", title: "加载失败" }]; }
}

// 模块搜索
async function searchList(params = {}) {
    const keyword = (params.keyword || params.query || "").trim();
    if (!keyword) return [{ id: "tip", type: "text", title: "请输入关键词" }];
    let url = `${BASE_URL}/cn/search/${encodeURIComponent(keyword)}` + (params.page > 1 ? `?page=${params.page}` : "");
    try {
        const res = await Widget.http.get(url, { headers: HEADERS });
        return parseVideoList(res.data, false);
    } catch (e) { return [{ id: "err", type: "text", title: "搜索失败" }]; }
}

// 全局搜索
async function globalSearch(params = {}) {
    const keyword = (params.keyword || params.query || "").trim();
    if (!keyword) return [{ id: "tip", type: "text", title: "请输入关键词" }];
    let url = `${BASE_URL}/cn/search/${encodeURIComponent(keyword)}` + (params.page > 1 ? `?page=${params.page}` : "");
    try {
        const res = await Widget.http.get(url, { headers: HEADERS });
        return parseVideoList(res.data, true); 
    } catch (e) { return [{ id: "err", type: "text", title: "搜索失败" }]; }
}

// 详情与播放解析
async function loadDetail(item) {
    let targetId = typeof item === 'object' ? (item.id || item.link) : item;
    if (!targetId || typeof targetId !== 'string') return [];

    // 🔴 核心修复 3：精准识别物理前缀，并剥离出纯净地址用于网络请求
    let isGlobal = targetId.startsWith("global|||");
    let fetchUrl = targetId.replace("global|||", "");

    try {
        const res = await Widget.http.get(fetchUrl, { headers: HEADERS });
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

        if (isGlobal) {
            // 🔴 核心修复 4：即使遇到网络限流导致 videoUrl 为空，也强制返回详情页骨架！绝对防止页面消失崩溃！
            return {
                id: targetId, // 必须把前缀原封不动还给 APP
                link: targetId,
                type: "url", 
                mediaType: "movie", 
                title: title || "正在解析或需要刷新...",
                videoUrl: videoUrl,
                posterPath: typeof item === 'object' ? (item.posterPath || item.coverUrl || "") : "",
                customHeaders: HEADERS,
                // 如果抓到了链接，就显示播放按钮；没抓到就为空，但外层页面不会崩
                childItems: videoUrl ? [
                    {
                        id: targetId + "_ep1", 
                        type: "url", // 保证按钮老老实实呆在选集区，不去相似推荐区
                        title: "▶ 点击播放正片",
                        videoUrl: videoUrl,
                        mediaType: "episode", 
                        customHeaders: HEADERS
                    }
                ] : []
            };
        } else {
            // 这是你要的模块内瞬间秒播
            if (videoUrl) {
                return [{
                    id: fetchUrl,
                    type: "video",
                    title: title,
                    videoUrl: videoUrl,
                    playerType: "system",
                    customHeaders: HEADERS
                }];
            }
        }
    } catch (e) {}
    
    // 最终保底防崩
    return isGlobal ? { id: targetId, type: "url", mediaType: "movie", title: "加载失败，请重试", childItems: [] } : [];
}
