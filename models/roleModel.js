import pool from "@/lib/db";

export class RoleModel {
  static async createRole(name) {
    try {
      const result = await pool.query('INSERT INTO roles (name) VALUES ($1) RETURNING *', [name]);

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async getAllRoles() {
    try {
      const result = await pool.query('SELECT * FROM roles');
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async getRoleById(id) {
    try {
      const result = await pool.query('SELECT * FROM roles  WHERE id = $1', [id]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async updateRole(id, { name }) {
    try {
      const result = await pool.query('UPDATE roles SET name = $1 WHERE id = $2 RETURNING *', [name, id]);

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async deleteRole(id) {
    await pool.query('DELETE FROM roles WHERE id = $1', [id]);
  }

  static async getPermissionsByRoleId(roleId) {
    try {
      const result = await pool.query(`
        SELECT p.id, p.name
        FROM role_permissions rp
        JOIN permissions p ON rp.permission_id = p.id
        WHERE rp.role_id = $1
      `, [roleId]);

      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async addPermissionToRole(roleId, permissionId) {
    try {
      await pool.query(`
        INSERT INTO role_permissions (role_id, permission_id) VALUES ($1, $2)
      `, [roleId, permissionId]);

    } catch (error) {
      throw error;
    }
  }

  static async removePermissionFromRole(roleId, permissionId) {
    try {
      await pool.query(`
        DELETE FROM role_permissions
        WHERE role_id = $1 AND permission_id = $2        
      `, [roleId, permissionId]);
    } catch (error) {
      throw error;
    }
  }


}

