import pool from "../lib/db";

export const getListMenus = async () => {
  try {
    const result = await pool.query('SELECT * FROM menus ORDER BY updated_at DESC;');
    return result.rows;
  } catch (error) {
    throw error;
  }
}

// create 
export const createMenu = async (title, slug, description) => {
  try {
    const result = await pool.query(
      'INSERT INTO menus (title, slug, description) VALUES ($1, $2, $3) RETURNING *',
      [title, slug, description]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}