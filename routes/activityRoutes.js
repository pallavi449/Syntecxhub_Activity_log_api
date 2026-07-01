const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const controller = require("../controllers/activityController");

/**
 * @swagger
 * tags:
 *   name: Activity Logs
 *   description: Audit Trail APIs
 */

/**
 * @swagger
 * /api/logs:
 *   get:
 *     summary: Get all activity logs (Admin Only)
 *     tags: [Activity Logs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: user
 *         schema:
 *           type: string
 *         description: Filter by User ID
 *       - in: query
 *         name: action
 *         schema:
 *           type: string
 *         description: Filter by Action
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *         description: Start Date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *         description: End Date
 *     responses:
 *       200:
 *         description: List of activity logs
 */
router.get("/", auth, admin, controller.getLogs);

module.exports = router;