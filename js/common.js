function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

function $$$(targetName) {
    return document.createElement(targetName);
}