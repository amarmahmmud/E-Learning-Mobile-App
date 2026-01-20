-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  email TEXT,
  photo_url TEXT,
  role TEXT DEFAULT 'parent' CHECK (role IN ('parent', 'admin', 'teacher')),
  -- Additional registration fields
  birth_year INTEGER,
  gender TEXT,
  relationship TEXT,
  country TEXT,
  state TEXT,
  city TEXT,
  address TEXT,
  phone TEXT,
  languages TEXT[],
  quran_level TEXT,
  suitable_time TEXT,
  expectations TEXT,
  username TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Roles table for permissions
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  permissions JSONB DEFAULT '{}'
);

-- Insert default roles
INSERT INTO roles (name, permissions) VALUES
  ('parent', '{"view_children": true, "manage_children": true}'),
  ('admin', '{"all": true}'),
  ('teacher', '{"view_students": true, "manage_lessons": true}');

-- Grades table
CREATE TABLE grades (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  level INTEGER UNIQUE NOT NULL
);

-- Insert default grades
INSERT INTO grades (name, level) VALUES
  ('Grade 1', 1),
  ('Grade 2', 2),
  ('Grade 3', 3);

-- Semesters table
CREATE TABLE semesters (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  number INTEGER UNIQUE NOT NULL
);

INSERT INTO semesters (name, number) VALUES
  ('Semester 1', 1),
  ('Semester 2', 2);

-- Weeks table
CREATE TABLE weeks (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  number INTEGER UNIQUE NOT NULL
);

INSERT INTO weeks (name, number) VALUES
  ('Week 1', 1),
  ('Week 2', 2),
  ('Week 3', 3),
  ('Week 4', 4);

-- Subjects table
CREATE TABLE subjects (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

INSERT INTO subjects (name) VALUES
  ('Quran'),
  ('Arabic'),
  ('Islamic Studies');

-- Students table
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  age INTEGER,
  grade_id INTEGER REFERENCES grades(id),
  photo TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lessons table
CREATE TABLE lessons (
  id SERIAL PRIMARY KEY,
  grade_id INTEGER REFERENCES grades(id),
  semester_id INTEGER REFERENCES semesters(id),
  week_id INTEGER REFERENCES weeks(id),
  day TEXT NOT NULL, -- e.g., 'Monday'
  subject_id INTEGER REFERENCES subjects(id),
  video_url TEXT,
  textbook_content TEXT,
  game_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Progress table
CREATE TABLE progress (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
  lesson_id INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  score INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(student_id, lesson_id)
);

-- Notifications table
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Achievements table (optional for V1)
CREATE TABLE achievements (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE semesters ENABLE ROW LEVEL SECURITY;
ALTER TABLE weeks ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- RLS Policies (basic, can be expanded)
-- Profiles: users can view and update their own
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Students: parents can view/manage their children
CREATE POLICY "Parents can view their students" ON students FOR SELECT USING (
  profile_id = auth.uid()
);
CREATE POLICY "Parents can manage their students" ON students FOR ALL USING (
  profile_id = auth.uid()
);

-- Lessons: public read
CREATE POLICY "Anyone can view lessons" ON lessons FOR SELECT USING (true);

-- Progress: students/parents can view their progress
CREATE POLICY "Students and parents can view progress" ON progress FOR SELECT USING (
  student_id IN (
    SELECT id FROM students WHERE profile_id = auth.uid()
  )
);
CREATE POLICY "Students and parents can update progress" ON progress FOR ALL USING (
  student_id IN (
    SELECT id FROM students WHERE profile_id = auth.uid()
  )
);

-- Notifications: users can view their own
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (
  profile_id = auth.uid()
);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (
  profile_id = auth.uid()
);

-- For roles, grades, etc., perhaps admin only, but for simplicity, allow read
CREATE POLICY "Public read roles" ON roles FOR SELECT USING (true);
CREATE POLICY "Public read grades" ON grades FOR SELECT USING (true);
CREATE POLICY "Public read semesters" ON semesters FOR SELECT USING (true);
CREATE POLICY "Public read weeks" ON weeks FOR SELECT USING (true);
CREATE POLICY "Public read subjects" ON subjects FOR SELECT USING (true);

-- Achievements
CREATE POLICY "Students and parents can view achievements" ON achievements FOR SELECT USING (
  student_id IN (
    SELECT id FROM students WHERE profile_id = auth.uid()
  )
);