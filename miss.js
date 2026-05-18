var WidgetMetadata = {
    id: "missav_global_search",
    title: "MissAV",
    author: "Forward_User",
    description: "支持全局搜索与直接播放的完整版 (修复搜索无封面问题)",
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
                        { title: "🔞 无码流出", value: "dm6
