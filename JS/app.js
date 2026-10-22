// Stări globale pentru a sincroniza cele două selectoare (țară și metrică)
let activeCountry = 'romania';
let activeMetric = 'internet';

let currentBarChart = null;
let currentLineChart = null;
let currentRadarChart = null;

const globalAverages = { educatie: 0, internet: 0, dispozitive: 0 };
const radarAverages = [0, 0, 0, 0]; 

const metricConfig = {
    internet: { label: 'Evoluție Acces Internet (%)', color: '#4ade80', bg: 'rgba(74, 222, 128, 0.1)' },
    educatie: { label: 'Evoluție Înmatriculare Învățământ Secundar (%)', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.1)' },
    dispozitive: { label: 'Evoluție Deținere Dispozitive (%)', color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.1)' }
};

function calculateGlobalAverages() {
    const countries = Object.keys(statsData);
    let totalEdu = 0, totalNet = 0, totalDev = 0;
    let totalRadar = [0, 0, 0, 0];

    countries.forEach(key => {
        totalEdu += statsData[key].chartData[0];
        totalNet += statsData[key].chartData[1];
        totalDev += statsData[key].chartData[2];
        
        for (let i = 0; i < 4; i++) {
            totalRadar[i] += statsData[key].radarScores[i];
        }
    });

    globalAverages.educatie = totalEdu / countries.length;
    globalAverages.internet = totalNet / countries.length;
    globalAverages.dispozitive = totalDev / countries.length;

    for (let i = 0; i < 4; i++) {
        radarAverages[i] = totalRadar[i] / countries.length;
    }
}

function renderMatrixTable() {
    const tableBody = document.getElementById('matrixTableBody');
    tableBody.innerHTML = '';

    Object.keys(statsData).forEach(key => {
        const country = statsData[key];
        const row = document.createElement('tr');
        
        if (key === activeCountry) {
            row.className = 'active-row';
        }

        row.innerHTML = `
            <td>${country.countryName}</td>
            <td>${country.bioClimate.climatic1}</td>
            <td>${country.bioClimate.climatic2}</td>
            <td>${country.bioClimate.biologic1}</td>
            <td>${country.bioClimate.biologic2}</td>
        `;
        tableBody.appendChild(row);
    });
}

function updateUI(countryKey) {
    const data = statsData[countryKey];
    const mainContent = document.getElementById('mainContent');

    mainContent.classList.remove('fade-in-up');
    void mainContent.offsetWidth; 
    mainContent.classList.add('fade-in-up');

    document.getElementById('selected-country-title').innerText = data.countryName;
    document.getElementById('data-year').innerText = data.meta.an;
    document.getElementById('data-source').innerText = data.meta.sursa;
    document.getElementById('kpi-edu').innerText = data.kpi.educatie;
    document.getElementById('kpi-net').innerText = data.kpi.internet;
    document.getElementById('kpi-dev').innerText = data.kpi.dispozitive;
    
    document.getElementById('critical-text-edu').innerText = data.criticaEdu;
    document.getElementById('critical-text-bio').innerText = data.criticaBio;

    renderBadge('badge-edu', data.chartData[0], globalAverages.educatie);
    renderBadge('badge-net', data.chartData[1], globalAverages.internet);
    renderBadge('badge-dev', data.chartData[2], globalAverages.dispozitive);

    renderMatrixTable();
}

function renderBadge(elementId, countryValue, averageValue) {
    const badgeElement = document.getElementById(elementId);
    if (countryValue >= averageValue) {
        badgeElement.innerText = "Peste medie";
        badgeElement.className = "badge above";
    } else {
        badgeElement.innerText = "Sub medie";
        badgeElement.className = "badge below";
    }
}

function updateBarChart(countryKey) {
    const data = statsData[countryKey];
    const ctxBar = document.getElementById('indicatorsChart').getContext('2d');
    
    if (currentBarChart) currentBarChart.destroy();
    
    currentBarChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ['Educație Secundară', 'Acces Internet', 'Posedare Dispozitive'],
            datasets: [{
                data: data.chartData,
                backgroundColor: ['#38bdf8', '#4ade80', '#fbbf24'],
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { grid: { color: '#334155' }, ticks: { color: '#94a3b8' }, min: 0, max: 100 },
                x: { grid: { display: false }, ticks: { color: '#f8fafc', font: { weight: '600' } } }
            }
        }
    });
}

function updateLineChart(countryKey, metricKey) {
    const data = statsData[countryKey];
    const config = metricConfig[metricKey];
    const ctxLine = document.getElementById('historyChart').getContext('2d');
    
    if (currentLineChart) currentLineChart.destroy();
    
    currentLineChart = new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: ['2021', '2022', '2023', '2024', '2025'],
            datasets: [{
                label: config.label,
                data: data.history[metricKey],
                borderColor: config.color,
                backgroundColor: config.bg,
                borderWidth: 3,
                tension: 0.3,
                fill: true,
                pointBackgroundColor: config.color,
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: '#94a3b8', font: { family: 'Inter' } } } },
            scales: {
                y: { grid: { color: '#334155' }, ticks: { color: '#94a3b8' }, min: 0, max: 100 },
                x: { grid: { color: '#334155' }, ticks: { color: '#f8fafc' } }
            }
        }
    });
}

function updateRadarChart(countryKey) {
    const data = statsData[countryKey];
    const ctxRadar = document.getElementById('radarChart').getContext('2d');

    if (currentRadarChart) currentRadarChart.destroy();

    currentRadarChart = new Chart(ctxRadar, {
        type: 'radar',
        data: {
            labels: ['Stabilitate Termică', 'Calitate Aer (PM2.5)', 'Ritm Circadian', 'Securitate Nutrițională'],
            datasets: [
                {
                    label: data.countryName,
                    data: data.radarScores,
                    borderColor: '#38bdf8',
                    backgroundColor: 'rgba(56, 189, 248, 0.2)',
                    borderWidth: 2,
                    pointBackgroundColor: '#38bdf8'
                },
                {
                    label: 'Media Globală (5 țări)',
                    data: radarAverages,
                    borderColor: 'rgba(148, 163, 184, 0.6)',
                    backgroundColor: 'rgba(148, 163, 184, 0.1)',
                    borderWidth: 2,
                    borderDash:[5, 5],
                    pointBackgroundColor: '#94a3b8'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#94a3b8', font: { family: 'Inter', size: 11 } } }
            },
            scales: {
                r: {
                    grid: { color: '#334155' },
                    angleLines: { color: '#334155' },
                    pointLabels: { color: '#f8fafc', font: { family: 'Inter', weight: '600', size: 10 } },
                    ticks: { display: false }, 
                    min: 0,
                    max: 100
                }
            }
        }
    });
}

document.querySelectorAll('.nav-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        e.currentTarget.classList.add('active');
        
        activeCountry = e.currentTarget.getAttribute('data-country');
        
        updateUI(activeCountry);
        updateBarChart(activeCountry);
        updateLineChart(activeCountry, activeMetric);
        updateRadarChart(activeCountry);
    });
});

document.getElementById('metricSelector').addEventListener('change', (e) => {
    activeMetric = e.target.value;
    updateLineChart(activeCountry, activeMetric);
});

document.addEventListener('DOMContentLoaded', () => {
    calculateGlobalAverages();
    updateUI(activeCountry);
    updateBarChart(activeCountry);
    updateLineChart(activeCountry, activeMetric);
    updateRadarChart(activeCountry);
});