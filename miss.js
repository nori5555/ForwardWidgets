var WidgetMetadata = {
    id: "missav_global_search",
    title: "MissAV",
    author: "Forward_User",
    description: "原汁原味版：仅添加全局搜索入口，不改变任何原版逻辑",
    version: "3.1.0",
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
        }
    ],
    // ✨ 仅仅在原版基础上增加了这一个全局搜索配置
    search: {
        title: "MissAV 搜索",
        functionName: "searchList",
        params: [
            { name: "keyword", title: "关键词", type: "input", value: "" },
            { name: "page", title: "页码", type: "page" }
        ]
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

// --- 完全保留你最初的解析代码，一字未改 ---
function parseVideoList(html) {
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

    return results.length > 0 ? results : [{ id: "empty", type: "text", title: "没有找到相关视频" }];
}

async function loadList(params = {}) {
    const { page = 1, category = "dm588/cn/release", sort = "released_at" } = params;
    let url = `${BASE_URL}/${category}?sort=${sort}`;
    if (page > 1) url += `&page=${page}`;

    try {
        const res = await Widget.http.get(url, { headers: HEADERS });
        return parseVideoList(res.data);
    } catch (e) {
        return [{ id: "err", type: "text", title: "加载失败", subTitle: e.message }];
    }
}

async function searchList(params = {}) {
    const keyword = params.keyword || params.query || "";
    const page = params.page || 1;
    
    if (!keyword) {
        return [{ id: "tip", type: "text", title: "请输入关键词开始搜索" }];
    }

    let url = `${BASE_URL}/cn/search/${encodeURIComponent(keyword)}`;
    if (page > 1) url += `?page=${page}`;

    try {
        const res = await Widget.http.get(url, { headers: HEADERS });
        return parseVideoList(res.data);
    } catch (e) {
        return [{ id: "err", type: "text", title: "搜索失败", subTitle: e.message }];
    }
}

// --- 完全保留你最初的快播逻辑，只兼容了全局搜索的传参 ---
async function loadDetail(link) {
    // ✨ 唯一增加的 3 行代码：把全局搜索传过来的包裹对象，剥离成原本的纯网址文本
    let targetUrl = link;
    if (typeof link === 'object' && link !== null) {
        targetUrl = link.id || link.link;
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
            return [{
                id: targetUrl,
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
