/*
  # Add lead type and tracking information

  1. Changes
    - Add `lead_type` column to store the type of lead (Architect, Interior Designer, etc.)
    - Add `device_info` column to store device and browser information
    - Add `location_info` column to store IP-based location data
    - Add `comments` column for additional details
  
  2. Security
    - Maintain existing RLS policies
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'leads' AND column_name = 'lead_type'
  ) THEN
    ALTER TABLE leads ADD COLUMN lead_type text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'leads' AND column_name = 'device_info'
  ) THEN
    ALTER TABLE leads ADD COLUMN device_info jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'leads' AND column_name = 'location_info'
  ) THEN
    ALTER TABLE leads ADD COLUMN location_info jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'leads' AND column_name = 'comments'
  ) THEN
    ALTER TABLE leads ADD COLUMN comments text;
  END IF;
END $$;