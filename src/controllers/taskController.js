const pool = require('../config/database');

exports.createTask = async (req, res, next) => {
  try {
    const { title, description, due_date, assigned_to, priority } = req.body;
    const result = await pool.query(
      'INSERT INTO tasks (title, description, due_date, assigned_to, priority) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, due_date, assigned_to, priority]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.getAllTasks = async (req, res, next) => {
  try {
    const { status, assigned_to, page = 1, limit = 20 } = req.query;
    let query = 'SELECT * FROM tasks WHERE 1=1';
    const queryParams = [];
    
    if (status) {
      query += ' AND status = $' + (queryParams.length + 1);
      queryParams.push(status);
    }
    
    if (assigned_to) {
      query += ' AND assigned_to = $' + (queryParams.length + 1);
      queryParams.push(assigned_to);
    }
    
    query += ' ORDER BY created_at DESC LIMIT $' + (queryParams.length + 1) + ' OFFSET $' + (queryParams.length + 2);
    queryParams.push(limit, (page - 1) * limit);
    
    const result = await pool.query(query, queryParams);
    const countResult = await pool.query('SELECT COUNT(*) FROM tasks');
    
    res.json({
      tasks: result.rows,
      total: parseInt(countResult.rows[0].count),
      // page: parseInt(page),
      // limit: parseInt(limit)
    });
  } catch (err) {
    next(err);
  }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [req.params.id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { title, description, due_date, assigned_to, priority, status } = req.body;
    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, due_date = $3, assigned_to = $4, priority = $5, status = $6 WHERE id = $7 RETURNING *',
      [title, description, due_date, assigned_to, priority, status, req.params.id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1', [req.params.id]);
    if (result.rowCount > 0) {
      res.status(200).json({ message: `Successfully deleted ${req.params.id}` });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (err) {
    next(err);
  }
};