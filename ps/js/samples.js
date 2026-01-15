// 优秀范文展示功能
document.addEventListener('DOMContentLoaded', function() {
    const samplesGrid = document.getElementById('samplesGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const modal = document.getElementById('sampleModal');
    const modalClose = document.getElementById('modalClose');
    const modalBody = document.getElementById('modalBody');

    // 范文数据 - All in English
    const samples = [
        {
            id: 1,
            category: 'engineering',
            categoryName: '工程学',
            title: 'MIT工程学申请范文',
            university: 'MIT',
            words: 547,
            excerpt: 'When I first dismantled my father\'s old radio, I was mesmerized by the intricate circuits inside. It wasn\'t just a collection of electronic components...',
            fullText: `When I first dismantled my father's old radio, I was mesmerized by the intricate circuits inside. It wasn't just a collection of electronic components—it was a crystallization of human ingenuity. From that moment, I realized that engineering is not merely about solving technical problems; it's about using innovative thinking to change the world.

Over the past three years, I have systematically studied the fundamentals of electrical engineering. In my AP Physics C course, I wasn't satisfied with just theoretical formulas from textbooks. I actively designed experiments to verify these principles. For instance, while studying electromagnetic induction, I built a simple electromagnetic launcher. By adjusting the coil turns and capacitor parameters, I successfully accelerated a small steel ball to 15 m/s. This process gave me profound insights into the connection between theory and practice.

My proudest achievement was participating in the 2024 National Youth Science and Technology Innovation Competition. Our team designed an IoT-based intelligent irrigation system that utilized soil moisture sensors and weather forecast APIs to achieve precise agricultural irrigation. After three months of development and testing, our system achieved 43% water efficiency improvement in simulated fields. This project not only earned us first prize but also made me realize that engineering technology can effectively address real-world resource wastage issues.

At MIT, I aspire to delve deeper into robotics and sustainable energy systems. I am particularly interested in Professor Daniela Rus's research on distributed robotics. Her paper "Self-organizing Systems" has greatly inspired me. I hope to join her laboratory to explore how multi-robot collaboration can solve practical problems such as environmental monitoring and disaster response.

For me, engineering is not just a career choice—it's a mission to change the world. I believe that through innovation and perseverance, we can design a better future.`,
            highlights: [
                'Opens with a specific personal experience (dismantling the radio) to introduce passion for engineering',
                'Demonstrates proactive learning beyond classroom (electromagnetic launcher experiment)',
                'Uses concrete data to showcase project achievements (43% water efficiency)',
                'Specifically mentions target professor and research direction, showing thorough research',
                'Concludes by elevating the theme, demonstrating mission and values'
            ]
        },
        {
            id: 2,
            category: 'cs',
            categoryName: '计算机科学',
            title: 'Stanford计算机科学范文',
            university: 'Stanford',
            words: 565,
            excerpt: 'My first encounter with programming was in middle school when I created a simple game using Scratch. Watching my character move across the screen following my commands...',
            fullText: `My first encounter with programming was in middle school when I created a simple game using Scratch. Watching my character move across the screen following my commands, I experienced the magic of "creation." This ability to transform ideas into reality made me fall deeply in love with computer science.

During high school, I systematically learned Python, Java, and C++. However, what truly gave me a profound understanding of CS was my participation in open-source communities. I contributed code to a nonprofit project called "Code for Social Good," helping develop a platform connecting volunteers with charitable organizations. Through this process, I not only learned how to write high-quality, maintainable code but, more importantly, how to create social impact through technology.

My most proud project was developing an intelligent learning assistant during last summer's internship. This NLP-based application analyzes students' study notes, automatically generates knowledge graphs, and provides review reminders. I used the BERT model for text comprehension and designed an innovative knowledge correlation algorithm. After testing with 200 high school students, the application improved their review efficiency by an average of 28%. This project made me realize that AI technology should not merely stay in laboratories—it should truly serve people.

I am also deeply interested in AI ethics. After reading Timnit Gebru's paper on AI fairness, I began to ponder: when we train AI models, how can we ensure they don't amplify societal biases? This prompted me to initiate a research project at school, analyzing the accuracy differences of three popular facial recognition systems across different ethnic groups. My findings were published in our school's STEM journal, raising awareness about technological responsibility among my peers.

At Stanford, I aspire to join Professor Fei-Fei Li's Human-Centered AI team. I believe that future computer science requires not only technological innovation but also humanistic care. I hope to develop AI systems that are both powerful and responsible, allowing technology to truly serve the wellbeing of all humanity.`,
            highlights: [
                'Naturally introduces interest in CS through a personal story',
                'Demonstrates combination of academic learning and practical experience',
                'Supports project achievements with specific data (28% efficiency improvement)',
                'Shows deep thinking about AI ethics and other complex issues',
                'Clear research interests aligned with target professor\'s work'
            ]
        },
        {
            id: 3,
            category: 'medicine',
            categoryName: '医学',
            title: 'Johns Hopkins医学范文',
            university: 'Johns Hopkins',
            words: 611,
            excerpt: 'When I was ten, my grandmother was hospitalized due to a stroke. Watching her go from being mobile to having hemiplegia, I realized for the first time human fragility...',
            fullText: `When I was ten, my grandmother was hospitalized due to a stroke. Watching her go from being mobile to having hemiplegia, I realized for the first time human fragility. But what shocked me even more was how doctors and nurses used their professional knowledge and empathy to help my grandmother recover bit by bit. At that moment, I made up my mind: I want to become someone like them, using medical knowledge to alleviate others' suffering.

During high school, I actively sought opportunities to deeply understand medicine. I participated in three months of hospital volunteer service, assisting nurses in the neurology ward. The most unforgettable experience was with an 89-year-old Alzheimer's patient. Although she often forgot my name, every time I tidied her bedding, she would hold my hand and say "thank you." This experience taught me that medicine is not just about treating diseases—it's about giving patients dignity and warmth.

To gain deeper understanding of neuroscience, I attended a brain science summer camp at Peking University. There, I learned about the basic structure of neurons and signal transmission mechanisms, and had the opportunity to observe mouse brain slices. This experience sparked my intense interest in the complexity and plasticity of the brain. Upon returning to school, I initiated a research project exploring the impact of sleep quality on high school students' memory. Through a two-month tracking study of 120 students, I discovered that students sleeping less than 6 hours scored an average of 19% lower on short-term memory tests. This finding not only earned me a provincial science and technology innovation award but also made me realize the importance of research in medical advancement.

I also care deeply about the unequal distribution of medical resources. During a teaching program in rural Guizhou, I discovered that children in mountain areas often let minor illnesses develop into serious ones due to lack of medical knowledge. My teammates and I organized a "Health Education to Villages" initiative, explaining disease prevention and first aid knowledge to villagers in accessible ways. Watching the villagers take notes earnestly, I deeply understood that medicine is not just about treating illness—it should also be about prevention and education.

I aspire to study neuromedicine at Johns Hopkins, which has not only world-class neuroscience research but also powerful clinical resources. I particularly admire Professor Peter Calabresi's research on multiple sclerosis. In the future, I hope to become a neurologist and researcher, dedicated to conquering neurodegenerative diseases and helping more patients like my grandmother maintain their quality of life.

Medicine is science, art, and responsibility. I am ready to embrace this challenging yet profoundly meaningful profession.`,
            highlights: [
                'Uses a profound personal experience to introduce sense of mission in medicine',
                'Demonstrates empathy and humanistic care through volunteer service',
                'Has clear academic research experience and achievements',
                'Shows concern for and action on social medical issues',
                'Clear career plan and understanding of target school'
            ]
        },
        {
            id: 4,
            category: 'business',
            categoryName: '商科',
            title: 'Wharton商学院范文',
            university: 'Wharton',
            words: 602,
            excerpt: 'My experience helping in my parents\' small restaurant gave me my first understanding of what "business" truly means. It\'s not just about buying and selling...',
            fullText: `My experience helping in my parents' small restaurant gave me my first understanding of what "business" truly means. It's not just about buying and selling—it's about creating value, meeting needs, and maintaining sustainable enterprise development. From cashiering and bookkeeping to observing customer feedback, these seemingly trivial tasks cultivated my keen insight into business operations.

In my junior year, I founded a campus second-hand textbook trading platform called "BookSwap." My initial motivation was simple: seeing classmates spend large amounts on textbooks each semester while old books sat idle. I assembled a five-person team, developed a mini-program, and established a credit scoring system with online payment functionality. Three months after launch, our platform's GMV exceeded 50,000 RMB, helping over 500 students save approximately 30% on textbook expenses.

The real challenge was making this project sustainable. We encountered issues like difficulty ensuring book quality and high logistics costs. Through market research and user interviews, I decided to introduce a "book quality certification" mechanism and partnered with campus courier points to reduce delivery costs. More importantly, we started offering "textbook rental" services, which not only improved capital turnover but also reduced resource waste. This entrepreneurial experience taught me the importance of business model innovation and how to find optimal solutions under constraints.

I am particularly interested in social enterprises. Last summer, I interned at a social enterprise focused on rural poverty alleviation, helping design a business plan for direct farm product sales. Through data analysis, I discovered that in traditional agricultural supply chains, farmers receive only about 30% of the terminal price. The "farm-direct + community group buying" model I proposed increased farmers' income proportion to 65% while allowing urban consumers to buy fresher products. This experience made me realize that business can be a force for good.

I aspire to study strategic management and social innovation at Wharton. I particularly admire Professor Katherine Klein's research on social impact. Her course "Social Impact Strategy" is exactly what I want to explore deeply. I believe future business leaders must not only pursue profit but also shoulder social responsibility and create shared value.

Business should not be a zero-sum game—it should be a win-win ecosystem. I am ready to learn at Wharton how to become such a business leader.`,
            highlights: [
                'Introduces understanding of business through authentic family background',
                'Has actual entrepreneurial experience with quantifiable achievements',
                'Demonstrates problem-solving ability and business thinking',
                'Shows concern for social enterprise and sustainable development',
                'Clear learning objectives and understanding of school resources'
            ]
        },
        {
            id: 5,
            category: 'humanities',
            categoryName: '人文学',
            title: 'Oxford英语文学范文',
            university: 'Oxford',
            words: 618,
            excerpt: 'When I first read Virginia Woolf\'s "To the Lighthouse," I was mesmerized by her flowing stream-of-consciousness narrative. Words were no longer just tools for storytelling...',
            fullText: `When I first read Virginia Woolf's "To the Lighthouse," I was mesmerized by her flowing stream-of-consciousness narrative. Words were no longer just tools for storytelling—they could capture the subtlest fluctuations of the human psyche. From that moment, I realized that literature is not merely stories; it's a window into understanding humanity and society.

Over the past three years, I have systematically read classic works of English and American literature. From Shakespeare's plays to Austen's novels, from Dickens' social criticism to contemporary postmodern works, I've sought to understand the unique styles and social contexts of different literary periods. I'm particularly fascinated by how Victorian novels reflect the social changes brought by the Industrial Revolution. When reading "Jane Eyre," I saw not only the awakening of female consciousness but also the author's questioning of the class system. This prompted me to write an essay, "Feminist and Colonial Critique in 'Jane Eyre,'" which was later published in our school journal.

I'm also deeply passionate about comparative literature. While studying classical Chinese literature, I was amazed to discover striking thematic similarities between "Dream of the Red Chamber" and "Madame Bovary"—both explore the conflict between ideals and reality and the plight of women in patriarchal societies. I wrote a cross-cultural comparative essay analyzing how novels from East and West express similar humanistic concerns through different narrative techniques. This research made me realize that literature is a universal dialogue transcending language and culture.

Outside the classroom, I founded our school's literary society and organized a "Classic Rereading" series. Each month, we select a classic work and invite peers to interpret it from different perspectives. The most memorable was our discussion of "The Catcher in the Rye," where fierce debate arose over whether Holden is a rebellious hero or a lost coward. This discussion made me realize that great literary works never provide single answers—they provoke continuous thinking and dialogue.

I aspire to deeply study modernist literature and literary criticism theory at Oxford. I'm particularly interested in how feminist criticism and postcolonial theory reshape our understanding of canonical texts. Professor Helen Small's research on the value of literature deeply attracts me. Her book "The Value of the Humanities" raises a question I want to explore: in an age of utilitarianism, what is the value of the humanities?

Literature has taught me how to view the world and understand the complexity and contradictions of human nature. I believe that in this era of division and anxiety, the power of literature has never been more important.`,
            highlights: [
                'Introduces love for literature through specific work',
                'Demonstrates extensive reading and deep thinking',
                'Has academic writing and publication experience',
                'Shows cross-cultural perspective and comparative literature interests',
                'Clear research direction and understanding of target professor'
            ]
        },
        {
            id: 6,
            category: 'law',
            categoryName: '法律',
            title: 'LSE法律范文',
            university: 'LSE',
            words: 678,
            excerpt: 'After watching a debate on "Personal Privacy vs. Public Security," I was attracted by the complexity of law. Law is not simply about right and wrong...',
            fullText: `After watching a debate on "Personal Privacy vs. Public Security," I was attracted by the complexity of law. Law is not simply about judging right and wrong—it's an art of finding balance among multiple values. When both sides presented compelling arguments, I began to ponder: what is true justice?

During high school, I systematically studied legal fundamentals. But what truly made me understand the spirit of law was participating in our school's mock trial. I served as defense attorney for a "juvenile theft case" defendant. In my preparation, I had to not only familiarize myself with criminal law statutes but also understand the social factors behind the case—the defendant came from a poor family with parents who worked away from home long-term, lacking supervision. This made me realize that law should not only punish but also repair and prevent.

I am particularly interested in human rights law. After reading the UN's "Universal Declaration of Human Rights," I began to think: how are these "universal" rights realized in different cultural contexts? I chose "freedom of expression" as my topic and conducted comparative research on how common law and civil law systems protect freedom of expression. I found that while both acknowledge the importance of free speech, they have different legal regulatory approaches to issues like hate speech and misinformation. This research paper won first prize in a national high school law essay competition.

I also care about legal practice. Last summer, I interned at a public legal aid center, mainly assisting lawyers with cases of unpaid wages to migrant workers. What shocked me was that many workers, despite being in the right, couldn't protect their rights because they didn't understand legal procedures. This experience made me realize that popularizing legal knowledge is as important as perfecting the legal system. I organized a "Legal Knowledge to Construction Sites" initiative in the community, helping migrant workers understand basic legal knowledge about labor contracts and work injury compensation.

I'm also deeply interested in international law and global governance. During the pandemic, I noticed disagreements among countries on issues like vaccine distribution and border controls, which sparked my thinking about the effectiveness of international law and global cooperation mechanisms. I wrote an article, "International Health Law Framework in the Post-Pandemic Era," exploring how legal mechanisms can promote international public health cooperation.

At LSE, I aspire to study human rights law and international public law. Professor Conor Gearty's research on the relationship between human rights and terrorism deeply inspires me. I hope to explore under his guidance how to find a better balance between security and freedom. I also look forward to participating in LSE's Legal Advice Clinic, combining theoretical learning with legal practice.

Law is the guardian of social justice and a tool for promoting social progress. I am ready to shoulder this responsibility and use legal knowledge to contribute to building a more just society.`,
            highlights: [
                'Introduces interest in law through speculative questions',
                'Has practical experience like mock trial',
                'Demonstrates academic research ability and awards',
                'Focuses on social function and public interest of law',
                'Clear research interests aligned with target school resources'
            ]
        },
        {
            id: 7,
            category: 'art',
            categoryName: '艺术设计',
            title: 'RISD设计范文',
            university: 'RISD',
            words: 641,
            excerpt: 'My grandmother is an embroidery craftsman. Since childhood, I\'ve watched her "paint" with needle and thread on fabric. Those seemingly simple stitches could weave breathtaking patterns...',
            fullText: `My grandmother is an embroidery craftsman. Since childhood, I've watched her "paint" with needle and thread on fabric. Those seemingly simple stitches could weave breathtaking patterns. This was my first understanding that design is not just aesthetics—it's the perfect combination of function and art.

During high school, I systematically studied sketching, color theory, and design fundamentals. But what truly gave me a profound understanding of design was a project designing a campus wayfinding system for our school. I discovered that many freshmen often got lost on campus, and existing signage was neither clear enough nor reflected campus character. My team spent two months from user research and concept design to final implementation, redesigning the entire wayfinding system. We used the school's iconic ginkgo leaves as visual elements and employed internationally recognized graphic language to ensure accurate information delivery. Watching freshmen navigate more easily to their destinations, I deeply experienced the power of design—good design should be invisible, not showy, but quietly solving problems.

I'm particularly interested in sustainable design. After learning about the "circular economy" concept, I began thinking: how can we reduce waste through design? I initiated a "New Life for Old Things" project, collecting discarded items on campus and giving them new life through creative transformation. For example, I cut and melted discarded plastic bottles to make unique jewelry and transformed old desk wood into bookshelves. This project not only won a municipal youth innovation competition award but also made me realize that designers have a responsibility to promote sustainable development.

I also explore the integration of digital design with traditional crafts. During the pandemic, I noticed that many traditional craftsmen faced difficulties due to inability to sell offline. I designed a digital brand identity for them, including logos, websites, and social media visuals. By reinterpreting traditional elements through modern design language, I helped them reach younger consumers. This project made me understand that design can be a bridge between traditional culture and modern life.

While preparing my portfolio, I challenged my boundaries. I experimented with motion graphics, interaction design, and spatial design. Each project deepened my understanding of design's different dimensions. My most satisfying work is an interactive installation called "Sound Visualization" that converts environmental sounds into real-time changing light and shadow patterns, exploring cross-sensory design.

At RISD, I aspire to major in Industrial Design, particularly exploring human-computer interaction and social innovation design. I admire Professor Paul Soulellis' practice of "radical design" and how he uses design to intervene in social issues. I believe designers should not merely be beautifiers but thinkers and actors.

Design is a gentle force for changing the world. I am ready to create meaningful design work with creativity and execution.`,
            highlights: [
                'Introduces understanding of design through personal cultural background',
                'Has complete design project experience (campus wayfinding system)',
                'Shows concern for sustainable design and other social issues',
                'Portfolio demonstrates diversity and experimental spirit',
                'Clear professional direction and understanding of target professor'
            ]
        },
        {
            id: 8,
            category: 'economics',
            categoryName: '经济学',
            title: 'LSE经济学范文',
            university: 'LSE',
            words: 696,
            excerpt: 'The 2020 global pandemic was not only a public health crisis but also an economic tsunami. Watching news of stock market crashes and soaring unemployment rates, I began to think...',
            fullText: `The 2020 global pandemic was not only a public health crisis but also an economic tsunami. Watching news of stock market crashes and soaring unemployment rates, I began to think: how does economics explain these phenomena? How should governments respond? These questions sparked my intense interest in economics.

During high school, I systematically studied macroeconomic and microeconomic fundamentals. But what truly made me understand the charm of economics was analyzing real-world problems using economic theory. For example, after learning about "price discrimination," I researched why movie tickets have different prices at different times and why airlines charge different customers different rates. I discovered that behind corporate pricing strategies lies precise economic logic—maximizing consumer surplus extraction. This ability to apply theory to practice fascinates me.

I'm particularly interested in development economics. After reading Esther Duflo's "Poor Economics," I began to think: why are some countries rich while others poor? Why do traditional aid models often fail? I decided to conduct a small field survey, visiting a poor mountain village in Yunnan during summer vacation to study the local economic structure and poverty alleviation paths. Through two weeks of field research and over 30 interviews, I discovered an interesting phenomenon: although the government provided microfinance support, many villagers were unwilling to borrow for industrial development because their fear of market risks exceeded their expectations of potential gains. This made me understand the importance of behavioral economics—people's economic decisions aren't completely rational; psychological factors and social norms are equally important.

I organized this research into a paper, "Risk Aversion and Rural Financial Inclusion—A Case Study of XX Village," which won second prize in a provincial social science competition. More importantly, it made me realize that economic research must be built on deep understanding of the real world.

I also focus on how the digital economy and technological innovation reshape the economic landscape. In our school's economics society, I organized a "Platform Economy Opportunities and Challenges" lecture series, inviting industry experts and peers to discuss emerging issues like the sharing economy and algorithmic pricing. We explored how food delivery platforms optimize delivery efficiency through big data and questioned problems like "big data price discrimination." These discussions made me realize that economics must study not only efficiency but also fairness.

To enhance quantitative analysis ability, I self-studied statistics and data analysis. I scraped housing price data from the past five years using Python, analyzed key factors affecting housing prices, and built a simple prediction model. Although the model was rough, this process made me understand the power of econometrics—how to extract valuable insights from massive data.

At LSE, I aspire to deeply study development economics and behavioral economics. I'm particularly interested in Professor Oriana Bandiera's research on entrepreneurship and economic development. Her approach of using randomized controlled trials (RCT) for field experiments is very inspiring. I also hope to participate in Sticerd (Centre for Economic Performance) research projects, combining theoretical learning with policy research.

Economics helps me understand how the world operates and also makes me think about how to make this world better. I believe economics should not stay in ivory towers but should provide wisdom for solving real-world problems. I am ready to contribute to economic development and social progress through rigorous analysis and empirical research.`,
            highlights: [
                'Introduces interest in economics through current events',
                'Has field research and empirical research experience',
                'Demonstrates ability to apply theory to reality',
                'Focuses on social significance and policy impact of economics',
                'Possesses quantitative analysis skills with clear research interests'
            ]
        }
    ];

    // 渲染范文卡片
    function renderSamples(category = 'all') {
        samplesGrid.innerHTML = '';
        
        const filteredSamples = category === 'all' 
            ? samples 
            : samples.filter(s => s.category === category);

        filteredSamples.forEach(sample => {
            const card = document.createElement('div');
            card.className = 'sample-card';
            card.dataset.category = sample.category;
            card.innerHTML = `
                <div class="sample-header">
                    <span class="sample-category">${sample.categoryName}</span>
                    <div class="sample-title">${sample.title}</div>
                    <div class="sample-meta">
                        <span><i class="fas fa-university"></i> ${sample.university}</span>
                        <span><i class="fas fa-file-word"></i> ${sample.words}词</span>
                    </div>
                </div>
                <div class="sample-body">
                    <p class="sample-excerpt">${sample.excerpt}</p>
                </div>
                <div class="sample-footer">
                    <a href="#" class="read-more">
                        阅读全文 <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            `;

            // 点击卡片打开模态框
            card.addEventListener('click', function(e) {
                e.preventDefault();
                showModal(sample);
            });

            samplesGrid.appendChild(card);
        });
    }

    // 显示模态框
    function showModal(sample) {
        modalBody.innerHTML = `
            <div class="modal-header">
                <h2 class="modal-title">${sample.title}</h2>
                <div class="modal-meta">
                    <span><i class="fas fa-tag"></i> ${sample.categoryName}</span>
                    <span><i class="fas fa-university"></i> ${sample.university}</span>
                    <span><i class="fas fa-file-word"></i> ${sample.words} words</span>
                </div>
            </div>
            <div class="modal-text">
                ${sample.fullText.split('\n\n').map(para => `<p>${para}</p>`).join('')}
            </div>
            <div class="modal-analysis">
                <h3><i class="fas fa-star"></i> 专家点评:为什么这篇PS优秀?</h3>
                <ul>
                    ${sample.highlights.map(h => `<li>${h}</li>`).join('')}
                </ul>
            </div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // 关闭模态框
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // 筛选按钮点击
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 更新活动状态
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 渲染对应分类的范文
            const category = this.dataset.category;
            renderSamples(category);
        });
    });

    // 关闭按钮
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // 点击模态框背景关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // 初始化:显示所有范文
    renderSamples('all');
});