# 📝 Notes App

A simple full-stack Notes Application where users can **create, view, update, and delete notes**.

The application uses **Node.js and Express.js** for the backend and **MongoDB Atlas** for storing notes.

## 🚀 Features

* ➕ Create a new note
* 📖 View all notes
* ✏️ Edit/update an existing note
* 🗑️ Delete a note
* 💾 Store notes in MongoDB Atlas
* 🔗 RESTful CRUD APIs
* 🌐 Simple and responsive frontend

## 🛠️ Technologies Used

* **HTML** — Frontend structure
* **CSS** — User interface styling
* **JavaScript** — Frontend functionality
* **Node.js** — Backend runtime
* **Express.js** — Backend framework
* **MongoDB Atlas** — Database
* **Mongoose** — MongoDB object modeling
* **CORS** — Cross-origin requests
* **dotenv** — Environment variable management

## 📁 Project Structure

```text
notes-app/
│
├── models/
│   └── Note.js
│
├── node_modules/
│
├── .env
├── .gitignore
├── index.html
├── style.css
├── script.js
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

## 🔌 CRUD API Endpoints

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| POST   | `/api/notes`     | Create a new note |
| GET    | `/api/notes`     | Get all notes     |
| PUT    | `/api/notes/:id` | Update a note     |
| DELETE | `/api/notes/:id` | Delete a note     |

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the project

```bash
cd notes-app
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure MongoDB

Create a `.env` file in the project root:

```env
MONGO_URI=YOUR_MONGODB_ATLAS_CONNECTION_STRING
PORT=5000
```

Replace `YOUR_MONGODB_ATLAS_CONNECTION_STRING` with your MongoDB Atlas connection string.

**Do not upload the `.env` file to GitHub.**

### 5. Start the server

```bash
node server.js
```

The server will run at:

```text
http://localhost:5000
```

## 🧪 Testing CRUD Operations

### Create

Enter a title and content and click **Save Note**.

### Read

All saved notes are displayed on the page.

### Update

Click **Edit**, modify the title or content, and click **Update Note**.

### Delete

Click **Delete** and confirm the deletion.

## 🗄️ Database

The application uses **MongoDB Atlas** to store notes.

Each note contains:

* `title`
* `content`
* `createdAt`
* `updatedAt`

## 🔐 Security

Sensitive configuration is stored in `.env`.

The following files/folders are excluded using `.gitignore`:

```text
node_modules/
.env
```

## 🎯 Project Objective

The objective of this project is to demonstrate how to build a simple full-stack CRUD application using **Node.js, Express.js, MongoDB Atlas, and JavaScript**.

## 👩‍💻 Author

**Myla Kavya**

B.Tech Computer Science Engineering Student

---

⭐ Built as a Simple Notes CRUD Application using Node.js, Express.js and MongoDB Atlas.
