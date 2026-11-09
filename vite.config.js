import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  input: {
    main: resolve(import.meta.dirname, 'index.html'),
    login: resolve(import.meta.dirname, 'login.html'),
    register: resolve(import.meta.dirname, 'register.html'),
    dashboard: resolve(import.meta.dirname, 'dashboard.html'),
    projects: resolve(import.meta.dirname, 'projects.html'),
    tasks: resolve(import.meta.dirname, 'tasks.html'),
    admin: resolve(import.meta.dirname, 'admin.html'),
  },
});