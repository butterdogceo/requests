function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function load(head,text,url,e) {
  e = e || "items";
  url = url || "#";

  createLog("log", head);
  web = `site('${url}')`;
  const div = document.createElement('div');
  const hding = document.createElement('h3');
  const p = document.createElement('p');
  div.className = "item";
  div.setAttribute('onclick', web);
  
  hding.innerHTML = head;
  p.innerHTML = `<i style="font-size:14px;">status</i><br><b>${text}</b>`;
  
  document.getElementById(e).appendChild(div);
  div.appendChild(hding);
  div.appendChild(p);
}

function site(url) {
  document.body.style.opacity = 0;
  setTimeout(function() {
  window.location.href = url;
  },250);
}

function search() {
  url = "search.html?search=" + document.getElementById('searchBox').value;
  if (url !== undefined) {
    document.body.style.opacity = 0;
    setTimeout(function() {
    window.location.href = url;
    },250);
  }
}

function search2(key) {
  if (event.key === "Enter") {
    search();
  }
}

function sheetData(c1,c2) {
  const spreadsheetId = '1LlL8mrSXTTV6qHOkUKd57oVb0uZATq037Wg4ltlDreg';
  const range = 'Form Responses 4!' + c1 + ":" + c2;

  fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=AIzaSyBie4PasgrxYkF7LRl8zcCGUsnBnwZ8pWE`)
    .then(response => response.json())
    .then(data => {
      return data;
    });
}