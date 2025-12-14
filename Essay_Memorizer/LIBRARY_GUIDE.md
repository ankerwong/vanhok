# 📚 Essay Library Usage Guide

## HKDSE Essay Memorizer - Multi-Essay System

**Version**: 1.1  
**Last Updated**: December 14, 2024

---

## 🎯 System Overview

The system now consists of:
- **Main Homepage** (`index.html`) - Essay library with grid layout
- **Individual Essay Pages** (`essay-001.html`, `essay-002.html`, etc.)
- Each essay is an **independent website** with full functionality

---

## 📁 File Structure

```
HKDSE-Essay-Memorizer/
│
├── index.html                    # Main homepage (Essay Library)
├── essay-001.html                # Essay #1: Competition Education
├── essay-002.html                # Essay #2: (To be added)
├── essay-003.html                # Essay #3: (To be added)
│
├── css/
│   ├── home.css                  # Homepage styles
│   ├── style.css                 # Essay page styles
│   └── ...
│
├── js/
│   ├── data.js                   # Essay #1 data
│   ├── main.js                   # Essay page logic
│   └── ...
│
└── README.md
```

---

## 🚀 How to Use

### For Students

1. **Open** `index.html` in your browser
2. **Browse** the essay library
3. **Click** on an essay card to start learning
4. **Complete** the three-stage practice
5. **Click Home** button to return to library

### For Instructors

#### Adding a New Essay

**Step 1: Duplicate Files**
```bash
# Copy essay-001.html to create new essay
cp essay-001.html essay-002.html

# Copy data file
cp js/data.js js/data-002.js
```

**Step 2: Update Essay Page**

Edit `essay-002.html`:
```html
<!-- Change the data script reference -->
<script src="js/data-002.js"></script>
```

**Step 3: Update Data File**

Edit `js/data-002.js`:
```javascript
const essayData = {
    title: "Your New Essay Title",
    paragraphs: [
        // Your paragraph data
    ],
    sentences: [
        // Your sentence data with SVO markup
    ]
};
```

**Step 4: Add to Homepage**

Edit `index.html`, add a new card in the `essay-grid`:

```html
<!-- Essay Card 2 -->
<div class="essay-card">
    <div class="essay-badge">Essay #002</div>
    <div class="essay-icon">
        <i class="fas fa-leaf"></i>
    </div>
    <h3 class="essay-title">Your Essay Title</h3>
    <p class="essay-subtitle">Your essay subtitle</p>
    <div class="essay-meta">
        <span class="meta-item">
            <i class="fas fa-paragraph"></i>
            5 Paragraphs
        </span>
        <span class="meta-item">
            <i class="fas fa-align-left"></i>
            28 Sentences
        </span>
        <span class="meta-item">
            <i class="fas fa-book"></i>
            ~480 Words
        </span>
    </div>
    <div class="essay-topics">
        <span class="topic-tag">Environment</span>
        <span class="topic-tag">Sustainability</span>
    </div>
    <a href="essay-002.html" class="essay-btn">
        <i class="fas fa-arrow-right"></i>
        Start Learning
    </a>
</div>
```

**Step 5: Update Coming Soon Card**

Remove the "coming-soon" class and overlay:
```html
<!-- Before -->
<div class="essay-card coming-soon">
    ...
    <div class="coming-soon-overlay">
        <i class="fas fa-lock"></i>
        <p>Coming Soon</p>
    </div>
</div>

<!-- After -->
<div class="essay-card">
    ...
    <!-- Remove coming-soon-overlay div -->
</div>
```

---

## 🎨 Customization Guide

### Change Essay Icon

Available Font Awesome icons:
```html
<i class="fas fa-trophy"></i>        <!-- Competition -->
<i class="fas fa-leaf"></i>          <!-- Environment -->
<i class="fas fa-laptop"></i>        <!-- Technology -->
<i class="fas fa-users"></i>         <!-- Social -->
<i class="fas fa-heartbeat"></i>     <!-- Health -->
<i class="fas fa-globe-americas"></i> <!-- Global -->
<i class="fas fa-book-open"></i>     <!-- Education -->
<i class="fas fa-lightbulb"></i>     <!-- Innovation -->
```

### Change Topic Tags

Modify the tags to match your essay theme:
```html
<div class="essay-topics">
    <span class="topic-tag">Your Topic 1</span>
    <span class="topic-tag">Your Topic 2</span>
    <span class="topic-tag">Your Topic 3</span>
</div>
```

