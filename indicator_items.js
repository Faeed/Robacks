var Discount = 0.4 // 40% by default, changes to 0.1 for specific items
var RobuxSaves = "??"
var RealPrice = "??"
var NegativeText = "Couldn't load"

var IsLimited = false
var IsLinked = false

var CashbackPossible = true

// These lines are to remove Roblox's premium discount indicator so my box can fit ;)
var firstElement = document.querySelector(".small.text.field-content.empty-label.wait-for-i18n-format-render");

if (firstElement) {
  firstElement.parentNode.removeChild(firstElement);
}

var secondElement = document.querySelector(".text-label.field-label.empty-label");

if (secondElement) {
  secondElement.parentNode.removeChild(secondElement);
}


// Function to setup the box
function SetupBox() {
  if (CashbackPossible == true) {
    var robuxValueItem = document.querySelector(".text-robux-lg.wait-for-i18n-format-render");
    if (robuxValueItem) {
      var robuxValue = robuxValueItem.textContent
      robuxValue = robuxValue.replace(",", "");
      RealPrice = robuxValue
      var robuxValueNum = parseInt(robuxValue);
      var DiscountedValue = Math.round(robuxValueNum * Discount);
      var robuxValue = DiscountedValue.toLocaleString();
      RobuxSaves = robuxValue

      if (Number(RealPrice) <= 5 && Discount === 0.1) {
        // You don't get cashback for 10% discount of items that cost 5 Robux
        var priceContainer = document.querySelector(".price-container-text");
        var space = document.createElement("div");
        var box = document.createElement("div");

        space.style.height = "5px";

        box.style.border = "3px solid #e67e22";
        box.style.borderRadius = "12px";
        box.style.backgroundColor = "transparent";
        box.style.padding = "3px"

        var robuxIcon = document.createElement("img");
        robuxIcon.src = "https://media.discordapp.net/attachments/971378710362095618/1068902653385527407/icons8-robux-50.png";
        robuxIcon.alt = "Robux Icon";
        robuxIcon.style.width = "20px"
        robuxIcon.style.height = "20px"

        var text = document.createTextNode("Price must be more than 5")
        var text2 = document.createTextNode(" for cashbacks");

        box.appendChild(text);
        box.appendChild(robuxIcon);
        box.appendChild(text2);

        priceContainer.appendChild(space);
        priceContainer.appendChild(box);

        box.style.color = "#d35400"
        box.style.fontFamily = "arial"
        box.style.fontWeight = "bold"
        box.style.textAlign = "center";
      } else {
        var originalPrice = document.createElement("span");
        originalPrice.style.fontSize = "20px"
        //originalPrice.style.textDecoration = "line-through"
        originalPrice.style.fontWeight = "bold"
        originalPrice.style.paddingLeft = "8px"
        originalPrice.style.color = "#c0392b"
        originalPrice.style.alignContent = "center"
        originalPrice.innerHTML = robuxValueNum.toLocaleString();

        var redIcon = document.createElement("img");
        redIcon.src = "https://media.discordapp.net/attachments/971378710362095618/1074578800354013224/icons8-robux-60.png";
        redIcon.style.width = "18px";
        redIcon.style.height = "18px";
        originalPrice.prepend(redIcon);

        var robuxValueEl = document.querySelector(".text-robux-lg.wait-for-i18n-format-render");
        robuxValueEl.innerHTML = (robuxValueNum - DiscountedValue).toLocaleString();

        var priceContainer = document.querySelector(".icon-robux-price-container");
        priceContainer.appendChild(originalPrice);

        var priceContainer = document.querySelector(".price-container-text");
        var space = document.createElement("div");
        var box = document.createElement("div");

        space.style.height = "5px";

        box.style.border = "3px solid #2ecc71";
        box.style.borderRadius = "12px";
        box.style.backgroundColor = "transparent";
        box.style.padding = "3px"

        priceContainer.appendChild(space);
        priceContainer.appendChild(box);

        var robuxIcon = document.createElement("img");
        robuxIcon.src = "https://media.discordapp.net/attachments/971378710362095618/1066729084501114950/robux-icon.png";
        robuxIcon.alt = "Robux Icon";
        robuxIcon.style.width = "20px"
        robuxIcon.style.height = "20px"

        var robacksLogo = document.createElement("img");
        robacksLogo.src = "https://media.discordapp.net/attachments/971378710362095618/1066731750597853335/banner-2.png";
        robacksLogo.alt = "Robacks Logo";
        robacksLogo.style.width = "102px"
        robacksLogo.style.height = "17px"

        var text = document.createTextNode("Save " + RobuxSaves)
        var text2 = document.createTextNode(" with ");

        box.appendChild(text);
        box.appendChild(robuxIcon);
        box.appendChild(text2);
        box.appendChild(robacksLogo);

        box.style.color = "#27ae60"
        box.style.fontFamily = "arial"
        box.style.fontWeight = "bold"
        box.style.textAlign = "center";

        var switchContainer = document.createElement("div");
        switchContainer.style.display = "flex";
        switchContainer.style.alignItems = "center";
        switchContainer.style.justifyContent = "center"

        var switchLabel = document.createElement("label");
        switchLabel.style.color = "#2ecc71";
        switchLabel.style.fontFamily = "arial";
        switchLabel.style.fontWeight = "bold"
        switchLabel.style.fontSize = "12px"
        switchLabel.style.textAlign = "center"
        switchLabel.style.paddingLeft = "4px"
        switchLabel.innerHTML = "Cashbacks Enabled";

        var switchInput = document.createElement("input");
        switchInput.type = "checkbox";
        switchInput.checked = true;

        chrome.storage.local.set({"cashback_disabled": false})

        switchInput.addEventListener("change", function () {
          if (switchInput.checked) {
            switchLabel.style.color = "#2ecc71";
            switchLabel.innerHTML = "  Cashbacks Enabled";

            chrome.storage.local.set({"cashback_disabled": false})
          } else {
            switchLabel.style.color = "#c0392b";
            switchLabel.innerHTML = "Cashbacks Disabled";

            chrome.storage.local.set({"cashback_disabled": true})
          }
        });

        switchContainer.appendChild(switchLabel);
        switchContainer.prepend(switchInput);

        box.appendChild(switchContainer);
      }
    }

  } else {
    // Negative Box
    var priceContainer = document.querySelector(".price-container-text");
    var space = document.createElement("div");
    var box = document.createElement("div");

    space.style.height = "5px";

    box.style.border = "3px solid #e74c3c";
    box.style.borderRadius = "12px";
    box.style.backgroundColor = "transparent";
    box.style.padding = "3px"

    priceContainer.appendChild(space);
    priceContainer.appendChild(box);

    var text = document.createTextNode(NegativeText)

    box.appendChild(text);

    box.style.color = "#c0392b"
    box.style.fontFamily = "arial"
    box.style.fontWeight = "bold"
    box.style.textAlign = "center";
  }
}

chrome.storage.local.get('linkedGroupGameId', function (items) {
  // Validating linked game
  if (items.linkedGroupGameId) {
    IsLinked = true;
    CashbackPossible = true;
  } else {
    IsLinked = false;
    CashbackPossible = false;
    NegativeText = "Robacks: Link a game to get cashbacks";
  }
});

setTimeout(function () {
  // Checking for collectible
  var limitedLabel = document.querySelector(".restriction-icon.icon-limited-label");
  var uLimitedLabel = document.querySelector(".restriction-icon.icon-limited-unique-label")
  if (limitedLabel || uLimitedLabel) {
    CashbackPossible = false;
    IsLimited = true;
    NegativeText = "Collectibles aren't eligible for cashbacks";
  }

  // 10% for shirts, pants t-shirts and gamepasses
  var LowDiscountTypes = ["Shirt", "Pants", "T-Shirt", "Pass"]
  var Type = document.querySelector("#type-content") || document.querySelector(".field-content.wait-for-i18n-format-render") // Gamepasses don't have a #type-content so the second one is used
  if (Type) {
    var TypeText = Type.textContent.trim()

    if (LowDiscountTypes.includes(TypeText)) {
      Discount = 0.1
    }
  };

  SetupBox();
}, 1000);