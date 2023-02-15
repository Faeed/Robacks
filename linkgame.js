function linkGroupGame() {
  var groupGameId = document.getElementById("group-game-id").value;

  if (Number(groupGameId)) {
    document.getElementById("tutorial-id").style.display = "none";
    document.getElementById("after-link").style.display = "block";
    document.getElementById("linked-game").style.display = "none";

    chrome.storage.local.set({"linkedGroupGameId": groupGameId }, function () {
      console.log("Linked group game ID saved");
      document.getElementById("game-id-textholder").innerHTML = groupGameId;
    });
  } 
  else if (parseInt(groupGameId) === 0) {
    chrome.storage.local.remove("linkedGroupGameId", function() {
      document.getElementById("linked-game").style.display = "block";
      document.getElementById("linked-game").innerHTML = "Linked game removed.";
      document.getElementById("tutorial-id").style.display = "block";
      document.getElementById("after-link").style.display = "none";
      return
    });
  } 
  else {
    document.getElementById("linked-game").style.display = "block";
    document.getElementById("linked-game").innerHTML = "Invalid game ID. Must be a number!";
    document.getElementById("tutorial-id").style.display = "block";
    document.getElementById("after-link").style.display = "none";
  }
}

function ConfigureGameButton() {
  chrome.storage.local.get('linkedGroupGameId', function(items) {
    window.open('https://www.roblox.com/games/' + items.linkedGroupGameId + '/game')
  });
}

function UnlinkGame() {
  chrome.storage.local.remove("linkedGroupGameId", function() {
    document.getElementById("linked-game").style.display = "block";
    document.getElementById("linked-game").innerHTML = "Linked game removed.";
    document.getElementById("tutorial-id").style.display = "block";
    document.getElementById("after-link").style.display = "none";
    return
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('link-press');
  const btn2 = document.getElementById('game-visit');
  const btn3 = document.getElementById('unlink-button');

  btn.addEventListener('click', linkGroupGame);
  btn2.addEventListener('click', ConfigureGameButton);
  btn3.addEventListener('click', UnlinkGame);
});


window.onload = function() {
  chrome.storage.local.get('linkedGroupGameId', function(items) {
    const element = document.getElementById('game-id-textholder');
    element.innerHTML = items.linkedGroupGameId;

    var groupGameId = items.linkedGroupGameId;

    if (Number(groupGameId)) {
      document.getElementById("tutorial-id").style.display = "none"
      document.getElementById("after-link").style.display = "block"
    } 
    
    else {
        document.getElementById("tutorial-id").style.display = "block"
        document.getElementById("after-link").style.display = "none"
    }
  });
};