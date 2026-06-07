const symbols = [
    { name: 'lemon',   icon: 'fa-solid fa-lemon',   color: 'rgb(245, 208, 0)', range: [1,  30] },
    { name: 'bell',    icon: 'fa-solid fa-bell',    color: 'rgb(255, 200, 0)', range: [31, 55] },
    { name: 'heart',   icon: 'fa-solid fa-heart',   color: 'rgb(255, 68, 68)', range: [56, 70] },
    { name: 'diamond', icon: 'fa-solid fa-diamond', color: 'rgb(68, 170, 255)', range: [71, 83] },
    { name: 'star',    icon: 'fa-solid fa-star',    color: 'rgb(255, 200, 0)', range: [84, 93] },
    { name: 'crown',   icon: 'fa-solid fa-crown',   color: 'rgb(255, 200, 0)', range: [94, 100] },
]
function getSymbol() {
    const roll = Math.floor(Math.random() * 100) + 1;
 
    for (let symbol of symbols) {
        if (roll >= symbol.range[0] && roll <= symbol.range[1]) {
            return symbol;
        }
    }
}
let balance = 100;
let bet = 10;
const minBet = 5; 
const maxBet = 100;
 
function updateDisplay() {
    document.getElementById('balance').textContent = balance;
    document.getElementById('bet').textContent = bet;
}
document.getElementById('betUp').addEventListener('click', function() {
    if (bet + 5 <= maxBet) {
        bet += 5;
        updateDisplay();
    }
});
 
document.getElementById('betDown').addEventListener('click', function() {
    if (bet - 5 >= minBet) {
        bet -= 5;
        updateDisplay();
    }
});
 
document.getElementById('spin').addEventListener('click', spin);
 
function spin() {
    if (balance < bet) {
        document.getElementById('result').textContent = 'Not enough balance!';
        document.getElementById('result').style.color = 'rgb(255, 68, 68)';
        return;
    }
 
    balance -= bet;
    updateDisplay();
 
    const btn = document.getElementById('spin');
    btn.disabled = true;
 
    const resultelm = document.getElementById('result');
    resultelm.textContent = 'Spinning...';
    resultelm.style.color = 'rgb(255, 200, 0)';
 
    const boksIds = ['boks1', 'boks2', 'boks3'];
    const results = [];
 
    boksIds.forEach((id, index) => {
        setTimeout(() => {
 
            const elm = document.getElementById(id);
            const symbol = getSymbol();
            results.push(symbol.name);
 
            elm.classList.remove('spinning');
            void elm.offsetWidth;
            elm.className = symbol.icon + ' spinning';
            elm.style.color = symbol.color;
 
            if (index === 2) {
                setTimeout(() => {
                    checkWin(results);
                    btn.disabled = false;
                }, 1400);
            }
 
        }, index * 800);
    });
}
 
function checkWin(results) {
    const resultelm = document.getElementById('result');
    const allMatch = results[0] === results[1] && results[1] === results[2];
 
    if (allMatch) {
        let multiplier = 5;
        if      (results[0] === 'crown')   multiplier = 20;
        else if (results[0] === 'star')    multiplier = 12;
        else if (results[0] === 'diamond') multiplier = 8;
 
        const winAmount = bet * multiplier;
        balance += winAmount;
        resultelm.textContent = `WINNER! +$${winAmount}`;
        resultelm.style.color = 'rgb(0, 255, 136)';
    } else {
        resultelm.textContent = 'No match. Try again!';
        resultelm.style.color = 'rgb(255, 68, 68)';
    }
 
    updateDisplay();

    if (balance < minBet) {
        setTimeout(() => {
            resultelm.textContent = 'Game over! Restarting...';
            setTimeout(() => {
                balance = 100;  
                updateDisplay();
                resultelm.textContent = 'Press Spin To Play!';
                resultelm.style.color = 'rgb(255, 200, 0)';
            }, 2000);
        }, 500);
    }
}