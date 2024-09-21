CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  icon VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  -- Foreigh key relation to Menu Table
  menu_id INTEGER NOT NULL,
  FOREIGN KEY (menu_id) REFERENCES menus(id) 
) 