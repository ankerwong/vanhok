// AI批改工具 - 模拟AI写作和口语评分

class AIGradingService {
    constructor() {
        this.writingCriteria = {
            task_achievement: {
                name: 'Task Achievement/Response',
                maxScore: 9,
                weightage: 0.25
            },
            coherence_cohesion: {
                name: 'Coherence and Cohesion',
                maxScore: 9,
                weightage: 0.25
            },
            lexical_resource: {
                name: 'Lexical Resource',
                maxScore: 9,
                weightage: 0.25
            },
            grammar_accuracy: {
                name: 'Grammatical Range and Accuracy',
                maxScore: 9,
                weightage: 0.25
            }
        };

        this.speakingCriteria = {
            fluency_coherence: {
                name: 'Fluency and Coherence',
                maxScore: 9,
                weightage: 0.25
            },
            lexical_resource: {
                name: 'Lexical Resource',
                maxScore: 9,
                weightage: 0.25
            },
            grammar_accuracy: {
                name: 'Grammatical Range and Accuracy',
                maxScore: 9,
                weightage: 0.25
            },
            pronunciation: {
                name: 'Pronunciation',
                maxScore: 9,
                weightage: 0.25
            }
        };
    }

    /**
     * 批改写作任务
     * @param {string} essay - 用户写作内容
     * @param {number} taskNumber - 任务号 (1 或 2)
     * @param {string} questionPrompt - 题目要求
     * @returns {Object} 评分结果和反馈
     */
    async gradeWritingTask(essay, taskNumber, questionPrompt) {
        // 模拟AI批改逻辑 - 实际应用中会调用真实的AI服务
        const analysis = this.analyzeWriting(essay, taskNumber);
        const scores = this.calculateWritingScores(analysis);
        const feedback = this.generateWritingFeedback(analysis, scores, taskNumber);

        return {
            scores,
            feedback,
            analysis,
            overallBand: this.calculateOverallBand(scores)
        };
    }

    /**
     * 分析写作内容
     */
    analyzeWriting(essay, taskNumber) {
        const words = this.countWords(essay);
        const sentences = this.countSentences(essay);
        const paragraphs = this.countParagraphs(essay);
        
        // 词汇分析
        const vocabulary = this.analyzeVocabulary(essay);
        
        // 语法分析
        const grammar = this.analyzeGrammar(essay);
        
        // 连贯性分析
        const coherence = this.analyzeCoherence(essay);
        
        // 任务完成度分析
        const taskResponse = this.analyzeTaskResponse(essay, taskNumber);

        return {
            wordCount: words,
            sentenceCount: sentences,
            paragraphCount: paragraphs,
            vocabulary,
            grammar,
            coherence,
            taskResponse,
            averageWordsPerSentence: Math.round(words / sentences),
            requiredWords: taskNumber === 1 ? 150 : 250
        };
    }

    countWords(text) {
        return text.trim().split(/\s+/).filter(word => word.length > 0).length;
    }

    countSentences(text) {
        const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
        return Math.max(sentences.length, 1);
    }

    countParagraphs(text) {
        const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
        return Math.max(paragraphs.length, 1);
    }

    analyzeVocabulary(essay) {
        const words = essay.toLowerCase().match(/\b\w+\b/g) || [];
        const uniqueWords = new Set(words);
        const vocabularyRange = uniqueWords.size / words.length;
        
        // 检查高级词汇使用
        const advancedWords = this.detectAdvancedVocabulary(essay);
        
        // 检查词汇重复
        const repetition = this.analyzeWordRepetition(words);

        return {
            totalWords: words.length,
            uniqueWords: uniqueWords.size,
            vocabularyRange: vocabularyRange,
            advancedWords: advancedWords,
            repetitionLevel: repetition
        };
    }

    detectAdvancedVocabulary(essay) {
        // 简化的高级词汇检测
        const advancedWordsList = [
            'consequently', 'furthermore', 'moreover', 'nevertheless', 'nonetheless',
            'substantial', 'significant', 'considerable', 'comprehensive', 'fundamental',
            'facilitate', 'demonstrate', 'illustrate', 'emphasize', 'analyze'
        ];
        
        const foundAdvanced = [];
        const lowerEssay = essay.toLowerCase();
        
        advancedWordsList.forEach(word => {
            if (lowerEssay.includes(word)) {
                foundAdvanced.push(word);
            }
        });
        
        return foundAdvanced;
    }

    analyzeWordRepetition(words) {
        const wordCount = {};
        words.forEach(word => {
            if (word.length > 3) { // 只统计长度大于3的单词
                wordCount[word] = (wordCount[word] || 0) + 1;
            }
        });
        
        const repeatedWords = Object.entries(wordCount)
            .filter(([word, count]) => count > 2)
            .length;
        
        return repeatedWords / Object.keys(wordCount).length;
    }

