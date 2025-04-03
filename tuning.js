document.addEventListener('DOMContentLoaded', function() {
    const carValueBtn = document.getElementById('carValue');
    const resultDiv = document.getElementById('result');
    const totalValueSpan = document.getElementById('totalValue');
    const breakdownDiv = document.getElementById('breakdown');

    // Funkcja obliczająca wartość tuningu
    function calculateTuningValue() {
        let total = 0;
        const breakdown = [];
        const selects = document.querySelectorAll('select');
        
        selects.forEach(select => {
            const value = parseInt(select.value) || 0;
            if (value > 0) {
                total += value;
                breakdown.push({
                    name: select.options[select.selectedIndex].text.split('(')[0].trim(),
                    value: value
                });
            }
        });

        return { total, breakdown };
    }

    // Obsługa przycisku obliczania
    carValueBtn.addEventListener('click', function() {
        const { total, breakdown } = calculateTuningValue();
        
        totalValueSpan.textContent = total.toLocaleString();
        
        // Generowanie podsumowania
        breakdownDiv.innerHTML = breakdown
            .map(item => `<p>${item.name}: ${item.value.toLocaleString()} PLN</p>`)
            .join('');
        
        resultDiv.classList.remove('d-none');
    });

    // Automatyczne przeliczanie przy zmianie opcji
    document.querySelectorAll('select').forEach(select => {
        select.addEventListener('change', function() {
            if (!resultDiv.classList.contains('d-none')) {
                carValueBtn.click();
            }
        });
    });
});