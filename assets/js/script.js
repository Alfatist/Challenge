const theme_selector = document.querySelector(".theme_selector");
const editable = document.getElementById("texto");
const result = document.getElementById("result");

document.onkeyup = function (event) {
  if (event.key === "AltGraph" && event.ctrlKey) {
    trocaCor();
  }
};

function showSelector() {
  theme_selector.style.transform = "translate(0%, -50%)";
}

function hideSelector() {
  theme_selector.style.transform = "translate(100%, -50%)";
}

function trocaCor() {
  let botao = document.querySelector(".theme-circle:checked");
  botao.nextElementSibling ? (botao.nextElementSibling.checked = true) : (document.querySelector(".theme-circle").checked = true);
}

editable.addEventListener("input", function (event) {
  let text = event.target.textContent;
  let filteredText = text.replace(/[^a-z\s]/gi, "").toLowerCase();
  event.target.textContent = filteredText;
  if (filteredText !== text) {
    event.target.textContent = filteredText;
    window.getSelection().selectAllChildren(event.target);
    window.getSelection().collapseToEnd();
  }
});

function encrypt() {
  let text = editable.textContent;
  let replaces = { a: "enter", e: "imes", i: "ai", o: "ober", u: "ufat" };

  let textReplaced = text.replace(/[aeiou]/gi, function (letter) {
    return replaces[letter.toLowerCase()];
  });

  result.innerText = textReplaced;
}
function decrypt() {
  let text = editable.textContent;
  let replaces = { enter: "a", imes: "e", ai: "i", ober: "o", ufat: "u" };
  for (let key in replaces) {
    let regex = new RegExp(key, "g");
    text = text.replace(regex, replaces[key]);
  }

  result.textContent = text;
}

function copyResult() {
  var copyText = result.innerText;
  navigator.clipboard.writeText(copyText);

  // Alert the copied text
  alert(copyText.value + "\n\nCopiado com sucesso!");
}

showSelector();
setTimeout(hideSelector, 2000);

editable.style.maxWidth = editable.parentElement.clientWidth - 40 + "px";
document.body.addEventListener("resize", () => (editable.style.maxWidth = editable.parentElement.clientWidth - 40 + "px"));
