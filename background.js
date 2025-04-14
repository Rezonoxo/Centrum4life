// Kod dla pliku głównego (np. index.html)

const musicButton = document.getElementById('musicButton');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const backgroundMusic = document.getElementById('backgroundMusic');
const contentContainer = document.getElementById('content');
const navLinks = document.querySelectorAll('.nav-link');

// Ustawienie domyślnej głośności i zapętlenia
backgroundMusic.volume = 0.5;
backgroundMusic.loop = true;

// Funkcja przełączająca muzykę
function toggleMusic() {
    if (backgroundMusic.paused) {
        backgroundMusic.play()
            .then(() => {
                playIcon.classList.add('hidden');
                pauseIcon.classList.remove('hidden');
                // Zapisz stan odtwarzania
                localStorage.setItem('musicPlaying', 'true');
            })
            .catch(error => {
                console.error("Błąd podczas odtwarzania muzyki:", error);
            });
    } else {
        backgroundMusic.pause();
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
        // Zapisz stan odtwarzania
        localStorage.setItem('musicPlaying', 'false');
    }
}

// Nasłuchiwanie kliknięcia przycisku
musicButton.addEventListener('click', toggleMusic);

// Ładowanie zawartości stron bez przeładowania całej strony
function loadPage(url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            contentContainer.innerHTML = html;
            // Aktualizacja historii przeglądarki
            history.pushState(null, '', url);
        })
        .catch(error => {
            console.error('Błąd ładowania strony:', error);
            contentContainer.innerHTML = '<p>Wystąpił błąd podczas ładowania strony.</p>';
        });
}

// Obsługa kliknięć w linki nawigacyjne
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const pageUrl = this.getAttribute('href');
        loadPage(pageUrl);
    });
});

// Obsługa przycisku wstecz/dalej w przeglądarce
window.addEventListener('popstate', function() {
    loadPage(window.location.pathname);
});

// Sprawdź zapisany stan muzyki przy ładowaniu strony
document.addEventListener('DOMContentLoaded', function() {
    const musicPlaying = localStorage.getItem('musicPlaying');
    
    if (musicPlaying === 'true') {
        backgroundMusic.play()
            .then(() => {
                playIcon.classList.add('hidden');
                pauseIcon.classList.remove('hidden');
            })
            .catch(error => {
                console.error("Błąd podczas odtwarzania muzyki:", error);
            });
    }
});