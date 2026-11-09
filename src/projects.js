import { supabase } from './supabase.js';

const projectForm = document.querySelector('#projectForm');
const projectsContainer = document.querySelector('#projectsContainer');

async function loadProjects() {
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    window.location.href = '/login.html';
    return;
  }

  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    alert(error.message);
    return;
  }

  projectsContainer.innerHTML = '';

  if (projects.length === 0) {
    projectsContainer.innerHTML = `
      <div class="col-12">
        <p class="text-muted">No projects yet.</p>
      </div>
    `;
    return;
  }

  projects.forEach((project) => {
    const projectCard = document.createElement('div');
    projectCard.className = 'col-md-6 col-lg-4';

    projectCard.innerHTML = `
      <div class="card shadow-sm h-100">
        <div class="card-body">
          <h5 class="card-title">${project.name}</h5>
          <p class="card-text">
            ${project.description || 'No description'}
          </p>

          <a
            href="/tasks.html?project=${project.id}"
            class="btn btn-outline-primary me-2"
          >
            View Tasks
          </a>

          <button
            class="btn btn-outline-danger delete-project-btn"
            data-id="${project.id}"
          >
            Delete
          </button>
        </div>
      </div>
    `;

    projectsContainer.appendChild(projectCard);
  });

  document.querySelectorAll('.delete-project-btn').forEach((button) => {
    button.addEventListener('click', async () => {
      const projectId = button.dataset.id;

      const confirmed = confirm('Delete this project?');

      if (!confirmed) {
        return;
      }

      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) {
        alert(error.message);
        return;
      }

      loadProjects();
    });
  });
}

if (projectForm) {
  projectForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.querySelector('#projectName').value.trim();
    const description = document
      .querySelector('#projectDescription')
      .value.trim();

    const { data: userData, error: userError } =
      await supabase.auth.getUser();

    if (userError || !userData.user) {
      window.location.href = '/login.html';
      return;
    }

    const { error } = await supabase
      .from('projects')
      .insert({
        user_id: userData.user.id,
        name,
        description,
      });

    if (error) {
      alert(error.message);
      return;
    }

    projectForm.reset();

    loadProjects();
  });
}

loadProjects();