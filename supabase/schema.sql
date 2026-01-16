-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  preview VARCHAR(500),
  image VARCHAR(500),
  priority BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  photo VARCHAR(500),
  review TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Pricing plans table
CREATE TABLE IF NOT EXISTS pricing_plans (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price VARCHAR(100) NOT NULL,
  description TEXT,
  features TEXT[] DEFAULT '{}',
  popular BOOLEAN DEFAULT false,
  icon_name VARCHAR(100),
  sort_order INT DEFAULT 0
);

-- Service features table
CREATE TABLE IF NOT EXISTS service_features (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon_name VARCHAR(100),
  sort_order INT DEFAULT 0
);

-- Site settings (contact info, about stats)
CREATE TABLE IF NOT EXISTS site_settings (
  key VARCHAR(100) PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);
