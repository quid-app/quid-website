// QR tracking for quidapp.co.uk/go/<code> (any code, e.g. kabir, lisa, q05).
// Counts the scan in KV (day, country, city, iPhone/Android/web), then sends
// iPhones to the App Store tagged with the code (ct=<code>, pt=129157769) so
// App Store Connect > Campaigns can attribute downloads. Android goes to the
// website. Every other path is served from the static files.
const APP = "https://apps.apple.com/app/apple-store/id6791167493";
const PT = "129157769";

export default {
  async fetch(req, env, ctx) {
    const url = new URL(req.url);
    const m = url.pathname.match(/^\/go\/([a-z0-9-]{2,32})\/?$/i);
    if (!m) return env.ASSETS.fetch(req);
    const code = m[1].toLowerCase(), ua = req.headers.get("user-agent") || "";
    const bot = /bot|crawl|spider|preview|facebookexternalhit|whatsapp|telegram|slack|discord/i.test(ua);
    if (!bot && req.method === "GET") ctx.waitUntil(count(env, code, req.cf || {}, /android/i.test(ua) ? "and" : /iphone|ipad|ipod/i.test(ua) ? "ios" : "web"));
    const to = /android/i.test(ua) ? "https://quidapp.co.uk/?from=" + code : PT ? `${APP}?pt=${PT}&ct=${code}&mt=8` : `${APP}?ct=${code}`;
    return new Response(null, { status: 302, headers: { location: to, "cache-control": "no-store" } });
  },
};

async function count(env, code, cf, os) {
  const day = new Date().toISOString().slice(0, 10);
  const key = ["s", code, day, cf.country || "XX", (cf.city || "").replace(/:/g, " "), os].join(":");
  const n = +((await env.QUID_GO.get(key)) || 0);
  await env.QUID_GO.put(key, String(n + 1));
}
