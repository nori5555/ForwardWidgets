var WidgetMetadata = {
    id: "missav_makka_play",
    title: "MissAV",
    author: "Forward_User",
    description: "全局搜索完美版（统一使用详情页播放）",
    version: "3.3.0",
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
    // ✨ 开启全局主页搜索
    search: {
        title: "MissAV 搜索",
        functionName: "searchList",
        params: [
            { name: "keyword", title: "关键词", type: "input", value: "" },
            { name: "page", title: "页码", type: "page" }
        ]
    },
    // ✨ 声明详情页（开启全局搜索必须要有这个）
    detail: {
        title: "视频详情",
        functionName: "loadDetail"
    }
};

const BASE_URL = "https://missav.ai";
const HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Referer": "https://missav.ai/"
};

// 保持原汁原味的列表解析
function parseVideoList(html) {
    if (!html || html.includes("Just a moment")) {
        return [{ id: "err", type: "text", title: "被拦截", subTitle: "请稍后重试" }];
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
                type: "link", // 必须是 link 才能触发详情页
                title: title,
                coverUrl: coverUrl || imgSrc, 
                description: `时长: ${duration} | 番号: ${videoId}`
            });
        }
    });

    return results.length > 0 ? results : [{ id: "empty", type: "text", title: "未找到内容" }];
}

async function loadList(params = {}) {
    const { page = 1, category = "dm588/cn/release", sort = "released_at" } = params;
    let url = `${BASE_URL}/${category}?sort=${sort}`;
    if (page > 1) url += `&page=${page}`;
    try {
        const res = await Widget.http.get(url, { headers: HEADERS });
        return parseVideoList(res.data);
    } catch (e) {
        return [{ id: "err", type: "text", title: "加载失败" }];
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
        return parseVideoList(res.data);
    } catch (e) {
        return [{ id: "err", type: "text", title: "搜索失败" }];
    }
}

// 核心修复：输出标准、带播放按钮的原生详情页
async function loadDetail(item) {
    // 兼容全局搜索传来的包裹对象
    let targetUrl = typeof item === 'object' ? (item.id || item.link || item.url) : item;

    if (!targetUrl || typeof targetUrl !== 'string' || !targetUrl.startsWith('http')) {
        return { title: "解析错误，无效链接", episodes: [] };
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
            // ✨ 修复关键：严格按照 Forward 要求的 urls 嵌套格式，按钮必定显示！
            return {
                title: title,
                coverUrl: (typeof item === 'object' && item.coverUrl) ? item.coverUrl : "",
                description: (typeof item === 'object' && item.description) ? item.description : "",
                episodes: [
                    {
                        title: "播放线路",
                        urls: [
                            {
                                name: "▶ 立即播放",
                                url: videoUrl,
                                customHeaders: HEADERS
                            }
                        ]
                    }
                ]
            };
        } else {
            return { title: "提取视频流失败", episodes: [] };
        }
    } catch (e) {
        return { title: "请求出错", episodes: [] };
    }
}
