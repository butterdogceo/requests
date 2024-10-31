// This is the directory of every request, every article has an ID (the number it is down the list + 1)

// A = date submitted
// B = email
// C = suggestion
// D = extra comments
// E = status
// F = removed ("TRUE" or "FALSE")

let data = [];

let done = false;

function getData() {
  const spreadsheetId = "1LlL8mrSXTTV6qHOkUKd57oVb0uZATq037Wg4ltlDreg";
  const sheetName = "Form Responses 4";
  const sheetId = "AIzaSyBie4PasgrxYkF7LRl8zcCGUsnBnwZ8pWE";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${sheetId}`;

  createLog("log", "Fetching");
  fetch(url)
    .then(response => response.json())
    .then(dat => {
      if (dat) {
        const responseData = formatData(dat);
        data.push(...responseData);
        done = true;
        createLog("log", "Fetched");
      }
    })
    .catch(error => console.error(error));
}

function formatData(dat) {
  const formattedData = [];
  var articleCount = 0;

  for (let i = 1; i < dat.values.length; i++) {
    const response = dat.values[i];
    const responseNumber = i + 1; // add 1 to ignore header
    // var imageURL = "img/butterdog.jpg";

    if (response) {
      /*
      var image = response[5] || imageURL;
      if (image.includes("https://")) {
        // is a web url
        if (image.includes("drive.google.com")) {
          // is google drive
          const imageId = response[5].toString().replace('https://drive.google.com/open?id=', '');
          const newImageUrl = `https://drive.google.com/thumbnail?id=${imageId}`;
          image = newImageUrl;
        } else {
          // is a regular web url
          image = image;
        }
      } else {
        // is a local url so remove ../
        image = image.replace(/\.\.\//i, "");
      }
      */

      // increase the article count
      if (responseNumber > articleCount) {
        articleCount = responseNumber;
      }

      // log the image url for debugging
      /*
      try {
        createLog("log", image);
        image = image.replace("../", "");
      } catch (err) {
        createLog("error", image, "none", "image.replace - articlesDir.js");
        console.error(err);
      }
      */

      const item = {
        title: response[2], // Column C
        status: response[4], // Column E
        link: `article.html?article=${responseNumber}`,
        place: "items",
        tags: response[2] + " " + response[4], // Column B, & Column C
        approved: response[8] // Column F
      };

      formattedData.push(item);
    }
  }

  return formattedData;
}

getData();

// A = date submitted
// B = email
// C = suggestion
// D = extra comments
// E = status
// F = removed ("TRUE" or "FALSE")