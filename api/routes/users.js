const express = require("express");
const usersController = require("../controller/users.js");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API untuk mengelola pengguna
 */

/**
 * @swagger
 * /api/users/auth/clerk:
 *   post:
 *     summary: Autentikasi pengguna dengan Clerk
 *     tags: [Users]
 *     description: Endpoint untuk login atau registrasi pengguna menggunakan Clerk.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clerkId:
 *                 type: string
 *                 example: "clerk_user_123"
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *     responses:
 *       200:
 *         description: User berhasil diautentikasi
 *       500:
 *         description: Kesalahan server
 */
router.post("/auth/clerk", usersController.getOrCreateUserWithClerk);


/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Membuat user baru
 *     tags: [Users]
 *     description: Endpoint untuk menambahkan pengguna baru ke dalam sistem.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: User berhasil dibuat
 *       400:
 *         description: Data tidak valid
 */
router.post("/", usersController.createNewUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Mendapatkan semua pengguna
 *     tags: [Users]
 *     description: Mengambil daftar semua pengguna yang tersedia dalam database.
 *     responses:
 *       200:
 *         description: Daftar semua pengguna berhasil diambil
 *       500:
 *         description: Kesalahan server
 */
router.get("/", usersController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Mengupdate data pengguna
 *     tags: [Users]
 *     description: Memperbarui informasi pengguna berdasarkan ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID pengguna yang akan diperbarui.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jane Doe"
 *               email:
 *                 type: string
 *                 example: "janedoe@example.com"
 *               password:
 *                 type: string
 *                 example: "newpassword456"
 *     responses:
 *       200:
 *         description: Pengguna berhasil diperbarui
 *       404:
 *         description: Pengguna tidak ditemukan
 */
router.patch("/:id", usersController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Menghapus pengguna
 *     tags: [Users]
 *     description: Menghapus pengguna dari database berdasarkan ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID pengguna yang akan dihapus.
 *     responses:
 *       200:
 *         description: Pengguna berhasil dihapus
 *       404:
 *         description: Pengguna tidak ditemukan
 */
router.delete("/:id", usersController.deleteUser);

module.exports = router;