    analyzeGrammar(essay) {
        // 简化的语法分析
        const sentences = essay.split(/[.!?]+/);
        let complexSentences = 0;
        let grammaticalVariety = 0;
        
        sentences.forEach(sentence => {
            if (sentence.includes(',') || sentence.includes(';')) {
                complexSentences++;
            }
        });
        
        // 检查语法结构多样性
        const structures = this.detectGrammarStructures(essay);
        grammaticalVariety = structures.length;
        
        return {
            complexSentenceRatio: complexSentences / sentences.length,
            grammaticalVariety: grammaticalVariety,
            structures: structures
        };
    }

    detectGrammarStructures(essay) {
        const structures = [];
        const lowerEssay = essay.toLowerCase();
        
        // 检测各种语法结构
        if (lowerEssay.includes(' which ') || lowerEssay.includes(' that ')) {
            structures.push('Relative clauses');
        }
        if (lowerEssay.includes(' if ') || lowerEssay.includes(' unless ')) {
            structures.push('Conditional sentences');
        }
        if (lowerEssay.includes(' although ') || lowerEssay.includes(' however ')) {
            structures.push('Complex conjunctions');
        }
        if (lowerEssay.includes(' having ') || lowerEssay.includes('ing ')) {
            structures.push('Participle constructions');
        }
        
        return structures;
    }

    analyzeCoherence(essay) {
        // 检测连接词和过渡词
        const cohesiveDevices = [
            'firstly', 'secondly', 'furthermore', 'moreover', 'however',
            'therefore', 'consequently', 'in conclusion', 'to summarize',
            'on the other hand', 'in contrast', 'similarly', 'for example'
        ];
        
        let devicesUsed = 0;
        const lowerEssay = essay.toLowerCase();
        
        cohesiveDevices.forEach(device => {
            if (lowerEssay.includes(device)) {
                devicesUsed++;
            }
        });
        
        return {
            cohesiveDevicesCount: devicesUsed,
            cohesiveDevicesVariety: devicesUsed / cohesiveDevices.length,
            paragraphStructure: this.analyzeParagraphStructure(essay)
        };
    }

    analyzeParagraphStructure(essay) {
        const paragraphs = essay.split(/\n\s*\n/);
        const avgParagraphLength = paragraphs.reduce((sum, p) => sum + this.countWords(p), 0) / paragraphs.length;
        
        return {
            paragraphCount: paragraphs.length,
            averageParagraphLength: Math.round(avgParagraphLength),
            hasIntroduction: paragraphs.length > 0,
            hasConclusion: paragraphs.length > 2
        };
    }

    analyzeTaskResponse(essay, taskNumber) {
        const wordCount = this.countWords(essay);
        const requiredWords = taskNumber === 1 ? 150 : 250;
        
        // 任务完成度基本评估
        const wordCountAdequacy = Math.min(wordCount / requiredWords, 1.2); // 最高120%
        
        // 检查是否回答了问题的各个部分（简化版）
        let taskCompletion = 0.7; // 基础分数
        
        if (taskNumber === 1) {
            // Task 1: 图表描述
            const hasOverview = essay.toLowerCase().includes('overall') || 
                               essay.toLowerCase().includes('in summary');
            const hasComparison = essay.includes('%') || essay.includes('than');
            
            if (hasOverview) taskCompletion += 0.15;
            if (hasComparison) taskCompletion += 0.15;
        } else {
            // Task 2: 议论文
            const hasPosition = essay.toLowerCase().includes('i believe') || 
                               essay.toLowerCase().includes('in my opinion');
            const hasExamples = essay.toLowerCase().includes('for example') || 
                               essay.toLowerCase().includes('for instance');
            
            if (hasPosition) taskCompletion += 0.15;
            if (hasExamples) taskCompletion += 0.15;
        }
        
        return {
            wordCountAdequacy: wordCountAdequacy,
            taskCompletion: Math.min(taskCompletion, 1.0)
        };
    }

    calculateWritingScores(analysis) {
        const scores = {};
        
        // Task Achievement/Response
        let taskScore = 5.0; // 基础分数
        if (analysis.taskResponse.wordCountAdequacy >= 0.8) taskScore += 1.0;
        if (analysis.taskResponse.taskCompletion >= 0.8) taskScore += 1.5;
        if (analysis.paragraphs > 2) taskScore += 0.5;
        scores.task_achievement = Math.min(Math.max(taskScore, 1.0), 9.0);
        
        // Coherence and Cohesion
        let coherenceScore = 5.0;
        if (analysis.coherence.cohesiveDevicesCount >= 3) coherenceScore += 1.0;
        if (analysis.coherence.paragraphStructure.paragraphCount >= 3) coherenceScore += 1.0;
        if (analysis.coherence.cohesiveDevicesVariety >= 0.3) coherenceScore += 1.0;
        scores.coherence_cohesion = Math.min(Math.max(coherenceScore, 1.0), 9.0);
        
        // Lexical Resource
        let lexicalScore = 5.0;
        if (analysis.vocabulary.vocabularyRange >= 0.6) lexicalScore += 1.0;
        if (analysis.vocabulary.advancedWords.length >= 3) lexicalScore += 1.5;
        if (analysis.vocabulary.repetitionLevel <= 0.2) lexicalScore += 0.5;
        scores.lexical_resource = Math.min(Math.max(lexicalScore, 1.0), 9.0);
        
        // Grammatical Range and Accuracy
        let grammarScore = 5.0;
        if (analysis.grammar.complexSentenceRatio >= 0.3) grammarScore += 1.0;
        if (analysis.grammar.grammaticalVariety >= 2) grammarScore += 1.5;
        if (analysis.averageWordsPerSentence >= 12 && analysis.averageWordsPerSentence <= 25) {
            grammarScore += 0.5;
        }
        scores.grammar_accuracy = Math.min(Math.max(grammarScore, 1.0), 9.0);
        
        return scores;
    }

