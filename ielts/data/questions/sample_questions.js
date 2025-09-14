// 雅思模拟题库数据
const sampleQuestions = {
    listening: [
        // Section 1: 日常对话 (Questions 1-10)
        {
            id: 'l1_001',
            section: 1,
            question_number: 1,
            question_type: 'fill_blank',
            question_text: 'Name: Sarah ____',
            audio_file: 'section1_conversation.mp3',
            correct_answer: 'Thompson',
            difficulty: 'easy'
        },
        {
            id: 'l1_002',
            section: 1,
            question_number: 2,
            question_type: 'fill_blank',
            question_text: 'Phone number: ____',
            audio_file: 'section1_conversation.mp3',
            correct_answer: '07734 582961',
            difficulty: 'easy'
        },
        {
            id: 'l1_003',
            section: 1,
            question_number: 3,
            question_type: 'multiple_choice',
            question_text: 'What type of accommodation is Sarah looking for?',
            audio_file: 'section1_conversation.mp3',
            correct_answer: 'B',
            options: JSON.stringify(['A) Hotel', 'B) Shared apartment', 'C) Studio flat']),
            difficulty: 'easy'
        },
        
        // Section 2: 独白 (Questions 11-20)
        {
            id: 'l2_001',
            section: 2,
            question_number: 11,
            question_type: 'multiple_choice',
            question_text: 'The museum is closed on:',
            audio_file: 'section2_monologue.mp3',
            correct_answer: 'C',
            options: JSON.stringify(['A) Sundays', 'B) Mondays', 'C) Tuesdays']),
            difficulty: 'medium'
        },
        {
            id: 'l2_002',
            section: 2,
            question_number: 12,
            question_type: 'map_labeling',
            question_text: 'Label the location of the Information Desk on the map.',
            audio_file: 'section2_monologue.mp3',
            correct_answer: 'F',
            difficulty: 'medium'
        },

        // Section 3: 学术对话 (Questions 21-30)
        {
            id: 'l3_001',
            section: 3,
            question_number: 21,
            question_type: 'matching',
            question_text: 'Match each research method with its advantage',
            audio_file: 'section3_academic.mp3',
            correct_answer: JSON.stringify({'Interviews': 'D', 'Surveys': 'A', 'Observations': 'C'}),
            options: JSON.stringify(['A) Quick to conduct', 'B) Cost effective', 'C) Natural behavior', 'D) Detailed information']),
            difficulty: 'hard'
        },

        // Section 4: 学术讲座 (Questions 31-40)
        {
            id: 'l4_001',
            section: 4,
            question_number: 31,
            question_type: 'fill_blank',
            question_text: 'Solar energy accounts for ____ percent of renewable energy.',
            audio_file: 'section4_lecture.mp3',
            correct_answer: '23',
            difficulty: 'hard'
        }
    ],

    reading: [
        // Passage 1
        {
            id: 'r1_001',
            passage_id: 'passage_1',
            passage_title: 'The History of Chocolate',
            passage_text: `Chocolate has a rich and fascinating history that spans thousands of years. The ancient Mayans and Aztecs were among the first civilizations to cultivate cacao beans, which they used to create a bitter drink called "xocolatl". This beverage was considered sacred and was often reserved for royalty and religious ceremonies.

            The Spanish conquistadors brought cacao to Europe in the 16th century, where it gradually transformed from a bitter drink into the sweet confection we know today. Sugar was added to counteract the natural bitterness of cacao, and milk was later incorporated to create milk chocolate.

            The Industrial Revolution brought significant changes to chocolate production. In 1828, Dutch chemist Coenraad van Houten invented a process to remove most of the cocoa butter from chocolate, creating cocoa powder. This innovation made chocolate more affordable and accessible to the general public.

            Today, chocolate is enjoyed worldwide in countless varieties, from dark chocolate with its intense flavor to white chocolate with its creamy sweetness. The global chocolate industry is worth billions of dollars and continues to grow as new flavors and combinations are constantly being developed.`,
            question_number: 1,
            question_type: 'true_false_not_given',
            question_text: 'The Mayans used chocolate primarily for trade purposes.',
            correct_answer: 'FALSE',
            difficulty: 'medium'
        },
        {
            id: 'r1_002',
            passage_id: 'passage_1',
            passage_title: 'The History of Chocolate',
            passage_text: '', // Same passage
            question_number: 2,
            question_type: 'multiple_choice',
            question_text: 'According to the passage, what was added to chocolate to make it sweet?',
            correct_answer: 'B',
            options: JSON.stringify(['A) Milk', 'B) Sugar', 'C) Vanilla', 'D) Cocoa butter']),
            difficulty: 'easy'
        },

        // Passage 2
        {
            id: 'r2_001',
            passage_id: 'passage_2',
            passage_title: 'Climate Change and Arctic Wildlife',
            passage_text: `The Arctic region is experiencing climate change at twice the global average rate, a phenomenon known as Arctic amplification. This rapid warming has profound implications for the wildlife that calls this frozen landscape home.

            Polar bears, perhaps the most iconic Arctic species, face significant challenges as their sea ice habitat diminishes. These magnificent predators rely on sea ice platforms to hunt seals, their primary food source. As ice forms later and melts earlier each year, polar bears have shorter hunting seasons and must travel greater distances to find food.

            Other species are also affected by these changes. Arctic foxes compete with red foxes moving northward into their territory. Caribou migration patterns are disrupted by changing weather patterns and altered vegetation. Marine mammals like walruses and seals face challenges as their ice-based breeding grounds become less stable.

            However, some species show remarkable adaptability. Certain bird populations are adjusting their migration timing and routes. Some plant species are expanding their range northward, potentially providing new food sources for herbivores.

            Conservation efforts are crucial for protecting Arctic wildlife. International cooperation, habitat protection, and climate change mitigation strategies are essential for ensuring the survival of these unique ecosystems and the species that depend on them.`,
            question_number: 8,
            question_type: 'fill_blank',
            question_text: 'Climate change in the Arctic occurs at ____ the global average rate.',
            correct_answer: 'twice',
            difficulty: 'medium'
        },

        // Passage 3
        {
            id: 'r3_001',
            passage_id: 'passage_3',
            passage_title: 'The Science of Memory',
            passage_text: `Memory formation and retrieval involve complex neurological processes that scientists are still working to fully understand. The human brain processes and stores information through intricate networks of neurons that communicate via electrical and chemical signals.

            There are several types of memory, each serving different functions. Short-term memory, also called working memory, temporarily holds information for immediate use. Long-term memory stores information for extended periods and is further divided into explicit memory (conscious recollection) and implicit memory (unconscious skills and habits).

            The hippocampus plays a crucial role in memory formation, particularly for explicit memories. This seahorse-shaped structure acts as a temporary storage site before memories are transferred to the cerebral cortex for long-term storage. Damage to the hippocampus can result in severe memory impairments, as demonstrated in famous case studies.

            Sleep is essential for memory consolidation. During sleep, the brain replays neural patterns from the day, strengthening important connections and discarding irrelevant information. This process explains why students often perform better on tests after a good night's sleep rather than staying up all night studying.

            Recent research has revealed that memory is not simply a recording device but an active reconstructive process. Each time we recall a memory, we potentially alter it slightly, incorporating new information or perspectives. This discovery has significant implications for eyewitness testimony and therapeutic practices.`,
            question_number: 27,
            question_type: 'matching',
            question_text: 'Match each type of memory with its characteristics',
            correct_answer: JSON.stringify({
                'Short-term memory': 'C',
                'Explicit memory': 'A', 
                'Implicit memory': 'B'
            }),
            options: JSON.stringify([
                'A) Conscious recollection',
                'B) Unconscious skills',
                'C) Temporary storage',
                'D) Permanent storage'
            ]),
            difficulty: 'hard'
        }
    ],

    writing: [
        {
            id: 'w1_001',
            task_number: 1,
            question_type: 'chart_description',
            question_text: 'The chart below shows the percentage of households in owned and rented accommodation in England and Wales between 1918 and 2011. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.',
            prompt_image: 'chart_housing_ownership.png',
            word_limit: 150,
            time_limit: 20,
            difficulty: 'medium'
        },
        {
            id: 'w1_002',
            task_number: 1,
            question_type: 'process_diagram',
            question_text: 'The diagrams below show the life cycle of a species of large fish called the salmon. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.',
            prompt_image: 'salmon_lifecycle.png',
            word_limit: 150,
            time_limit: 20,
            difficulty: 'medium'
        },
        {
            id: 'w2_001',
            task_number: 2,
            question_type: 'essay',
            question_text: 'Some people think that all university students should study whatever they like. Others believe that they should only be allowed to study subjects that will be useful in the future, such as those related to science and technology. Discuss both these views and give your own opinion.',
            word_limit: 250,
            time_limit: 40,
            difficulty: 'medium'
        },
        {
            id: 'w2_002',
            task_number: 2,
            question_type: 'essay',
            question_text: 'In some countries, young people are encouraged to work or travel for a year between finishing high school and starting university studies. Discuss the advantages and disadvantages for young people who decide to do this.',
            word_limit: 250,
            time_limit: 40,
            difficulty: 'medium'
        }
    ],

    speaking: [
        // Part 1: Introduction and Interview (4-5 minutes)
        {
            id: 's1_001',
            part: 1,
            question_type: 'personal_info',
            question_text: 'Could you tell me your full name, please?',
            follow_up_questions: JSON.stringify([
                'What shall I call you?',
                'Can you show me your identification?'
            ]),
            difficulty: 'easy'
        },
        {
            id: 's1_002',
            part: 1,
            question_type: 'personal_info',
            question_text: 'Do you work or are you a student?',
            follow_up_questions: JSON.stringify([
                'What subject are you studying?',
                'Why did you choose this subject?',
                'What do you find most interesting about your studies?'
            ]),
            difficulty: 'easy'
        },
        {
            id: 's1_003',
            part: 1,
            question_type: 'personal_info',
            question_text: 'Let\'s talk about your hometown. Where is your hometown?',
            follow_up_questions: JSON.stringify([
                'What do you like about your hometown?',
                'Is there anything you dislike about it?',
                'Do you think you will continue to live there in the future?'
            ]),
            difficulty: 'easy'
        },

        // Part 2: Long Turn (3-4 minutes)
        {
            id: 's2_001',
            part: 2,
            question_type: 'long_turn',
            question_text: 'Describe a book that you enjoyed reading. You should say: what the book was about, when you read it, why you decided to read it, and explain why you enjoyed reading this book.',
            follow_up_questions: JSON.stringify([
                'Do you still have this book?',
                'Would you read it again?'
            ]),
            difficulty: 'medium'
        },
        {
            id: 's2_002',
            part: 2,
            question_type: 'long_turn',
            question_text: 'Describe a place you visited that was particularly memorable. You should say: where it was, when you visited, who you went with, and explain why it was memorable for you.',
            follow_up_questions: JSON.stringify([
                'Would you like to visit this place again?',
                'Would you recommend it to others?'
            ]),
            difficulty: 'medium'
        },

        // Part 3: Discussion (4-5 minutes)
        {
            id: 's3_001',
            part: 3,
            question_type: 'discussion',
            question_text: 'How important is reading in your country?',
            follow_up_questions: JSON.stringify([
                'Do you think people read less now than in the past?',
                'What are the benefits of reading books compared to watching TV?',
                'How do you think reading habits might change in the future?'
            ]),
            difficulty: 'hard'
        },
        {
            id: 's3_002',
            part: 3,
            question_type: 'discussion',
            question_text: 'What role does tourism play in your country\'s economy?',
            follow_up_questions: JSON.stringify([
                'What are the positive and negative effects of tourism?',
                'How can countries balance tourism development with environmental protection?',
                'Do you think virtual tourism could replace physical travel in the future?'
            ]),
            difficulty: 'hard'
        }
    ]
};

