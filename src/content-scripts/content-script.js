chrome.runtime.onMessage.addListener(function (msg) {
  console.log(msg)
});

window.onload = function () {
  setTimeout(() => {
    var isTextFound = false;
    document.getElementsByTagName('input').forEach(element => {
      if (element.type === 'text') {
        isTextFound = true;
      } else if (isTextFound && element.type == 'password') {
        temp = element.parentElement;
        while (!!temp) {
          temp = temp.parentElement;
          if (!!temp && temp.tagName === "FORM") {
            break;
          }
        }

        if (!!temp) {
          temp.addEventListener('click', function (event) {
            browser.runtime.sendMessage({
              action: "getSource",
              source: document.documentElement.outerHTML,
              url: location.href
            });
          }, false);
          window.addEventListener("enter", function (event) {
            if (event.key === 'Enter') {
              browser.runtime.sendMessage({
                action: "getSource",
                source: document.documentElement.outerHTML,
                url: location.href
              });
            }
          }, false);
        } else {
          window.addEventListener('click', function (event) {
            browser.runtime.sendMessage({
              action: "getSource",
              source: document.documentElement.outerHTML,
              url: location.href
            });
          }, false);
          window.addEventListener("enter", function (event) {
            if (event.key === 'Enter') {
              browser.runtime.sendMessage({
                action: "getSource",
                source: document.documentElement.outerHTML,
                url: location.href
              });
            }
          }, fase);
        }
      }
    })
  }, 1000);
}
