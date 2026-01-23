-- Fix UPDATE policy to allow promoting temp profiles
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE TO authenticated USING (
  auth.uid() = id OR (id IS NULL AND temporary_signup_token IS NOT NULL)
) WITH CHECK (auth.uid() = id);
