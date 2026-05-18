var WidgetMetadata = {
    id: "missav_makka_play",
    title: "MissAV",
    author: "Forward_User",
    description: "终极完美版：修复高清画质、历史记录防失效、选集错位问题",
    version: "4.0.0",
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

// 解析列表
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
            if (href.startsWith("/")) href = BASE_URL + href;

            const title = $link.text().trim();
            const $img = $el.find("img");
            const imgSrc = $img.attr("data-src") || $img.attr("src");
            const duration = $el.find(".absolute.bottom-1.right-1").text().trim();
            const videoId = href.split('/').pop().replace(/-uncensored-leak|-chinese-subtitle/g, '').toUpperCase();
            const coverUrl = `https://fourhoi.com/${videoId.toLowerCase()}/cover-t.jpg` || imgSrc;

            results.push({
                id: href, 
                type: "url", 
                // 🔴 修复1：强制声明为 tv（剧集），这样后续的 childItems 才会乖乖进入“选集”列表，绝不乱跑！
                mediaType: "tv", 
                videoUrl: null, 
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

// 详情与播放解析（终极路由分发）
async function loadDetail(item) {
    let targetId = typeof item === 'object' ? (item.id || item.link) : item;
    if (!targetId || typeof targetId !== 'string') return [];

    let fetchUrl = targetId;
    let isEpisodeClick = false;

    // 🔴 修复2：拦截历史记录点击。如果 ID 包含 _ep1，说明用户是从【继续观看】点进来的，或者是点击了选集按钮！
    if (fetchUrl.includes("_ep1")) {
        isEpisodeClick = true;
        fetchUrl = fetchUrl.replace("_ep1", ""); // 洗白 ID，还原出真实的视频网页链接去重新抓包
    }

    try {
        const res = await Widget.http.get(fetchUrl, { headers: HEADERS });
        const html = res.data;
        const $ = Widget.html.load(html);
        
        let title = $('meta[property="og:title"]').attr('content') || $('h1').text().trim();
        
        let cover = $('meta[property="og:image"]').attr('content') || "";
        if (!cover) {
            const videoIdMatch = fetchUrl.match(/\/([a-z0-9\-]+)$/i);
            if (videoIdMatch) {
                const videoId = videoIdMatch[1].replace(/-uncensored-leak|-chinese-subtitle/g, '').toUpperCase();
                cover = `https://fourhoi.com/${videoId.toLowerCase()}/cover-t.jpg`;
            }
        }
        let finalCover = (typeof item === 'object' && (item.posterPath || item.coverUrl)) ? (item.posterPath || item.coverUrl) : cover;

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
            if (isEpisodeClick) {
                // 🔴 修复3：点击选集或【继续观看】时，返回带 playerType 的数组进行瞬间高清播放！
                return [{
                    id: targetId, 
                    type: "video", 
                    title: title,
                    videoUrl: videoUrl, // 这是刚刚抓取到的新鲜、不过期链接
                    playerType: "system", // ✨ 唤醒系统原生超清播放器！
                    customHeaders: PLAY_HEADERS
                }];
            } else {
                // 正常点击列表时，渲染稳如泰山的详情页骨架
                return {
                    id: targetId,
                    type: "url", 
                    mediaType: "tv", // 配合前面的 tv，彻底根除“相似作品”错位
                    title: title || "未知标题",
                    posterPath: finalCover,
                    backdropPath: finalCover,
                    link: fetchUrl,
                    childItems: [
                        {
                            id: fetchUrl + "_ep1", // 点击这里会触发上面的 isEpisodeClick 拦截
                            type: "url", // 必须是 url，让它把任务交给上面的拦截器去要高清链接
                            mediaType: "episode", 
                            title: "▶ 点击播放高清正片",
                            posterPath: finalCover,
                            customHeaders: HEADERS
                        }
                    ]
                };
            }
        } else {
            return { 
                id: targetId, type: "url", mediaType: "tv", 
                title: "视频解析失败，请下拉刷新", posterPath: finalCover, childItems: [] 
            };
        }
    } catch (e) {
        return { 
            id: targetId, type: "url", mediaType: "tv", 
            title: "网络加载错误，请下拉刷新", childItems: [] 
        };
    }
}
