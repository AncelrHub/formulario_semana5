const form = document.getElementById("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("inputName").value;
  const email = document.getElementById("inputEmail").value;
  const message = document.getElementById("inputMessage").value;

  try {
    const response = await fetch('http://localhost:3000/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ name, email, message })
    });

    const data = await response.json();
    const responseMessage = document.getElementById("responseMessage");

    if (data.success) {
      responseMessage.innerHTML = '<div class="alert alert-success">¡Mensaje enviado correctamente!</div>';
      form.reset();
    } else {
      responseMessage.innerHTML = '<div class="alert alert-danger">Error al enviar el mensaje. Intenta de nuevo.</div>';
    }
  } catch (error) {
    console.error('Error:', error);
    document.getElementById("responseMessage").innerHTML = '<div class="alert alert-danger">Hubo un error al enviar los datos.</div>';
  }
});
