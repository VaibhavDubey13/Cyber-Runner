const extpay = ExtPay('cyber-runner')

chrome.runtime.sendMessage({ type: 'GET_HIGH_SCORE' }, (response) => {
  document.getElementById('highScore').textContent =
    response && response.highScore ? response.highScore : '0';
});

document.getElementById('playBtn').addEventListener('click', () => {
  chrome.tabs.create({ url: chrome.runtime.getURL('game.html') });
  window.close();
});
