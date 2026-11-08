import { supabase } from './supabase.js';

const { data, error } = await supabase.auth.getUser();

if (error || !data.user) {
  window.location.href = '/login.html';
}

const logoutButton = document.querySelector('#logoutButton');

if (logoutButton) {
  logoutButton.addEventListener('click', async () => {
    const { error } = await supabase.auth.signOut({ scope: 'local' });

    if (error) {
      alert(error.message);
      return;
    }

    window.location.href = '/login.html';
  });
}