    calculateOverallBand(scores) {
        const average = (scores.task_achievement + scores.coherence_cohesion + 
                        scores.lexical_resource + scores.grammar_accuracy) / 4;
        
        // 四舍五入到最近的0.5
        return Math.round(average * 2) / 2;
    }

    generateWritingFeedback(analysis, scores, taskNumber) {
        const feedback = {
            overall: this.generateOverallFeedback(scores),
            task_achievement: this.generateTaskFeedback(analysis, scores, taskNumber),
            coherence_cohesion: this.generateCoherenceFeedback(analysis, scores),
            lexical_resource: this.generateLexicalFeedback(analysis, scores),
            grammar_accuracy: this.generateGrammarFeedback(analysis, scores),
            suggestions: this.generateSuggestions(analysis, scores)
        };
        
        return feedback;
    }

    generateOverallFeedback(scores) {
        const overallBand = this.calculateOverallBand(scores);
        let feedback = `Your overall IELTS Writing band score is ${overallBand}.`;
        
        if (overallBand >= 7.0) {
            feedback += " This is a good score that demonstrates competent writing skills.";
        } else if (overallBand >= 6.0) {
            feedback += " This shows competent writing with some areas for improvement.";
        } else {
            feedback += " There are several areas that need significant improvement.";
        }
        
        return feedback;
    }

    generateTaskFeedback(analysis, scores, taskNumber) {
        let feedback = "";
        
        if (analysis.wordCount < analysis.requiredWords) {
            feedback += `Your essay is ${analysis.requiredWords - analysis.wordCount} words short of the minimum requirement. `;
        }
        
        if (taskNumber === 1) {
            feedback += "For Task 1, ensure you provide a clear overview of the main trends and make relevant comparisons. ";
        } else {
            feedback += "For Task 2, make sure you clearly state your position and support it with relevant examples. ";
        }
        
        return feedback;
    }

    generateCoherenceFeedback(analysis, scores) {
        let feedback = "";
        
        if (analysis.coherence.cohesiveDevicesCount < 3) {
            feedback += "Try to use more linking words and phrases to connect your ideas. ";
        }
        
        if (analysis.coherence.paragraphStructure.paragraphCount < 4) {
            feedback += "Consider organizing your essay into more distinct paragraphs (introduction, body paragraphs, conclusion). ";
        }
        
        return feedback || "Good use of cohesive devices and paragraph structure.";
    }

    generateLexicalFeedback(analysis, scores) {
        let feedback = "";
        
        if (analysis.vocabulary.advancedWords.length < 3) {
            feedback += "Try to incorporate more sophisticated vocabulary to demonstrate lexical range. ";
        }
        
        if (analysis.vocabulary.repetitionLevel > 0.3) {
            feedback += "Avoid repeating the same words too frequently; use synonyms for variety. ";
        }
        
        return feedback || "Good vocabulary range with appropriate word choice.";
    }

    generateGrammarFeedback(analysis, scores) {
        let feedback = "";
        
        if (analysis.grammar.complexSentenceRatio < 0.2) {
            feedback += "Include more complex sentence structures to show grammatical range. ";
        }
        
        if (analysis.averageWordsPerSentence < 10) {
            feedback += "Your sentences are quite short; try combining ideas for more sophisticated expression. ";
        }
        
        return feedback || "Good grammatical range and generally accurate usage.";
    }

    generateSuggestions(analysis, scores) {
        const suggestions = [];
        
        if (scores.task_achievement < 6.5) {
            suggestions.push("Focus on fully addressing all parts of the task");
        }
        
        if (scores.coherence_cohesion < 6.5) {
            suggestions.push("Use more varied linking words and improve paragraph organization");
        }
        
        if (scores.lexical_resource < 6.5) {
            suggestions.push("Expand your vocabulary and use more precise word choices");
        }
        
        if (scores.grammar_accuracy < 6.5) {
            suggestions.push("Practice complex sentence structures and check for grammatical errors");
        }
        
        return suggestions;
    }
}

module.exports = AIGradingService;