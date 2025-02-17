const form = document.getElementById("device-form");
const deviceList = document.getElementById("device-list");
const totalDaily = document.getElementById("total-daily");
const totalMonthly = document.getElementById("total-monthly");
const totalCostDaily = document.getElementById("total-cost-daily");
const totalCostMonthly = document.getElementById("total-cost-monthly");
const toggleTheme = document.getElementById("toggle-theme");

let devices = [];

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("device-name").value || "Dispositivo";
    const power = parseFloat(document.getElementById("power").value);
    const hours = parseFloat(document.getElementById("hours").value);
    const cost = parseFloat(document.getElementById("cost").value || 0);

    if (isNaN(power) || isNaN(hours) || power <= 0 || hours <= 0) {
        alert("Por favor, ingresa valores válidos para potencia y horas de uso.");
        return;
    }

    const dailyConsumption = (power * hours) / 1000;
    const monthlyConsumption = dailyConsumption * 30;
    const dailyCost = cost ? dailyConsumption * cost : 0;
    const monthlyCost = dailyCost * 30;

    devices.push({ name, power, hours, dailyConsumption, monthlyConsumption, dailyCost, monthlyCost });
    updateTable();
    form.reset();
});

function updateTable() {
    deviceList.innerHTML = "";
    let totalDailyConsumption = 0, totalMonthlyConsumption = 0, totalDailyCost = 0, totalMonthlyCost = 0;

    devices.forEach((device, index) => {
        totalDailyConsumption += device.dailyConsumption;
        totalMonthlyConsumption += device.monthlyConsumption;
        totalDailyCost += device.dailyCost;
        totalMonthlyCost += device.monthlyCost;

        deviceList.innerHTML += `
            <tr>
                <td>${device.name}</td>
                <td>${device.power}</td>
                <td>${device.hours}</td>
                <td>${device.dailyConsumption.toFixed(2)}</td>
                <td>${device.monthlyConsumption.toFixed(2)}</td>
                <td>${device.dailyCost.toFixed(2)}</td>
                <td>${device.monthlyCost.toFixed(2)}</td>
                <td><button class="delete-btn" data-index="${index}">Eliminar</button></td>
            </tr>`;
    });

    totalDaily.textContent = totalDailyConsumption.toFixed(2);
    totalMonthly.textContent = totalMonthlyConsumption.toFixed(2);
    totalCostDaily.textContent = totalDailyCost.toFixed(2);
    totalCostMonthly.textContent = totalMonthlyCost.toFixed(2);
}

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        devices.splice(event.target.dataset.index, 1);
        updateTable();
    }
});

toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
