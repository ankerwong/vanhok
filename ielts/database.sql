-- Vanhok IELTS Platform Database Schema
-- For Supabase PostgreSQL Database

-- Enable Row Level Security
ALTER DATABASE postgres SET timezone TO 'UTC';

-- Create users table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    -- Test statistics
    total_tests INTEGER DEFAULT 0,
    best_overall_score DECIMAL(3,1) DEFAULT 0,
    best_listening_score DECIMAL(3,1) DEFAULT 0,
    best_reading_score DECIMAL(3,1) DEFAULT 0,
    best_writing_score DECIMAL(3,1) DEFAULT 0,
    best_speaking_score DECIMAL(3,1) DEFAULT 0,
    -- Study progress
    study_days INTEGER DEFAULT 0,
    total_questions_answered INTEGER DEFAULT 0,
    average_accuracy DECIMAL(5,2) DEFAULT 0,
    last_login TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create test sessions table
CREATE TABLE IF NOT EXISTS public.test_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    test_type TEXT NOT NULL CHECK (test_type IN ('full', 'listening', 'reading', 'writing', 'speaking')),
    status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    -- Section scores
    listening_score DECIMAL(3,1),
    reading_score DECIMAL(3,1),
    writing_score DECIMAL(3,1),
    speaking_score DECIMAL(3,1),
    overall_score DECIMAL(3,1),
    -- Section details
    listening_correct INTEGER,
    listening_total INTEGER,
    reading_correct INTEGER,
    reading_total INTEGER,
    writing_task1_score DECIMAL(3,1),
    writing_task2_score DECIMAL(3,1),
    -- Additional metadata
    time_spent INTEGER, -- in seconds
    device_info JSONB,
    browser_info TEXT
);

