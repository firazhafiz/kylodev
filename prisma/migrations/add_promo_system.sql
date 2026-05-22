-- Create promo_banner table
CREATE TABLE IF NOT EXISTS promo_banner (
  id SERIAL PRIMARY KEY,
  is_active BOOLEAN DEFAULT false,
  end_date TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '7 days'),
  badge_text VARCHAR(50) DEFAULT '🎯 Early Bird',
  headline VARCHAR(100) DEFAULT 'Promo untuk 5 orang tercepat!',
  slot_count INTEGER DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Disable Row-Level Security (RLS) since API authorization is managed at the Next.js API route level
ALTER TABLE promo_banner DISABLE ROW LEVEL SECURITY;

-- Insert default row
INSERT INTO promo_banner (is_active, end_date, badge_text, headline, slot_count)
VALUES (false, NOW() + INTERVAL '7 days', '🎯 Early Bird', 'Promo untuk 5 orang tercepat!', 5);

-- Add promo columns to pricing_plans
ALTER TABLE pricing_plans 
ADD COLUMN IF NOT EXISTS promo_discount_percent INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS is_promo_active BOOLEAN DEFAULT false;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_pricing_plans_promo ON pricing_plans(is_promo_active) WHERE is_promo_active = true;
