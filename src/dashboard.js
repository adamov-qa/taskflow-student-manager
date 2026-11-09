import { supabase } from './supabase.js';

const projectsCount = document.querySelector('#projectsCount');
const activeTasksCount = document.querySelector('#activeTasksCount');
const completedTasksCount = document.querySelector('#completedTasksCount');

async function loadDashboard() {
  const { data: userData, error: userError } =
    await supabase.auth.getUser();

  if (userError || !userData.user) {
    window.location.href = '/login.html';
    return;
  }

  const userId = userData.user.id;

  const {
    count: projectCount,
    error: projectsError,
  } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  if (projectsError) {
    console.error(projectsError);
  }

  const {
    count: activeCount,
    error: activeError,
  } = await supabase
    .from('tasks')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .neq('status', 'completed');

  if (activeError) {
    console.error(activeError);
  }

  const {
    count: completedCount,
    error: completedError,
  } = await supabase
    .from('tasks')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('status', 'completed');

  if (completedError) {
    console.error(completedError);
  }

  projectsCount.textContent = projectCount ?? 0;
  activeTasksCount.textContent = activeCount ?? 0;
  completedTasksCount.textContent = completedCount ?? 0;
}

loadDashboard();