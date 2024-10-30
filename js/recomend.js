async function createDefaults() {
  try {
    while (!done) {
      await new Promise(resolve => setTimeout(resolve, 150)); // Wait
    }
    
     // Shuffle the data
    const shuffledData = data.slice();
    for (let i = shuffledData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
    }
    
    const randomItems = shuffledData.slice(0, 5);
  
    randomItems.forEach(item => {
      if (item.approved === "yes") {
        if (item.desc === null) {
          item.desc = "no descwiption";
        }
        if (item.title && item.desc && item.image && item.link) {
          load(item.title, item.desc, item.image, item.link, "recomend");
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
}

setTimeout(createDefaults, 100);
