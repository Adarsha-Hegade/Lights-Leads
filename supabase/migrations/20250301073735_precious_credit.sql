/*
  # Fix light_types column in leads table
  
  1. Purpose
    - Ensure the light_types column exists and has the correct type
    - This migration is created to fix the database error related to the light_types column
  
  2. Changes
    - Check if light_types column exists, if not create it
    - If it exists but has the wrong type, recreate it with the correct type
*/

DO $$ 
BEGIN
  -- Check if light_types column exists
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'leads' AND column_name = 'light_types'
  ) THEN
    -- Create the column if it doesn't exist
    ALTER TABLE leads ADD COLUMN light_types text[];
  ELSE
    -- Check if the column has the correct type
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'leads' AND column_name = 'light_types' AND data_type = 'ARRAY'
    ) THEN
      -- Drop and recreate the column with the correct type
      ALTER TABLE leads DROP COLUMN light_types;
      ALTER TABLE leads ADD COLUMN light_types text[];
    END IF;
  END IF;
END $$;