-- Add new columns to profiles table for registration data
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS birth_year INTEGER;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS gender TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS relationship TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS country TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS state TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS languages TEXT[];
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS quran_level TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS suitable_time TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS expectations TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS username TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'));

-- Add INSERT policy for achievements so parents can add achievements for their students
CREATE POLICY "Parents can insert achievements for their students" ON achievements FOR INSERT WITH CHECK (
      student_id IN (
          SELECT id FROM students WHERE profile_id = auth.uid()
            )
            );
)