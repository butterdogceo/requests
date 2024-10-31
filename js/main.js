const errorDiv = document.createElement("div");
errorDiv.style.display = "none";
errorDiv.style.background = "white";
errorDiv.style.position = "fixed";
errorDiv.style.top = "50%";
errorDiv.style.left = "50%";
errorDiv.style.transform = "translate(-50%, -50%)";
errorDiv.style.border = "2px solid gray";
errorDiv.style.width = "90vw";
errorDiv.style.height = "90vh";
errorDiv.style.zIndex = "999999999999999999999999999999999999999999999999";
errorDiv.style.overflowY = "scroll";

const notice = document.createElement("p");
notice.innerText = "Debug Console | CTRL + Y to toggle";
notice.style.paddingBottom = "5px";
notice.style.paddingTop = "5px";
notice.style.textAlign = "center";
notice.style.borderBottom = "2px solid gray";

errorDiv.appendChild(notice);
document.body.appendChild(errorDiv);

function createLog(type, msg, url, linenumber) {
  const e = document.createElement("p");
  if (type != "error") {
    e.innerHTML = `${msg}<br>${new Date().getHours()}:${new Date().getMinutes()}.${new Date().getSeconds()}`;
    e.title = type;
    e.style.background = "rgba(20,20,20,0.1)";
    e.style.color = "black";
  } else {
    e.innerHTML = `Error: ${msg}<br>URL: ${url}<br>Line: ${linenumber}<br>${new Date().getHours()}:${new Date().getMinutes()}.${new Date().getSeconds()}`;
    e.style.background = "rgba(230,20,20,0.1)";
    e.style.color = "rgb(230,20,20)";
  }
  e.style.width = "100%";
  e.style.paddingBottom = "5px";
  e.style.paddingTop = "5px";
  e.style.fontFamily = "monospace";
  errorDiv.appendChild(e);
}

window.onerror = function(msg, url, linenumber) {
  createLog("error", msg, url, linenumber);
  return true;
};

document.body.onkeydown = function(event) {
  if (event.keyCode === 89 && event.ctrlKey) {
    if (errorDiv.style.display === "block") {
        errorDiv.style.display = "none";
    } else {
        errorDiv.style.display = "block";
    }
  }
};