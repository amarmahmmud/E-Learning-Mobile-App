-- ============================================================================
-- CURRICULUM TABLES SCHEMA FOR SUPABASE
-- Run this in Supabase SQL Editor to update grades, semesters, and weeks
-- ============================================================================

-- ============================================================================
-- 1. UPDATE GRADES TABLE (10 grades instead of 3)
-- ============================================================================
-- Clear existing grades and insert 10 grades
TRUNCATE TABLE grades RESTART IDENTITY CASCADE;

INSERT INTO grades (name, level) VALUES
  ('Grade 1', 1),
  ('Grade 2', 2),
  ('Grade 3', 3),
  ('Grade 4', 4),
  ('Grade 5', 5),
  ('Grade 6', 6),
  ('Grade 7', 7),
  ('Grade 8', 8),
  ('Grade 9', 9),
  ('Grade 10', 10);

-- ============================================================================
-- 2. UPDATE SEMESTERS TABLE (3 semesters)
-- ============================================================================
TRUNCATE TABLE semesters RESTART IDENTITY CASCADE;

INSERT INTO semesters (name, number) VALUES
  ('Semester 1', 1),
  ('Semester 2', 2),
  ('Semester 3', 3);

-- ============================================================================
-- 3. UPDATE WEEKS TABLE (13 weeks per semester)
-- ============================================================================
TRUNCATE TABLE weeks RESTART IDENTITY CASCADE;

INSERT INTO weeks (name, number) VALUES
  ('Week 1', 1),
  ('Week 2', 2),
  ('Week 3', 3),
  ('Week 4', 4),
  ('Week 5', 5),
  ('Week 6', 6),
  ('Week 7', 7),
  ('Week 8', 8),
  ('Week 9', 9),
  ('Week 10', 10),
  ('Week 11', 11),
  ('Week 12 - Revision', 12),
  ('Week 13 - Test', 13);

-- ============================================================================
-- 4. VERIFY THE DATA
-- ============================================================================
-- SELECT * FROM grades ORDER BY level;
-- SELECT * FROM semesters ORDER BY number;
-- SELECT * FROM weeks ORDER BY number;

-- ============================================================================
-- 5. SAMPLE LESSONS (Optional - for testing)
-- ============================================================================
-- This creates sample lessons for Grade 1, Semester 1
-- INSERT INTO lessons (grade_id, semester_id, week_id, day, subject_id, video_url, textbook_content)
-- VALUES
--   (1, 1, 1, 'Monday', 1, 'https://example.com/video1.mp4', 'Quran lesson content...'),
--   (1, 1, 1, 'Tuesday', 2, 'https://example.com/video2.mp4', 'Hadith lesson content...');
