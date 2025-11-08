// 这是一个辅助文件,用于记录其余文章的基本信息
// 实际网站中,每篇文章都有独立的HTML文件

const articles = {
    yuwosuoyuye: {
        title: "魚我所欲也",
        author: "孟子",
        dynasty: "戰國",
        genre: "議論文",
        examYears: "2018, 2019",
        mainPoints: ["比喻論證", "捨生取義", "正反對比"],
        keyQuote: "生，亦我所欲也；義，亦我所欲也。二者不可得兼，舍生而取義者也。"
    },
    xiaoyaoyou: {
        title: "逍遙遊",
        subtitle: "節錄",
        author: "莊子",
        dynasty: "戰國",
        genre: "哲理散文",
        examYears: "2018, 2020",
        mainPoints: ["寓言手法", "逍遙境界", "相對論"],
        keyQuote: "北冥有魚，其名為鯤。鯤之大，不知其幾千里也。"
    },
    quanxue: {
        title: "勸學",
        subtitle: "節錄",
        author: "荀子",
        dynasty: "戰國",
        genre: "議論文",
        examYears: "2018, 2020, 2023",
        mainPoints: ["比喻論證", "勸學思想", "積累重要"],
        keyQuote: "君子曰：學不可以已。"
    },
    lianpolin: {
        title: "廉頗藺相如列傳",
        subtitle: "節錄",
        author: "司馬遷",
        dynasty: "西漢",
        genre: "史傳文",
        examYears: "2019, 2022, 2023",
        mainPoints: ["人物刻畫", "詳略得宜", "將相和"],
        keyQuote: "廉頗者，趙之良將也。"
    },
    chushibiao: {
        title: "出師表",
        author: "諸葛亮",
        dynasty: "三國",
        genre: "奏表文",
        examYears: "2018, 2021",
        mainPoints: ["表文特點", "忠誠情感", "委婉勸諫"],
        keyQuote: "臣本布衣，躬耕於南陽。"
    },
    shishuo: {
        title: "師說",
        author: "韓愈",
        dynasty: "唐",
        genre: "議論文",
        examYears: "2021, 2024",
        mainPoints: ["師道觀念", "正反論證", "擇師標準"],
        keyQuote: "師者，所以傳道受業解惑也。"
    },
    shidexishan: {
        title: "始得西山宴遊記",
        author: "柳宗元",
        dynasty: "唐",
        genre: "山水遊記",
        examYears: "2019",
        mainPoints: ["借景抒情", "貶謫情懷", "山水寄託"],
        keyQuote: "然後知吾向之未始遊，遊於是乎始。"
    },
    liuguolun: {
        title: "六國論",
        author: "蘇洵",
        dynasty: "北宋",
        genre: "史論文",
        examYears: "2021",
        mainPoints: ["史論手法", "賂秦論點", "借古諷今"],
        keyQuote: "六國破滅，非兵不利，戰不善，弊在賂秦。"
    },
    tangshi: {
        title: "唐詩三首",
        subtitle: "山居秋暝 · 月下獨酌 · 登樓",
        author: "王維 · 李白 · 杜甫",
        dynasty: "唐",
        genre: "詩歌",
        examYears: "2018, 2019, 2020, 2024",
        mainPoints: ["意象分析", "情感表達", "詩歌技巧"]
    },
    cisanshou: {
        title: "詞三首",
        subtitle: "念奴嬌 · 聲聲慢 · 青玉案",
        author: "蘇軾 · 李清照 · 辛棄疾",
        dynasty: "宋",
        genre: "詞",
        examYears: "2018, 2019, 2021, 2024",
        mainPoints: ["詞風比較", "意境營造", "豪放婉約"]
    }
};

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = articles;
}