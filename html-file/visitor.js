// visitor.js

// 👇 Use your actual working API Gateway endpoint
const API_URL = "https://2orz1wo0m6.execute-api.ap-south-1.amazonaws.com/count";

/**
 * Adds ordinal suffix like 1st, 2nd, 3rd...
 */
function ordinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

async function updateVisitorCount() {
  const el = document.getElementById("visitorText");
  if (!el) return;

  el.innerText = "Loading visitor count...";

  try {
    // IMPORTANT: your API returns plain text, not JSON
    const resp = await fetch(API_URL, { method: "GET" });
    const textValue = await resp.text();   // <-- FIXED HERE
    const count = parseInt(textValue);

    if (isNaN(count)) {
      console.error("API did not return a number:", textValue);
      el.innerText = "Welcome! (visitor count unavailable)";
      return;
    }

    el.innerHTML = `Hello there! You’re the <b>${ordinal(count)}</b> visitor<br>Thank you for visiting 💖`;

  } catch (err) {
    console.error("Error fetching visitor count:", err);
    el.innerText = "Welcome! (visitor count unavailable)";
  }
}

document.addEventListener("DOMContentLoaded", updateVisitorCount);
