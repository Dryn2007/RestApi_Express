import express from "express";
import { PrismaClient } from "@prisma/client";
import { requireAuth } from "@clerk/express";
import usersController from "../controller/users.js"; // Pastikan ini diubah juga ke ES Module
import { users } from "@clerk/clerk-sdk-node";
import "dotenv/config";


const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API untuk mengelola pengguna
 */

/**
 * @swagger
 * /api/users/sync-user:
 *   post:
 *     summary: Sinkronisasi user Clerk dengan database Prisma
 *     tags: [Users]
 *     description: Memeriksa apakah user sudah ada di database, jika belum, akan disimpan.
 *     responses:
 *       200:
 *         description: User berhasil disinkronisasi
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post("/sync-user", requireAuth(), async (req, res) => {
  try {
    const { userId } = req.auth;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await users.getUser(userId);

    let existingUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!existingUser) {
      existingUser = await prisma.user.create({
        data: {
          clerkId: user.id,
          email: user.emailAddresses[0].emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
    }

    return res.json(existingUser);
  } catch (error) {
    console.error("Error syncing user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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

export default router;