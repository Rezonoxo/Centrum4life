function calculateCoal() {
    const mode = document.getElementById("mode").value;
    const price = parseFloat(document.getElementById("price").value);
    const calculationMode = document.getElementById("calculationMode").value;
    const deductDeposit = document.getElementById("deductDeposit").checked;
    let kg = 0;

    if (isNaN(price)) {
        alert("Podaj cenę za kilogram węgla!");
        return;
    }

    if (mode === "manual") {
        kg = parseFloat(document.getElementById("coalKg").value);
        if (isNaN(kg)) {
            alert("Podaj ilość kilogramów węgla!");
            return;
        }
    } else {
        const rank = parseInt(document.getElementById("rank").value);
        const time = parseFloat(document.getElementById("time").value);

        if (isNaN(time)) {
            alert("Podaj czas pracy w minutach!");
            return;
        }

        const rates = {
            1: { kg: 50, time: 8 },
            2: { kg: 60, time: 8 },
            3: { kg: 75, time: 9 },
        };
        const cycle = rates[rank];
        kg = (time / cycle.time) * cycle.kg;
    }

    if (calculationMode === "margin") {
        kg *= 0.9; // Zmniejszenie o 10%
    }

    let total = kg * price;

    if (deductDeposit) {
        total -= 1000; // Odejmowanie kosztu kaucji
    }

    const formattedKg = kg.toFixed(2);
    const formattedTotal = total.toFixed(2);

    document.getElementById("result").innerHTML = `
        <p>📦 Zebrano: <strong>${formattedKg} kg</strong></p>
        ${deductDeposit ? '<p>🛒 Odjęto koszt kaucji: <strong>1000 PLN</strong></p>' : ''}
        <p>💵 Łączne wynagrodzenie: <strong>${formattedTotal} PLN</strong></p>
        <button id="showCalculations">Pokaż obliczenia</button>
    `;

    document.getElementById("showCalculations").addEventListener("click", () => {
        let calculations = `Obliczenia:\n`;
        calculations += `1. Tryb: ${mode === "manual" ? "Ręczny" : "Automatyczny"}\n`;
        
        if (mode === "manual") {
            calculations += `2. Podana ilość kilogramów: ${kg.toFixed(2)} kg\n`;
            calculations += `3. Równanie: kg = ${kg.toFixed(2)}\n`;
        } else {
            const rank = parseInt(document.getElementById("rank").value);
            const time = parseFloat(document.getElementById("time").value);
            const rates = {
                1: { kg: 50, time: 8 },
                2: { kg: 60, time: 8 },
                3: { kg: 75, time: 9 },
            };
            const cycle = rates[rank];
            calculations += `2. Wybrany stopień: ${rank}\n`;
            calculations += `3. Czas pracy: ${time} minut\n`;
            calculations += `4. Wzorzec cyklu: ${cycle.kg} kg na ${cycle.time} minut\n`;
            calculations += `5. Równanie: kg = (czas pracy / czas cyklu) * kg cyklu\n`;
            calculations += `   kg = (${time} / ${cycle.time}) * ${cycle.kg}\n`;
            calculations += `   kg = ${kg.toFixed(2)}\n`;
        }

        if (calculationMode === "margin") {
            calculations += `6. Tryb obliczeń: Marża (zmniejszono o 10%)\n`;
            calculations += `7. Równanie: kg = kg * 0.9\n`;
            calculations += `   kg = ${kg.toFixed(2)}\n`;
        }

        calculations += `8. Cena za kilogram: ${price.toFixed(2)} PLN\n`;
        calculations += `9. Równanie: łączna kwota = kg * cena za kilogram\n`;
        calculations += `   łączna kwota = ${kg.toFixed(2)} * ${price.toFixed(2)}\n`;
        calculations += `   łączna kwota = ${(kg * price).toFixed(2)} PLN\n`;

        if (deductDeposit) {
            calculations += `10. Odjęto koszt kaucji: 1000 PLN\n`;
            calculations += `11. Równanie: łączna kwota = łączna kwota - 1000\n`;
            calculations += `    łączna kwota = ${(kg * price).toFixed(2)} - 1000\n`;
            calculations += `    łączna kwota = ${formattedTotal} PLN\n`;
        } else {
            calculations += `10. Łączna kwota: ${formattedTotal} PLN\n`;
        }

        alert(calculations);
    });
}

function toggleCoalInput() {
    const mode = document.getElementById("mode").value;
    document.getElementById("manualInput").style.display = mode === "manual" ? "block" : "none";
    document.getElementById("autoInput").style.display = mode === "auto" ? "block" : "none";
}

function setPrice(value) {
    document.getElementById("price").value = value;
}