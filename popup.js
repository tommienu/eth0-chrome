

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

  //buffer output elements, we show something regardless of service-response.
  var newStatus = document.createElement("p");
  newStatus.id = "status";

  //remove any old messages
  removeStatus();

  if (req.status == 200) {
    var a = document.createElement("a");
    a.id = "shortUrl";

    var shortCode = req.responseXML.getElementsByTagName("urly")[0].getAttribute('code');
    var url = "http://eth0.se/"+shortCode;

    a.href = url;

    a.appendChild(document.createTextNode(url));

    newStatus.appendChild(document.createTextNode("The short url has been copied to your clipboard."));

    if (isMac) {
      newStatus.appendChild(document.createTextNode("Use ⌘ + V to paste it somewhere. "))
    } else {
      newStatus.appendChild(document.createTextNode("Use CTRL + V to paste it somewhere. "))
    }

    newStatus.appendChild(a);

    copyToClipboard(url);

    chrome.tabs.update(tabId, {url:url});
  } else {
    //error trapping
    switch (req.status) {
      case 400:
        newStatus.appendChild(document.createTextNode("There was a problem with the href parameter. Are you sure you're trying to shorten a proper URL?"));
        break;
      default:
        newStatus.appendChild(document.createTextNode("Unknown error occured, please try again later."));
        break;
    }
  }

  //append output
  document.body.appendChild(newStatus);
  
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