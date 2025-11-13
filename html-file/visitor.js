// visitor.js

// 👇 Use your actual working API Gateway endpoint
const API_URL = "https://41e8ori00h.execute-api.ap-south-1.amazonaws.com/count";


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
    const resp = await fetch(API_URL, { method: "GET" });

    if (!resp.ok) {
      console.error("Non-OK response from visitor API", resp.status, resp.statusText);
      el.innerText = "Welcome! (visitor count unavailable)";
      return;
    }

    const data = await resp.json();

    // ✅ Handle both { "visits": 12 } or { "count": 12 }
    const count = data.visits ?? data.count ?? null;

    if (count === null) {
      console.warn("Visitor API responded but count not found:", data);
      el.innerText = "Welcome! (visitor count unavailable)";
      return;
    }

    // ✅ Display the visitor count
    el.innerHTML = `Hello there! You’re the <b>${ordinal(count)}</b> visitor<br>Thank you for visiting 💖`;

  } catch (err) {
    console.error("Error fetching visitor count:", err);
    el.innerText = "Welcome! (visitor count unavailable)";
  }
}

// Automatically run on page load
document.addEventListener("DOMContentLoaded", updateVisitorCount);
