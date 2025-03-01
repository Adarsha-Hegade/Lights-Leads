/*
  # Update RLS policies for leads table
  
  1. Changes
    - Update RLS policies to allow anonymous inserts
    - Maintain read protection for authenticated users only
  
  2. Security
    - Allow anonymous users to insert new leads
    - Only authenticated users can read leads data
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON leads;
DROP POLICY IF EXISTS "Enable read access for authenticated users only" ON leads;

-- Create new policies
CREATE POLICY "Enable insert for all users"
  ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users only"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);