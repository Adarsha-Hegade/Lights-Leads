/*
  # Create leads table

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `name` (text)
      - `phone` (text)
      - `city` (text)
      - `email` (text, nullable)
      - `url_slugs` (text[])
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `leads` table
    - Add policy for authenticated users to insert data
    - Add policy for authenticated users to read data
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  city text NOT NULL,
  email text,
  url_slugs text[],
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert for authenticated users only"
  ON leads
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users only"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);