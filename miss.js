var WidgetMetadata = {
    id: "missav_makka_play",
    title: "MissAV",
    author: "Forward_User",
    description: "完美版：100%保留原版模块秒播 + 独立全局搜索",
    version: "3.3.3",
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
    
    // 【核心修改1】：防过滤机制，放弃容易被吞的后缀，改用强前缀标记！
    const prefix = isGlobal ? "GLOBAL_MARK::" : "";

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

            results.push({
                id: prefix + href, // 加上前缀：GLOBAL_MARK::https://missav...
                type: isGlobal ? "video" : "link", 
                title: title,
                coverUrl: coverUrl, 
                posterPath: coverUrl,
                link: href, // 保持真实的 link 干净
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

    let isGlobal = false;
    let requestUrl = targetId;

    // 【核心修改2】：识别前缀，剥离出真实的请求地址
    if (requestUrl.startsWith("GLOBAL_MARK::")) {
        isGlobal = true;
        requestUrl = requestUrl.replace("GLOBAL_MARK::", ""); 
    }

    try {
        const res = await Widget.http.get(requestUrl, { headers: HEADERS });
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
            if (isGlobal) {
                return {
                    // 【核心修改3】：把前缀加回去还给 APP！就算狂按刷新，APP也不会弄丢这个ID
                    id: "GLOBAL_MARK::" + requestUrl, 
                    type: "video",
                    title: title,
                    videoUrl: videoUrl,
                    posterPath: typeof item === 'object' ? (item.posterPath || item.coverUrl || "") : "",
                    customHeaders: HEADERS,
                    childItems: [
                        {
                            id: requestUrl + "_ep1",
                            type: "url", // 【核心修改4】：改成 url，彻底解决播放按钮掉到底部相似推荐的问题！
                            title: "▶ 点击播放正片",
                            videoUrl: videoUrl,
                            mediaType: "episode",
                            customHeaders: HEADERS
                        }
                    ]
                };
            } else {
                return [{
                    id: requestUrl,
                    type: "video",
                    title: title,
                    videoUrl: videoUrl,
                    playerType: "system",
                    customHeaders: HEADERS
                }];
            }
        }
    } catch (e) {}
    return [];
}
