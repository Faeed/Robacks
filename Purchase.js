function _ReturnCsrfToken() {
  return fetch("https://www.roblox.com/home").then(function (_data) {
    return _data.text();
  }).then(function (data) {
    return data.split('meta name="csrf-token" data-token="')[1].split('" />')[0]
  });
}

function sleep(seconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < seconds * 1000);
}

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    var ProductId = Number(details.url.substring(details.url.lastIndexOf('/') + 1));
    if ((isNaN(ProductId) == true) || ProductId == null) {
      return
    }
    if (details.url == `https://economy.roblox.com/v1/purchases/products/${ProductId}?Robacks`) {
      return
    }
    var ParsedBodyJSON = JSON.parse(decodeURIComponent(String.fromCharCode.apply(null, new Uint8Array(details.requestBody.raw[0].bytes))));

    chrome.storage.local.get("cashback_disabled", function (data) {
      if (data.cashback_disabled === false) {
        try {
          chrome.storage.local.get("linkedGroupGameId", function (items) {
            _ReturnCsrfToken().then(function (Token) {
              return fetch(`https://economy.roblox.com/v1/purchases/products/${ProductId}?Robacks`, {
                method: "POST",
                headers: {
                  "X-CSRF-TOKEN": Token,
                  "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                  expectedCurrency: ParsedBodyJSON.expectedCurrency,
                  expectedPrice: ParsedBodyJSON.expectedPrice,
                  expectedSellerId: ParsedBodyJSON.expectedSellerId,
                  expectedPromoId: 0,
                  userAssetId: ParsedBodyJSON.userAssetId || 0,
                  saleLocationType: "Game",
                  saleLocationId: items.linkedGroupGameId,
                }),
              }).then(function (Response) {
                if (Response.status == 200) {
                  sleep(0.5)
                  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
                  });
                }
              }
              )
            })
          })
        } catch (error) {
          console.error(error);
        }
        return { requestHeaders: details.requestHeaders };
      } else {
        try {
          chrome.storage.local.get("linkedGroupGameId", function (items) {
            _ReturnCsrfToken().then(function (Token) {
              return fetch(`https://economy.roblox.com/v1/purchases/products/${ProductId}?Robacks`, {
                method: "POST",
                headers: {
                  "X-CSRF-TOKEN": Token,
                  "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                  expectedCurrency: ParsedBodyJSON.expectedCurrency,
                  expectedPrice: ParsedBodyJSON.expectedPrice,
                  expectedSellerId: ParsedBodyJSON.expectedSellerId,
                  expectedPromoId: 0,
                  userAssetId: ParsedBodyJSON.userAssetId || 0,
                }),
              }).then(function (Response) {
                if (Response.status == 200) {
                  sleep(0.5)
                  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
                  });
                }
              }
              )
            })
          })
        } catch (error) {
          console.error(error);
        }
        return { requestHeaders: details.requestHeaders };
      }
    })
  },
  { urls: ["https://economy.roblox.com/v1/purchases/products/*"] },
  ["requestBody"]
);
