import { supabase } from './supabase.js';

const usersTableBody = document.querySelector('#usersTableBody');
const adminMessage = document.querySelector('#adminMessage');

async function loadAdminPanel() {
  const { data: userData, error: userError } =
    await supabase.auth.getUser();

  if (userError || !userData.user) {
    window.location.href = '/login.html';
    return;
  }

  const userId = userData.user.id;

  const { data: currentProfile, error: profileError } =
    await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();

  if (profileError) {
    adminMessage.textContent = profileError.message;
    adminMessage.classList.remove('d-none');
    return;
  }

  if (currentProfile.role !== 'admin') {
    window.location.href = '/dashboard.html';
    return;
  }

  const { data: profiles, error: profilesError } =
    await supabase
      .from('profiles')
      .select('id, full_name, role, created_at')
      .order('created_at', { ascending: false });

  if (profilesError) {
    adminMessage.textContent = profilesError.message;
    adminMessage.classList.remove('d-none');
    return;
  }

  usersTableBody.innerHTML = '';

  profiles.forEach((profile) => {
    const row = document.createElement('tr');

    const createdAt = new Date(
      profile.created_at
    ).toLocaleString();

    row.innerHTML = `
      <td>${profile.full_name || 'No name'}</td>
      <td>
        <span class="badge ${
          profile.role === 'admin'
            ? 'text-bg-danger'
            : 'text-bg-secondary'
        }">
          ${profile.role}
        </span>
      </td>
      <td>${createdAt}</td>
    `;

    usersTableBody.appendChild(row);
  });
}

loadAdminPanel();