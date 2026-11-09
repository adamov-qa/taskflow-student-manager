# TaskFlow Student Manager

TaskFlow is a multi-page web application for managing projects and tasks.

The application was created as a capstone project using HTML, CSS, JavaScript, Bootstrap, Vite and Supabase.

## Live Demo

https://taskflow-student-app.netlify.app

## GitHub Repository

https://github.com/adamov-qa/taskflow-student-manager

## Features

- User registration
- User login and logout
- Protected pages
- Project CRUD operations
- Task CRUD operations
- Task status management
- Dashboard with live project and task statistics
- Supabase Storage attachment upload
- User roles
- Admin panel
- Row Level Security
- Responsive Bootstrap interface
- Netlify deployment

## Technology Stack

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Vite
- Supabase
  - PostgreSQL Database
  - Authentication
  - Row Level Security
  - Storage
- Git and GitHub
- Netlify

## Application Architecture

TaskFlow uses a client-server architecture.

The frontend is built with HTML, CSS and JavaScript and communicates directly with Supabase using the Supabase JavaScript client.

Supabase provides:

- Database
- Authentication
- Authorization
- Row Level Security
- File Storage

The application contains multiple HTML pages and separate JavaScript modules for the main features.

## Application Pages

- `index.html` - Home page
- `login.html` - User login
- `register.html` - User registration
- `dashboard.html` - Dashboard statistics
- `projects.html` - Project management
- `tasks.html` - Task management and attachments
- `admin.html` - Admin panel

## Database Schema

The project uses four main database tables:

### profiles

Stores application user profiles.

Fields:

- `id`
- `full_name`
- `role`
- `created_at`

### projects

Stores projects created by users.

Fields:

- `id`
- `user_id`
- `name`
- `description`
- `created_at`

### tasks

Stores tasks related to projects.

Fields:

- `id`
- `user_id`
- `project_id`
- `title`
- `description`
- `status`
- `created_at`

### attachments

Stores metadata for files uploaded to Supabase Storage.

Fields:

- `id`
- `user_id`
- `task_id`
- `file_name`
- `file_path`
- `created_at`

## Database Relationships

```mermaid
erDiagram
    PROFILES {
        uuid id PK
        text full_name
        text role
        timestamptz created_at
    }

    PROJECTS {
        uuid id PK
        uuid user_id FK
        text name
        text description
        timestamptz created_at
    }

    TASKS {
        uuid id PK
        uuid user_id FK
        uuid project_id FK
        text title
        text description
        text status
        timestamptz created_at
    }

    ATTACHMENTS {
        uuid id PK
        uuid user_id FK
        uuid task_id FK
        text file_name
        text file_path
        timestamptz created_at
    }

    PROFILES ||--o{ PROJECTS : owns
    PROFILES ||--o{ TASKS : owns
    PROJECTS ||--o{ TASKS : contains
    TASKS ||--o{ ATTACHMENTS : has