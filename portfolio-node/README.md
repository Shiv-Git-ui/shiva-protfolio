# Sivakumar Portfolio — Node.js Server

No npm install needed — uses only Node.js built-ins.

## Quick Start

```bash
node server.js
```

Then open your browser:

| Page       | URL                          |
|------------|------------------------------|
| Portfolio  | http://localhost:3000        |
| Admin      | http://localhost:3000/admin  |

## Custom Port

```bash
PORT=8080 node server.js
```

## File Structure

```
portfolio-node/
├── server.js                  ← Node.js server (no dependencies)
├── package.json
├── sivakumar_portfolio.html   ← Portfolio (served at /)
└── backend_admin.html         ← Admin panel (served at /admin)
```

## Notes

- No database or npm packages required — everything runs in the browser via localStorage.
- All data (photo, CV, certificates, research reports) is stored in the browser's localStorage and shared between the portfolio and admin panel when both are open on the same origin.
- The server requires **Node.js 14+**.
