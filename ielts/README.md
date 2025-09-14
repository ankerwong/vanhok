# Vanhok IELTS Mock Test Platform

A comprehensive IELTS (International English Language Testing System) mock test platform designed to provide authentic exam simulation with AI-powered assessment and instant scoring.

## 🎯 Project Overview

This platform offers a complete IELTS testing experience, faithfully replicating the structure and timing of the actual IELTS exam. Built for Vanhok Education Technology, it combines modern web technologies with advanced AI assessment tools to provide students with accurate practice and feedback.

## ✨ Key Features

### 🎭 Complete IELTS Experience
- **Full Mock Tests**: Complete 2.5-hour IELTS simulation
- **Section Practice**: Individual section practice (Listening, Reading, Writing, Speaking)
- **Authentic Timing**: Real exam time constraints with countdown timers
- **Question Navigator**: Easy navigation between questions with progress tracking

### 🧠 AI-Powered Assessment
- **Advanced Writing Analysis**: Detailed evaluation across all IELTS writing criteria
  - Task Achievement/Response
  - Coherence and Cohesion
  - Lexical Resource
  - Grammatical Range and Accuracy
- **Instant Feedback**: Immediate scoring and detailed improvement suggestions
- **Sophisticated Algorithms**: Vocabulary analysis, grammar checking, and coherence evaluation

### 📊 Comprehensive Scoring
- **Official IELTS Band System**: Authentic 0-9 band scoring
- **Detailed Breakdowns**: Individual scores for each section
- **Performance Analytics**: Progress tracking and improvement insights
- **Score Conversion**: Accurate conversion from raw scores to IELTS bands

### 🎨 Professional Design
- **Vanhok Branding**: Consistent brand identity throughout
- **Responsive Interface**: Optimized for desktop, tablet, and mobile
- **Modern UI/UX**: Clean, intuitive design focused on user experience
- **Accessibility**: Designed with accessibility best practices

## 🏗️ Technical Architecture

### Frontend
- **HTML5/CSS3/JavaScript**: Modern vanilla web technologies
- **Responsive Design**: Mobile-first responsive layout
- **Real-time Interface**: Dynamic test interface with live updates
- **Progressive Enhancement**: Graceful degradation across devices

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **SQLite**: Lightweight, embedded database
- **RESTful API**: Clean API design for data exchange
- **PM2**: Process management for production deployment

### AI Assessment Engine
- **Natural Language Processing**: Advanced text analysis
- **Machine Learning Algorithms**: Pattern recognition for scoring
- **Multi-criteria Evaluation**: Comprehensive assessment framework
- **Real-time Processing**: Instant feedback generation

## 📁 Project Structure

```
ielts/
├── frontend/                 # Frontend assets
│   ├── index.html           # Main landing page
│   ├── css/
│   │   ├── styles.css       # Main stylesheet
│   │   └── test-interface.css # Test interface styles
│   ├── js/
│   │   └── main.js          # Main JavaScript application
│   ├── images/              # Image assets
│   └── audio/               # Audio files for listening tests
├── backend/                 # Backend application
│   ├── server.js            # Express server
│   ├── models/
│   │   └── database.js      # Database management
│   ├── utils/
│   │   └── aiGrading.js     # AI assessment engine
│   └── package.json         # Backend dependencies
├── data/                    # Test data
│   └── questions/
│       └── sample_questions.js # Question bank
├── logs/                    # Application logs
├── ecosystem.config.js      # PM2 configuration
└── README.md               # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js 14.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ankerwong/vanhok.git
   cd vanhok/ielts
   ```

2. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Start the server**
   ```bash
   # Development mode
   npm start
   
   # Production mode with PM2
   npm run pm2:start
   ```

4. **Access the platform**
   - Open your browser to `http://localhost:3001`
   - The IELTS platform is available at the root path

### Development Setup

For development with auto-restart:
```bash
cd backend
npm install -g nodemon
nodemon server.js
```

## 📝 IELTS Test Sections

### 🎧 Listening (30 minutes)
- **Section 1**: Everyday conversation (e.g., booking accommodation)
- **Section 2**: Monologue in everyday context (e.g., museum tour)
- **Section 3**: Academic conversation (e.g., student discussion)
- **Section 4**: Academic lecture or talk

**Question Types**: Fill-in-the-blanks, Multiple choice, Matching, Map labeling

