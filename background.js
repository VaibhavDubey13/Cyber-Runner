// Background service worker for Mario Offline Runner
const extpay = ExtPay('cyber-runner')


chrome.runtime.onInstalled.addListener(() => {
  console.log('Mario Offline Runner installed!');
});

// Listen for navigation errors and redirect to game
chrome.webNavigation && chrome.webNavigation.onErrorOccurred && 
chrome.webNavigation.onErrorOccurred.addListener((details) => {
  if (details.error === 'net::ERR_INTERNET_DISCONNECTED' || 
      details.error === 'net::ERR_NAME_NOT_RESOLVED' ||
      details.error === 'net::ERR_CONNECTION_REFUSED' ||
      details.error === 'net::ERR_CONNECTION_TIMED_OUT' ||
      details.error === 'net::ERR_NETWORK_CHANGED') {
    chrome.tabs.update(details.tabId, {
      url: chrome.runtime.getURL('game.html')
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'OFFLINE_DETECTED') {
    chrome.tabs.update(sender.tab.id, {
      url: chrome.runtime.getURL('game.html')
    });
  }
  if (message.type === 'GET_HIGH_SCORE') {
    chrome.storage.local.get(['highScore'], (result) => {
      sendResponse({ highScore: result.highScore || 0 });
    });
    return true;
  }
  if (message.type === 'SET_HIGH_SCORE') {
    chrome.storage.local.set({ highScore: message.score });
  }
});
