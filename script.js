document.addEventListener("DOMContentLoaded", function() {
  const tapButton = document.getElementById('tap-button');
  const upgradeButton = document.getElementById('upgrade-button');
  const dailyRewardButton = document.getElementById('daily-reward-button');
  const coinCountElem = document.querySelector('.coin-count');
  const levelTextElem = document.querySelector('.level-text');
  const levelBarFillElem = document.querySelector('.level-bar-fill');

  let coinCount = 0;
  let coinsPerTap = 1;
  let level = 1;
  let coinsForNextLevel = 200;

  const updateUI = () => {
    coinCountElem.textContent = coinCount;
    levelTextElem.textContent = `Level ${level}`;
    levelBarFillElem.style.width = `${(coinCount / coinsForNextLevel) * 100}%`;
  };

  tapButton.addEventListener('click', () => {
    coinCount += coinsPerTap;
    if (coinCount >= coinsForNextLevel) {
      level++;
      coinCount = 0;
      coinsForNextLevel *= 2;
      coinsPerTap++;
    }
    updateUI();
  });

  upgradeButton.addEventListener('click', () => {
    if (coinCount >= 200) {
      coinCount -= 200;
      coinsPerTap++;
    }
    updateUI();
  });

  dailyRewardButton.addEventListener('click', () => {
    coinCount += 100; // Add daily reward amount
    updateUI();
  });

  updateUI();
});
