-- ============================================================
-- SST GROOMERS SUPABASE MASTER DATABASE SCHEMA
-- Execute this script in Supabase Dashboard -> SQL Editor
-- ============================================================

-- 1. APPOINTMENT BOOKINGS TABLE (Grooming Package Bookings)
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_code TEXT UNIQUE NOT NULL,
  owner_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  pet_name TEXT NOT NULL,
  pet_type TEXT NOT NULL,
  breed TEXT NOT NULL,
  package_name TEXT NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TEXT NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. SHOPPING CART ITEMS TABLE
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

-- 3. PRODUCT ORDERS TABLE (Product Checkout Orders)
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_code TEXT UNIQUE NOT NULL,
  user_id UUID NOT NULL,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  total_price NUMERIC NOT NULL DEFAULT 0,
  status TEXT DEFAULT 'confirmed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CONTACT INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  recipient TEXT DEFAULT 'sstgroomers@gmail.com',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. GALLERY TABLE
CREATE TABLE IF NOT EXISTS public.gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES FOR SPEED
CREATE INDEX IF NOT EXISTS idx_applications_email ON public.applications(email);
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON public.cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- OPEN ACCESS POLICIES (FOR SEAMLESS OPERATION AND TESTING)
CREATE POLICY "Allow public select applications" ON public.applications FOR SELECT USING (true);
CREATE POLICY "Allow public insert applications" ON public.applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update applications" ON public.applications FOR UPDATE USING (true);

CREATE POLICY "Allow public cart_items" ON public.cart_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public orders" ON public.orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public inquiries" ON public.inquiries FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public gallery" ON public.gallery FOR ALL USING (true);
CREATE POLICY "Allow public profiles" ON public.profiles FOR ALL USING (true) WITH CHECK (true);
