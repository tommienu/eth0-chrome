

var req = new XMLHttpRequest();

var tabId;

chrome.tabs.getSelected(null, function(tab) {
  var tabUrl = tab.url;
  var tabId = tab.id;

  req.open(
      "GET",
      "http://eth0.se/new.xml?href="+tabUrl,
      true);
  req.onload = showUrl;
  req.send(null);
});


function showUrl() {

  if (req.status == 200) {
    removeStatus();

    var newStatus = document.createElement("p");
    newStatus.id = "status";

    var a = document.createElement("a");
    a.id = "shortUrl";

    var shortCode = req.responseXML.getElementsByTagName("urly")[0].getAttribute('code');
    var url = "http://eth0.se/"+shortCode;

    a.href = url;

    a.appendChild(document.createTextNode(url));

    newStatus.appendChild(document.createTextNode("The short url has been copied to your clipboard. "));

    if (isMac) {
      newStatus.appendChild(document.createTextNode("Use ⌘ + V to paste it somewhere. "))
    } else {
      newStatus.appendChild(document.createTextNode("Use CTRL + V to paste it somewhere. "))
    }

    newStatus.appendChild(a);

    document.body.appendChild(newStatus);

    copyToClipboard(url);

    chrome.tabs.update(tabId, {url:url});
  }
  
}

function removeStatus() {
  var element = document.getElementById("status");
  element.parentNode.removeChild(element);
}

function copyToClipboard( text ){
  var copyDiv = document.createElement('div');
  copyDiv.contentEditable = true;
  document.body.appendChild(copyDiv);
  copyDiv.innerHTML = text;
  copyDiv.unselectable = "off";
  copyDiv.focus();
  document.execCommand('SelectAll');
  document.execCommand("Copy", false, null);
  document.body.removeChild(copyDiv);
}

function isMac() {
  return navigator.userAgent.indexOf("Mac OS X") != -1;
}



window.onload = function() {
  //document.body.appendChild('<p>Test from javascript!</p>');
}