### Update Badge Number

```html
<div class="essay-badge">Essay #002</div>
```

---

## 📊 Homepage Features

### Essay Card Components

1. **Badge** - Essay number identifier
2. **Icon** - Visual category indicator
3. **Title** - Main essay title
4. **Subtitle** - Detailed description
5. **Meta Info** - Paragraphs, sentences, word count
6. **Topic Tags** - Thematic categories
7. **Action Button** - Link to essay page

### Coming Soon Cards

Pre-populated cards show planned essays. Simply:
1. Create the essay page
2. Remove `coming-soon` class
3. Remove overlay div
4. Update href link

---

## 🔧 Data Structure Template

### Essay Data Format

```javascript
const essayData = {
    title: "Essay Title",
    
    paragraphs: [
        {
            type: "Introduction",
            text: "Full paragraph text...",
            topicSentence: "Topic Sentence: Main idea..."
        },
        {
            type: "Body Paragraph 1",
            text: "Full paragraph text...",
            topicSentence: "Topic Sentence: Main idea..."
        }
        // ... more paragraphs
    ],
    
    sentences: [
        {
            id: 1,
            original: "The original sentence.",
            svo: {
                subject: "subject",
                verb: "verb",
                object: "object"
            },
            grammar: "HTML with <span class='subject'>SVO</span> markup",
            vocabulary: [
                {
                    word: "keyword",
                    synonyms: "synonym1, synonym2, synonym3"
                }
            ]
        }
        // ... more sentences
    ]
};
```

---

## 🎯 Quick Reference

### Homepage URL
```
index.html
```

### Essay URLs
```
essay-001.html  # Competition Education
essay-002.html  # Your next essay
essay-003.html  # Your third essay
...
```

### Navigation Flow
```
Homepage → Essay Page → Study → Home Button → Homepage
```

---

## 🌟 Best Practices

### For Instructors

1. **Consistent Naming**
   - Use `essay-###.html` format (001, 002, 003...)
   - Use `data-###.js` for data files

2. **Quality Control**
   - Verify all SVO markup
   - Check synonym accuracy
   - Test blur effect in Stage 3

3. **Student Experience**
   - Keep essay length consistent (~30-35 sentences)
   - Choose clear, relevant topics
   - Provide variety in themes

4. **Maintenance**
   - Update homepage immediately when adding essays
   - Keep "Coming Soon" section active
   - Document essay difficulty levels

### For Students

1. **Progressive Learning**
   - Start with Essay #001
   - Complete all three stages
   - Return home for next essay

2. **Track Progress**
   - Note completion date
   - Review difficult sentences
   - Practice regularly

---

## 📝 Adding Essays Checklist

When adding a new essay, ensure:

- [ ] Essay HTML file created (`essay-###.html`)
- [ ] Data file created (`js/data-###.js`)
- [ ] Data file linked in essay HTML
- [ ] Homepage card added/updated
- [ ] Essay metadata correct (paragraphs, sentences, words)
- [ ] Topic tags relevant
- [ ] Icon appropriate
- [ ] Link tested (clicks to correct page)
- [ ] Home button works
- [ ] All three stages functional

---

## 🐛 Troubleshooting

### Essay doesn't load
- Check data file path in `<script src="...">`
- Verify data file exists
- Check JavaScript console for errors

### Home button doesn't work
- Verify `href="index.html"` is correct
- Check relative path (should be in same directory)

### Blur effect not working
- Ensure `grammar` field has proper HTML markup
- Check SVO spans have correct classes
- Verify CSS is loaded

---

## 🔮 Future Enhancements

Possible additions:
- Search functionality
- Filter by topic/difficulty
- Completion tracking (localStorage)
- Export progress as PDF
- Dark mode toggle
- Audio pronunciation

---

## 📞 Support

**Vanhok Academy**  
Academic Director: Anker Wong  
System: HKDSE Essay Memorizer  
Version: 1.1

---

## 🎉 Quick Start Summary

### Adding Your Second Essay

1. **Copy** essay-001.html → essay-002.html
2. **Copy** js/data.js → js/data-002.js
3. **Edit** essay-002.html: Change script to `data-002.js`
4. **Edit** js/data-002.js: Replace with new essay content
5. **Edit** index.html: Update Essay #002 card
6. **Test**: Open index.html → Click Essay #002 → Verify all works
7. **Done!** ✨

---

**Happy Teaching! 🎓📚**

*Last updated: December 14, 2024*
