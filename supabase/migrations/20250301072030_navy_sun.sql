/*
  # Add product type and light types columns to leads table

  1. Changes
    - Add `product_type` column to `leads` table to distinguish between fans and lights
    - Add `light_types` column to `leads` table to store selected light types
  
  2. Purpose
    - Support multi-product lead collection (fans and lights)
    - Allow tracking of specific light types that customers are interested in
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'leads' AND column_name = 'product_type'
  ) THEN
    ALTER TABLE leads ADD COLUMN product_type text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'leads' AND column_name = 'light_types'
  ) THEN
    ALTER TABLE leads ADD COLUMN light_types text[];
  END IF;
END $$;