### 📖 Reading (60 minutes)
- **Passage 1**: General interest topic
- **Passage 2**: Work-related topic
- **Passage 3**: Academic text

**Question Types**: True/False/Not Given, Multiple choice, Matching, Summary completion

### ✍️ Writing (60 minutes)
- **Task 1** (20 minutes, 150+ words): Chart/graph/diagram description
- **Task 2** (40 minutes, 250+ words): Essay on given topic

**Assessment Criteria**: Task Achievement, Coherence & Cohesion, Lexical Resource, Grammar & Accuracy

### 🗣️ Speaking (11-14 minutes)
- **Part 1**: Introduction and familiar topics
- **Part 2**: Individual long turn (cue card)
- **Part 3**: Two-way discussion

## 🎯 AI Assessment Features

### Writing Analysis
- **Vocabulary Assessment**: Range, accuracy, and appropriateness
- **Grammar Evaluation**: Complexity, accuracy, and variety
- **Coherence Analysis**: Logical flow and organization
- **Task Response**: Completeness and relevance

### Scoring Algorithm
- **Multi-dimensional Analysis**: Evaluates multiple linguistic features
- **Comparative Scoring**: Benchmarked against IELTS standards
- **Instant Feedback**: Real-time assessment with improvement suggestions
- **Detailed Reporting**: Comprehensive breakdown of strengths and weaknesses

## 🌐 API Endpoints

### Test Management
- `POST /api/test/session` - Create new test session
- `GET /api/test/:section` - Fetch questions for specific section
- `POST /api/test/submit-answer` - Submit answer for evaluation
- `POST /api/test/complete` - Complete test and calculate scores

### Assessment Services
- `POST /api/writing/grade` - AI writing assessment
- `GET /api/test/results/:sessionId` - Retrieve test results

### System
- `GET /health` - Health check endpoint

## 📊 Database Schema

### Core Tables
- **users**: User accounts and profiles
- **test_sessions**: Test instances and overall scores
- **listening_questions**: Listening section question bank
- **reading_questions**: Reading section question bank
- **writing_questions**: Writing task prompts
- **speaking_questions**: Speaking section prompts
- **user_answers**: Individual answer records
- **writing_feedback**: AI assessment results

## 🔧 Configuration

### Environment Variables
```bash
NODE_ENV=production
PORT=3001
```

### PM2 Configuration
```javascript
{
  name: 'vanhok-ielts-server',
  script: './backend/server.js',
  instances: 1,
  autorestart: true,
  max_memory_restart: '1G'
}
```

## 📱 Responsive Design

- **Desktop**: Full-featured interface with side navigation
- **Tablet**: Optimized layout with collapsible panels
- **Mobile**: Streamlined interface for touch interaction
- **Progressive Enhancement**: Core functionality works across all devices

## 🔒 Security Features

- **Input Validation**: Comprehensive server-side validation
- **SQL Injection Protection**: Parameterized queries
- **XSS Prevention**: Input sanitization and CSP headers
- **Rate Limiting**: API endpoint protection
- **Secure Headers**: Helmet.js security middleware

## 🚀 Production Deployment

### Using PM2
```bash
# Start application
pm2 start ecosystem.config.js

# Monitor processes
pm2 status
pm2 logs

# Restart application
pm2 restart vanhok-ielts-server
```

### Performance Optimization
- **Caching**: Strategic caching for static assets
- **Compression**: Gzip compression for responses
- **Database Optimization**: Indexed queries and connection pooling
- **Memory Management**: Efficient memory usage patterns

## 📈 Performance Metrics

- **Load Time**: < 3 seconds initial load
- **Response Time**: < 500ms for API calls
- **Concurrent Users**: Supports 100+ simultaneous test sessions
- **Uptime**: 99.9% availability target

## 🤝 Contributing

This is a proprietary project for Vanhok Education Technology. For internal development:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

© 2024 Vanhok Education Technology. All rights reserved.

This software is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

## 📞 Support

For technical support or questions:
- **Email**: tech@vanhok.com
- **Documentation**: Internal wiki
- **Issues**: GitHub Issues (internal team only)

## 🏆 Acknowledgments

- **IELTS Content**: Based on official IELTS test formats and criteria
- **Design System**: Vanhok brand guidelines and UI standards
- **Assessment Framework**: Research-based evaluation methodologies
- **Testing**: Comprehensive QA and user acceptance testing

---

**Built with ❤️ by the Vanhok Development Team**