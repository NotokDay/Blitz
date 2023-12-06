const fileInput = document.getElementById('fileInput');
const messageDiv = document.getElementById('message');

fileInput.addEventListener('change', () => {
  const fileName = fileInput.files[0].name;
  messageDiv.innerHTML = `Selected file: <strong>${fileName}</strong>`;
});
