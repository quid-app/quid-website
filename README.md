# Quid website

Static site for quidapp.co.uk, served by the Cloudflare Worker `quid-site` (see `wrangler.jsonc`): `go.js` handles the /go/<code> QR links, everything else is these files. Deploy with `npx wrangler deploy`; never deploy the files without `go.js`.

Edit the HTML files directly. `index.html` is the home page; the `quid-*.html` files are the animated demos embedded as iframes.
