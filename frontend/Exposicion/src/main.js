const form = document.getElementById("loginForm");
const searchBtn = document.getElementById("searchBtn");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    password: document.getElementById("password").value,
  };

  try {
    const res = await fetch("http://localhost:4000/ejemplo3", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error ${res.status}: ${errorText}`);
    }

    const result = await res.json();
    alert(`✅ ${result.message}`);
    console.log(result);
  } catch (err) {
    console.error("❌ Error en POST:", err);
  }
});

searchBtn.addEventListener("click", async () => {
  const name = document.getElementById("searchName").value.trim();
  if (!name) return alert("Por favor ingresa un nombre");

  try {
    const res = await fetch(`http://localhost:4000/ejemplo4?name=${encodeURIComponent(name)}`);

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error ${res.status}: ${errorText}`);
    }

    const usuario = await res.json();
    resultDiv.innerHTML = `
      <p><strong>Nombre:</strong> ${usuario.name}</p>
      <p><strong>Contraseña (encriptada):</strong> ${usuario.password}</p>
    `;
  } catch (err) {
    console.error("❌ Error en GET:", err);
    resultDiv.textContent = "No se pudo obtener el usuario";
  }
});

const deleteBtn = document.getElementById("deleteBtn");
const deleteResult = document.getElementById("deleteResult");

deleteBtn.addEventListener("click", async () => {
  const name = document.getElementById("deleteName").value.trim();
  if (!name) return alert("Por favor ingresa un nombre para eliminar");

  if (!confirm(`¿Seguro que quieres eliminar al usuario "${name}"?`)) return;

  try {
    const res = await fetch(`http://localhost:4000/ejemplo5?name=${encodeURIComponent(name)}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error ${res.status}: ${errorText}`);
    }

    const result = await res.json();
    deleteResult.textContent = `✅ ${result.mensaje}`;
    console.log(result);
  } catch (err) {
    console.error("❌ Error en DELETE:", err);
    deleteResult.textContent = "No se pudo eliminar el usuario";
  }
});
