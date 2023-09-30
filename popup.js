const button = document.getElementById("picker");

button.addEventListener("click", async (e) => {
  const eyeDropper = new window.EyeDropper();
  let color = await eyeDropper.open();
  color = color.sRGBHex;
  navigator.clipboard.writeText(color);
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      function: (color) => {
        const messageDiv = document.createElement("div");
        messageDiv.innerText = `Color copied to clipboard : ${color}`;
        messageDiv.style.position = "fixed";
        messageDiv.style.top = "50%";
        messageDiv.style.left = "50%";
        messageDiv.style.backgroundColor = "rgb(44, 145, 95)";
        messageDiv.style.color = "white";
        messageDiv.style.padding = "20px";
        messageDiv.style.borderRadius = "5px";
        document.body.appendChild(messageDiv);

        setTimeout(() => document.body.removeChild(messageDiv), 2000);
      },
      args: [color],
    });
  });

  window.close();
});
