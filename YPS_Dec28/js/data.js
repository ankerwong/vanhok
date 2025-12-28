// 文章数据
const articlesData = {
    article1: {
        id: 'article1',
        title: 'Should parents monitor their kids\' social media accounts?',
        subtitle: 'A debate on privacy, safety, and trust in the digital age',
        genre: 'Debate / Face-Off',
        wordCount: 779,
        level: 'CEFR B1-B2',
        pdfUrl: 'Should parents monitor their kids social account.pdf',
        
        podcast: {
            audioUrl: './audio1.mp3',
            duration: 144
        },
        
        worksheet: {
            sections: [
                {
                    title: 'Part A: Key Information (关键信息定位)',
                    questions: [
                        {
                            id: 'q1',
                            question: 'What percentage of US children aged 8-12 use social media without parental knowledge?',
                            answer: '40%',
                            type: 'short'
                        },
                        {
                            id: 'q2',
                            question: 'According to Pew Research (2018), what percentage of US teens experienced cyberbullying?',
                            answer: '59%',
                            type: 'short'
                        },
                        {
                            id: 'q3',
                            question: 'Which apps are mentioned as having "disappearing messages" feature?',
                            answer: 'Snapchat and Instagram',
                            type: 'short'
                        },
                        {
                            id: 'q4',
                            question: 'In the 2025 China survey, how did parental supervision correlate with smartphone use?',
                            answer: 'Positively correlated with problematic use',
                            type: 'short'
                        },
                        {
                            id: 'q5',
                            question: 'What percentage of US students self-censored writing due to monitoring software (2021)?',
                            answer: '60%',
                            type: 'short'
                        },
                        {
                            id: 'q6',
                            question: 'What does Unicef suggest parents should focus on instead of just monitoring?',
                            answer: 'Speaking openly with children',
                            type: 'short'
                        }
                    ]
                },
                {
                    title: 'Part B: Argument Analysis (论点分析)',
                    questions: [
                        {
                            id: 'q7',
                            question: 'Nicholas argues monitoring provides "___ protection". What word is missing?',
                            answer: 'extra',
                            type: 'short'
                        },
                        {
                            id: 'q8',
                            question: 'Angela claims surveillance leads to "___" rather than reducing harm. Fill in:',
                            answer: 'resentment and rebellion',
                            type: 'short'
                        },
                        {
                            id: 'q9',
                            question: 'List TWO groups Angela mentions who need social media as a "lifeline":',
                            answer: 'LGBTQ teens / Youth facing abuse',
                            type: 'short'
                        },
                        {
                            id: 'q10',
                            question: 'Both writers agree on one thing - what is the real problem behind online safety?',
                            answer: 'Platforms\' weak moderation and algorithms',
                            type: 'short'
                        }
                    ]
                },
                {
                    title: 'Part C: Critical Thinking (批判性思考)',
                    questions: [
                        {
                            id: 'q11',
                            question: 'Which argument do you find more convincing? Use ONE piece of evidence from the text to support your view. (3-4 sentences)',
                            answer: 'Open-ended response',
                            type: 'long'
                        },
                        {
                            id: 'q12',
                            question: 'Suggest ONE alternative solution that could address BOTH writers\' concerns.',
                            answer: 'Open-ended response',
                            type: 'long'
                        }
                    ]
                }
            ]
        },
        
        flashcards: [
            {
                word: 'sinister',
                phonetic: '/ˈsɪnɪstər/',
                partOfSpeech: 'adj.',
                contextSentence: 'there is a sinister side to these platforms',
                definition: 'Dark, evil, or threatening in nature',
                example: 'The villain had a sinister laugh in the movie.'
            },
            {
                word: 'predatory',
                phonetic: '/ˈprɛdətɔːri/',
                partOfSpeech: 'adj.',
                contextSentence: 'breeding ground for predatory behaviour',
                definition: 'Seeking to exploit or harm others',
                example: 'Online scammers use predatory tactics to steal money.'
            },
            {
                word: 'illicit',
                phonetic: '/ɪˈlɪsɪt/',
                partOfSpeech: 'adj.',
                contextSentence: 'exposing them to illicit or inappropriate content',
                definition: 'Forbidden by law or rules',
                example: 'The police arrested him for illicit drug dealing.'
            },
            {
                word: 'cyberbullying',
                phonetic: '/ˈsaɪbərbʊliɪŋ/',
                partOfSpeech: 'n.',
                contextSentence: 'experienced some form of cyberbullying',
                definition: 'Online harassment or abuse',
                example: 'Cyberbullying can cause serious mental health problems.'
            },
            {
                word: 'safeguard',
                phonetic: '/ˈseɪfɡɑːrd/',
                partOfSpeech: 'n./v.',
                contextSentence: 'apps offer safeguard measures',
                definition: 'Protection or measure to prevent harm',
                example: 'Schools must safeguard students\' personal information.'
            },
            {
                word: 'media-literate',
                phonetic: '/ˈmiːdiə ˈlɪtərət/',
                partOfSpeech: 'adj.',
                contextSentence: 'help raise media-literate children',
                definition: 'Able to critically analyze media content',
                example: 'Media-literate citizens can identify fake news.'
            },
            {
                word: 'surveillance',
                phonetic: '/sərˈveɪləns/',
                partOfSpeech: 'n.',
                contextSentence: 'surveillance is a faulty approach',
                definition: 'Close observation or monitoring',
                example: 'CCTV cameras provide surveillance in public areas.'
            },
            {
                word: 'agency',
                phonetic: '/ˈeɪdʒənsi/',
                partOfSpeech: 'n.',
                contextSentence: 'stripped of their agency',
                definition: 'The ability to act independently and make choices',
                example: 'Children need agency to develop decision-making skills.'
            },
            {
                word: 'resentment',
                phonetic: '/rɪˈzɛntmənt/',
                partOfSpeech: 'n.',
                contextSentence: 'result is resentment',
                definition: 'Bitter anger or indignation',
                example: 'He felt resentment towards his unfair boss.'
            },
            {
                word: 'clandestine',
                phonetic: '/klænˈdɛstɪn/',
                partOfSpeech: 'adj.',
                contextSentence: 'pushes adolescents toward clandestine use',
                definition: 'Done secretly or kept hidden',
                example: 'The spies held clandestine meetings at midnight.'
            },
            {
                word: 'correlate',
                phonetic: '/ˈkɒrəleɪt/',
                partOfSpeech: 'v.',
                contextSentence: 'positively correlated with problematic smartphone use',
                definition: 'Show a mutual relationship or connection',
                example: 'Studies correlate exercise with better mental health.'
            },
            {
                word: 'doomscrolling',
                phonetic: '/ˈduːmskrəʊlɪŋ/',
                partOfSpeech: 'n.',
                contextSentence: 'reveal late-night doomscrolling',
                definition: 'Endlessly scrolling through bad news online',
                example: 'Doomscrolling before bed ruins my sleep quality.'
            },
            {
                word: 'marginalised',
                phonetic: '/ˈmɑːrdʒɪnəlaɪzd/',
                partOfSpeech: 'adj.',
                contextSentence: 'marginalised adolescents',
                definition: 'Treated as insignificant or pushed to edges of society',
                example: 'The charity supports marginalised communities.'
            },
            {
                word: 'affirmation',
                phonetic: '/ˌæfərˈmeɪʃən/',
                partOfSpeech: 'n.',
                contextSentence: 'find affirmation and communities online',
                definition: 'Support, encouragement, or validation',
                example: 'Everyone needs affirmation to build confidence.'
            },
            {
                word: 'self-censored',
                phonetic: '/sɛlf ˈsɛnsərd/',
                partOfSpeech: 'v.',
                contextSentence: 'students self-censored their writing',
                definition: 'Restrict one\'s own expression due to fear or pressure',
                example: 'Writers in authoritarian states often self-censor.'
            },
            {
                word: 'conformity',
                phonetic: '/kənˈfɔːrmɪti/',
                partOfSpeech: 'n.',
                contextSentence: 'normalises conformity',
                definition: 'Behavior matching the standards of a group',
                example: 'High schools often pressure students toward conformity.'
            },
            {
                word: 'amplify',
                phonetic: '/ˈæmplɪfaɪ/',
                partOfSpeech: 'v.',
                contextSentence: 'algorithms amplify harmful content',
                definition: 'Make louder, stronger, or more intense',
                example: 'Social media can amplify both good and bad messages.'
            },
            {
                word: 'transparent',
                phonetic: '/trænsˈpærənt/',
                partOfSpeech: 'adj.',
                contextSentence: 'transparent, ongoing conversation',
                definition: 'Open, honest, and easily understood',
                example: 'The company promised transparent business practices.'
            }
        ],
        
        backgroundKnowledge: [
            {
                title: 'Global Teen Social Media Usage (2025)',
                icon: 'chart-bar',
                content: [
                    { label: '95% of teens aged 13-17 use social media platforms' },
                    { label: '40% of children aged 8-12 use social media (below minimum age)' },
                    { label: 'Average daily usage: 4.8 hours for teenagers' },
                    { label: 'Top platforms: YouTube (95%), TikTok (67%), Instagram (62%), Snapchat (59%)' }
                ],
                insight: 'The article discusses children\'s exposure to online risks—these numbers show just how widespread teen social media use is, making parental monitoring a concern for almost all families.'
            },
            {
                title: 'Cyberbullying Statistics',
                icon: 'exclamation-triangle',
                content: [
                    { label: '30% of teens have been cyberbullied in their lifetime' },
                    { label: '26.5% of US teens reported cyberbullying in 2023' },
                    { label: '67% of teenagers experienced some form of cyberbullying in 2025' },
                    { label: 'YouTube has the highest cyberbullying rate (79%), followed by Snapchat (69%) and TikTok (68%)' },
                    { label: 'Impact: 95% of victims report mental health effects' }
                ],
                insight: 'Sources: Pew Research Center, Cyberbullying Research Center, Security.org'
            },
            {
                title: 'Psychology of Parental Monitoring',
                icon: 'brain',
                content: [
                    { label: 'Potential Benefits: Early intervention, detection of dangerous contacts, parent-child dialogue' },
                    { label: 'Paradox Effect: Studies show restrictive monitoring correlates with increased problematic smartphone use' },
                    { label: 'Trust Erosion: Teens confide less in parents who surveil them' },
                    { label: 'Self-Censorship: 60% of students limit expression due to monitoring' },
                    { label: 'Developmental Impact: Can hinder identity exploration, especially for LGBTQ+ youth' }
                ],
                insight: 'Unicef recommends "open communication over surveillance" to build media literacy.'
            },
            {
                title: 'Platform Safety Features (2025)',
                icon: 'shield-alt',
                content: [
                    { label: 'Age verification (often ineffective—40% of under-13s bypass it)' },
                    { label: 'Report/Block buttons' },
                    { label: 'Content filters and AI moderation' },
                    { label: 'Disappearing messages (Snapchat, Instagram)' }
                ],
                insight: 'The Problem: Algorithms prioritize engagement over safety, often amplifying harmful content. Weak moderation tools can\'t keep pace. Both writers agree that platform-level solutions are the real need, not just parental action.'
            }
        ]
    },
    
    article2: {
        id: 'article2',
        title: 'Are Japan\'s proposed language tests for residency unfair barriers?',
        subtitle: 'A debate between integration requirements and immigration barriers',
        genre: 'News Report',
        wordCount: 848,
        level: 'CEFR B1-B2',
        pdfUrl: 'Are Japan\'s proposed language tests for.pdf',
        
        podcast: {
            audioUrl: './audio2.mp3',
            duration: 146
        },
        
        worksheet: {
            sections: [
                {
                    title: 'Part A: Policy Details (政策细节)',
                    questions: [
                        {
                            id: 'q1',
                            question: 'What is the tentative name of Japan\'s new program?',
                            answer: 'Social inclusion programme',
                            type: 'short'
                        },
                        {
                            id: 'q2',
                            question: 'How many years must foreigners currently live in Japan before applying for permanent residency?',
                            answer: '10 years',
                            type: 'short'
                        },
                        {
                            id: 'q3',
                            question: 'When are the language test reforms scheduled to begin?',
                            answer: 'April 2027',
                            type: 'short'
                        },
                        {
                            id: 'q4',
                            question: 'How many foreigners were living in Japan by June 2025?',
                            answer: '3.96 million',
                            type: 'short'
                        },
                        {
                            id: 'q5',
                            question: 'How many of them are permanent residents?',
                            answer: '930,000',
                            type: 'short'
                        }
                    ]
                },
                {
                    title: 'Part B: Perspectives (多方观点)',
                    questions: [
                        {
                            id: 'q6',
                            question: 'The government says the program aims to provide "___________" knowledge.',
                            answer: 'fundamental societal',
                            type: 'short'
                        },
                        {
                            id: 'q7',
                            question: 'List TWO countries mentioned that already require language proficiency for residency:',
                            answer: 'Australia / France / Germany / UK / Nordic states (any 2)',
                            type: 'short'
                        },
                        {
                            id: 'q8',
                            question: 'Professor Watanabe gives TWO examples of workers who may NOT need Japanese skills. What are they?',
                            answer: 'Agriculture / fisheries workers',
                            type: 'short'
                        },
                        {
                            id: 'q9',
                            question: 'What is Japan\'s English proficiency ranking out of 123 nations?',
                            answer: '96th place',
                            type: 'short'
                        }
                    ]
                },
                {
                    title: 'Part C: Connecting Ideas (关联思考)',
                    questions: [
                        {
                            id: 'q10',
                            question: 'Why does the article call Japan\'s policy "ironic"? (2-3 sentences)',
                            answer: 'Open-ended response',
                            type: 'long'
                        },
                        {
                            id: 'q11',
                            question: 'Find ONE argument FOR and ONE argument AGAINST the policy from the text.',
                            answer: 'Open-ended response',
                            type: 'long'
                        },
                        {
                            id: 'q12',
                            question: 'Compare this debate to Article 1 (social media monitoring). What is similar about both conflicts? (Hint: think about freedom vs. safety)',
                            answer: 'Open-ended response',
                            type: 'long'
                        }
                    ]
                }
            ]
        },
        
        flashcards: [
            {
                word: 'proficiency',
                phonetic: '/prəˈfɪʃənsi/',
                partOfSpeech: 'n.',
                contextSentence: 'Japanese-language proficiency',
                definition: 'High level of skill or competence',
                example: 'English proficiency is required for this job.'
            },
            {
                word: 'residency',
                phonetic: '/ˈrɛzɪdənsi/',
                partOfSpeech: 'n.',
                contextSentence: 'permanent residency',
                definition: 'Official permission to live in a country',
                example: 'She applied for Canadian residency last year.'
            },
            {
                word: 'sparked',
                phonetic: '/spɑːrkt/',
                partOfSpeech: 'v.',
                contextSentence: 'sparked a fierce debate',
                definition: 'Caused something to start suddenly',
                example: 'His comment sparked an argument at the meeting.'
            },
            {
                word: 'conservative',
                phonetic: '/kənˈsɜːrvətɪv/',
                partOfSpeech: 'adj.',
                contextSentence: 'major conservative political party',
                definition: 'Preferring traditional values and opposing change',
                example: 'Conservative politicians often resist new policies.'
            },
            {
                word: 'nationalist',
                phonetic: '/ˈnæʃənəlɪst/',
                partOfSpeech: 'adj.',
                contextSentence: 'conservative and nationalist political party',
                definition: 'Supporting strong national identity and interests',
                example: 'Nationalist movements have grown in many countries.'
            },
            {
                word: 'provisions',
                phonetic: '/prəˈvɪʒənz/',
                partOfSpeech: 'n.',
                contextSentence: 'provisions will also be made',
                definition: 'Arrangements or preparations for future needs',
                example: 'The contract includes provisions for overtime pay.'
            },
            {
                word: 'xenophobia',
                phonetic: '/ˌzɛnəˈfoʊbiə/',
                partOfSpeech: 'n.',
                contextSentence: 'curb rising xenophobia',
                definition: 'Fear or hatred of foreigners',
                example: 'Xenophobia often increases during economic crises.'
            },
            {
                word: 'fared',
                phonetic: '/fɛərd/',
                partOfSpeech: 'v.',
                contextSentence: 'fared well in that election',
                definition: 'Performed or progressed in a particular way',
                example: 'How did you fare on the math exam?'
            },
            {
                word: 'tentatively',
                phonetic: '/ˈtɛntətɪvli/',
                partOfSpeech: 'adv.',
                contextSentence: 'tentatively named',
                definition: 'Not certain or fixed; provisionally',
                example: 'The meeting is tentatively scheduled for Monday.'
            },
            {
                word: 'component',
                phonetic: '/kəmˈpoʊnənt/',
                partOfSpeech: 'n.',
                contextSentence: 'not currently a component',
                definition: 'A part or element of a larger system',
                example: 'Hard work is a key component of success.'
            },
            {
                word: 'ethno-nationalism',
                phonetic: '/ˈɛθnoʊ ˈnæʃənəlɪzəm/',
                partOfSpeech: 'n.',
                contextSentence: 'ethno-nationalism rules',
                definition: 'Political ideology emphasizing ethnic identity',
                example: 'Ethno-nationalism can divide multicultural societies.'
            },
            {
                word: 'pandering',
                phonetic: '/ˈpændərɪŋ/',
                partOfSpeech: 'v.',
                contextSentence: 'pandering to xenophobes',
                definition: 'Doing something to please others, often dishonestly',
                example: 'Politicians accused of pandering to special interests.'
            },
            {
                word: 'conflicted',
                phonetic: '/kənˈflɪktɪd/',
                partOfSpeech: 'adj.',
                contextSentence: 'Japanese are conflicted on this issue',
                definition: 'Having mixed or contradictory feelings',
                example: 'I feel conflicted about accepting this job offer.'
            },
            {
                word: 'mandatory',
                phonetic: '/ˈmændətɔːri/',
                partOfSpeech: 'adj.',
                contextSentence: 'making it mandatory',
                definition: 'Required by law or rule',
                example: 'Wearing seatbelts is mandatory in most countries.'
            },
            {
                word: 'internationalisation',
                phonetic: '/ˌɪntərnæʃənəlaɪˈzeɪʃən/',
                partOfSpeech: 'n.',
                contextSentence: 'failing at internationalisation',
                definition: 'Process of becoming more internationally involved',
                example: 'Universities promote internationalisation through exchange programs.'
            },
            {
                word: 'slumped',
                phonetic: '/slʌmpt/',
                partOfSpeech: 'v.',
                contextSentence: 'English proficiency has slumped',
                definition: 'Fallen or decreased suddenly',
                example: 'Sales slumped during the economic recession.'
            },
            {
                word: 'compiled',
                phonetic: '/kəmˈpaɪld/',
                partOfSpeech: 'v.',
                contextSentence: 'study compiled annually',
                definition: 'Collected and assembled information',
                example: 'The report was compiled from 50 different surveys.'
            }
        ],
        
        backgroundKnowledge: [
            {
                title: 'Japan\'s Foreign Population (2025)',
                icon: 'users',
                content: [
                    { label: 'Total foreign residents: 3.96 million (record high)' },
                    { label: 'Permanent residents: 930,000' },
                    { label: 'Top nationalities: China, Vietnam, South Korea, Philippines, Brazil' },
                    { label: 'Foreign workers: Target of 805,000 by March 2029' }
                ],
                insight: 'Historical Context: Japan traditionally had restrictive immigration (homogeneous society). Policy shift due to aging population + labor shortages. Acceptance growing but tensions remain.'
            },
            {
                title: 'Language Requirements in Other Countries',
                icon: 'globe',
                content: [
                    { label: 'Australia: IELTS 6.0 or equivalent (English)' },
                    { label: 'Canada: CLB 4-7 (depends on category) - English/French' },
                    { label: 'Germany: B1 level (German)' },
                    { label: 'France: A2 level (French)' },
                    { label: 'UK: B1 level (English)' },
                    { label: 'Nordic countries: Varies (A2-B1) - Local language or English' }
                ],
                insight: 'Japan\'s Proposal: Exact level TBA, likely N3-N2 on JLPT (Japanese Language Proficiency Test)'
            },
            {
                title: 'Japan\'s English Proficiency Paradox',
                icon: 'language',
                content: [
                    { label: 'Japan ranks 96th out of 123 nations in English proficiency (EF Education First, 2025)' },
                    { label: 'Countries ranking higher than Japan: Laos (95th), Turkmenistan (94th), Bhutan (93rd)' }
                ],
                insight: 'As Professor Watanabe notes: "Japan is failing at internationalization but requiring foreigners to take Japanese tests." Critics see this as double standard—demanding linguistic integration while Japanese struggle with global communication. Root causes: Grammar-focused education (not conversation), limited English exposure, cultural reluctance.'
            },
            {
                title: 'The Nationalism vs. Economics Debate',
                icon: 'balance-scale',
                content: [
                    { label: 'Economic Pressure: Population declining (124.9M in 2025, down from 128M in 2010)' },
                    { label: 'Working-age population shrinking: Need 820,000 foreign workers to fill gaps' },
                    { label: 'Industries desperate for labor: agriculture, construction, healthcare, hospitality' },
                    { label: 'Nationalist Pushback: Far-right parties gained ground in 2025 election' }
                ],
                insight: 'The Tension: Japan needs immigrants economically but faces cultural resistance—language requirements may be a compromise that satisfies neither side.'
            },
            {
                title: 'What is "Social Inclusion" Really?',
                icon: 'handshake',
                content: [
                    { label: 'Government\'s Goals: Provide "fundamental societal knowledge" (language + customs)' },
                    { label: 'Supporters: Language = key to true integration' },
                    { label: 'Critics: "Social inclusion" = coded language for assimilation' },
                    { label: 'Barriers for: Blue-collar workers, elderly immigrants, refugees' }
                ],
                insight: 'Gray Area: Agricultural/fishery workers may not need Japanese for job function, but arguably need it for community life.'
            }
        ]
    }
};
