# 📦 Native Node.js Media Service

## Description

This project is a lightweight media management service built using **only native Node.js modules** and the **AWS SDK** — without using Express or any other HTTP frameworks.

The goal was to fully respect the task requirements: to implement a **custom HTTP server** manually, focusing on understanding the fundamentals of request handling, routing, error management, and AWS S3 integration without relying on external abstractions.

---

## ✨ Features

- **Upload** media files to AWS S3
- **Generate signed URLs** for file retrieval
- **Update** existing files in S3
- **Delete** files from S3
- **In-memory metadata storage** for uploaded files
- **Basic file validation** (file, filename, content type)
- **Simple error handling**
- **Custom basic router** (handling routes and methods manually)

---

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone <repo-url>
cd native-node
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env` file at the root with the following variables:

```
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=your-region
AWS_BUCKET_NAME=your-bucket-name
HOST=0.0.0.0
PORT=5000
```

4. Start the server:

```bash
pnpm start
```

Server will run at:  
`http://localhost:5000`

---

## 📜 API Documentation

### Upload Media
- **POST** `/media`
- **Request Body (JSON):**
  ```json
  {
    "file": "base64-encoded-file",
    "filename": "example.png",
    "contentType": "image/png"
  }
  ```
- **Response:**
  ```json
  {
    "message": "File uploaded successfully",
    "key": "example.png"
  }
  ```

---

### Get Media (Signed URL)
- **GET** `/media?key=example.png`
- **Response:**
  ```json
  {
    "message": "File URL generated successfully",
    "url": "https://signed-s3-url.com/..."
  }
  ```

---

### Update Media
- **PUT** `/media`
- **Request Body (JSON):**
  ```json
  {
    "file": "base64-encoded-new-file",
    "filename": "example.png",
    "contentType": "image/png"
  }
  ```
- **Response:**
  ```json
  {
    "message": "File updated successfully",
    "key": "example.png"
  }
  ```

---

### Delete Media
- **DELETE** `/media?key=example.png`
- **Response:**
  ```json
  {
    "message": "File deleted successfully",
    "key": "example.png"
  }
  ```

---

## 🛠 Technical Approach

- The server is fully built using the native `http` module.
- Routing and method handling are implemented manually.
- AWS S3 integration is done using the `@aws-sdk/client-s3` package.
- No external libraries were used (except AWS SDK as required).
- Metadata about uploaded files is temporarily stored in memory (`Record<string, Metadata>`) for demonstration purposes.
- File validation checks for the presence of `file`, `filename`, and `contentType`.

---

## 📢 Important Notes

- This service **does not** persist metadata between server restarts (because it uses in-memory storage).
- For production use, it would be necessary to connect a persistent database (e.g., PostgreSQL, MongoDB).
- The system is designed for simplicity, clarity, and to demonstrate understanding of low-level HTTP handling.
