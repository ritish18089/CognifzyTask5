# TaskMaster - 💫 Advanced CRUD Operations

## 📖 Overview
Advanced CRUD Operations is a modern and responsive Task Management Web Application developed using HTML5, CSS3, and Vanilla JavaScript (ES6+). The application enables users to create, view, update, and delete tasks while ensuring persistent data storage through the Local Storage API, allowing task information to remain available even after the browser is refreshed or reopened. It features a clean and intuitive dashboard with real-time task statistics, search, filtering, sorting, light and dark mode support, JSON import/export functionality, and responsive design for seamless use across desktop, tablet, and mobile devices. Built using modular JavaScript and modern frontend development practices, this project demonstrates practical implementation of CRUD operations, DOM manipulation, event handling, client-side data persistence, form validation, and responsive UI design, making it an excellent showcase of advanced JavaScript and web development skills.

## ✨ Features
- **Create, Read, Update, Delete (CRUD)** tasks.
- **Persistent Storage** using browser LocalStorage.
- **Search, Filter, and Sort** capabilities.
- **Dashboard Statistics** updating dynamically.
- **Import / Export** task data in JSON format.
- **Light & Dark Mode** theming (persisted).
- **Responsive UI** (Glassmorphism design, mobile friendly).
- **Toast Notifications** and **Modal Confirmations**.
- **Input Validations** to prevent bad data.

## 🛠️  Technology Stack
- Frontend: HTML5, CSS3, Vanilla JavaScript (ES6+)
- Styling: CSS Flexbox, CSS Grid, CSS Variables, Responsive Design
- Data Storage: Browser Local Storage API
- Icons: Font Awesome
- Data Format: JSON (for Import & Export)
- Version Control: Git & GitHub
- Development Environment: Visual Studio Code
- Browser APIs: DOM API, Local Storage API, FileReader API, Blob API

## 📂 Architecture & Workflow
<img src="https://github.com/ritish18089/CognifzyTask5/blob/main/arctcogntask5.png" height="1000px" width="1000px">

## 📝 Task Attributes
| **Attribute**           | **Description**                                                 |
| ----------------------- | --------------------------------------------------------------- |
| **Task ID**             | Unique identifier assigned to each task.                        |
| **Title**               | Short name or heading of the task.                              |
| **Description**         | Detailed information about the task.                            |
| **Priority**            | Defines the importance of the task (High, Medium, Low).         |
| **Status**              | Current state of the task (Pending or Completed).               |
| **Due Date**            | Deadline for completing the task.                               |
| **Created Date**        | Date and time when the task was created.                        |
| **Last Updated**        | Date and time of the most recent modification.                  |
| **Category (Optional)** | Groups tasks into categories such as Personal, Work, or Study.  |
| **Completion Time**     | Records the date and time when the task is marked as completed. |


## 📌 Functional Modules
| **Module**                 | **Description**                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------------ |
| **Dashboard**              | Displays task statistics, recent activities, and an overview of all tasks.                 |
| **Task Management**        | Create, view, edit, and delete tasks using complete CRUD operations.                       |
| **Search Module**          | Search tasks instantly by title or keyword.                                                |
| **Filter Module**          | Filter tasks based on status (Pending/Completed) or priority (High/Medium/Low).            |
| **Sort Module**            | Sort tasks by recently added, due date, priority, or alphabetical order.                   |
| **Statistics Module**      | Displays Total Tasks, Completed Tasks, Pending Tasks, and High Priority Tasks.             |
| **Local Storage Module**   | Stores task data persistently using the browser's Local Storage API.                       |
| **Import & Export Module** | Import tasks from a JSON file and export existing tasks for backup or sharing.             |
| **Theme Module**           | Switch between Light Mode and Dark Mode with saved user preference.                        |
| **Validation Module**      | Validates task inputs, prevents invalid or duplicate entries, and displays error messages. |
| **Notification Module**    | Shows success, warning, and error toast notifications for user actions.                    |
| **Responsive UI Module**   | Ensures a seamless experience across desktop, tablet, and mobile devices.                  |

