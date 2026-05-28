const ROBUX_RATE = 0.25;
const MIN_ROBUX = 100;
const MAX_ROBUX = 10000;
const BUY_URL = "contacts.html";

const range = document.querySelector("#robuxRange");
const amount = document.querySelector("#robuxAmount");
const login = document.querySelector("#robloxLogin");
const price = document.querySelector("#orderPrice");
const orderLink = document.querySelector("#buyOrderLink");
const rangeValue = document.querySelector("#rangeValue");

function clampRobux(value) {
  const numeric = Number.parseInt(value, 10);
  if (Number.isNaN(numeric)) return MIN_ROBUX;
  const clamped = Math.min(MAX_ROBUX, Math.max(MIN_ROBUX, numeric));
  return Math.round(clamped / 100) * 100;
}

function formatPrice(robux) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0
  }).format(Math.ceil(robux * ROBUX_RATE));
}

function updateOrder(source) {
  const robux = clampRobux(source.value);
  const fill = ((robux - MIN_ROBUX) / (MAX_ROBUX - MIN_ROBUX)) * 100;

  range.value = robux;
  amount.value = robux;
  range.style.setProperty("--fill", `${fill}%`);
  range.closest(".range-shell")?.style.setProperty("--fill", `${fill}%`);
  if (rangeValue) rangeValue.textContent = robux.toLocaleString("ru-RU");
  price.textContent = formatPrice(robux);

  const username = login.value.trim();
  const text = username
    ? `Хочу заказать ${robux} Robux через gamepass. Логин Roblox: ${username}`
    : `Хочу заказать ${robux} Robux через gamepass`;

  orderLink.href = `${BUY_URL}?message=${encodeURIComponent(text)}`;
}

range?.addEventListener("input", () => updateOrder(range));
amount?.addEventListener("input", () => updateOrder(amount));
amount?.addEventListener("blur", () => updateOrder(amount));
login?.addEventListener("input", () => updateOrder(amount));

if (range && amount && price && orderLink) {
  updateOrder(amount);
}
