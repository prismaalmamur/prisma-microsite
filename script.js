document.addEventListener('DOMContentLoaded', () => {

    // --- Sapaan Berdasarkan Waktu ---
    const sapaanElement = document.getElementById('sapaan');
    if (sapaanElement) {
        const jamSekarang = new Date().getHours();
        let teksSapaan;
        if (jamSekarang < 4) teksSapaan = "✨ Selamat Dini Hari!";
        else if (jamSekarang < 11) teksSapaan = "☀️ Selamat Pagi!";
        else if (jamSekarang < 15) teksSapaan = "🌞 Selamat Siang!";
        else if (jamSekarang < 19) teksSapaan = "🌥️ Selamat Sore!";
        else teksSapaan = "🌙 Selamat Malam!";
        sapaanElement.textContent = teksSapaan;
    }

    // --- Logika Ganti Tema ---
    const themeButtons = document.querySelectorAll('.theme-btn');
    const htmlElement = document.documentElement;
    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.dataset.theme;
            htmlElement.setAttribute('data-theme', theme);
            // Simpan tema pilihan ke local storage
            localStorage.setItem('selectedTheme', theme);
            // Update tombol aktif
            document.querySelector('.theme-btn.active').classList.remove('active');
            btn.classList.add('active');
        });
    });
    // Cek tema yang tersimpan saat halaman dimuat
    const savedTheme = localStorage.getItem('selectedTheme') || 'default';
    htmlElement.setAttribute('data-theme', savedTheme);
    document.querySelector(`.theme-btn[data-theme="${savedTheme}"]`).classList.add('active');


    // --- Analitik Klik Tombol ---
    const linkCards = document.querySelectorAll('.link-card');
    let clickData = JSON.parse(localStorage.getItem('linkClicks')) || {};

    linkCards.forEach(card => {
        const linkId = card.dataset.linkId;
        // Update tampilan awal
        if (clickData[linkId]) {
            document.getElementById(`count-${linkId}`).textContent = clickData[linkId];
        }
        // Tambah event listener
        card.addEventListener('click', () => {
            clickData[linkId] = (clickData[linkId] || 0) + 1;
            document.getElementById(`count-${linkId}`).textContent = clickData[linkId];
            localStorage.setItem('linkClicks', JSON.stringify(clickData));
        });
    });

    // --- Logika QR Code ---
    const qrModal = document.getElementById('qr-modal');
    const qrBtn = document.getElementById('qr-code-btn');
    const closeBtn = document.querySelector('.close-btn');
    const qrCodeContainer = document.getElementById('qrcode');
    const qrUrlText = document.querySelector('.qr-url');

    qrBtn.addEventListener('click', () => {
        const url = window.location.href;
        qrUrlText.textContent = url;
        qrCodeContainer.innerHTML = ""; // Bersihkan QR code lama
        new QRCode(qrCodeContainer, {
            text: url,
            width: 128,
            height: 128,
        });
        qrModal.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => qrModal.style.display = 'none');
    window.addEventListener('click', (e) => {
        if (e.target == qrModal) qrModal.style.display = 'none';
    });
});