## 📸 Screenshots
### Dashboard (Home Screen) 
<p align="center"><img src="https://github.com/ritish18089/CognifzyTask5/blob/main/1.png" height="1000px">

### ➕ Add Tasks
<p align="center"><img src="https://github.com/ritish18089/CognifzyTask5/blob/main/2.png" height="1000px">

### 📖 Read Tasks
<p align="center"><img src="https://github.com/ritish18089/CognifzyTask5/blob/main/3.png" height="1000px">

### 🔍 Search Tasks
<p align="center"><img src="https://github.com/ritish18089/CognifzyTask5/blob/main/4.png" height="1000px">

### ✏️ Update Tasks
<p align="center"><img src="https://github.com/ritish18089/CognifzyTask5/blob/main/5.png" height="1000px">

### 🗑️ Delete Tasks
<p align="center"><img src="https://github.com/ritish18089/CognifzyTask5/blob/main/6.png" height="1000px">

### 🗂️ Filter Tasks
<p align="center"><img src="https://github.com/ritish18089/CognifzyTask5/blob/main/7.png" height="1000px">

### 📊 Task Statistics
<p align="center"><img src="https://github.com/ritish18089/CognifzyTask5/blob/main/8.png" height="1000px">

### 📥 Import 
<p align="center"><img src="https://github.com/ritish18089/CognifzyTask5/blob/main/9.png" height="1000px">

### 📤 Export
<p align="center"><img src="https://github.com/ritish18089/CognifzyTask5/blob/main/10.png" height="1000px">

### 🎨 Theme 
<p align="center"><img src="https://github.com/ritish18089/CognifzyTask5/blob/main/11.png" height="1000px">

## 📚 Learning Outcomes
- CRUD Operations
- DOM Manipulation
- ES6+ JavaScript
- Local Storage API
- Event Handling
- Form Validation
- Responsive Web Design
- JSON Import & Export
- State Management
- Modular JavaScript


## ⚙ Installation Steps
- Ensure you have a modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari) installed.
- Clone or download this repository to your local machine.
- Navigate to the Task 5-Advanced CRUD Operations project directory.
- Open the project in your preferred code editor (e.g., Visual Studio Code).
- Open the index.html file in your web browser, or use the Live Server extension in Visual Studio Code for a better development experience.
- The application will load automatically, and you can start creating, updating, deleting, searching, filtering, and managing tasks.
- All task data is stored locally using the Local Storage API, so your tasks remain available even after refreshing or reopening the browser.

## 📂 How to Run
### Command Line
1. Open your terminal or command prompt.
2. Navigate to the project folder:
   ```bash
   cd "Task 5-Advanced CRUD Operations"
   ```
3. (Optional) If you have VS Code installed, open the project:
   ```bash
   code .
   ```
4. Start a local server using Live Server (Recommended).
                      or
   if you have Node.js installed, run:
   ```bash
   npx serve .
   ```
   or
   ```bash
   npx http-server
   ```
5. Open your browser and visit:
   ```bash
   http://localhost:3000
   ```
   or
   ```bash
   http://127.0.0.1:8080
   ```
   (depending on the server you're using)

### IDE (VS Code, WebStorm, Sublime Text)
- Open the **Task 5-Advanced CRUD Operations** project folder in your preferred code editor.
- Open the `index.html` file or launch the project using the **Live Server** extension.
- The application will open in your default web browser.
- Start creating, updating, searching, filtering, sorting, and managing tasks.

## 🔮 Future Enhancements
- User Authentication
- Cloud Database Integration
- Task Categories
- Drag-and-Drop Task Ordering
- Calendar View
- Task Reminders
- Due Date Notifications
- Recurring Tasks
- Team Collaboration
- Progressive Web App (PWA)
- Offline Sync
- Charts and Analytics
- Multi-language Support

## Project Done By:
**Author:** Ritish Kannur  
**Internship:** Software Development  
**Project:** Task Master
