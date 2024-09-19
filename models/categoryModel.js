import pool from "../lib/db";

export const getCategories = async () => {
  try {
    const result = await pool.query('SELECT * FROM categories');
    return result.rows;
  } catch (error) {
    throw error;
  }
}

// create 
export const createCategory = async (title, icon, description, menuId) => {
  try {
    const result = await pool.query(
      'INSERT INTO categories (title, icon, description, menu_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, icon, description, menuId]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

