//Modified From: https://developer.chrome.com/docs/extensions/mv3/options/

// Saves options to chrome.storage
function save_options() {
  var autoConv = document.getElementById('autoConv').checked;
  chrome.storage.sync.set({
    autoConv: autoConv
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Settings saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    autoConv: true
  }, function(items) {
    document.getElementById('autoConv').checked = items.autoConv;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);