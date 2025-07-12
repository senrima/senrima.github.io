// GANTI DENGAN URL DEPLOYMENT BARU ANDA
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwSL37c-dcM5KkPIdmfRHdAg7-IOPSqrFYifQfkgkg7HmqMuOtjMv-znr5fgMAooSzp/exec";

const testBtn = document.getElementById('test-btn');
const statusDiv = document.getElementById('status');

testBtn.addEventListener('click', () => {
    statusDiv.textContent = 'Mengirim Ping...';
    testBtn.disabled = true;

    fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'ping' })
    })
    .then(res => {
        if (!res.ok) {
            // Ini akan menangani error HTTP seperti 404, 500
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        // Menampilkan pesan dari Google Script
        statusDiv.textContent = `Respon Server: ${data.message}`;
        statusDiv.style.color = data.status === 'success' ? 'green' : 'red';
    })
    .catch(error => {
        // Menampilkan error seperti CORS atau Failed to Fetch
        statusDiv.textContent = `Error: ${error.message}`;
        statusDiv.style.color = 'red';
    })
    .finally(() => {
        testBtn.disabled = false;
    });
});
