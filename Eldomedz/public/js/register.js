document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(document.getElementById('registerForm'));

  try {
    const response = await fetch('/auth/register', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    
    if (response.ok) {
      alert(result.message);
      window.location.href = '/auth/login';  
    } else {
      alert(result.message);  
    }
  } catch (error) {
    console.error('Error:', error);
  }
});
