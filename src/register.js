import { supabase } from './supabase.js';

const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const fullName = document.querySelector('#fullName').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert('Registration successful. Check your email for confirmation.');

  console.log(data);
});