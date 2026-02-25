// Content script - detects offline and notifies background

function checkOffline() {
  if (!navigator.onLine) {
    chrome.runtime.sendMessage({ type: 'OFFLINE_DETECTED' });
  }
}

window.addEventListener('offline', () => {
  setTimeout(() => {
    chrome.runtime.sendMessage({ type: 'OFFLINE_DETECTED' });
  }, 500);
});

// Check on load too
if (!navigator.onLine) {
  chrome.runtime.sendMessage({ type: 'OFFLINE_DETECTED' });
}
