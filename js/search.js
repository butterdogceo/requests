function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return uri + separator + key + "=" + value;
  }
}

function load(head,text,url,e) {
  web = "site('" + url + "')";
  const div = document.createElement('div');
  const hding = document.createElement('h3');
  const p = document.createElement('p');
  div.setAttribute('class','item');
  div.setAttribute('onclick',web);
  hding.innerHTML = head;
  p.innerHTML = text;
  
  if (e === null) {
    e = "items";
  }
  
  if (url === null) {
    url == "#";
  }
  
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

async function search(mode) {
  var searchItemsElement = document.getElementById("searchItems");
  searchItemsElement.innerHTML = "";

  // Get the URL of the current page
  var url = new URL(window.location);

  // Get the search query parameter from the URL
  var searchQuery;
  if (mode === "load") {
    searchQuery = url.searchParams.get("search");
  } else if (mode === "page") {
    searchQuery = document.getElementById('searchBox').value;
    window.location.href = "?search=" + searchQuery;
  } else if (mode === "page2") {
    searchQuery = document.getElementById('searchBox2').value;
    url.searchParams.set("search", searchQuery);
  }
  
  if (!searchQuery) {
    searchQuery = '';
  }

  // Define the array of ignored words
  var ignoredWords = ["how","the","to","do"];

  // Perform the search operation if a search query exists
  if (searchQuery) {
    document.getElementById('queryText').innerHTML = ''.concat("saerched 4 '", searchQuery, "'");
    document.getElementById('searchBox2').value = searchQuery;

    var exactMatches = [];
    var partialMatches = [];

    // Use the search query to perform a search or any other operations
    // For example, search through a list of items
    while (!done) {
      await new Promise(resolve => setTimeout(resolve, 150));
    }
    
    data.forEach(item => {
      var words = searchQuery.split(' ');
      var found = false;
      
      ignoredWords.forEach((element) => {
        if (!found && item.title && item.desc && item.tags) {
          if (searchQuery === (element) || searchQuery === "how to") {
            found = true;
            match = words.some(word => (item.title.toLowerCase().includes(word.toLowerCase()) || item.desc.toLowerCase().includes(word.toLowerCase()) || item.tags.toLowerCase().includes(word.toLowerCase())));
          } else {
            match = words.some(word => !ignoredWords.includes(word.toLowerCase()) && (item.title.toLowerCase().includes(word.toLowerCase()) || item.desc.toLowerCase().includes(word.toLowerCase()) || item.tags.toLowerCase().includes(word.toLowerCase())));
          }
        }
      });
      
      if (match) {
        if (item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.desc.toLowerCase().includes(searchQuery.toLowerCase()) || item.tags.toLowerCase().includes(searchQuery.toLowerCase())) {
          exactMatches.push(item);
        } else {
          partialMatches.push(item);
        }
      }
    });

    // Concatenate the arrays and load the results into the searchItemsElement
    var results = exactMatches.concat(partialMatches);
    results.forEach(item => {
      var img = item.image;
      load(item.title, item.desc, img, item.link, "searchItems");
    });

    if (document.getElementById('searchItems').hasChildNodes() === false && results.length === 0) {
      const e = document.createElement('h4');
      e.innerHTML = "sory, no find anyting like dis: '" + searchQuery + "'";
      e.setAttribute("id","notFound");
      document.getElementById('searchItems').appendChild(e);
    } else {
      if (document.getElementById('notFound')) {
        document.getElementById('notFound').remove();
      }
    }
  }
}

function search2(key) {
  if (event.key === "Enter") {
    search("page2");
  }
}

window.addEventListener("load", (event) => {
  search("load");
});

var focused = false

document.getElementById("searchBox").addEventListener("onfocus", function() {
  document.getElementById('searchDiv').style.width = "20vh";
  focused = true;
});

document.getElementById("searchBox").addEventListener("onfocusout", function() {
  document.getElementById('searchDiv').style.width = "20vh";
  focused = false;
});

document.getElementById("search").addEventListener("mouseover", function() {
  document.getElementById('searchDiv').style.width = "20vh";
});

document.getElementById("search").addEventListener("mouseout", function() {
  if (focused === true) {
    document.getElementById('searchDiv').style.width = "20vh";
  } else if (!document.getElementById("searchBox").hasFocus() && document.getElementById("searchBox").value === "") {
    document.getElementById('searchDiv').style.width = "2.5vh";
  }
});