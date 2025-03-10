### **📌 Express API dengan Prisma dan PostgreSQL**  

API ini dibuat menggunakan **Express.js** dan **Prisma ORM** dengan database **PostgreSQL**. API ini menyediakan fitur CRUD untuk mengelola pengguna.  

---

## **🚀 Cara Menggunakan API Ini**  

### **1. Clone Repository**  
Jalankan perintah berikut untuk meng-clone repository:  

```sh
git clone https://github.com/USERNAME/REPO-NAME.git
cd REPO-NAME
```

---

### **2. Install Dependencies**  
Pastikan kamu sudah menginstal **Node.js** dan jalankan:  

```sh
npm install
```

---

### **3. Konfigurasi Database**  
Buat file `.env` di dalam root proyek dan tambahkan konfigurasi berikut:  

```env
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=YOUR_API_KEY"
PORT=4000
APP_URL="http://localhost:4000"
```

Gantilah `YOUR_API_KEY` dengan API key database yang kamu gunakan.  

---

### **4. Menjalankan Migrasi Database**  
Jalankan perintah berikut untuk membuat struktur database:  

```sh
npx prisma migrate dev
```

Jika database kosong, gunakan reset:  

```sh
npx prisma migrate reset
```
🚨 **Peringatan:** `reset` akan menghapus semua data dalam database.  

---

### **5. Menjalankan Server**  
Gunakan perintah berikut untuk menjalankan server:  

```sh
npm start
```

Jika ingin mode development dengan hot reload:  

```sh
npm run dev
```

---

## **📌 Dokumentasi API (Swagger)**  
API ini memiliki dokumentasi yang bisa diakses di **http://localhost:4000/docs** setelah server berjalan.  

---

## **📌 Endpoints API**  

### **🔹 1. Create User**  
**Endpoint:**  
```http
POST /api/users
```
**Request Body:**  
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "123456"
}
```
**Response:**
```json
{
  "message": "User berhasil dibuat"
}
```

---

### **🔹 2. Get All Users**  
**Endpoint:**  
```http
GET /api/users
```
**Response:**  
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@example.com"
  }
]
```

---

### **🔹 3. Update User**  
**Endpoint:**  
```http
PATCH /api/users/{id}
```
**Request Body:**  
```json
{
  "name": "Jane Doe",
  "email": "janedoe@example.com"
}
```
**Response:**  
```json
{
  "message": "User berhasil diperbarui"
}
```

---

### **🔹 4. Delete User**  
**Endpoint:**  
```http
DELETE /api/users/{id}
```
**Response:**  
```json
{
  "message": "User berhasil dihapus"
}
```

---

## **📌 Teknologi yang Digunakan**
- **Express.js** - Framework Node.js untuk backend  
- **Prisma ORM** - ORM untuk PostgreSQL  
- **PostgreSQL** - Database yang digunakan  
- **Swagger UI** - Dokumentasi API  
- **Multer** - Upload file  
- **Cors & Dotenv** - Middleware tambahan  

---

## **📌 Kontribusi**  
Silakan fork repository ini dan kirimkan **pull request** jika ingin menambahkan fitur baru atau memperbaiki bug! 🚀  

