const wrapper = document.querySelector(".wrapper"),
  form = document.querySelector("form"),
  fileInp = form.querySelector("input"),
  infoText = form.querySelector("p"),
  closeBtn = document.querySelector(".close"),
  copyBtn = document.querySelector(".copy");

function fetchRequest(file, formData) {
  infoText.innerText = "Scanning QR Code...";
  fetch("http://api.qrserver.com/v1/read-qr-code/", {
    method: 'POST', body: formData
  }).then(res => res.json()).then(result => {
    result = result[0].symbol[0].data;
    infoText.innerText = result ? "Upload QR Code to Scan" : "Couldn't scan QR Code";
    if(!result) return;
    document.querySelector("textarea").innerText = result;
    form.querySelector("img").src = URL.createObjectURL(file);
    wrapper.classList.add("active");
  }).catch(() => {
    infoText.innerText = "Couldn't scan QR Code";
  });
}

fileInp.addEventListener("change", async e => {
  let file = e.target.files[0];
  if (!file) return;
  let formData = new FormData();
  formData.append('file', file);
  fetchRequest(file, formData);
});

copyBtn.addEventListener("click", () => {
  let text = document.querySelector("textarea").textContent;
  navigator.clipboard.writeText(text);
});

form.addEventListener("click", () => fileInp.click());
closeBtn.addEventListener("click", () => {
  resetForm();
  wrapper.classList.remove("active");
});

function resetForm() {
  // Reset the form elements here
  fileInp.value = null;
  document.querySelector("textarea").innerText = "";
  form.querySelector("img").src = "";
  infoText.innerText = "Upload QR Code to Scan";
}
 7654321234567890-= ` `