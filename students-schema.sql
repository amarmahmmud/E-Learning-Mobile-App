-- ============================================================================
-- STUDENTS TABLE SCHEMA FOR SUPABASE
-- Run this in Supabase SQL Editor to create/verify the students table
-- ============================================================================

-- Drop existing table (optional - only if you want to reset)
-- DROP TABLE IF EXISTS students CASCADE;

-- ============================================================================
-- 1. CREATE STUDENTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    age INTEGER,
    grade_id INTEGER REFERENCES grades(id),
    photo TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- 2. ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================================================
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 3. RLS POLICIES
-- ============================================================================

-- Parents can view their own students
CREATE POLICY "Parents can view their students" ON students
    FOR SELECT
    USING (profile_id = auth.uid());

-- Parents can insert students for themselves
CREATE POLICY "Parents can insert students" ON students
    FOR INSERT
    WITH CHECK (profile_id = auth.uid());

-- Parents  update their own students
CREATE POLICY "Parents can update their students" ON students
    FOR UPDATE
    USING (profile_id = auth.uid());

-- Parents can delete their own students
CREATE POLICY "Parents can delete their students" ON students
    FOR DELETE
    USING (profile_id = auth.uid());

-- ============================================================================
-- 4. VERIFY THE STRUCTURE
-- ============================================================================
-- Run this to see the table structure:
-- SELECT column_name, data_type, is_nullable, column_default
-- FROM information_schema.columns
-- WHERE table_name = 'students'
-- ORDER BY ordinal_position;

-- ============================================================================
-- 5. SAMPLE DATA (Optional - for testing)
-- ============================================================================
-- INSERT INTO students (profile_id, name, age, photo) VALUES
-- ('your-uuid-here', 'Ahmed', 7, '👦'),
-- ('your-uuid-here', 'Fatima', 8, '👧');

-- ============================================================================
-- WHAT THE APP SENDS WHEN ADDING A STUDENT:
-- ============================================================================
-- {
--   "profile_id": "uuid-from-auth-users",  -- Required, links to parent
--   "name": "Student Name",                 -- Required, TEXT
--   "age": 7,                               -- Optional, INTEGER
--   "grade_id": 1,                          -- Optional, INTEGER (FK to grades)
--   "photo": "👦"                           -- Optional, TEXT (emoji or URL)
-- }
-- ============================================================================

-- ============================================================================
-- 6. TEST THE INSERT (Replace with actual parent UUID from auth.users)
-- ============================================================================
-- This is just an example of what the insert looks like:
-- INSERT INTO students (profile_id, name, age, photo) 
-- VALUES ('550e8400-e29b-41d4-a716-446655440000', 'Ahmed', 7, '👦')
-- RETURNING *;
