const pool = require('../config/database');

exports.getTaskMetrics = async (req, res, next) => {
  try {
    const { start_date, end_date } = req.query;
    const result = await pool.query(`
      SELECT 
        COUNT(*) as total_tasks,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_tasks,
        SUM(CASE WHEN due_date < NOW() AND status != 'completed' THEN 1 ELSE 0 END) as overdue_tasks,
        AVG(CASE WHEN status = 'completed' THEN EXTRACT(EPOCH FROM (updated_at - created_at))/86400.0 ELSE NULL END) as average_completion_time
      FROM tasks
      WHERE created_at BETWEEN $1 AND $2
    `, [start_date, end_date]);
    
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};
