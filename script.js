const watches = [
"Orient","Seiko Presage Cocktail","Seiko Astron","Longines Record",
"Tissot T-Touch Connect Solar","Longines Master Collection Chrono Moonphase",
"Omega Speedmaster 57 2023","Longines Conquest Heritage Central Power Reserve",
"Longines Hydroconquest GMT 41mm","Rolex Datejust 41","Orient Multi Year",
"Casio G-Shock","Longines Spirit Zulu Time","Frederique Constant Vintage Rally Healey",
"Longines Legend Diver","Tudor Black Bay Bronze","Hamilton Murph 38mm",
"Slava","Casio G-Shock MTG","Tudor Black Bay GMT","Omega Seamaster 300M",
"Longines Ultra Chron Carbon","Breitling Navitimer B01 43mm","Grand Seiko",
"Cartier Santos Large","Longines Conquest Heritage","Tudor Ranger 39",
"Zenith El Primero Chronomaster Sport"
];

const spinner = document.getElementById("spinner");
let currentRotation = 0;

document.getElementById("startBtn").addEventListener("click", runTournament);

async function spinWheel() {
    const randomSpin = 720 + Math.floor(Math.random() * 720);
    currentRotation += randomSpin;
    spinner.style.transform = `rotate(${currentRotation}deg)`;
    return new Promise(r => setTimeout(r, 2000));
}

async function runTournament() {

    const log = document.getElementById("roundLog");
    const championDiv = document.getElementById("champion");
    const statsDiv = document.getElementById("stats");

    log.innerHTML = "";
    championDiv.innerHTML = "";
    statsDiv.innerHTML = "";

    let wins = {};
    let round = 0;

    while (true) {
        round++;
        let counts = {};

        while (true) {
            const pick = watches[Math.floor(Math.random() * watches.length)];
            counts[pick] = (counts[pick] || 0) + 1;

            if (counts[pick] === 100) {

                await spinWheel(); // Анимация спиннера

                wins[pick] = (wins[pick] || 0) + 1;

                const entry = document.createElement("div");
                entry.className = "round-entry";
                entry.textContent = `Раунд ${round}: ${pick}`;
                log.appendChild(entry);
                log.scrollTop = log.scrollHeight;

                if (wins[pick] === 3) {
                    championDiv.innerHTML = `🏆 Чемпион: ${pick}`;
                    showStats(wins);
                    return;
                }

                break;
            }
        }
    }
}

function showStats(wins) {

    let html = "<table><tr><th>Модель</th><th>Победы</th></tr>";

    for (let watch in wins) {
        html += `<tr><td>${watch}</td><td>${wins[watch]}</td></tr>`;
    }

    html += "</table>";

    document.getElementById("stats").innerHTML = html;
}
