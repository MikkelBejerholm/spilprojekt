// script.js

let money = 0;
let moneyPerClick = 1;
let moneyPerSecond = 0;

const moneyDisplay = document.getElementById('money-display');
const clickBtn = document.getElementById('click-btn');
const assistantUpgradeBtn = document.getElementById('assistant-upgrade');

// Opdatering af pengebeholdningen på skærmen
function updateMoneyDisplay() {
    moneyDisplay.textContent = `Penge: ${money} kr.`;
}

// Klik funktionalitet
clickBtn.addEventListener('click', () => {
    money += moneyPerClick;
    updateMoneyDisplay();
    checkUpgrades();
});

// Check om opgraderinger kan købes
function checkUpgrades() {
    if (money >= 10) {
        assistantUpgradeBtn.disabled = false;
    } else {
        assistantUpgradeBtn.disabled = true;
    }
}

// Køb assistent opgradering
assistantUpgradeBtn.addEventListener('click', () => {
    if (money >= 10) {
        money -= 10;
        moneyPerSecond += 1;
        updateMoneyDisplay();
        checkUpgrades();
    }
});

// Automatisk tilføj penge per sekund
setInterval(() => {
    money += moneyPerSecond;
    updateMoneyDisplay();
    checkUpgrades();
}, 1000);

// Gem spillet til localStorage
function saveGame() {
    const gameData = {
        money: money,
        moneyPerClick: moneyPerClick,
        moneyPerSecond: moneyPerSecond
    };
    localStorage.setItem('startupClickerSave', JSON.stringify(gameData));
}

// Hent spillet fra localStorage
function loadGame() {
    const savedGame = localStorage.getItem('startupClickerSave');
    if (savedGame) {
        const gameData = JSON.parse(savedGame);
        money = gameData.money;
        moneyPerClick = gameData.moneyPerClick;
        moneyPerSecond = gameData.moneyPerSecond;
        updateMoneyDisplay();
        checkUpgrades();
    }
}

// Gem spillet automatisk hvert 5. sekund
setInterval(saveGame, 5000);

// Hent spillet ved opstart
window.onload = loadGame;
