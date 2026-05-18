// 详情与播放解析
async function loadDetail(item) {
    let targetUrl = typeof item === 'object' ? (item.id || item.link) : item;
    if (!targetUrl || typeof targetUrl !== 'string') return [];

    // 识别隐形标记：决定是走“原版秒播”还是“详情页”
    let isGlobal = false;
    if (targetUrl.includes("#global_search")) {
        isGlobal = true;
        targetUrl = targetUrl.replace("#global_search", ""); // 剥离标记，还原真实网址
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
                // 🔴 关键修复：完全照抄 VOD.js 的规范！
                // 抛弃无效的 episodes 字段，换成 Forward 认识的 videoUrl 和 childItems
                return {
                    id: targetUrl,
                    type: "video",
                    title: title,
                    videoUrl: videoUrl, // 根节点提供播放直链，确保点击大屏播放生效
                    posterPath: typeof item === 'object' ? (item.coverUrl || "") : "", 
                    customHeaders: HEADERS,
                    // 选集列表必须叫 childItems
                    childItems: [
                        {
                            id: targetUrl + "_ep1",
                            type: "video",
                            title: "▶ 点击播放正片",
                            videoUrl: videoUrl,
                            mediaType: "episode",
                            customHeaders: HEADERS
                        }
                    ]
                };
            } else {
                // 如果是模块内点进来的：100% 保持你上传原文件的数组格式，瞬间秒播！
                return [{
                    id: targetUrl,
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