// 评分标准
const scoringCriteria = {
    listening: {
        // 40题对应的分数转换表
        scoreTable: {
            39: 9.0, 38: 8.5, 37: 8.5, 36: 8.0, 35: 8.0,
            34: 7.5, 33: 7.5, 32: 7.0, 31: 7.0, 30: 6.5,
            29: 6.5, 28: 6.0, 27: 6.0, 26: 5.5, 25: 5.5,
            24: 5.0, 23: 5.0, 22: 4.5, 21: 4.5, 20: 4.0,
            19: 4.0, 18: 3.5, 17: 3.5, 16: 3.0, 15: 3.0,
            14: 2.5, 13: 2.5, 12: 2.5, 11: 2.0, 10: 2.0
        }
    },
    reading: {
        academic: {
            39: 9.0, 38: 8.5, 37: 8.0, 36: 8.0, 35: 7.5,
            34: 7.5, 33: 7.0, 32: 7.0, 31: 6.5, 30: 6.5,
            29: 6.0, 28: 6.0, 27: 5.5, 26: 5.5, 25: 5.0,
            24: 5.0, 23: 4.5, 22: 4.5, 21: 4.0, 20: 4.0,
            19: 3.5, 18: 3.5, 17: 3.0, 16: 3.0, 15: 2.5
        }
    },
    writing: {
        criteria: {
            task_achievement: 'Task Achievement/Response',
            coherence_cohesion: 'Coherence and Cohesion',
            lexical_resource: 'Lexical Resource',
            grammar_accuracy: 'Grammatical Range and Accuracy'
        }
    },
    speaking: {
        criteria: {
            fluency_coherence: 'Fluency and Coherence',
            lexical_resource: 'Lexical Resource',
            grammar_accuracy: 'Grammatical Range and Accuracy',
            pronunciation: 'Pronunciation'
        }
    }
};

module.exports = { sampleQuestions, scoringCriteria };