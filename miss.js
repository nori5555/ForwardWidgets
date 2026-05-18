var WidgetMetadata = {
    id: "missav_global_search",
    title: "MissAV",
    author: "Forward_User",
    description: "支持全局搜索与直接播放的完整版 (已修复返回报错问题)",
    version: "3.0.2", // 版本号小升一下
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
    }
};

const BASE_URL = "https://missav.ai";
const HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Referer": "https://missav.ai/",
};

// 提取通用列表解析逻辑
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
                type: "url",      // 🟢 修复1：从 "video" 改为 "url"
                link: href,       // 🟢 修复2：补充 link 字段供详情页读取
                mediaType: "movie", // 🟢 修复3：加上媒体类型
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
        const list = parseVideoList(res.data);
        return list.length > 0 ? list : [{ id: "empty", type: "text", title: "未找到内容" }];
    } catch (e) {
        return [{ id: "err", type: "text", title: "加载失败", subTitle: e.message }];
    }
}

// 全局搜索触发的函数
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

// 点击搜索结果后的解析播放逻辑
async function loadDetail(id) {
    if (!id.startsWith('http')) return null;

    try {
        const res = await Widget.http.get(id, { headers: HEADERS });
        const html = res.data;
        const $ = Widget.html.load(html);
        
        let title = $('meta[property="og:title"]').attr('content') || $('h1').text().trim();
        let videoUrl = "";
        
        // 核心解密嗅探
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

        if (videoUrl) {
            // 🟢 修复4：直接返回详情对象，去掉外部的数组包裹 []，将 type 改为 "detail"
            return {
                id: id,
                type: "detail", 
                mediaType: "movie",
                title: title,
                videoUrl: videoUrl,
                playerType: "system",
                link: id,
                customHeaders: {
                    "Referer": "https://missav.ai/",
                    "User-Agent": HEADERS["User-Agent"]
                }
            };
        } else {
            return { id: "err", type: "text", title: "解析失败", description: "无法提取视频流" };
        }
    } catch (e) {
        return { id: "err", type: "text", title: "请求失败", description: e.message };
    }
}
