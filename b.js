var WidgetMetadata = {
    id: "missav_global_search",
    title: "MissAV",
    author: "Forward_User",
    description: "终极修正版：修复点击无反应问题，支持直连播放",
    version: "3.0.3",
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
                        { title: "🔞 无码流出", value: "dm621/cn/uncensored-leak" },
                        { title: "🇨🇳 中文字幕", value: "dm265/cn/chinese-subtitle" }
                    ] 
                }
            ]
        }
    ],
    search: {
        title: "MissAV 搜索",
        functionName: "searchList",
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

function parseVideoList(html) {
    if (!html || html.includes("Just a moment")) return [];

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
            
            results.push({
                id: href,
                type: "video",    
                title: title,
                coverUrl: imgSrc, 
                description: `时长: ${duration} | 番号: ${videoId}`
            });
        }
    });
    return results;
}

async function loadList(params = {}) {
    const { page = 1, category = "dm588/cn/release" } = params;
    let url = `${BASE_URL}/${category}`;
    if (page > 1) url += `?page=${page}`;

    try {
        const res = await Widget.http.get(url, { headers: HEADERS });
        const list = parseVideoList(res.data);
        return list.length > 0 ? list : [{ id: "empty", type: "text", title: "未找到内容" }];
    } catch (e) {
        return [{ id: "err", type: "text", title: "加载失败", subTitle: e.message }];
    }
}

async function searchList(params = {}) {
    const keyword = (params.keyword || params.query || "").trim();
    if (!keyword) return [{ id: "tip", type: "text", title: "请输入关键词" }];

    const page = params.page || 1;
    let url = `${BASE_URL}/cn/search/${encodeURIComponent(keyword)}`;
    if (page > 1) url += `?page=${page}`;

    try {
        const res = await Widget.http.get(url, { headers: HEADERS });
        const list = parseVideoList(res.data);
        return list.length > 0 ? list : [{ id: "empty", type: "text", title: "未搜索到相关番号" }];
    } catch (e) {
        return [{ id: "err", type: "text", title: "搜索请求失败", subTitle: e.message }];
    }
}

// 【修复核心】：兼容 Forward 的对象传参，提取真正的网址字符串
async function loadDetail(item) {
    // 判断传进来的是对象还是字符串，如果是对象则提取 id 字段
    const targetUrl = (typeof item === 'object') ? (item.id || item.url || item.link) : item;

    if (!targetUrl || typeof targetUrl !== 'string' || !targetUrl.startsWith('http')) {
        return [{ id: "err", type: "text", title: "解析错误", subTitle: "无效的视频链接参数" }];
    }

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
            // 直接返回数组格式，Forward 会直接拉起原生播放器起播
            return [{
                id: targetUrl,
                type: "video",
                title: title,
                videoUrl: videoUrl,
                playerType: "system",
                customHeaders: {
                    "Referer": "https://missav.ai/",
                    "User-Agent": HEADERS["User-Agent"]
                }
            }];
        } else {
            return [{ id: "err", type: "text", title: "解析失败", subTitle: "无法提取视频流" }];
        }
    } catch (e) {
        return [{ id: "err", type: "text", title: "请求失败", subTitle: e.message }];
    }
}
