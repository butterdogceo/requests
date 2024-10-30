let currentIndex = 0; // Keep track of the current index in the imageList

function changeBackgroundImage() {
  document.getElementById("headImage").style.backgroundImage = `url('${imageList[currentIndex]}')`;
  currentIndex = (currentIndex + 1) % imageList.length; // Cycle to the next image
}

async function backgroundImage() {
  try {
    while (!done) {
      await new Promise(resolve => setTimeout(resolve, 150));
    }
    const shuffledData = data.slice();
    for (let i = shuffledData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
    }

    const randomItems = shuffledData.slice(0, 15);
    imageList = [];

    randomItems.forEach(item => {
      if (item.desc === null) {
        item.desc = "No description";
      }
      
      const image = item.image.toString();
      let img = '';
      
      if (image.includes("../") === false) {
        if (image.includes("https://drive.google.com") === true) {
          img = image;
        }
      } else {
        img = image.replace('../','');
      }
      
      imageList.push(img); // Save item.image into the list
    });

    changeBackgroundImage(); // Display the first image immediately
    setInterval(changeBackgroundImage, 3000); // Set interval to cycle through the images every 3 seconds

  } catch (error) {
    console.error(error);
  }
}

setTimeout(backgroundImage, 100);