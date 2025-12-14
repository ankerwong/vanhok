// HKDSE Essay Data: "Cultivating Lifelong Success"
// 范文数据结构

const essayData = {
    title: "Cultivating Lifelong Success: The Benefits of Early Exposure to Competition for Children",
    
    // 段落数据（用于第一阶段）
    paragraphs: [
        {
            type: "Introduction",
            text: "In today's ever-competitive world, it is undeniable that competition is a fundamental aspect of modern life, shaping professional success, personal growth, and societal advancement. However, the contentious debate on whether children should be exposed to competitive activities from an early age highlights the dichotomy between potential stress and invaluable life skills acquired through such experiences. While some argue that competition can lead to undue stress and harm children's self-esteem, I firmly believe that involving children in competition from an early age is highly advantageous. It not only helps develop essential life skills but also builds resilience, preparing them for the competitive realities of the world.",
            topicSentence: "Thesis Statement: Involving children in competition from an early age is highly advantageous as it develops essential life skills and builds resilience."
        },
        {
            type: "Body Paragraph 1",
            text: "One compelling advantage of early exposure to competitive activities is its ability to cultivate essential skills during children's formative years. It is during this period that children possess immense potential for cognitive and social development. Taking part in competition encourages children to set goals, tackle challenges, and develop discipline — all of which help unlock talents and capabilities they may not even know they possess. Engaging in competitive activities, be it in sports, academics, or the arts, allows children to develop a range of skills beyond mere rivalry. Studies conducted by the American Psychological Association have unequivocally demonstrated that competition sharpens critical thinking, teamwork, and time management skills in children. For instance, involving children in a robotic competition not only enhances technical and engineering knowledge but also fosters problem-solving abilities and collaboration skills. Participants must work together to design, build, and program their robots, learning to communicate effectively and delegate tasks. Additionally, these competitions often include public presentations and demonstrations, which help children develop eloquent speaking abilities and the invaluable ability to gracefully confront critique. Thus, by incorporating these experiential opportunities early on, competition becomes a powerful pedagogical tool, equipping young individuals with indispensable life skills.",
            topicSentence: "Topic Sentence: Early exposure to competitive activities cultivates essential skills during children's formative years."
        },
        {
            type: "Body Paragraph 2",
            text: "One compelling advantage of exposing children to competitive activities from an early age is that it instills in them a lasting spirit of excellence. Childhood is a critical formative period when young minds are most receptive to diverse values, internalizing them into personal beliefs that shape their principles and behavior in adulthood. Competition, by nature, revolves around rivalry and comparison, which inspires children to strive to surpass their peers. The tangible rewards of victory — whether a trophy or public recognition — serve as powerful incentives that fuel their pursuit of improvement. Take Lego robotics competitions, which are popular among young children, as an example, in these contests, children build and program simple robots to complete tasks. Seeing others' creative designs often sparks new ideas and motivates them to improve their own. The thrill of winning a trophy, earning certificates, or advancing to higher competition levels motivates them to continually improve. Even when they lose, the experience often strengthens their resolve to perform better next time. Over time, this cycle of reflecting and refining is internalized, shaping how they approach challenges even in adulthood. The mindset they develop — one that values excellence — often carries forward into academic, social, and professional contexts. In this way, competition not only sharpens their abilities but also engrains a relentless drive for improvement, preparing them for the demanding realities of an increasingly competitive world.",
            topicSentence: "Topic Sentence: Exposing children to competitive activities instills in them a lasting spirit of excellence."
        },
        {
            type: "Body Paragraph 3 (Counter-argument)",
            text: "Critics argue that exposing children to competitive activities can engender negative effects, as constant comparison with their peers may foster feelings of inadequacy and diminish a child's sense of self-worth. However, with proper guidance, children can learn to compete constructively. Researchers published in the Journal of Educational Psychology indicate that when educators and parents emphasize the value of effort and personal improvement over winning, children develop a healthier approach to competition. It is during their absorption period that we can instill the right values, teaching them that engaging in competitions is a way for self-improvement rather than just winning or losing. By emphasizing effort over outcomes, personal improvement over victory, and the collective triumph of teamwork over individual accolades, negative pressures can be mitigated. Additionally, providing age-appropriate challenges and creating supportive environments allows children to develop the necessary skills to handle real-world competition. The lessons gleaned through early exposure are vital for navigating life's inevitable trials.",
            topicSentence: "Counter-argument: Critics worry about negative effects, but proper guidance leads to constructive competition."
        },
        {
            type: "Conclusion",
            text: "In conclusion, early competition, when introduced appropriately, imparts lifelong skills and excellence while preparing children for the competitive realities they will face. By embracing competition in a balanced and holistic manner, children can be ensured that they are not merely equipped to navigate, but to flourish in a fiercely competitive world.",
            topicSentence: "Conclusion: Early competition, when introduced appropriately, equips children to flourish in a competitive world."
        }
    ],
    
    // 句子数据（用于第二和第三阶段）
    sentences: [
        // Introduction
        {
            id: 1,
            original: "In today's ever-competitive world, it is undeniable that competition is a fundamental aspect of modern life, shaping professional success, personal growth, and societal advancement.",
            svo: {
                subject: "competition",
                verb: "is",
                object: "a fundamental aspect"
            },
            grammar: "In today's ever-competitive world, it is undeniable that <span class='subject'>competition</span> <span class='verb'>is</span> <span class='object'>a fundamental aspect of modern life</span>, shaping professional success, personal growth, and societal advancement.",
            vocabulary: [
                { word: "undeniable", synonyms: "indisputable, incontestable, irrefutable" },
                { word: "fundamental", synonyms: "essential, basic, core, crucial" },
                { word: "advancement", synonyms: "progress, development, improvement" }
            ]
        },
        {
            id: 2,
            original: "However, the contentious debate on whether children should be exposed to competitive activities from an early age highlights the dichotomy between potential stress and invaluable life skills acquired through such experiences.",
            svo: {
                subject: "the contentious debate",
                verb: "highlights",
                object: "the dichotomy"
            },
            grammar: "However, <span class='subject'>the contentious debate</span> on whether children should be exposed to competitive activities from an early age <span class='verb'>highlights</span> <span class='object'>the dichotomy between potential stress and invaluable life skills</span> acquired through such experiences.",
            vocabulary: [
                { word: "contentious", synonyms: "controversial, disputed, debatable" },
                { word: "dichotomy", synonyms: "division, contrast, split, opposition" },
                { word: "invaluable", synonyms: "priceless, precious, indispensable" }
            ]
        },
        {
            id: 3,
            original: "While some argue that competition can lead to undue stress and harm children's self-esteem, I firmly believe that involving children in competition from an early age is highly advantageous.",
            svo: {
                subject: "I",
                verb: "believe",
                object: "that involving children in competition is highly advantageous"
            },
            grammar: "While some argue that competition can lead to undue stress and harm children's self-esteem, <span class='subject'>I</span> firmly <span class='verb'>believe</span> <span class='object'>that involving children in competition from an early age is highly advantageous</span>.",
            vocabulary: [
                { word: "undue", synonyms: "excessive, unreasonable, unjustified" },
                { word: "advantageous", synonyms: "beneficial, favorable, helpful, useful" }
            ]
        },
        {
            id: 4,
            original: "It not only helps develop essential life skills but also builds resilience, preparing them for the competitive realities of the world.",
            svo: {
                subject: "It",
                verb: "helps develop and builds",
                object: "essential life skills and resilience"
            },
            grammar: "<span class='subject'>It</span> not only <span class='verb'>helps develop</span> <span class='object'>essential life skills</span> but also <span class='verb'>builds</span> <span class='object'>resilience</span>, preparing them for the competitive realities of the world.",
            vocabulary: [
                { word: "resilience", synonyms: "toughness, strength, adaptability" },
                { word: "realities", synonyms: "facts, truths, actualities" }
            ]
        },
        
        // Body Paragraph 1
        {
            id: 5,
            original: "One compelling advantage of early exposure to competitive activities is its ability to cultivate essential skills during children's formative years.",
            svo: {
                subject: "One compelling advantage",
                verb: "is",
                object: "its ability to cultivate essential skills"
            },
            grammar: "<span class='subject'>One compelling advantage of early exposure to competitive activities</span> <span class='verb'>is</span> <span class='object'>its ability to cultivate essential skills during children's formative years</span>.",
            vocabulary: [
                { word: "compelling", synonyms: "convincing, persuasive, powerful" },
                { word: "cultivate", synonyms: "develop, foster, nurture, promote" },
                { word: "formative", synonyms: "developmental, influential, crucial" }
            ]
        },
        {
            id: 6,
            original: "It is during this period that children possess immense potential for cognitive and social development.",
            svo: {
                subject: "children",
                verb: "possess",
                object: "immense potential"
            },
            grammar: "It is during this period that <span class='subject'>children</span> <span class='verb'>possess</span> <span class='object'>immense potential for cognitive and social development</span>.",
            vocabulary: [
                { word: "immense", synonyms: "enormous, vast, tremendous, huge" },
                { word: "cognitive", synonyms: "mental, intellectual, rational" }
            ]
        },
        {
            id: 7,
            original: "Taking part in competition encourages children to set goals, tackle challenges, and develop discipline — all of which help unlock talents and capabilities they may not even know they possess.",
            svo: {
                subject: "Taking part in competition",
                verb: "encourages",
                object: "children"
            },
            grammar: "<span class='subject'>Taking part in competition</span> <span class='verb'>encourages</span> <span class='object'>children</span> to set goals, tackle challenges, and develop discipline — all of which help unlock talents and capabilities they may not even know they possess.",
            vocabulary: [
                { word: "tackle", synonyms: "address, confront, deal with, handle" },
                { word: "discipline", synonyms: "self-control, restraint, willpower" },
                { word: "unlock", synonyms: "release, unleash, discover, reveal" }
            ]
        },
        {
            id: 8,
            original: "Engaging in competitive activities, be it in sports, academics, or the arts, allows children to develop a range of skills beyond mere rivalry.",
            svo: {
                subject: "Engaging in competitive activities",
                verb: "allows",
                object: "children to develop a range of skills"
            },
            grammar: "<span class='subject'>Engaging in competitive activities</span>, be it in sports, academics, or the arts, <span class='verb'>allows</span> <span class='object'>children to develop a range of skills beyond mere rivalry</span>.",
            vocabulary: [
                { word: "mere", synonyms: "simple, basic, nothing more than" },
                { word: "rivalry", synonyms: "competition, contest, contention" }
            ]
        },
        {
            id: 9,
            original: "Studies conducted by the American Psychological Association have unequivocally demonstrated that competition sharpens critical thinking, teamwork, and time management skills in children.",
            svo: {
                subject: "Studies",
                verb: "have demonstrated",
                object: "that competition sharpens skills"
            },
            grammar: "<span class='subject'>Studies conducted by the American Psychological Association</span> <span class='verb'>have unequivocally demonstrated</span> <span class='object'>that competition sharpens critical thinking, teamwork, and time management skills in children</span>.",
            vocabulary: [
                { word: "unequivocally", synonyms: "clearly, definitely, absolutely" },
                { word: "sharpens", synonyms: "enhances, refines, hones, improves" }
            ]
        },
        {
            id: 10,
            original: "For instance, involving children in a robotic competition not only enhances technical and engineering knowledge but also fosters problem-solving abilities and collaboration skills.",
            svo: {
                subject: "involving children in a robotic competition",
                verb: "enhances and fosters",
                object: "knowledge, abilities and skills"
            },
            grammar: "For instance, <span class='subject'>involving children in a robotic competition</span> not only <span class='verb'>enhances</span> <span class='object'>technical and engineering knowledge</span> but also <span class='verb'>fosters</span> <span class='object'>problem-solving abilities and collaboration skills</span>.",
            vocabulary: [
                { word: "enhances", synonyms: "improves, boosts, strengthens" },
                { word: "fosters", synonyms: "encourages, promotes, nurtures" },
                { word: "collaboration", synonyms: "cooperation, teamwork, partnership" }
            ]
        },
        {
            id: 11,
            original: "Participants must work together to design, build, and program their robots, learning to communicate effectively and delegate tasks.",
            svo: {
                subject: "Participants",
                verb: "must work",
                object: "together"
            },
            grammar: "<span class='subject'>Participants</span> <span class='verb'>must work</span> <span class='object'>together</span> to design, build, and program their robots, learning to communicate effectively and delegate tasks.",
            vocabulary: [
                { word: "delegate", synonyms: "assign, allocate, distribute, entrust" },
                { word: "effectively", synonyms: "efficiently, successfully, productively" }
            ]
        },
        {
            id: 12,
            original: "Additionally, these competitions often include public presentations and demonstrations, which help children develop eloquent speaking abilities and the invaluable ability to gracefully confront critique.",
            svo: {
                subject: "these competitions",
                verb: "include",
                object: "public presentations and demonstrations"
            },
            grammar: "Additionally, <span class='subject'>these competitions</span> often <span class='verb'>include</span> <span class='object'>public presentations and demonstrations</span>, which help children develop eloquent speaking abilities and the invaluable ability to gracefully confront critique.",
            vocabulary: [
                { word: "eloquent", synonyms: "articulate, fluent, persuasive" },
                { word: "gracefully", synonyms: "elegantly, tactfully, diplomatically" },
                { word: "critique", synonyms: "criticism, feedback, evaluation" }
            ]
        },
        {
            id: 13,
            original: "Thus, by incorporating these experiential opportunities early on, competition becomes a powerful pedagogical tool, equipping young individuals with indispensable life skills.",
            svo: {
                subject: "competition",
                verb: "becomes",
                object: "a powerful pedagogical tool"
            },
            grammar: "Thus, by incorporating these experiential opportunities early on, <span class='subject'>competition</span> <span class='verb'>becomes</span> <span class='object'>a powerful pedagogical tool</span>, equipping young individuals with indispensable life skills.",
            vocabulary: [
                { word: "experiential", synonyms: "practical, hands-on, empirical" },
                { word: "pedagogical", synonyms: "educational, instructional, teaching" },
                { word: "indispensable", synonyms: "essential, crucial, vital, necessary" }
            ]
        },
        
        // Body Paragraph 2
        {
            id: 14,
            original: "One compelling advantage of exposing children to competitive activities from an early age is that it instills in them a lasting spirit of excellence.",
            svo: {
                subject: "One compelling advantage",
                verb: "is",
                object: "that it instills a lasting spirit of excellence"
            },
            grammar: "<span class='subject'>One compelling advantage of exposing children to competitive activities from an early age</span> <span class='verb'>is</span> <span class='object'>that it instills in them a lasting spirit of excellence</span>.",
            vocabulary: [
                { word: "instills", synonyms: "implants, inculcates, infuses, introduces" },
                { word: "lasting", synonyms: "enduring, permanent, long-term" },
                { word: "excellence", synonyms: "superiority, distinction, brilliance" }
            ]
        },
        {
            id: 15,
            original: "Childhood is a critical formative period when young minds are most receptive to diverse values, internalizing them into personal beliefs that shape their principles and behavior in adulthood.",
            svo: {
                subject: "Childhood",
                verb: "is",
                object: "a critical formative period"
            },
            grammar: "<span class='subject'>Childhood</span> <span class='verb'>is</span> <span class='object'>a critical formative period</span> when young minds are most receptive to diverse values, internalizing them into personal beliefs that shape their principles and behavior in adulthood.",
            vocabulary: [
                { word: "receptive", synonyms: "open, responsive, willing, amenable" },
                { word: "internalizing", synonyms: "absorbing, adopting, assimilating" }
            ]
        },
        {
            id: 16,
            original: "Competition, by nature, revolves around rivalry and comparison, which inspires children to strive to surpass their peers.",
            svo: {
                subject: "Competition",
                verb: "revolves",
                object: "around rivalry and comparison"
            },
            grammar: "<span class='subject'>Competition</span>, by nature, <span class='verb'>revolves</span> <span class='object'>around rivalry and comparison</span>, which inspires children to strive to surpass their peers.",
            vocabulary: [
                { word: "revolves", synonyms: "centers on, focuses on, concerns" },
                { word: "strive", synonyms: "endeavor, try hard, make an effort" },
                { word: "surpass", synonyms: "exceed, outdo, excel, beat" }
            ]
        },
        {
            id: 17,
            original: "The tangible rewards of victory — whether a trophy or public recognition — serve as powerful incentives that fuel their pursuit of improvement.",
            svo: {
                subject: "The tangible rewards of victory",
                verb: "serve",
                object: "as powerful incentives"
            },
            grammar: "<span class='subject'>The tangible rewards of victory</span> — whether a trophy or public recognition — <span class='verb'>serve</span> <span class='object'>as powerful incentives</span> that fuel their pursuit of improvement.",
            vocabulary: [
                { word: "tangible", synonyms: "concrete, physical, real, actual" },
                { word: "incentives", synonyms: "motivations, encouragements, stimuli" },
                { word: "fuel", synonyms: "drive, power, energize, stimulate" }
            ]
        },
        {
            id: 18,
            original: "Take Lego robotics competitions, which are popular among young children, as an example, in these contests, children build and program simple robots to complete tasks.",
            svo: {
                subject: "children",
                verb: "build and program",
                object: "simple robots"
            },
            grammar: "Take Lego robotics competitions, which are popular among young children, as an example, in these contests, <span class='subject'>children</span> <span class='verb'>build and program</span> <span class='object'>simple robots</span> to complete tasks.",
            vocabulary: [
                { word: "contests", synonyms: "competitions, tournaments, challenges" }
            ]
        },
        {
            id: 19,
            original: "Seeing others' creative designs often sparks new ideas and motivates them to improve their own.",
            svo: {
                subject: "Seeing others' creative designs",
                verb: "sparks and motivates",
                object: "new ideas"
            },
            grammar: "<span class='subject'>Seeing others' creative designs</span> often <span class='verb'>sparks</span> <span class='object'>new ideas</span> and <span class='verb'>motivates</span> <span class='object'>them to improve their own</span>.",
            vocabulary: [
                { word: "sparks", synonyms: "ignites, triggers, stimulates, inspires" },
                { word: "motivates", synonyms: "inspires, encourages, drives, pushes" }
            ]
        },
        {
            id: 20,
            original: "The thrill of winning a trophy, earning certificates, or advancing to higher competition levels motivates them to continually improve.",
            svo: {
                subject: "The thrill of winning",
                verb: "motivates",
                object: "them"
            },
            grammar: "<span class='subject'>The thrill of winning a trophy, earning certificates, or advancing to higher competition levels</span> <span class='verb'>motivates</span> <span class='object'>them</span> to continually improve.",
            vocabulary: [
                { word: "thrill", synonyms: "excitement, exhilaration, pleasure" },
                { word: "continually", synonyms: "constantly, continuously, persistently" }
            ]
        },
        {
            id: 21,
            original: "Even when they lose, the experience often strengthens their resolve to perform better next time.",
            svo: {
                subject: "the experience",
                verb: "strengthens",
                object: "their resolve"
            },
            grammar: "Even when they lose, <span class='subject'>the experience</span> often <span class='verb'>strengthens</span> <span class='object'>their resolve</span> to perform better next time.",
            vocabulary: [
                { word: "resolve", synonyms: "determination, commitment, willpower" }
            ]
        },
        {
            id: 22,
            original: "Over time, this cycle of reflecting and refining is internalized, shaping how they approach challenges even in adulthood.",
            svo: {
                subject: "this cycle of reflecting and refining",
                verb: "is internalized",
                object: ""
            },
            grammar: "Over time, <span class='subject'>this cycle of reflecting and refining</span> <span class='verb'>is internalized</span>, shaping how they approach challenges even in adulthood.",
            vocabulary: [
                { word: "reflecting", synonyms: "contemplating, thinking about, considering" },
                { word: "refining", synonyms: "improving, perfecting, polishing" }
            ]
        },
        {
            id: 23,
            original: "The mindset they develop — one that values excellence — often carries forward into academic, social, and professional contexts.",
            svo: {
                subject: "The mindset",
                verb: "carries",
                object: "forward into contexts"
            },
            grammar: "<span class='subject'>The mindset they develop</span> — one that values excellence — often <span class='verb'>carries</span> <span class='object'>forward into academic, social, and professional contexts</span>.",
            vocabulary: [
                { word: "mindset", synonyms: "attitude, mentality, outlook, perspective" }
            ]
        },
        {
            id: 24,
            original: "In this way, competition not only sharpens their abilities but also engrains a relentless drive for improvement, preparing them for the demanding realities of an increasingly competitive world.",
            svo: {
                subject: "competition",
                verb: "sharpens and engrains",
                object: "their abilities and a relentless drive"
            },
            grammar: "In this way, <span class='subject'>competition</span> not only <span class='verb'>sharpens</span> <span class='object'>their abilities</span> but also <span class='verb'>engrains</span> <span class='object'>a relentless drive for improvement</span>, preparing them for the demanding realities of an increasingly competitive world.",
            vocabulary: [
                { word: "engrains", synonyms: "embeds, instills, implants, ingrains" },
                { word: "relentless", synonyms: "persistent, determined, unwavering" },
                { word: "demanding", synonyms: "challenging, tough, rigorous" }
            ]
        },
        
        // Body Paragraph 3 (Counter-argument)
        {
            id: 25,
            original: "Critics argue that exposing children to competitive activities can engender negative effects, as constant comparison with their peers may foster feelings of inadequacy and diminish a child's sense of self-worth.",
            svo: {
                subject: "Critics",
                verb: "argue",
                object: "that exposing children can engender negative effects"
            },
            grammar: "<span class='subject'>Critics</span> <span class='verb'>argue</span> <span class='object'>that exposing children to competitive activities can engender negative effects</span>, as constant comparison with their peers may foster feelings of inadequacy and diminish a child's sense of self-worth.",
            vocabulary: [
                { word: "engender", synonyms: "cause, produce, create, generate" },
                { word: "inadequacy", synonyms: "insufficiency, incompetence, deficiency" },
                { word: "diminish", synonyms: "reduce, decrease, lessen, weaken" }
            ]
        },
        {
            id: 26,
            original: "However, with proper guidance, children can learn to compete constructively.",
            svo: {
                subject: "children",
                verb: "can learn",
                object: "to compete constructively"
            },
            grammar: "However, with proper guidance, <span class='subject'>children</span> <span class='verb'>can learn</span> <span class='object'>to compete constructively</span>.",
            vocabulary: [
                { word: "constructively", synonyms: "positively, productively, helpfully" }
            ]
        },
        {
            id: 27,
            original: "Researchers published in the Journal of Educational Psychology indicate that when educators and parents emphasize the value of effort and personal improvement over winning, children develop a healthier approach to competition.",
            svo: {
                subject: "Researchers",
                verb: "indicate",
                object: "that children develop a healthier approach"
            },
            grammar: "<span class='subject'>Researchers published in the Journal of Educational Psychology</span> <span class='verb'>indicate</span> <span class='object'>that when educators and parents emphasize the value of effort and personal improvement over winning, children develop a healthier approach to competition</span>.",
            vocabulary: [
                { word: "emphasize", synonyms: "stress, highlight, underscore, accentuate" }
            ]
        },
        {
            id: 28,
            original: "It is during their absorption period that we can instill the right values, teaching them that engaging in competitions is a way for self-improvement rather than just winning or losing.",
            svo: {
                subject: "we",
                verb: "can instill",
                object: "the right values"
            },
            grammar: "It is during their absorption period that <span class='subject'>we</span> <span class='verb'>can instill</span> <span class='object'>the right values</span>, teaching them that engaging in competitions is a way for self-improvement rather than just winning or losing.",
            vocabulary: [
                { word: "absorption", synonyms: "learning, assimilation, internalization" }
            ]
        },
        {
            id: 29,
            original: "By emphasizing effort over outcomes, personal improvement over victory, and the collective triumph of teamwork over individual accolades, negative pressures can be mitigated.",
            svo: {
                subject: "negative pressures",
                verb: "can be mitigated",
                object: ""
            },
            grammar: "By emphasizing effort over outcomes, personal improvement over victory, and the collective triumph of teamwork over individual accolades, <span class='subject'>negative pressures</span> <span class='verb'>can be mitigated</span>.",
            vocabulary: [
                { word: "triumph", synonyms: "victory, success, achievement, win" },
                { word: "accolades", synonyms: "praise, honors, awards, recognition" },
                { word: "mitigated", synonyms: "reduced, lessened, alleviated, eased" }
            ]
        },
        {
            id: 30,
            original: "Additionally, providing age-appropriate challenges and creating supportive environments allows children to develop the necessary skills to handle real-world competition.",
            svo: {
                subject: "providing challenges and creating environments",
                verb: "allows",
                object: "children to develop skills"
            },
            grammar: "Additionally, <span class='subject'>providing age-appropriate challenges and creating supportive environments</span> <span class='verb'>allows</span> <span class='object'>children to develop the necessary skills</span> to handle real-world competition.",
            vocabulary: [
                { word: "age-appropriate", synonyms: "suitable, fitting, proper" },
                { word: "supportive", synonyms: "encouraging, helpful, caring" }
            ]
        },
        {
            id: 31,
            original: "The lessons gleaned through early exposure are vital for navigating life's inevitable trials.",
            svo: {
                subject: "The lessons",
                verb: "are",
                object: "vital"
            },
            grammar: "<span class='subject'>The lessons gleaned through early exposure</span> <span class='verb'>are</span> <span class='object'>vital</span> for navigating life's inevitable trials.",
            vocabulary: [
                { word: "gleaned", synonyms: "gathered, obtained, learned, acquired" },
                { word: "inevitable", synonyms: "unavoidable, certain, inescapable" },
                { word: "trials", synonyms: "challenges, difficulties, hardships" }
            ]
        },
        
        // Conclusion
        {
            id: 32,
            original: "In conclusion, early competition, when introduced appropriately, imparts lifelong skills and excellence while preparing children for the competitive realities they will face.",
            svo: {
                subject: "early competition",
                verb: "imparts",
                object: "lifelong skills and excellence"
            },
            grammar: "In conclusion, <span class='subject'>early competition</span>, when introduced appropriately, <span class='verb'>imparts</span> <span class='object'>lifelong skills and excellence</span> while preparing children for the competitive realities they will face.",
            vocabulary: [
                { word: "imparts", synonyms: "gives, provides, bestows, conveys" },
                { word: "appropriately", synonyms: "suitably, properly, correctly" }
            ]
        },
        {
            id: 33,
            original: "By embracing competition in a balanced and holistic manner, children can be ensured that they are not merely equipped to navigate, but to flourish in a fiercely competitive world.",
            svo: {
                subject: "children",
                verb: "can be ensured",
                object: "that they are equipped to flourish"
            },
            grammar: "By embracing competition in a balanced and holistic manner, <span class='subject'>children</span> <span class='verb'>can be ensured</span> <span class='object'>that they are not merely equipped to navigate, but to flourish in a fiercely competitive world</span>.",
            vocabulary: [
                { word: "holistic", synonyms: "comprehensive, complete, integrated, whole" },
                { word: "flourish", synonyms: "thrive, prosper, succeed, bloom" },
                { word: "fiercely", synonyms: "intensely, extremely, highly" }
            ]
        }
    ]
};

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = essayData;
}
