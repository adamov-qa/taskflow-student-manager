import { supabase } from './supabase.js';

const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  console.log(data);

  window.location.href = '/dashboard.html';
});