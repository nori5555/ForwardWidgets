WidgetMetadata = {
    id: "missav_makka_play",
    title: "MissAV_ovo",
    author: "𝙈𝙖𝙠𝙠𝙖𝙋𝙖𝙠𝙠𝙖 / EL",
    description: "MissAV 视频聚合模块，支持中文字幕、日本AV、素人、无码影片、亚洲AV、女优、类型、发行商与搜索",
    version: "2.4.0",
    requiredVersion: "0.0.1",
    site: "https://missav.ai",
    modules: [
        {
            title: "中文字幕",
            functionName: "loadList",
            type: "video",
            params: [
                { name: "page", title: "页码", type: "page" },
                { name: "endpoint", title: "endpoint", type: "enumeration", value: "dm278/cn/chinese-subtitle", enumOptions: [{ title: "中文字幕", value: "dm278/cn/chinese-subtitle" }] },
                { name: "filters", title: "filters", type: "enumeration", value: "chinese-subtitle", enumOptions: [
                    { title: "所有", value: "" },
                    { title: "单人作品", value: "individual" },
                    { title: "多人作品", value: "multiple" },
                    { title: "中文字幕", value: "chinese-subtitle" }
                ] },
                { name: "sort", title: "排序", type: "enumeration", value: "released_at", enumOptions: [
                    { title: "发行日期", value: "released_at" },
                    { title: "最近更新", value: "published_at" },
                    { title: "收藏数", value: "saved" },
                    { title: "今日浏览数", value: "today_views" },
                    { title: "本周浏览数", value: "weekly_views" },
                    { title: "本月浏览数", value: "monthly_views" },
                    { title: "总浏览数", value: "views" }
                ] }
            ]
        },
        {
            title: "日本AV",
            functionName: "loadList",
            type: "video",
            params: [
                { name: "page", title: "页码", type: "page" },
                { name: "endpoint", title: "endpoint", type: "enumeration", value: "dm632/cn/release", enumOptions: [
                    { title: "最新发布", value: "dm632/cn/release" },
                    { title: "本周热门", value: "dm170/cn/weekly-hot" },
                    { title: "月度热门", value: "dm266/cn/monthly-hot" }
                ] }
            ]
        },
        {
            title: "素人",
            functionName: "loadList",
            type: "video",
            params: [
                { name: "page", title: "页码", type: "page" },
                { name: "endpoint", title: "endpoint", type: "enumeration", value: "dm36/cn/siro", enumOptions: [
                    { title: "SIRO", value: "dm36/cn/siro" },
                    { title: "LUXU", value: "dm34/cn/luxu" },
                    { title: "GANA", value: "dm32/cn/gana" },
                    { title: "PRESTIGE PREMIUM", value: "dm999/cn/maan" },
                    { title: "S-CUTE", value: "dm38/cn/scute" },
                    { title: "ARA", value: "dm34/cn/ara" }
                ] }
            ]
        },
        {
            title: "无码影片",
            functionName: "loadList",
            type: "video",
            params: [
                { name: "page", title: "页码", type: "page" },
                { name: "endpoint", title: "endpoint", type: "enumeration", value: "dm814/cn/uncensored-leak", enumOptions: [
                    { title: "无码流出", value: "dm814/cn/uncensored-leak" },
                    { title: "东京热", value: "dm42/cn/tokyohot" }
                ] }
            ]
        },
        {
            title: "亚洲AV",
            functionName: "loadList",
            type: "video",
            params: [
                { name: "page", title: "页码", type: "page" },
                { name: "endpoint", title: "endpoint", type: "enumeration", value: "dm63/cn/madou", enumOptions: [
                    { title: "麻豆传媒", value: "dm63/cn/madou" },
                    { title: "TWAV", value: "dm31/cn/twav" },
                    { title: "Furuke", value: "dm15/cn/furuke" },
                    { title: "韩国直播", value: "cn/klive" },
                    { title: "中国直播", value: "cn/clive" }
                ] }
            ]
        },
        {
            title: "女优",
            functionName: "loadList",
            type: "video",
            params: [
                { name: "page", title: "页码", type: "page" },
                { name: "endpoint", title: "endpoint", type: "enumeration", value: "dm179/cn/actresses/%E7%80%AC%E6%88%B8%E7%92%B0%E5%A5%88", enumOptions: [
                    { title: "瀬戸環奈", value: "dm179/cn/actresses/%E7%80%AC%E6%88%B8%E7%92%B0%E5%A5%88" },
                    { title: "逢泽みゆ", value: "dm179/cn/actresses/%E9%80%A2%E6%B2%A2%E3%81%BF%E3%82%86" },
                    { title: "河北彩花", value: "dm179/cn/actresses/%E6%B2%B3%E5%8C%97%E5%BD%A9%E8%8A%B1" },
                    { title: "松本一香", value: "dm179/cn/actresses/%E6%9D%BE%E6%9C%AC%E4%B8%80%E9%A6%99" },
                    { title: "美园和花", value: "dm179/cn/actresses/%E7%BE%8E%E5%9B%AD%E5%92%8C%E8%8A%B1" },
                    { title: "北冈果林", value: "dm179/cn/actresses/%E5%8C%97%E5%B2%A1%E6%9E%9C%E6%9E%97" },
                    { title: "柏木こなつ", value: "dm179/cn/actresses/%E6%9F%8F%E6%9C%A8%E3%81%93%E3%81%AA%E3%81%A4" },
                    { title: "浅野こころ", value: "dm179/cn/actresses/%E6%B5%85%E9%87%8E%E3%81%93%E3%81%93%E3%82%8D" },
                    { title: "北野未奈", value: "dm179/cn/actresses/%E5%8C%97%E9%87%8E%E6%9C%AA%E5%A5%88" },
                    { title: "清原みゆう", value: "dm179/cn/actresses/%E6%B8%85%E5%8E%9F%E3%81%BF%E3%82%86%E3%81%86" },
                    { title: "沙月惠奈", value: "dm179/cn/actresses/%E6%B2%99%E6%9C%88%E6%83%A0%E5%A5%88" },
                    { title: "miru", value: "dm179/cn/actresses/miru" },
                    { title: "七森莉莉", value: "dm179/cn/actresses/%E4%B8%83%E6%A3%AE%E8%8E%89%E8%8E%89" },
                    { title: "七濑爱丽丝", value: "dm179/cn/actresses/%E4%B8%83%E6%BF%91%E7%88%B1%E4%B8%BD%E4%B8%9D" },
                    { title: "鹫尾芽衣", value: "dm179/cn/actresses/%E9%B9%AB%E5%B0%BE%E8%8A%BD%E8%A1%A3" },
                    { title: "博多彩叶", value: "dm179/cn/actresses/%E5%8D%9A%E5%A4%9A%E5%BD%A9%E5%8F%B6" },
                    { title: "石川澪", value: "dm179/cn/actresses/%E7%9F%B3%E5%B7%9D%E6%BE%AA" },
                    { title: "白上咲花", value: "dm179/cn/actresses/%E7%99%BD%E4%B8%8A%E5%92%B2%E8%8A%B1" },
                    { title: "田野忧", value: "dm179/cn/actresses/%E7%94%B0%E9%87%8E%E5%BF%A7" },
                    { title: "未步なな", value: "dm179/cn/actresses/%E6%9C%AA%E6%AD%A5%E3%81%AA%E3%81%AA" },
                    { title: "村上悠华", value: "dm179/cn/actresses/%E6%9D%91%E4%B8%8A%E6%82%A0%E5%8D%8E" },
                    { title: "三田真铃", value: "dm179/cn/actresses/%E4%B8%89%E7%94%B0%E7%9C%9F%E9%93%83" },
                    { title: "八掛うみ", value: "dm179/cn/actresses/%E5%85%AB%E6%8E%9B%E3%81%86%E3%81%BF" },
                    { title: "初美なのか", value: "dm179/cn/actresses/%E5%88%9D%E7%BE%8E%E3%81%AA%E3%81%AE%E3%81%8B" },
                    { title: "宮下玲奈", value: "dm179/cn/actresses/%E5%AE%AE%E4%B8%8B%E7%8E%B2%E5%A5%88" },
                    { title: "新有菜", value: "dm58/actresses/%E6%A9%8B%E6%9C%AC%E6%9C%89%E8%8F%9C%20%28%E6%96%B0%E6%9C%89%E8%8F%9C%29" },
                    { title: "新木希空", value: "dm179/cn/actresses/%E6%96%B0%E6%9C%A8%E5%B8%8C%E7%A9%BA" },
                    { title: "明里つむぎ", value: "dm179/cn/actresses/%E6%98%8E%E9%87%8C%E3%81%A4%E3%82%80%E3%81%8E" },
                    { title: "本庄鈴", value: "dm179/cn/actresses/%E6%9C%AC%E5%BA%84%E9%88%B4" },
                    { title: "桃乃木かな", value: "dm179/cn/actresses/%E6%A1%83%E4%B9%83%E6%9C%A8%E3%81%8B%E3%81%AA" },
                    { title: "桜空もも", value: "dm179/cn/actresses/%E6%A1%9C%E7%A9%BA%E3%82%82%E3%82%82" },
                    { title: "楓ふうあ", value: "dm63/actresses/%E6%A5%93%E3%81%B5%E3%81%86%E3%81%82" },
                    { title: "楓可憐", value: "dm38/actresses/%E6%A5%93%E5%8F%AF%E6%86%90%20%28%E7%94%B0%E4%B8%AD%E6%AA%B8%E6%AA%AC%29" },
                    { title: "涼森れむ", value: "dm179/cn/actresses/%E6%B6%BC%E6%A3%AE%E3%82%8C%E3%82%80" },
                    { title: "瀧本雫葉", value: "dm179/cn/actresses/%E7%80%A7%E6%9C%AC%E9%9B%AB%E8%91%89" },
                    { title: "田中レモン", value: "dm179/cn/actresses/%E7%94%B0%E4%B8%AD%E3%83%AC%E3%83%A2%E3%83%B3" },
                    { title: "相沢みなみ", value: "dm179/cn/actresses/%E7%9B%B8%E6%B2%A2%E3%81%BF%E3%81%AA%E3%81%BF" },
                    { title: "神木麗", value: "dm179/cn/actresses/%E7%A5%9E%E6%9C%A8%E9%BA%97" },
                    { title: "美ノ嶋めぐり", value: "dm179/cn/actresses/%E7%BE%8E%E3%83%8E%E5%B6%8B%E3%82%81%E3%81%90%E3%82%8A" },
                    { title: "野々浦暖", value: "dm179/cn/actresses/%E9%87%8E%E3%80%85%E6%B5%A6%E6%9A%96" },
                    { title: "青空ひかり", value: "dm179/cn/actresses/%E9%9D%92%E7%A9%BA%E3%81%B2%E3%81%8B%E3%82%8A" },
                    { title: "三上悠亚", value: "dm179/cn/actresses/%E4%B8%89%E4%B8%8A%E6%82%A0%E4%BA%9A" },
                    { title: "榊原萌", value: "dm179/cn/actresses/%E6%A6%8A%E5%8E%9F%E8%90%8C" },
                    { title: "彩月七绪", value: "dm179/cn/actresses/%E5%BD%A9%E6%9C%88%E4%B8%83%E7%BB%AA" },
                    { title: "神宫寺奈绪", value: "dm179/cn/actresses/%E7%A5%9E%E5%AE%AB%E5%AF%BA%E5%A5%88%E7%BB%AA" },
                    { title: "有村のぞみ", value: "dm179/cn/actresses/%E6%9C%89%E6%9D%91%E3%81%AE%E3%81%9E%E3%81%BF" }
                ] }
            ]
        },
        {
            title: "类型",
            functionName: "loadList",
            type: "video",
            params: [
                { name: "page", title: "页码", type: "page" },
                { name: "endpoint", title: "endpoint", type: "enumeration", value: "dm96/cn/genres/%E9%AB%98%E6%B8%85", enumOptions: [
                    { title: "高清", value: "dm96/cn/genres/%E9%AB%98%E6%B8%85" },
                    { title: "独家", value: "dm139/cn/genres/%E7%8B%AC%E5%AE%B6" },
                    { title: "中出", value: "dm130/cn/genres/%E4%B8%AD%E5%87%BA" },
                    { title: "单体作品", value: "dm122/cn/genres/%E5%8D%95%E4%BD%93%E4%BD%9C%E5%93%81" },
                    { title: "巨乳", value: "dm120/cn/genres/%E5%B7%A8%E4%B9%B3" },
                    { title: "人妻", value: "dm77/cn/genres/%E4%BA%BA%E5%A6%BB" },
                    { title: "熟女", value: "dm118/cn/genres/%E7%86%9F%E5%A5%B3" },
                    { title: "素人", value: "dm123/cn/genres/%E7%B4%A0%E4%BA%BA" },
                    { title: "美少女", value: "dm437/cn/genres/%E7%BE%8E%E5%B0%91%E5%A5%B3" },
                    { title: "口交", value: "dm1301/cn/genres/%E5%8F%A3%E4%BA%A4" },
                    { title: "多人运动", value: "dm321/cn/genres/%E5%A4%9A%E4%BA%BA%E8%BF%90%E5%8A%A8" },
                    { title: "薄格", value: "dm76/cn/genres/%E8%96%84%E6%A0%BC" },
                    { title: "骑乘", value: "dm486/cn/genres/%E9%AA%91%E4%B9%98" },
                    { title: "痴女", value: "dm313/cn/genres/%E7%97%B4%E5%A5%B3" },
                    { title: "4小时以上", value: "dm738/cn/genres/4%E5%B0%8F%E6%97%B6%E4%BB%A5%E4%B8%8A" },
                    { title: "女高中生", value: "dm4448/cn/genres/%E5%A5%B3%E9%AB%98%E4%B8%AD%E7%94%9F" },
                    { title: "潮吹", value: "dm161/cn/genres/%E6%BD%AE%E5%90%B9" },
                    { title: "苗条", value: "dm757/cn/genres/%E8%8B%97%E6%9D%A1" },
                    { title: "自拍", value: "dm978/cn/genres/%E8%87%AA%E6%8B%8D" },
                    { title: "合集", value: "dm784/cn/genres/%E5%90%88%E9%9B%86" },
                    { title: "乳交", value: "dm594/cn/genres/%E4%B9%B3%E4%BA%A4" },
                    { title: "恋物癖", value: "dm117/cn/genres/%E6%81%8B%E7%89%A9%E7%99%96" },
                    { title: "美乳", value: "dm215/cn/genres/%E7%BE%8E%E4%B9%B3" },
                    { title: "NTR", value: "dm736/cn/genres/NTR" },
                    { title: "企划", value: "dm341/cn/genres/%E4%BC%81%E5%88%92" },
                    { title: "乱伦", value: "dm56/cn/genres/%E4%B9%B1%E4%BC%A6" },
                    { title: "搭讪", value: "dm292/cn/genres/%E6%90%AD%E8%AE%AA" },
                    { title: "颜射", value: "dm319/cn/genres/%E9%A2%9C%E5%B0%84" },
                    { title: "淫乱", value: "dm903/cn/genres/%E6%B7%AB%E4%B9%B1" },
                    { title: "偷拍", value: "dm516/cn/genres/%E5%81%B7%E6%8B%8D" },
                    { title: "剧情", value: "dm98/cn/genres/%E5%89%A7%E6%83%85" },
                    { title: "自慰", value: "dm7606/cn/genres/%E8%87%AA%E6%85%B0" },
                    { title: "4K", value: "dm55/cn/genres/4K" },
                    { title: "手淫", value: "dm94/cn/genres/%E6%89%8B%E6%B7%AB" },
                    { title: "姐姐", value: "dm793/cn/genres/%E5%A7%90%E5%A7%90" },
                    { title: "羞辱", value: "dm161/cn/genres/%E7%BE%9E%E8%BE%B1" }
                ] }
            ]
        },
        {
            title: "发行商",
            functionName: "loadList",
            type: "video",
            params: [
                { name: "page", title: "页码", type: "page" },
                { name: "endpoint", title: "endpoint", type: "enumeration", value: "dm825/cn/makers/Moody%27s", enumOptions: [
                    { title: "Moody's", value: "dm825/cn/makers/Moody%27s" },
                    { title: "Prestige", value: "dm825/cn/makers/Prestige" },
                    { title: "Madonna", value: "dm825/cn/makers/Madonna" },
                    { title: "S1", value: "dm825/cn/makers/S1" },
                    { title: "SOD", value: "dm825/cn/makers/SOD" },
                    { title: "IdeaPocket", value: "dm825/cn/makers/IdeaPocket" },
                    { title: "Attackers", value: "dm825/cn/makers/Attackers" },
                    { title: "Glory Quest", value: "dm825/cn/makers/Glory%20Quest" },
                    { title: "ビッグモーカル", value: "dm825/cn/makers/%E3%83%93%E3%83%83%E3%82%B0%E3%83%A2%E3%83%BC%E3%82%AB%E3%83%AB" },
                    { title: "NATURAL HIGH", value: "dm825/cn/makers/NATURAL%20HIGH" },
                    { title: "Wanz Factory", value: "dm825/cn/makers/Wanz%20Factory" },
                    { title: "Takara Visual", value: "dm825/cn/makers/Takara%20Visual" },
                    { title: "Fc2", value: "dm825/cn/makers/Fc2" },
                    { title: "Premium", value: "dm825/cn/makers/Premium" },
                    { title: "Fitch", value: "dm825/cn/makers/Fitch" },
                    { title: "VENUS", value: "dm825/cn/makers/VENUS" },
                    { title: "DEEP'S", value: "dm825/cn/makers/DEEP%27S" },
                    { title: "本中", value: "dm825/cn/makers/%E6%9C%AC%E4%B8%AD" },
                    { title: "Hunter", value: "dm825/cn/makers/Hunter" },
                    { title: "溜池ゴロー", value: "dm825/cn/makers/%E6%BA%9C%E6%B1%A0%E3%82%B4%E3%83%AD%E3%83%BC" },
                    { title: "TMA", value: "dm825/cn/makers/TMA" },
                    { title: "センタービレッジ", value: "dm825/cn/makers/%E3%82%BB%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%93%E3%83%AC%E3%83%83%E3%82%B8" },
                    { title: "Das", value: "dm825/cn/makers/Das" },
                    { title: "Waap Entertainment", value: "dm825/cn/makers/Waap%20Entertainment" },
                    { title: "Crystal-Eizou", value: "dm825/cn/makers/Crystal-Eizou" },
                    { title: "kawaii", value: "dm825/cn/makers/kawaii" },
                    { title: "ゴーゴーズ", value: "dm825/cn/makers/%E3%82%B4%E3%83%BC%E3%82%B4%E3%83%BC%E3%82%BA" },
                    { title: "プラネットプラス", value: "dm825/cn/makers/%E3%83%97%E3%83%A9%E3%83%8D%E3%83%83%E3%83%88%E3%83%97%E3%83%A9%E3%82%B9" },
                    { title: "OPPAI", value: "dm825/cn/makers/OPPAI" },
                    { title: "STAR PARADISE", value: "dm825/cn/makers/STAR%20PARADISE" },
                    { title: "E-BODY", value: "dm825/cn/makers/E-BODY" },
                    { title: "セレブの友", value: "dm825/cn/makers/%E3%82%BB%E3%83%AC%E3%83%96%E3%81%AE%E5%8F%8B" },
                    { title: "ドグマ", value: "dm825/cn/makers/%E3%83%89%E3%82%B0%E3%83%9E" },
                    { title: "Alice Japan", value: "dm825/cn/makers/Alice%20Japan" },
                    { title: "KM Produce", value: "dm825/cn/makers/KM%20Produce" },
                    { title: "桃太郎映像出版", value: "dm825/cn/makers/%E6%A1%83%E5%A4%AA%E9%83%8E%E6%98%A0%E5%83%8F%E5%87%BA%E7%89%88" }
                ] }
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
    search: {
        title: "🌐 全局搜索",
        functionName: "searchGlobal",
        params: [
            { name: "keyword", title: "关键词", type: "input", description: "搜索的关键词", value: "" },
            { name: "page", title: "页码", type: "page", value: "1" }
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

const ACTRESS_ENDPOINTS = [
    { title: "瀬户环奈", value: "dm179/cn/actresses/%E7%80%AC%E6%88%B8%E7%92%B0%E5%A5%88" },
    { title: "逢泽みゆ", value: "dm179/cn/actresses/%E9%80%A2%E6%B2%A2%E3%81%BF%E3%82%86" },
    { title: "河北彩花", value: "dm179/cn/actresses/%E6%B2%B3%E5%8C%97%E5%BD%A9%E8%8A%B1" },
    { title: "松本一香", value: "dm179/cn/actresses/%E6%9D%BE%E6%9C%AC%E4%B8%80%E9%A6%99" },
    { title: "美园和花", value: "dm179/cn/actresses/%E7%BE%8E%E5%9B%AD%E5%92%8C%E8%8A%B1" },
    { title: "北冈果林", value: "dm179/cn/actresses/%E5%8C%97%E5%B2%A1%E6%9E%9C%E6%9E%97" },
    { title: "柏木こなつ", value: "dm179/cn/actresses/%E6%9F%8F%E6%9C%A8%E3%81%93%E3%81%AA%E3%81%A4" },
    { title: "浅野こころ", value: "dm179/cn/actresses/%E6%B5%85%E9%87%8E%E3%81%93%E3%81%93%E3%82%8D" },
    { title: "北野未奈", value: "dm179/cn/actresses/%E5%8C%97%E9%87%8E%E6%9C%AA%E5%A5%88" },
    { title: "清原みゆう", value: "dm179/cn/actresses/%E6%B8%85%E5%8E%9F%E3%81%BF%E3%82%86%E3%81%86" },
    { title: "沙月惠奈", value: "dm179/cn/actresses/%E6%B2%99%E6%9C%88%E6%83%A0%E5%A5%88" },
    { title: "miru", value: "dm179/cn/actresses/miru" },
    { title: "七森莉莉", value: "dm179/cn/actresses/%E4%B8%83%E6%A3%AE%E8%8E%89%E8%8E%89" },
    { title: "七濑爱丽丝", value: "dm179/cn/actresses/%E4%B8%83%E6%BF%91%E7%88%B1%E4%B8%BD%E4%B8%9D" },
    { title: "鹫尾芽衣", value: "dm179/cn/actresses/%E9%B9%AB%E5%B0%BE%E8%8A%BD%E8%A1%A3" },
    { title: "博多彩叶", value: "dm179/cn/actresses/%E5%8D%9A%E5%A4%9A%E5%BD%A9%E5%8F%B6" },
    { title: "石川澪", value: "dm179/cn/actresses/%E7%9F%B3%E5%B7%9D%E6%BE%AA" },
    { title: "白上咲花", value: "dm179/cn/actresses/%E7%99%BD%E4%B8%8A%E5%92%B2%E8%8A%B1" },
    { title: "田野忧", value: "dm179/cn/actresses/%E7%94%B0%E9%87%8E%E5%BF%A7" },
    { title: "未步なな", value: "dm179/cn/actresses/%E6%9C%AA%E6%AD%A5%E3%81%AA%E3%81%AA" },
    { title: "村上悠华", value: "dm179/cn/actresses/%E6%9D%91%E4%B8%8A%E6%82%A0%E5%8D%8E" },
    { title: "三田真铃", value: "dm179/cn/actresses/%E4%B8%89%E7%94%B0%E7%9C%9F%E9%93%83" },
    { title: "八挂うみ", value: "dm179/cn/actresses/%E5%85%AB%E6%8E%9B%E3%81%86%E3%81%BF" },
    { title: "初美なのか", value: "dm179/cn/actresses/%E5%88%9D%E7%BE%8E%E3%81%AA%E3%81%AE%E3%81%8B" },
    { title: "宫下玲奈", value: "dm179/cn/actresses/%E5%AE%AE%E4%B8%8B%E7%8E%B2%E5%A5%88" },
    { title: "新有菜", value: "dm58/actresses/%E6%A9%8B%E6%9C%AC%E6%9C%89%E8%8F%9C%20%28%E6%96%B0%E6%9C%89%E8%8F%9C%29" },
    { title: "新木希空", value: "dm179/cn/actresses/%E6%96%B0%E6%9C%A8%E5%B8%8C%E7%A9%BA" },
    { title: "明里つむぎ", value: "dm179/cn/actresses/%E6%98%8E%E9%87%8C%E3%81%A4%E3%82%80%E3%81%8E" },
    { title: "小野六花", value: "dm179/cn/actresses/%E5%B0%8F%E9%87%8E%E5%85%AD%E8%8A%B1" },
    { title: "宇都宫紫苑", value: "dm179/cn/actresses/%E5%AE%87%E9%83%BD%E5%AE%AE%E7%B4%AB%E8%8B%91" },
    { title: "小宵こなん", value: "dm179/cn/actresses/%E5%B0%8F%E5%AE%B5%E3%81%93%E3%81%AA%E3%82%93" },
    { title: "本庄鈴", value: "dm179/cn/actresses/%E6%9C%AC%E5%BA%84%E9%88%B4" },
    { title: "桃乃木かな", value: "dm179/cn/actresses/%E6%A1%83%E4%B9%83%E6%9C%A8%E3%81%8B%E3%81%AA" },
    { title: "桜空もも", value: "dm179/cn/actresses/%E6%A1%9C%E7%A9%BA%E3%82%82%E3%82%82" },
    { title: "楓ふうあ", value: "dm179/cn/actresses/%E6%A1%AB%E3%81%B5%E3%81%86%E3%81%82" },
    { title: "楓カレン", value: "dm179/cn/actresses/%E6%A5%93%E3%82%AB%E3%83%AC%E3%83%B3" },
    { title: "涼森れむ", value: "dm179/cn/actresses/%E6%B6%BC%E6%A3%AE%E3%82%8C%E3%82%80" },
    { title: "瀧本雫葉", value: "dm179/cn/actresses/%E7%80%A7%E6%9C%AC%E9%9B%AB%E8%91%89" },
    { title: "田中レモン", value: "dm179/cn/actresses/%E7%94%B0%E4%B8%AD%E3%83%AC%E3%83%A2%E3%83%B3" },
    { title: "相沢みなみ", value: "dm179/cn/actresses/%E7%9B%B8%E6%B2%A2%E3%81%BF%E3%81%AA%E3%81%BF" },
    { title: "神木麗", value: "dm179/cn/actresses/%E7%A5%9E%E6%9C%A8%E9%BA%97" },
    { title: "美ノ嶋めぐり", value: "dm179/cn/actresses/%E7%BE%8E%E3%83%8E%E5%B6%8B%E3%82%81%E3%81%90%E3%82%8A" },
    { title: "野々浦暖", value: "dm179/cn/actresses/%E9%87%8E%E3%80%85%E6%B5%A6%E6%9A%96" },
    { title: "青空ひかり", value: "dm179/cn/actresses/%E9%9D%92%E7%A9%BA%E3%81%B2%E3%81%8B%E3%82%8A" },
    { title: "三上悠亚", value: "dm179/cn/actresses/%E4%B8%89%E4%B8%8A%E6%82%A0%E4%BA%9A" },
    { title: "榊原萌", value: "dm179/cn/actresses/%E6%A6%8A%E5%8E%9F%E8%90%8C" },
    { title: "彩月七绪", value: "dm179/cn/actresses/%E5%BD%A9%E6%9C%88%E4%B8%83%E7%BB%AA" },
    { title: "神宫寺奈绪", value: "dm179/cn/actresses/%E7%A5%9E%E5%AE%AB%E5%AF%BA%E5%A5%88%E7%BB%AA" },
    { title: "有村のぞみ", value: "dm179/cn/actresses/%E6%9C%89%E6%9D%91%E3%81%AE%E3%81%9E%E3%81%BF" }
];

const GENRES_ENDPOINTS = [
    { title: "高清", value: "dm96/cn/genres/%E9%AB%98%E6%B8%85" },
    { title: "独家", value: "dm139/cn/genres/%E7%8B%AC%E5%AE%B6" },
    { title: "中出", value: "dm130/cn/genres/%E4%B8%AD%E5%87%BA" },
    { title: "单体作品", value: "dm122/cn/genres/%E5%8D%95%E4%BD%93%E4%BD%9C%E5%93%81" },
    { title: "巨乳", value: "dm120/cn/genres/%E5%B7%A8%E4%B9%B3" },
    { title: "人妻", value: "dm77/cn/genres/%E4%BA%BA%E5%A6%BB" },
    { title: "熟女", value: "dm118/cn/genres/%E7%86%9F%E5%A5%B3" },
    { title: "素人", value: "dm123/cn/genres/%E7%B4%A0%E4%BA%BA" },
    { title: "美少女", value: "dm437/cn/genres/%E7%BE%8E%E5%B0%91%E5%A5%B3" },
    { title: "口交", value: "dm1301/cn/genres/%E5%8F%A3%E4%BA%A4" },
    { title: "多人运动", value: "dm321/cn/genres/%E5%A4%9A%E4%BA%BA%E8%BF%90%E5%8A%A8" },
    { title: "薄格", value: "dm76/cn/genres/%E8%96%84%E6%A0%BC" },
    { title: "骑乘", value: "dm486/cn/genres/%E9%AA%91%E4%B9%98" },
    { title: "痴女", value: "dm313/cn/genres/%E7%97%B4%E5%A5%B3" },
    { title: "4小时以上", value: "dm738/cn/genres/4%E5%B0%8F%E6%97%B6%E4%BB%A5%E4%B8%8A" },
    { title: "女高中生", value: "dm4448/cn/genres/%E5%A5%B3%E9%AB%98%E4%B8%AD%E7%94%9F" },
    { title: "潮吹", value: "dm161/cn/genres/%E6%BD%AE%E5%90%B9" },
    { title: "苗条", value: "dm757/cn/genres/%E8%8B%97%E6%9D%A1" },
    { title: "自拍", value: "dm978/cn/genres/%E8%87%AA%E6%8B%8D" },
    { title: "合集", value: "dm784/cn/genres/%E5%90%88%E9%9B%86" },
    { title: "乳交", value: "dm594/cn/genres/%E4%B9%B3%E4%BA%A4" },
    { title: "恋物癖", value: "dm117/cn/genres/%E6%81%8B%E7%89%A9%E7%99%96" },
    { title: "美乳", value: "dm215/cn/genres/%E7%BE%8E%E4%B9%B3" },
    { title: "NTR", value: "dm736/cn/genres/NTR" },
    { title: "企划", value: "dm341/cn/genres/%E4%BC%81%E5%88%92" },
    { title: "乱伦", value: "dm56/cn/genres/%E4%B9%B1%E4%BC%A6" },
    { title: "搭讪", value: "dm292/cn/genres/%E6%90%AD%E8%AE%AA" },
    { title: "颜射", value: "dm319/cn/genres/%E9%A2%9C%E5%B0%84" },
    { title: "淫乱", value: "dm903/cn/genres/%E6%B7%AB%E4%B9%B1" },
    { title: "偷拍", value: "dm516/cn/genres/%E5%81%B7%E6%8B%8D" },
    { title: "剧情", value: "dm98/cn/genres/%E5%89%A7%E6%83%85" },
    { title: "自慰", value: "dm7606/cn/genres/%E8%87%AA%E6%85%B0" },
    { title: "4K", value: "dm55/cn/genres/4K" },
    { title: "手淫", value: "dm94/cn/genres/%E6%89%8B%E6%B7%AB" },
    { title: "姐姐", value: "dm793/cn/genres/%E5%A7%90%E5%A7%90" },
    { title: "羞辱", value: "dm161/cn/genres/%E7%BE%9E%E8%BE%B1" }
];

const MAKERS_ENDPOINTS = [
    { title: "Moody's", value: "dm825/cn/makers/Moody%27s" },
    { title: "Prestige", value: "dm825/cn/makers/Prestige" },
    { title: "Madonna", value: "dm825/cn/makers/Madonna" },
    { title: "S1", value: "dm825/cn/makers/S1" },
    { title: "SOD", value: "dm825/cn/makers/SOD" },
    { title: "IdeaPocket", value: "dm825/cn/makers/IdeaPocket" },
    { title: "Attackers", value: "dm825/cn/makers/Attackers" },
    { title: "Glory Quest", value: "dm825/cn/makers/Glory%20Quest" },
    { title: "ビッグモーカル", value: "dm825/cn/makers/%E3%83%93%E3%83%83%E3%82%B0%E3%83%A2%E3%83%BC%E3%82%AB%E3%83%AB" },
    { title: "NATURAL HIGH", value: "dm825/cn/makers/NATURAL%20HIGH" },
    { title: "Wanz Factory", value: "dm825/cn/makers/Wanz%20Factory" },
    { title: "Takara Visual", value: "dm825/cn/makers/Takara%20Visual" },
    { title: "Fc2", value: "dm825/cn/makers/Fc2" },
    { title: "Premium", value: "dm825/cn/makers/Premium" },
    { title: "Fitch", value: "dm825/cn/makers/Fitch" },
    { title: "VENUS", value: "dm825/cn/makers/VENUS" },
    { title: "DEEP'S", value: "dm825/cn/makers/DEEP%27S" },
    { title: "本中", value: "dm825/cn/makers/%E6%9C%AC%E4%B8%AD" },
    { title: "Hunter", value: "dm825/cn/makers/Hunter" },
    { title: "溜池ゴロー", value: "dm825/cn/makers/%E6%BA%9C%E6%B1%A0%E3%82%B4%E3%83%AD%E3%83%BC" },
    { title: "TMA", value: "dm825/cn/makers/TMA" },
    { title: "センタービレッジ", value: "dm825/cn/makers/%E3%82%BB%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%93%E3%83%AC%E3%83%83%E3%82%B8" },
    { title: "Das", value: "dm825/cn/makers/Das" },
    { title: "Waap Entertainment", value: "dm825/cn/makers/Waap%20Entertainment" },
    { title: "Crystal-Eizou", value: "dm825/cn/makers/Crystal-Eizou" },
    { title: "kawaii", value: "dm825/cn/makers/kawaii" },
    { title: "ゴーゴーズ", value: "dm825/cn/makers/%E3%82%B4%E3%83%BC%E3%82%B4%E3%83%BC%E3%82%BA" },
    { title: "プラネットプラス", value: "dm825/cn/makers/%E3%83%97%E3%83%A9%E3%83%8D%E3%83%83%E3%83%88%E3%83%97%E3%83%A9%E3%82%B9" },
    { title: "OPPAI", value: "dm825/cn/makers/OPPAI" },
    { title: "STAR PARADISE", value: "dm825/cn/makers/STAR%20PARADISE" },
    { title: "E-BODY", value: "dm825/cn/makers/E-BODY" },
    { title: "セレブの友", value: "dm825/cn/makers/%E3%82%BB%E3%83%AC%E3%83%96%E3%81%AE%E5%8F%8B" },
    { title: "ドグマ", value: "dm825/cn/makers/%E3%83%89%E3%82%B0%E3%83%9E" },
    { title: "Alice Japan", value: "dm825/cn/makers/Alice%20Japan" },
    { title: "KM Produce", value: "dm825/cn/makers/KM%20Produce" },
    { title: "桃太郎映像出版", value: "dm825/cn/makers/%E6%A1%83%E5%A4%AA%E9%83%8E%E6%98%A0%E5%83%8F%E5%87%BA%E7%89%88" }
];

const GENRES_STATIC = GENRES_ENDPOINTS;
const MAKERS_STATIC = MAKERS_ENDPOINTS;

function buildListUrl(endpoint, page = 1, filters = "", sort = "") {
    const params = [];
    if (filters) params.push(`filters=${encodeURIComponent(filters)}`);
    if (sort) params.push(`sort=${encodeURIComponent(sort)}`);
    if (page > 1) params.push(`page=${page}`);
    return `${BASE_URL}/${endpoint}${params.length ? `?${params.join("&")}` : ""}`;
}


function buildJavTrailersUrl(title) {
    const code = buildJavTrailersId(title);
    if (!code) return "";
    const first = code[0];
    const folder = code.slice(0, 3);
    return `https://media.javtrailers.com/hlsvideo/freepv/${first}/${folder}/${code}/${code}mmb.m3u8`;
}

function buildTrailerCoverUrl(title) {
    const raw = String(title || "").toUpperCase();
    const match = raw.match(/\b([A-Z0-9]+)-?(\d{2,5})\b/);
    if (!match) return "";

    const prefix = match[1].toLowerCase();
    const number = match[2].padStart(3, "0");
    const code = `${prefix}${match[2].padStart(5, "0")}`;

    const mgstagePrefixes = new Set(["ABF", "ABW", "IPX", "JUFE", "MEYD", "SSNI", "STARS", "PPPD", "WANZ", "EBOD", "JUL", "SHKD", "MIDE", "S1", "SQTE", "SNOS", "OFJE"]);
    if (mgstagePrefixes.has(match[1])) {
        return `https://image.mgstage.com/images/prestige/${prefix}/${number}/pb_e_${prefix}-${number}.jpg`;
    }

    return `https://pics.dmm.co.jp/digital/video/${code}/${code}pl.jpg`;
}

function extractVideoId(href) {
    const slug = href.split('/').pop() || "";
    return slug.replace(/-(uncensored-leak|chinese-subtitle)$/, "").toUpperCase();
}

function resolveUrl(path) {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function normalizeText(text) {
    return (text || "").replace(/\s+/g, " ").trim();
}

function extractLabelItems($, labelText) {
    const normalizedLabel = normalizeText(labelText);
    const items = [];
    const seen = new Set();

    $("a").each((_, el) => {
        const $el = $(el);
        const text = normalizeText($el.text());
        const href = $el.attr("href") || "";

        if (!text || !href) return;
        if (seen.has(`${text}|${href}`)) return;

        const isMatch = text === normalizedLabel || text.includes(normalizedLabel);
        if (!isMatch) return;

        seen.add(`${text}|${href}`);
        items.push({
            title: text,
            link: resolveUrl(href)
        });
    });

    return items;
}

function extractActorAvatar($el) {
    return $el.find("img").attr("data-src") ||
        $el.find("img").attr("src") ||
        $el.find("img").attr("data-lazy-src") ||
        $el.closest("div,li,figure,section").find("img").attr("data-src") ||
        $el.closest("div,li,figure,section").find("img").attr("src") ||
        $el.closest("div,li,figure,section").find("img").attr("data-lazy-src") ||
        "";
}

function parseVideoList(html, options = {}) {
    const { includeImageFields = false } = options;

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
            const imgSrc = $img.attr("data-src") || $img.attr("src") || "";
            const duration = $el.find(".absolute.bottom-1.right-1").text().trim();
            const videoId = extractVideoId(href);
            const coverUrl = videoId ? `https://fourhoi.com/${videoId.toLowerCase()}/cover-t.jpg` : imgSrc;
            const finalCover = coverUrl || imgSrc;

            const item = {
                id: href,
                type: "link",
                title,
                coverUrl: finalCover,
                link: href,
                description: `时长: ${duration}${videoId ? ` | 番号: ${videoId}` : ""}`,
                customHeaders: HEADERS
            };

            if (includeImageFields) {
                item.backdropPath = finalCover;
                item.posterPath = finalCover;
                item.image = finalCover;
            }

            results.push(item);
        }
    });

    return results.length > 0 ? results : [{ id: "empty", type: "text", title: "没有找到相关视频" }];
}

function buildStaticEntries(list, description) {
    return list.map((item) => ({
        id: item.value,
        type: "link",
        title: item.title,
        link: resolveUrl(item.value),
        coverUrl: "",
        description,
        customHeaders: HEADERS
    }));
}

function buildJavTrailersId(text) {
    const raw = String(text || "").toUpperCase();
    const match = raw.match(/\b([A-Z0-9]+)-?(\d{2,5})\b/);
    if (!match) return "";
    const prefix = match[1].toLowerCase();
    const num = match[2].padStart(5, "0");
    return `${prefix}${num}`;
}

function buildStaticActressEntries() {
    return ACTRESS_ENDPOINTS.map((item) => ({
        id: item.value,
        type: "link",
        title: item.title,
        link: resolveUrl(item.value),
        coverUrl: "",
        description: "女优排行",
        customHeaders: HEADERS
    }));
}

async function loadList(params = {}) {
    const { endpoint = "dm632/cn/release", page = 1, sort = "", filters = "", category = "", peopleId = "", genreId = "" } = params;
    const targetEndpoint = endpoint || category || "dm632/cn/release";

    let targetUrl = buildListUrl(targetEndpoint, page, filters, sort);

    // 详情页人物/类型点击后的筛选跳转，尽量按 demo 风格工作
    if (peopleId) {
        targetUrl = resolveUrl(String(peopleId));
        if (page > 1) targetUrl += targetUrl.includes("?") ? `&page=${page}` : `?page=${page}`;
    } else if (genreId) {
        targetUrl = resolveUrl(String(genreId));
        if (page > 1) targetUrl += targetUrl.includes("?") ? `&page=${page}` : `?page=${page}`;
    }

    try {
        const res = await Widget.http.get(targetUrl, { headers: HEADERS });
        return parseVideoList(res.data);
    } catch (e) {
        return [{ id: "err", type: "text", title: "加载失败", subTitle: e.message }];
    }
}

async function loadActresses() {
    return buildStaticActressEntries();
}

async function loadGenresStatic() {
    return buildStaticEntries(GENRES_STATIC, "类型分类");
}

async function loadMakersStatic() {
    return buildStaticEntries(MAKERS_STATIC, "发行商分类");
}

async function searchList(params = {}) {
    const { page = 1, keyword } = params;

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

async function searchGlobal(params = {}) {
    const { page = 1, keyword } = params;

    if (!keyword) {
        return [{ id: "tip", type: "text", title: "请输入关键词开始全局搜索" }];
    }

    const query = encodeURIComponent(keyword);
    let url = `${BASE_URL}/cn/search/${query}`;
    if (page > 1) url += `?page=${page}`;

    try {
        const res = await Widget.http.get(url, { headers: HEADERS });
        return parseVideoList(res.data, { includeImageFields: true });
    } catch (e) {
        return [{ id: "err", type: "text", title: "全局搜索失败", subTitle: e.message }];
    }
}


async function loadDetail(link) {
    try {
        const res = await Widget.http.get(link, { headers: HEADERS });
        const html = res.data;
        const $ = Widget.html.load(html);

        const title = $('meta[property="og:title"]').attr('content') || $('h1').text().trim();
        let videoUrl = "";
        const peoples = [];
        const genreItems = [];
        const trailers = [];
        const seenActors = new Set();
        const seenGenres = new Set();

        const pickImageUrl = ($el) => {
            const direct = $el.find('img').attr('data-src') || $el.find('img').attr('src') || "";
            if (direct) return direct;

            const srcset = $el.find('img').attr('srcset') || "";
            if (srcset) {
                const first = srcset.split(',')[0].trim().split(' ')[0];
                if (first) return first;
            }

            const style = $el.attr('style') || $el.closest('a,div,li,figure,span').attr('style') || "";
            const bg = style.match(/background-image\s*:\s*url\(['"]?([^'"]+)['"]?\)/i);
            if (bg && bg[1]) return bg[1];
            return "";
        };

        const pushActor = (name, avatar, href) => {
            const cleanName = (name || "").trim();
            if (!cleanName || seenActors.has(cleanName)) return;
            seenActors.add(cleanName);
            peoples.push({
                id: href || cleanName,
                title: cleanName,
                avatar: avatar || "",
                role: "主演"
            });
        };

        const pushGenre = (titleText, href) => {
            const cleanTitle = (titleText || "").trim();
            const key = `${cleanTitle}|${href || ""}`;
            if (!cleanTitle || seenGenres.has(key)) return;
            seenGenres.add(key);
            genreItems.push({
                id: href || cleanTitle,
                title: cleanTitle
            });
        };

        const pickSection = (sourceHtml, startLabels, endLabels) => {
            const start = startLabels.map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
            const end = endLabels.map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
            const patterns = [
                new RegExp(`(?:${start})\\s*:\\s*([\\s\\S]*?)(?=\\n\\s*(?:${end})\\s*:\\s*|$)`, "i"),
                new RegExp(`<[^>]*>(?:${start})\\s*:\\s*<\\/[^>]*>([\\s\\S]*?)(?=<[^>]*>(?:${end})\\s*:\\s*<\\/[^>]*>|$)`, "i")
            ];
            for (const p of patterns) {
                const m = sourceHtml.match(p);
                if (m && m[1]) return m[1];
            }
            return "";
        };

        const actorSection = pickSection(html, ["女優", "女优"], ["類型", "类型", "發行商", "发行商", "導演", "导演", "標籤", "标签"]);
        const genreSection = pickSection(html, ["類型", "类型"], ["發行商", "发行商", "導演", "导演", "標籤", "标签", "女優", "女优"]);

        const actorLinks = [];
        const genreLinks = [];

        if (actorSection) {
            const actorBlock = Widget.html.load(`<div>${actorSection}</div>`);
            actorBlock('a').each((_, el) => {
                const $el = actorBlock(el);
                const href = resolveUrl($el.attr('href') || "");
                const name = $el.text().replace(/\s+/g, ' ').trim();
                const img = pickImageUrl($el);
                if (!name || !href) return;
                if (!/\/actresses\//i.test(href) && !/\/actors\//i.test(href)) return;
                actorLinks.push({ name, href, img });
            });
        }

        if (genreSection) {
            const genreBlock = Widget.html.load(`<div>${genreSection}</div>`);
            genreBlock('a').each((_, el) => {
                const $el = genreBlock(el);
                const href = resolveUrl($el.attr('href') || "");
                const name = $el.text().replace(/\s+/g, ' ').trim();
                if (!name || !href) return;
                if (!/\/genres\//i.test(href) && !/\/chinese-subtitle/i.test(href)) return;
                genreLinks.push({ name, href });
            });
        }

        actorLinks.forEach((item) => pushActor(item.name, item.img, item.href));
        genreLinks.forEach((item) => pushGenre(item.name, item.href));

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

        const trailerTitle = title || $('meta[property="og:title"]').attr('content') || "";
        const trailerUrl = buildJavTrailersUrl(trailerTitle) || buildMgstageTrailerUrl(trailerTitle);
        if (trailerUrl) {
            trailers.push({
                coverUrl: buildTrailerCoverUrl(trailerTitle),
                url: trailerUrl
            });
        }

        if (videoUrl) {
            return [{
                id: link,
                type: "video",
                title: title,
                videoUrl: videoUrl,
                peoples: peoples,
                genreItems: genreItems,
                trailers: trailers,
                mediaType: "movie",
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
