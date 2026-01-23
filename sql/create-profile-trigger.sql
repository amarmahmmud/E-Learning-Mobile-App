
-- sql/create-profile-trigger.sql

-- 1. Create a robust function to handle new user sign-ups
-- This version is designed to be resilient and not fail on optional or malformed data.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  _birth_year_text TEXT;
  _languages_jsonb JSONB;
BEGIN
  -- Log the start of the trigger execution
  RAISE LOG 'Trigger handle_new_user started for user ID: %', new.id;
  
  -- Extract potentially problematic values from the JSON metadata
  _birth_year_text := new.raw_user_meta_data->>'birth_year';
  _languages_jsonb := new.raw_user_meta_data->'languages';
  
  -- Log the extracted values for debugging
  RAISE LOG 'Extracted birth_year: %', _birth_year_text;
  RAISE LOG 'Extracted languages: %', _languages_jsonb;
  
  -- Log all raw_user_meta_data for debugging
  RAISE LOG 'Full raw_user_meta_data: %', new.raw_user_meta_data;

  INSERT INTO public.profiles (
    id, name, email, photo_url, role, birth_year, gender, relationship, country,
    state, city, address, phone, languages, quran_level, suitable_time,
    expectations, username, status
  )
  VALUES (
    new.id,
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'email', -- Corrected from new.email
    new.raw_user_meta_data->>'photo_url',
    'parent', -- Default role
    -- Safely cast birth_year. If it's not a string of digits, it becomes NULL.
    (SELECT CASE WHEN _birth_year_text ~ '^[0-9]+$' THEN _birth_year_text::INTEGER ELSE NULL END),
    new.raw_user_meta_data->>'gender',
    new.raw_user_meta_data->>'relationship',
    new.raw_user_meta_data->>'country',
    new.raw_user_meta_data->>'state',
    new.raw_user_meta_data->>'city',
    new.raw_user_meta_data->>'address',
    new.raw_user_meta_data->>'phone',
    -- Safely process languages. If it's not a JSON array, default to an empty SQL array.
    (SELECT CASE WHEN jsonb_typeof(_languages_jsonb) = 'array' THEN ARRAY(SELECT jsonb_array_elements_text(_languages_jsonb)) ELSE '{}'::TEXT[] END),
    new.raw_user_meta_data->>'quran_level',
    new.raw_user_meta_data->>'suitable_time',
    new.raw_user_meta_data->>'expectations',
    new.raw_user_meta_data->>'username',
    'pending' -- Default status
  );
  
  -- Log successful insertion
  RAISE LOG 'Successfully inserted profile for user ID: %', new.id;
  
  RETURN new;
EXCEPTION WHEN OTHERS THEN
  -- Log any errors that occur during the trigger execution
  RAISE LOG 'Error in trigger handle_new_user for user ID: %: %', new.id, SQLERRM;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Create the trigger to call the function
-- This ensures the function fires automatically AFTER a new user is inserted into auth.users.
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Clean up old, unnecessary policies and columns
DROP POLICY IF EXISTS "Allow anon to insert temp profiles" ON public.profiles;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS temporary_signup_token;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS signup_confirmed;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS temporary_expires_at;
