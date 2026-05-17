var WidgetMetadata = {
    id: "missav_makka_play",
    title: "MissAV_ovo",
    author: "𝙈𝙖𝙠𝙠𝙖𝙋𝙖𝙠𝙠𝙖",
    description: "简易的missav模块（已集成全局搜索与本地播放双解密）",
    version: "2.2.5",
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
            title: "🔍 搜索视频",
            functionName: "searchList",
            type: "video",
            params: [
                { name: "keyword", title: "关键词", type: "input", value: "" },
                { name: "page", title: "页码", type: "page" }
            ]
        },
        // --- 核心修复：添加全局搜索播放源模块 ---
        {
            id: "loadResource",
            title: "MissAV 播放源",
            description: "Forward全局调用：主页搜索自动检索播放源",
            functionName: "loadResource",
            type: "stream",
            params: []
        }
    ]
};

const BASE_URL = "https://missav.ai";
const HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    "Referer": "https://missav.ai/",
    "Connection": "keep-alive"
};

// --- 公共解析逻辑 ---
function parseVideoList(html) {
    if (!html || html.includes("Just a moment")) {
        return [];
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

            results.push({
                id: href,
                type: "link", 
                title: title,
                coverUrl: coverUrl || imgSrc, 
                link: href,
                description: `时长: ${duration} | 番号: ${videoId}`,
                customHeaders: HEADERS
            });
        }
    });

    return results;
}

// 1. 浏览列表
async function loadList(params = {}) {
    const { page = 1, category = "dm588/cn/release", sort = "released_at" } = params;
    let url = `${BASE_URL}/${category}?sort=${sort}`;
    if (page > 1) url += `&page=${page}`;

    try {
        const res = await Widget.http.get(url, { headers: HEADERS });
        const list = parseVideoList(res.data);
        return list.length > 0 ? list : [{ id: "empty", type: "text", title: "没有找到相关视频" }];
    } catch (e) {
        return [{ id: "err", type: "text", title: "加载失败", subTitle: e.message }];
    }
}

// 2. 内部搜索功能
async function searchList(params = {}) {
    const { page = 1, keyword } = params;
    if (!keyword) return [{ id: "tip", type: "text", title: "请输入关键词开始搜索" }];

    let url = `${BASE_URL}/cn/search/${encodeURIComponent(keyword.trim())}`;
    if (page > 1) url += `?page=${page}`;

    try {
        const res = await Widget.http.get(url, { headers: HEADERS });
        const list = parseVideoList(res.data);
        return list.length > 0 ? list : [{ id: "empty", type: "text", title: "没有找到相关视频" }];
    } catch (e) {
        return [{ id: "err", type: "text", title: "搜索失败", subTitle: e.message }];
    }
}

// 3. 详情页核心解析器（补齐该函数：供独立模块内点击视频时直接调用）
async function loadDetail(link) {
    try {
        const res = await Widget.http.get(link, { headers: HEADERS });
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
            return [{
                id: link,
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
        } else {
            return [{ id: "err", type: "text", title: "解析失败", subTitle: "未找到播放地址" }];
        }
    } catch (e) {
        return [{ id: "err", type: "text", title: "请求错误", subTitle: e.message }];
    }
}

// 4. 全局搜索流媒体提取器（对接 Forward 主页大搜索框混流层）
async function loadResource(params = {}) {
    const rawSearch = String(params.seriesName || params.title || "").trim();
    if (!rawSearch) return [];

    const searchKeyword = rawSearch.replace(/第\s*\d+\s*[季部]/g, "").trim();
    const searchUrl = `${BASE_URL}/cn/search/${encodeURIComponent(searchKeyword)}`;

    try {
        const searchRes = await Widget.http.get(searchUrl, { headers: HEADERS });
        const candidates = parseVideoList(searchRes.data);
        if (!candidates || candidates.length === 0) return [];

        const bestMatchHref = candidates[0].link;
        if (!bestMatchHref) return [];

        // 完美联动：直接调用复用上面的详情页解密逻辑
        const detailResult = await loadDetail(bestMatchHref);
        if (detailResult && detailResult[0] && detailResult[0].videoUrl) {
            return [{
                name: "MissAV 极速源",
                description: `番号: ${searchKeyword}\n状态: 全局解析成功`,
                url: detailResult[0].videoUrl,
                customHeaders: detailResult[0].customHeaders
            }];
        }
    } catch (e) {
        try { console.log("[MissAV_Stream_Error] " + e.message); } catch(err){}
    }
    return [];
}
