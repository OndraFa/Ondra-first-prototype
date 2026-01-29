// Funkce pro zobrazení zprávy
function showMessage() {
    const output = document.getElementById('output');
    const now = new Date().toLocaleString();
    output.innerHTML = `Button clicked at: ${now}`;
}
// Funkce pro načtení náhodných portrétů
function loadPortraits() {
    const container = document.getElementById('portraits-container');
    container.innerHTML = ''; // Vyčistit předchozí obrázky
    
    // Vytvořit 3 náhodné portréty
    for (let i = 0; i < 3; i++) {
        const card = document.createElement('div');
        card.className = 'portrait-card';
        
        // Zobrazit loading stav
        const loading = document.createElement('div');
        loading.className = 'loading';
        loading.textContent = 'Načítání...';
        card.appendChild(loading);
        
        container.appendChild(card);
        
        // Vytvořit obrázek s náhodným seedem pro zajištění různých obrázků
        const img = document.createElement('img');
        const randomSeed = Math.floor(Math.random() * 1000) + Date.now() + i;
        
        // Použít Unsplash Source API pro náhodné portréty mladých lidí
        // Přidat cache-busting parametr pro zajištění různých obrázků
        img.src = `https://source.unsplash.com/random/400x400/?portrait,young,person&sig=${randomSeed}`;
        img.alt = `Portrét ${i + 1}`;
        
        // Zpracování načtení obrázku
        img.onload = function() {
            card.innerHTML = '';
            card.appendChild(img);
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease';
                card.style.opacity = '1';
            }, 10);
        };
        
        // Zpracování chyby
        img.onerror = function() {
            // Fallback na alternativní službu pokud Unsplash nefunguje
            img.src = `https://picsum.photos/seed/${randomSeed}/400/400`;
        };
    }
}

// Načíst portréty při načtení stránky
document.addEventListener('DOMContentLoaded', function() {
    loadPortraits();
});
