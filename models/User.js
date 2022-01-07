const { db } = require('../services/database');
const { whereParams, insertValues } = require('../services/sqltools');
const env = require('../services/environment');

// if found return { ... }
// if not found return {}
// if db error return null
async function findOne(criteria) {
  const { text, params } = whereParams(criteria);
  try {
    const res = await db.query(`SELECT * from "user" ${text} LIMIT 1;`, params);
    if (res.rows.length > 0) {
      return res.rows[0];
    }
    return {};
  } catch (err) {
    console.log(err);
    return null;
  }
}

// if found return [ {}, {} ... ]
// if not found return []
// if error null
async function findAll(criteria, limit = 100, offset = 0) {
  const { text, params } = whereParams(criteria);
  try {
    const n = params.length;
    const p = params.concat([limit, offset]);
    const res = await db.query(`SELECT * from "user" ${text} LIMIT $${n + 1} OFFSET $${n + 2};`, p);
    return res.rows;
  } catch (err) {
    console.log(err);
  }
  return null;
}

// if successful insert return inserted record {}
// if successful, but no row inserted, return null (shouldn't happen)
// if error null
async function create(userId, email) {
  // userId and email are required
  if (userId && email) {
    const enable = email === env.masterAdminEmail;
    const role = email === env.masterAdminEmail ? 'admin' : 'user';
    try {
      const { text, params } = insertValues({
        userId: userId,
        email: email,
        enable: enable,
        role: role,
      });
      const res = await db.query(`INSERT INTO "user" ${text} RETURNING *;`, params);
      if (res.rows.length > 0) {
        return res.rows[0];
      }
      throw new Error('insert sucessful with no returned record');
    } catch (err) {
      console.log(err);
    }
  }
  return null;
}

module.exports = {
  findOne,
  findAll,
  create,
};
