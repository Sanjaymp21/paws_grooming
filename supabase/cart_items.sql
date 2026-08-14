-- ============================================================
-- SUPABASE SQL SCHEMA FOR CART_ITEMS TABLE
-- Copy and paste this script into Supabase SQL Editor
-- ============================================================

-- 1. Create cart_items table
CREATE TABLE IF NOT EXISTS public.cart_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  product_price NUMERIC NOT NULL DEFAULT 0,
  product_image TEXT,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create index for performance on user lookup
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON public.cart_items(user_id);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- 4. Drop existing policies if re-running
DROP POLICY IF EXISTS "Users can view their own cart items" ON public.cart_items;
DROP POLICY IF EXISTS "Users can insert into their cart" ON public.cart_items;
DROP POLICY IF EXISTS "Users can update their own cart items" ON public.cart_items;
DROP POLICY IF EXISTS "Users can delete their own cart items" ON public.cart_items;
DROP POLICY IF EXISTS "Allow full cart access" ON public.cart_items;

-- 5. Create RLS Policies for Authenticated Users
CREATE POLICY "Users can view their own cart items" 
  ON public.cart_items FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert into their cart" 
  ON public.cart_items FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart items" 
  ON public.cart_items FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cart items" 
  ON public.cart_items FOR DELETE 
  USING (auth.uid() = user_id);

-- 6. Unrestricted policy for smooth development/testing (fallback)
CREATE POLICY "Allow full cart access" 
  ON public.cart_items FOR ALL 
  USING (true) 
  WITH CHECK (true);
