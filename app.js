// app.js
document.addEventListener('DOMContentLoaded', () => {
    const balanceElement = document.getElementById('balance');
    const tapButton = document.getElementById('tap-button');
    const dailyRewardElement = document.getElementById('daily-reward');
    const timeLeftElement = document.getElementById('time-left');
    const levelElement = document.getElementById('level');
    const levelProgressElement = document.getElementById('level-progress');
    const levelProgressTextElement = document.getElementById('level-progress-text');
    const upgradeCostElement = document.getElementById('upgrade-cost');
    const upgradeButton = document.getElementById('upgrade-button');

    let balance = 0;
    let dailyReward = 10; // Example reward
    let timeLeft = 86400; // 24 hours in seconds
    let level = 1;
    let coinsPerTap = 1;
    let levelThreshold = 200;
    let progress = 0;
    let upgradeCost = 200;

    function updateBalance(amount) {
        balance += amount;
        balanceElement.textContent = `Balance: ${balance} Coins`;
    }

    function updateTimeLeft() {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        timeLeftElement.textContent = `Time Left: ${hours}:${minutes}:${seconds}`;
        if (timeLeft > 0) {
            timeLeft--;
        }
    }

    function updateLevelProgress() {
        progress = (balance / levelThreshold) * 100;
        levelProgressElement.style.width = `${Math.min(progress, 100)}%`;
        levelProgressTextElement.textContent = `${Math.min(progress, 100).toFixed(0)}% to Next Level`;

        if (balance >= levelThreshold) {
            level++;
            levelElement.textContent = `Level: ${level}`;
            levelThreshold *= 2; // Increase the threshold for the next level
            balance = 0; // Reset balance after leveling up
            updateBalance(0); // Update balance display
        }
    }

    function updateDailyReward() {
        dailyRewardElement.textContent = `Daily Reward: ${dailyReward} Coins`;
    }

    function upgradePerTap() {
        if (balance >= upgradeCost) {
            balance -= upgradeCost;
            coinsPerTap += 1;
            upgradeCost *= 2; // Increase cost for the next upgrade
            updateBalance(0); // Update balance display
            upgradeCostElement.textContent = `Upgrade Cost: ${upgradeCost} Coins`;
        }
    }

    tapButton.addEventListener('click', () => {
        updateBalance(coinsPerTap);
        updateLevelProgress();
    });

    upgradeButton.addEventListener('click', () => {
        upgradePerTap();
    });

    // Update the time every second
    setInterval(updateTimeLeft, 1000);

    // Initial setup
    updateDailyReward();
    updateBalance(0);
    upgradeCostElement.textContent = `Upgrade Cost: ${upgradeCost} Coins`;
});