-- Create listening questions table
CREATE TABLE IF NOT EXISTS public.listening_questions (
    id TEXT PRIMARY KEY,
    section INTEGER NOT NULL CHECK (section BETWEEN 1 AND 4),
    question_number INTEGER NOT NULL,
    question_type TEXT NOT NULL CHECK (question_type IN (
        'fill_blank', 'multiple_choice', 'matching', 'map_labeling', 'form_completion'
    )),
    question_text TEXT NOT NULL,
    correct_answer TEXT NOT NULL,
    options JSONB, -- For multiple choice questions
    audio_file TEXT, -- Reference to Supabase Storage
    audio_start_time INTEGER, -- Start time in seconds
    audio_end_time INTEGER, -- End time in seconds
    difficulty TEXT DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reading questions table
CREATE TABLE IF NOT EXISTS public.reading_questions (
    id TEXT PRIMARY KEY,
    passage_id TEXT NOT NULL,
    passage_title TEXT NOT NULL,
    passage_text TEXT NOT NULL,
    question_number INTEGER NOT NULL,
    question_type TEXT NOT NULL CHECK (question_type IN (
        'true_false_not_given', 'yes_no_not_given', 'multiple_choice', 
        'matching', 'fill_blank', 'sentence_completion', 'summary_completion'
    )),
    question_text TEXT NOT NULL,
    correct_answer TEXT NOT NULL,
    options JSONB, -- For multiple choice questions
    difficulty TEXT DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create writing questions table
CREATE TABLE IF NOT EXISTS public.writing_questions (
    id TEXT PRIMARY KEY,
    task_number INTEGER NOT NULL CHECK (task_number IN (1, 2)),
    question_type TEXT NOT NULL CHECK (question_type IN (
        'task1_chart', 'task1_process', 'task1_map', 'task1_letter',
        'task2_opinion', 'task2_discussion', 'task2_problem_solution', 'task2_advantages_disadvantages'
    )),
    question_text TEXT NOT NULL,
    prompt_image TEXT, -- Reference to Supabase Storage for charts/diagrams
    word_limit INTEGER NOT NULL,
    time_limit INTEGER NOT NULL, -- in minutes
    sample_answer TEXT,
    marking_criteria JSONB,
    difficulty TEXT DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create speaking questions table
CREATE TABLE IF NOT EXISTS public.speaking_questions (
    id TEXT PRIMARY KEY,
    part INTEGER NOT NULL CHECK (part BETWEEN 1 AND 3),
    question_type TEXT NOT NULL CHECK (question_type IN (
        'personal_info', 'long_turn', 'discussion'
    )),
    question_text TEXT NOT NULL,
    follow_up_questions JSONB,
    time_limit INTEGER, -- in seconds
    difficulty TEXT DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user answers table
CREATE TABLE IF NOT EXISTS public.user_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES public.test_sessions(id) ON DELETE CASCADE,
    question_id TEXT NOT NULL,
    question_type TEXT NOT NULL CHECK (question_type IN ('listening', 'reading', 'writing', 'speaking')),
    user_answer TEXT,
    is_correct BOOLEAN,
    score DECIMAL(5,2),
    time_spent INTEGER, -- in seconds
    word_count INTEGER, -- for writing tasks
    answered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create audio files table
CREATE TABLE IF NOT EXISTS public.audio_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_name TEXT UNIQUE NOT NULL,
    file_path TEXT NOT NULL, -- Supabase Storage path
    file_url TEXT, -- Public URL
    section INTEGER CHECK (section BETWEEN 1 AND 4),
    duration INTEGER, -- in seconds
    file_size INTEGER, -- in bytes
    mime_type TEXT,
    upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES public.users(id),
    metadata JSONB
);

-- Create AI grading results table (for writing assessment)
CREATE TABLE IF NOT EXISTS public.ai_grading_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES public.test_sessions(id) ON DELETE CASCADE,
    task_number INTEGER CHECK (task_number IN (1, 2)),
    user_essay TEXT NOT NULL,
    ai_feedback TEXT,
    -- IELTS Writing Assessment Criteria
    task_achievement DECIMAL(3,1), -- Task 1: Task Achievement, Task 2: Task Response
    coherence_cohesion DECIMAL(3,1),
    lexical_resource DECIMAL(3,1),
    grammar_accuracy DECIMAL(3,1),
    overall_score DECIMAL(3,1),
    word_count INTEGER,
    -- AI Analysis Details
    vocabulary_analysis JSONB,
    grammar_analysis JSONB,
    structure_analysis JSONB,
    content_analysis JSONB,
    graded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ai_model_version TEXT,
    processing_time INTEGER -- in milliseconds
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_test_sessions_user_id ON public.test_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_test_sessions_created_at ON public.test_sessions(created_at);
CREATE INDEX IF NOT EXISTS idx_user_answers_session_id ON public.user_answers(session_id);
CREATE INDEX IF NOT EXISTS idx_user_answers_question_type ON public.user_answers(question_type);
CREATE INDEX IF NOT EXISTS idx_listening_questions_section ON public.listening_questions(section);
CREATE INDEX IF NOT EXISTS idx_reading_questions_passage_id ON public.reading_questions(passage_id);
CREATE INDEX IF NOT EXISTS idx_writing_questions_task_number ON public.writing_questions(task_number);
CREATE INDEX IF NOT EXISTS idx_speaking_questions_part ON public.speaking_questions(part);
CREATE INDEX IF NOT EXISTS idx_audio_files_section ON public.audio_files(section);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_grading_results ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Users can only access their own data
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Test sessions policies
CREATE POLICY "Users can view own test sessions" ON public.test_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own test sessions" ON public.test_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own test sessions" ON public.test_sessions
    FOR UPDATE USING (auth.uid() = user_id);

-- User answers policies
CREATE POLICY "Users can view own answers" ON public.user_answers
    FOR SELECT USING (
        session_id IN (
            SELECT id FROM public.test_sessions WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert own answers" ON public.user_answers
    FOR INSERT WITH CHECK (
        session_id IN (
            SELECT id FROM public.test_sessions WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update own answers" ON public.user_answers
    FOR UPDATE USING (
        session_id IN (
            SELECT id FROM public.test_sessions WHERE user_id = auth.uid()
        )
    );

-- AI grading results policies
CREATE POLICY "Users can view own grading results" ON public.ai_grading_results
    FOR SELECT USING (
        session_id IN (
            SELECT id FROM public.test_sessions WHERE user_id = auth.uid()
        )
    );

-- Public read access for question tables (no RLS needed for questions)
-- These are public content that all authenticated users can read

-- Insert sample data for testing

-- Sample listening questions
INSERT INTO public.listening_questions (id, section, question_number, question_type, question_text, correct_answer, options, audio_start_time, audio_end_time) VALUES
('L001', 1, 1, 'fill_blank', 'The customer wants to book accommodation for _______ people.', 'two', NULL, 15, 45),
('L002', 1, 2, 'fill_blank', 'The preferred check-in date is _______ 15th.', 'October', NULL, 45, 75),
('L003', 1, 3, 'multiple_choice', 'What type of room does the customer prefer?', 'B', '["A) Single room with garden view", "B) Double room with sea view", "C) Twin room with city view"]', 75, 105),
('L004', 1, 4, 'fill_blank', 'The total cost per night is £ _______.', '85', NULL, 105, 135),
('L005', 1, 5, 'fill_blank', 'The customer''s surname is _______.', 'Johnson', NULL, 135, 165),
('L006', 1, 6, 'multiple_choice', 'What time is breakfast served?', 'B', '["A) 7:00 - 9:00", "B) 7:30 - 9:30", "C) 8:00 - 10:00"]', 165, 195),
('L007', 1, 7, 'fill_blank', 'The hotel provides free _______ service.', 'shuttle', NULL, 195, 225),
('L008', 1, 8, 'fill_blank', 'The nearest train station is _______ minutes away.', 'fifteen', NULL, 225, 255),
('L009', 1, 9, 'multiple_choice', 'What additional service is available?', 'C', '["A) Laundry service", "B) Car rental", "C) Tour booking"]', 255, 285),
('L010', 1, 10, 'fill_blank', 'The confirmation number is _______.', 'HB2759', NULL, 285, 315)
ON CONFLICT (id) DO NOTHING;

-- Sample reading questions
INSERT INTO public.reading_questions (id, passage_id, passage_title, passage_text, question_number, question_type, question_text, correct_answer, options) VALUES
('R001', 'P001', 'The Impact of Climate Change on Marine Ecosystems', 'Marine ecosystems around the world are facing unprecedented challenges due to climate change...', 1, 'true_false_not_given', 'Coral reefs cover more than 1% of the ocean floor.', 'FALSE', '["TRUE", "FALSE", "NOT GIVEN"]'),
('R002', 'P001', 'The Impact of Climate Change on Marine Ecosystems', 'Marine ecosystems around the world are facing unprecedented challenges due to climate change...', 2, 'true_false_not_given', 'The Great Barrier Reef has lost approximately half of its shallow-water corals since the 1990s.', 'TRUE', '["TRUE", "FALSE", "NOT GIVEN"]'),
('R003', 'P001', 'The Impact of Climate Change on Marine Ecosystems', 'Marine ecosystems around the world are facing unprecedented challenges due to climate change...', 3, 'multiple_choice', 'What causes coral bleaching?', 'B', '["A) Ocean acidification", "B) Rising water temperatures", "C) Overfishing", "D) Pollution"]')
ON CONFLICT (id) DO NOTHING;

-- Sample writing questions
INSERT INTO public.writing_questions (id, task_number, question_type, question_text, word_limit, time_limit) VALUES
('W001', 1, 'task1_chart', 'The chart below shows the percentage of households in owned and rented accommodation in England and Wales between 1918 and 2011. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.', 150, 20),
('W002', 2, 'task2_opinion', 'Some people believe that technology has made our lives easier and more convenient. Others argue that technology has made our lives more complicated and stressed. Discuss both views and give your own opinion.', 250, 40)
ON CONFLICT (id) DO NOTHING;

-- Sample speaking questions
INSERT INTO public.speaking_questions (id, part, question_type, question_text, follow_up_questions, time_limit) VALUES
('S001', 1, 'personal_info', 'Can you tell me about your hometown?', '["What do you like most about your hometown?", "Has your hometown changed much over the years?", "What would you recommend a visitor to see in your hometown?"]', 180),
('S002', 2, 'long_turn', 'Describe a memorable journey you have taken. You should say: where you went, when you went, who you went with, and explain why this journey was memorable for you.', NULL, 180),
('S003', 3, 'discussion', 'How important is it for people to travel?', '["What are the benefits of international travel?", "Do you think tourism has any negative effects?", "How might travel change in the future?"]', 300)
ON CONFLICT (id) DO NOTHING;

-- Create functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to handle user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, full_name)
    VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create storage buckets (run these in Supabase Dashboard)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('ielts-audio', 'ielts-audio', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('ielts-images', 'ielts-images', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('user-recordings', 'user-recordings', false);

-- Storage policies for buckets
-- CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'ielts-audio');
-- CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'ielts-images');
-- CREATE POLICY "User Access" ON storage.objects FOR ALL USING (auth.uid() = owner);

COMMENT ON TABLE public.users IS 'Extended user profiles with IELTS test statistics';
COMMENT ON TABLE public.test_sessions IS 'Individual IELTS test sessions with scores and metadata';
COMMENT ON TABLE public.listening_questions IS 'IELTS listening questions with audio references';
COMMENT ON TABLE public.reading_questions IS 'IELTS reading passages and questions';
COMMENT ON TABLE public.writing_questions IS 'IELTS writing tasks and prompts';
COMMENT ON TABLE public.speaking_questions IS 'IELTS speaking questions and topics';
COMMENT ON TABLE public.user_answers IS 'User responses to all test questions';
COMMENT ON TABLE public.audio_files IS 'Audio file metadata for listening tests';
COMMENT ON TABLE public.ai_grading_results IS 'AI-powered writing assessment results';