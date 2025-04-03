function toggleInput() {
  const type = document.getElementById("calcType").value;
  document.getElementById("budgetInput").style.display = type === "budget" ? "block" : "none";
  document.getElementById("quantityInput").style.display = type === "quantity" ? "block" : "none";
}

function roundValue(value, method, rate) {
  if (method === "error_margin") return Math.round((value - value * 0.05));
  if (method === "round") return Math.round(value);
  return value;
}

function calculate() {
  const calcType = document.getElementById("calcType").value;
  const buyRate = parseFloat(document.getElementById("buyRate").value);
  const sellRate = parseFloat(document.getElementById("sellRate").value);
  const roundMethod = document.getElementById("round").value;
  let pointsBought, totalSell, profit;

  if (isNaN(buyRate) || isNaN(sellRate)) {
    alert("Proszę wpisać poprawne wartości we wszystkich polach!");
    return;
  }

  if (calcType === "budget") {
    const budget = parseFloat(document.getElementById("budget").value);
    if (isNaN(budget)) {
      alert("Proszę wpisać poprawny budżet!");
      return;
    }
    pointsBought = budget / buyRate;
  } else {
    pointsBought = parseFloat(document.getElementById("quantity").value);
    if (isNaN(pointsBought)) {
      alert("Proszę wpisać poprawną ilość punktów!");
      return;
    }
  }

  pointsBought = roundValue(pointsBought, roundMethod, buyRate);
  totalSell = roundValue(pointsBought * sellRate, roundMethod);
  profit = roundValue(totalSell - (pointsBought * buyRate), roundMethod);
  
  document.getElementById("result").innerHTML = `
    <p><strong>Punkty, które można kupić:</strong> ${pointsBought}</p>
    <p><strong>Kwota po sprzedaży:</strong> ${totalSell} PLN</p>
    <p><strong>Profit:</strong> ${profit} PLN</p>
  `;
}