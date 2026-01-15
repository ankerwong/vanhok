// AI Personal Statement Generator - Generates in ENGLISH
document.addEventListener('DOMContentLoaded', function() {
    const psForm = document.getElementById('psForm');
    const generatedResult = document.getElementById('generatedResult');
    const psContent = document.getElementById('psContent');
    const currentWordCount = document.getElementById('currentWordCount');
    const aiAnalysis = document.getElementById('aiAnalysis');
    
    const editBtn = document.getElementById('editBtn');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const regenerateBtn = document.getElementById('regenerateBtn');

    let currentFormData = null;

    // Form submission
    psForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('studentName').value,
            age: document.getElementById('studentAge').value,
            university: document.getElementById('targetUniversity').value,
            customUniversity: document.getElementById('customUniversity').value,
            major: document.getElementById('targetMajor').value,
            gpa: document.getElementById('gpa').value,
            awards: document.getElementById('awards').value,
            academicInterest: document.getElementById('academicInterest').value,
            traits: Array.from(document.querySelectorAll('input[name="traits"]:checked')).map(el => el.value),
            activities: document.getElementById('activities').value,
            hobbies: document.getElementById('hobbies').value,
            personalStory: document.getElementById('personalStory').value,
            wordCount: parseInt(document.getElementById('wordCount').value)
        };

        if (formData.customUniversity.trim()) {
            formData.finalUniversity = formData.customUniversity.trim();
        } else {
            formData.finalUniversity = formData.university;
        }

        currentFormData = formData;
        
        const ps = generatePersonalStatement(formData);
        psContent.innerHTML = ps;
        generatedResult.style.display = 'block';
        
        updateWordCount();
        generateAnalysis(formData);
        
        generatedResult.scrollIntoView({ behavior: 'smooth' });
    });

    // Generate Personal Statement in ENGLISH
    function generatePersonalStatement(data) {
        const opening = generateOpening(data);
        const academicBody = generateAcademicBody(data);
        const experienceBody = generateExperienceBody(data);
        const personalStoryPara = generatePersonalStoryParagraph(data);
        const futureGoals = generateFutureGoals(data);
        const conclusion = generateConclusion(data);

        let fullPS = `<p>${opening}</p>`;
        fullPS += `<p>${academicBody}</p>`;
        if (experienceBody) fullPS += `<p>${experienceBody}</p>`;
        if (personalStoryPara) fullPS += `<p>${personalStoryPara}</p>`;
        fullPS += `<p>${futureGoals}</p>`;
        fullPS += `<p>${conclusion}</p>`;

        return fullPS;
    }

    // Generate Opening - Multiple strategies in ENGLISH
    function generateOpening(data) {
        const strategies = ['twist', 'confession', 'scene', 'philosophical'];
        const strategy = strategies[Math.floor(Math.random() * strategies.length)];
        const majorName = getMajorName(data.major);
        const interest = data.academicInterest || `my passion for ${majorName}`;

        switch(strategy) {
            case 'twist':
                return `Many people think ${majorName} is merely a technical discipline, but to me, it represents something deeper—a way to understand how the world works and use knowledge to create positive change. ${interest.substring(0, 150)}... This is not just an academic interest; it's a career I hope to dedicate my life to.`;
            
            case 'confession':
                return `I must confess: before deciding to apply for ${majorName}, I went through a long exploration process. ${interest.substring(0, 120)}... It was this exploration that convinced me that ${majorName} is the field I truly want to pursue.`;
            
            case 'scene':
                return `${data.academicInterest ? data.academicInterest.substring(0, 150) : `I remember the afternoon when I first encountered ${majorName}—I was captivated by the depth and breadth of this field.`} From that moment, I began to systematically study the relevant knowledge, and each new discovery reinforced my conviction that this is the direction I want to pursue.`;
            
            case 'philosophical':
                return `In this rapidly changing era, what is the significance of ${majorName}? ${interest.substring(0, 120)}... This question has driven my learning and exploration. I believe that deeply understanding this field will not only help me achieve personal goals but also enable me to create value for society.`;
        }
    }

    // Generate Academic Body (80% academic content)
    function generateAcademicBody(data) {
        const majorName = getMajorName(data.major);
        let para = `Throughout my academic journey, I have systematically prepared for ${majorName}. `;
        
        if (data.gpa) {
            para += `My academic performance of ${data.gpa} reflects not only my diligence but also my rigorous approach to academic pursuits. `;
        }

        if (data.academicInterest) {
            para += `Particularly, ${data.academicInterest.substring(0, 200)}... This deep learning has enabled me to not only master foundational knowledge but also cultivate critical thinking and independent research capabilities. `;
        } else {
            para += `I have been particularly focused on cutting-edge developments in ${majorName}, continuously expanding my knowledge boundaries through academic papers and online courses. `;
        }

        if (data.awards) {
            para += `My achievements in ${data.awards} demonstrate my academic capabilities and motivate me to continue exploring deeper. `;
        }

        return para;
    }

    // Generate Experience Body (20% weight)
    function generateExperienceBody(data) {
        if (!data.activities && !data.hobbies) return '';

        let para = '';
        
        if (data.activities) {
            const traits = data.traits.slice(0, 2).map(t => translateTrait(t)).join(' and ');
            para += `Beyond academic learning, I have actively participated in practical activities. ${data.activities.substring(0, 250)}... These experiences have not only broadened my perspectives but also taught me essential qualities such as ${traits || 'perseverance and teamwork'}. `;
        }

        if (data.hobbies) {
            para += `In my spare time, I am passionate about ${data.hobbies}. These interests help me maintain work-life balance while cultivating creativity and sustained focus. `;
        }

        return para;
    }

    // Generate Personal Story Paragraph
    function generatePersonalStoryParagraph(data) {
        if (!data.personalStory) return '';

        const trait = data.traits[0] ? translateTrait(data.traits[0]) : 'perseverance';
        return `One experience profoundly influenced me: ${data.personalStory.substring(0, 300)}... This experience strengthened my determination to study ${getMajorName(data.major)} and taught me the importance of ${trait}.`;
    }

    // Generate Future Goals
    function generateFutureGoals(data) {
        const univName = getUniversityFullName(data.finalUniversity);
        const majorName = getMajorName(data.major);
        
        let para = `Choosing ${univName} is a decision I have made after careful consideration. The school's outstanding reputation in ${majorName}, `;
        para += `world-class faculty, and rich research resources all convince me that this is the ideal place to achieve my academic goals. `;
        para += `I aspire to deeply study core courses in ${majorName}, participate in cutting-edge research projects, `;
        para += `and exchange ideas with excellent scholars from around the world. I believe that my learning experience at ${univName} will lay a solid foundation for my future career development.`;

        return para;
    }

    // Generate Conclusion - Echo opening, demonstrate values
    function generateConclusion(data) {
        const coreValues = data.traits.slice(0, 3).map(t => translateTrait(t)).join(', ') || 'academic passion, critical thinking, and social responsibility';
        const majorName = getMajorName(data.major);
        
        let para = `Reflecting on my academic journey, I realize that ${majorName} is not just my academic choice but an expression of my values. `;
        para += `${coreValues}—these qualities will continue to guide me on my academic path. `;
        para += `I am ready to embrace the challenges of university, using knowledge and action to create positive impact on this world. `;
        para += `I believe that studying at ${getUniversityFullName(data.finalUniversity)} will be one of the most important journeys of my life.`;

        return para;
    }

    // Generate AI Analysis in Chinese (interface language)
    function generateAnalysis(data) {
        const structure = analyzeStructure(data);
        const values = analyzeValues(data);
        const suggestions = generateSuggestions(data);

        aiAnalysis.innerHTML = `
            <div class="analysis-section">
                <h5><i class="fas fa-layer-group"></i> 结构分析</h5>
                <p>${structure}</p>
            </div>
            <div class="analysis-section">
                <h5><i class="fas fa-gem"></i> 核心价值观</h5>
                <p>${values}</p>
            </div>
            <div class="analysis-section">
                <h5><i class="fas fa-lightbulb"></i> 改进建议</h5>
                <ul>
                    ${suggestions.map(s => `<li>${s}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    function analyzeStructure(data) {
        return `This personal statement follows a clear structure: opening introduces academic interest, main body follows the 80/20 principle (80% academic content, 20% extracurricular experience), then explains why ${getUniversityFullName(data.finalUniversity)} was chosen, and concludes with future outlook. The overall structure is reasonable and logically coherent.`;
    }

    function analyzeValues(data) {
        if (data.traits.length === 0) {
            return `Based on your description, this PS demonstrates passion for academic pursuit and a serious attitude toward the major.`;
        }
        
        const traitsEn = data.traits.map(t => translateTrait(t)).join(', ');
        return `This personal statement highlights the following core values: ${traitsEn}. These qualities are demonstrated through your academic experiences and practical activities, allowing admissions officers to understand your personal characteristics.`;
    }

    function generateSuggestions(data) {
        const suggestions = [];

        suggestions.push('<strong>Personalization:</strong> This is an AI-generated draft. Be sure to add more personal details, specific data, and genuine emotions to make it truly reflect your experiences and thoughts.');
        
        if (!data.academicInterest || data.academicInterest.length < 50) {
            suggestions.push('<strong>Academic Depth:</strong> Expand the "why this major" section with specific academic interests, theories, research directions, or social issues.');
        }

        if (!data.personalStory) {
            suggestions.push('<strong>Personal Story:</strong> Consider adding a turning point or key experience to make your PS more compelling and memorable.');
        }

        if (!data.awards && !data.activities) {
            suggestions.push('<strong>Experience Support:</strong> Add more specific activities, projects, or achievements to support your qualities and abilities with examples.');
        }

        suggestions.push('<strong>Specificity:</strong> Replace generic descriptions with concrete examples. Don\'t just say "I love science"—describe a specific moment that sparked this passion.');
        
        suggestions.push('<strong>Demonstrate Thinking:</strong> After describing experiences, always explain "what you learned" and "how it changed you," demonstrating reflection and growth.');
        
        suggestions.push(`<strong>School Fit:</strong> Research ${getUniversityFullName(data.finalUniversity)}'s unique programs and professors' research, mentioning 1-2 specific resources or courses in your PS.`);
        
        suggestions.push('<strong>Language Polish:</strong> Have native speakers or professional teachers proofread for grammar, ensuring authentic and powerful expression.');
        
        suggestions.push('<strong>Multiple Iterations:</strong> Good PS requires 10-20 revisions. After each revision, set it aside for a day before rereading—you\'ll often discover new improvements.');

        return suggestions;
    }

    // Helper Functions
    function getMajorName(major) {
        return major || 'this field';
    }

    function translateTrait(trait) {
        const traitMap = {
            '好奇心强': 'strong curiosity',
            '批判性思维': 'critical thinking',
            '坚韧不拔': 'perseverance',
            '领导能力': 'leadership',
            '团队合作': 'teamwork',
            '创造力': 'creativity',
            '同理心': 'empathy',
            '独立思考': 'independent thinking'
        };
        return traitMap[trait] || trait;
    }

    function getUniversityFullName(shortName) {
        const univMap = {
            'Oxford': 'University of Oxford',
            'Cambridge': 'University of Cambridge',
            'Imperial': 'Imperial College London',
            'LSE': 'London School of Economics',
            'UCL': 'University College London',
            'KCL': "King's College London",
            'Edinburgh': 'University of Edinburgh',
            'Manchester': 'University of Manchester',
            'Warwick': 'University of Warwick',
            'Bristol': 'University of Bristol',
            'Harvard': 'Harvard University',
            'MIT': 'Massachusetts Institute of Technology',
            'Stanford': 'Stanford University',
            'Yale': 'Yale University',
            'Princeton': 'Princeton University',
            'Columbia': 'Columbia University',
            'UChicago': 'University of Chicago',
            'Penn': 'University of Pennsylvania',
            'Cornell': 'Cornell University',
            'Duke': 'Duke University',
            'Northwestern': 'Northwestern University',
            'JHU': 'Johns Hopkins University',
            'Berkeley': 'UC Berkeley',
            'UCLA': 'UCLA',
            'HKU': 'The University of Hong Kong',
            'CUHK': 'The Chinese University of Hong Kong',
            'HKUST': 'Hong Kong University of Science and Technology',
            'CityU': 'City University of Hong Kong',
            'PolyU': 'Hong Kong Polytechnic University',
            'Toronto': 'University of Toronto',
            'UBC': 'University of British Columbia',
            'McGill': 'McGill University',
            'Waterloo': 'University of Waterloo',
            'Melbourne': 'University of Melbourne',
            'Sydney': 'University of Sydney',
            'ANU': 'Australian National University',
            'UNSW': 'University of New South Wales',
            'Monash': 'Monash University',
            'NUS': 'National University of Singapore',
            'NTU': 'Nanyang Technological University'
        };
        return univMap[shortName] || shortName;
    }

    function updateWordCount() {
        const text = psContent.innerText || psContent.textContent;
        const words = text.trim().split(/\s+/).length;
        currentWordCount.textContent = words;
    }

    // Edit Button
    editBtn.addEventListener('click', function() {
        const isEditing = psContent.getAttribute('contenteditable') === 'true';
        
        if (isEditing) {
            psContent.setAttribute('contenteditable', 'false');
            this.innerHTML = '<i class="fas fa-edit"></i> 编辑';
        } else {
            psContent.setAttribute('contenteditable', 'true');
            psContent.focus();
            this.innerHTML = '<i class="fas fa-save"></i> 保存';
            
            psContent.addEventListener('input', updateWordCount);
        }
    });

    // Copy Button
    copyBtn.addEventListener('click', function() {
        const text = psContent.innerText || psContent.textContent;
        
        navigator.clipboard.writeText(text).then(() => {
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> 已复制';
            this.style.background = '#10b981';
            
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.style.background = '';
            }, 2000);
        }).catch(err => {
            alert('复制失败,请手动复制');
        });
    });

    // Download Button
    downloadBtn.addEventListener('click', function() {
        const text = psContent.innerText || psContent.textContent;
        const filename = `PersonalStatement_${currentFormData.name}_${currentFormData.finalUniversity}.txt`;
        
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // Regenerate Button
    regenerateBtn.addEventListener('click', function() {
        if (currentFormData) {
            const ps = generatePersonalStatement(currentFormData);
            psContent.innerHTML = ps;
            updateWordCount();
            generateAnalysis(currentFormData);
            
            generatedResult.scrollIntoView({ behavior: 'smooth' });
        }
    });
});