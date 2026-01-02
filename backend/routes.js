const express = require("express");
const router = express.Router();
const db = require("./db");

/* Save journal */
router.post("/journal", (req, res) => {
  const { date, content } = req.body;
  db.run(
    `INSERT OR REPLACE INTO journal VALUES (?, ?)`,
    [date, content],
    () => res.json({ success: true })
  );
});

/* Get journal */
router.get("/journal/:date", (req, res) => {
  db.get(
    `SELECT * FROM journal WHERE date = ?`,
    [req.params.date],
    (e, row) => res.json(row || {})
  );
});

/* Set goal */
router.post("/goal", (req, res) => {
  db.run(
    `INSERT OR REPLACE INTO goals VALUES (?, ?)`,
    [req.body.month, req.body.target],
    () => res.json({ success: true })
  );
});

/* Dashboard data */
router.get("/dashboard/:month", (req, res) => {
  const month = req.params.month;

  db.get(`SELECT target FROM goals WHERE month=?`, [month], (e, goal) => {
    db.get(
      `SELECT COUNT(*) as count FROM journal WHERE date LIKE ?`,
      [`${month}%`],
      (e2, count) => {
        res.json({
          target: goal?.target || 0,
          completed: count.count
        });
      }
    );
  });
});

module.exports = router;
