import { supabase } from './supabase.js';

const params = new URLSearchParams(window.location.search);
const projectId = params.get('project');

const taskForm = document.querySelector('#taskForm');
const tasksContainer = document.querySelector('#tasksContainer');
const projectTitle = document.querySelector('#projectTitle');

async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    window.location.href = '/login.html';
    return null;
  }

  return data.user;
}

async function loadProject() {
  if (!projectId) {
    projectTitle.textContent = 'All Tasks';
    return;
  }

  const { data: project, error } = await supabase
    .from('projects')
    .select('name')
    .eq('id', projectId)
    .single();

  if (error) {
    projectTitle.textContent = 'Task Board';
    return;
  }

  projectTitle.textContent = project.name;
}

async function loadTasks() {
  const user = await getCurrentUser();

  if (!user) {
    return;
  }

  let query = supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false });

  if (projectId) {
    query = query.eq('project_id', projectId);
  }

  const { data: tasks, error } = await query;

  if (error) {
    alert(error.message);
    return;
  }

  tasksContainer.innerHTML = '';

  if (tasks.length === 0) {
    tasksContainer.innerHTML =
      '<p class="text-muted">No tasks yet.</p>';
    return;
  }

  tasks.forEach((task) => {
    const taskCard = document.createElement('div');
    taskCard.className = 'col-md-6 col-lg-4';

    taskCard.innerHTML = `
      <div class="card shadow-sm h-100">
        <div class="card-body">
          <h5 class="card-title">${task.title}</h5>

          <p class="card-text">
            ${task.description || 'No description'}
          </p>

          <p class="mb-3">
            <strong>Status:</strong> ${task.status}
          </p>

          <button
            class="btn btn-outline-success me-2 complete-task-btn"
            data-id="${task.id}"
          >
            Complete
          </button>

          <button
            class="btn btn-outline-danger delete-task-btn"
            data-id="${task.id}"
          >
            Delete
          </button>
        </div>
      </div>
    `;

    tasksContainer.appendChild(taskCard);
  });

  document.querySelectorAll('.complete-task-btn').forEach((button) => {
    button.addEventListener('click', async () => {
      const taskId = button.dataset.id;

      const { error } = await supabase
        .from('tasks')
        .update({ status: 'completed' })
        .eq('id', taskId);

      if (error) {
        alert(error.message);
        return;
      }

      loadTasks();
    });
  });

  document.querySelectorAll('.delete-task-btn').forEach((button) => {
    button.addEventListener('click', async () => {
      const taskId = button.dataset.id;

      const confirmed = confirm('Delete this task?');

      if (!confirmed) {
        return;
      }

      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (error) {
        alert(error.message);
        return;
      }

      loadTasks();
    });
  });
}

if (taskForm) {
  taskForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const user = await getCurrentUser();

    if (!user) {
      return;
    }

    const title = document.querySelector('#taskTitle').value.trim();
    const description = document
      .querySelector('#taskDescription')
      .value.trim();

    const { error } = await supabase
      .from('tasks')
      .insert({
        user_id: user.id,
        project_id: projectId || null,
        title,
        description,
        status: 'not_started',
      });

    if (error) {
      alert(error.message);
      return;
    }

    taskForm.reset();
    loadTasks();
  });
}

loadProject();
loadTasks();