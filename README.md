# GHUFRAN LAPTOP

**Power Your World With the Right Laptop.** A responsive laptop and accessories storefront backed by a C++17 REST service and MySQL. The web UI prefers server-backed catalog, account, cart, checkout, contact, newsletter, reviews, coupon, and administrator endpoints. Opening `index.html` directly remains a clearly labeled local-preview mode; its localStorage data is not production data.

Product and brand names describe independently sourced sample inventory. Ghufran LapTop is not an official manufacturer or brand-authorized storefront. Sample prices and stock are illustrative. The checkout only records an order; no payment is taken.

## Project layout

- `index.html`, `styles.css`, `app.js`, `api-client.js`: responsive storefront and same-origin API client
- `backend/src/`: C++17 Crow REST server, prepared MySQL statement wrapper, password hashing and session security
- `database/schema.sql`, `database/seed.sql`: MySQL 8 schema and sample inventory
- `docs/API.md`: API routes, authentication, request payloads, and status codes
- `backend/config/security.md`: deployment security checklist
- `.env.example`: configuration names only; copy locally to `.env`
- `scripts/run-local.ps1`: Windows configure/build/run helper

## Windows prerequisites

1. Install Visual Studio 2022 Build Tools with the **Desktop development with C++** workload, CMake 3.24+, Git, and MySQL Server 8.0+ with the MySQL command-line client.
2. Install vcpkg in a trusted local tools folder, bootstrap it with its official `bootstrap-vcpkg.bat`, then set `VCPKG_ROOT` to that checkout. The root `vcpkg.json` declares Crow, MariaDB Connector/C, OpenSSL and nlohmann/json; CMake/vcpkg fetch the C++ libraries during the first configure.
3. Create the database and load demo rows from PowerShell:

```powershell
Get-Content database/schema.sql, database/seed.sql | mysql -u root -p
```

4. Create a least-privilege MySQL application user using a unique local password (replace the example value):

```sql
CREATE USER 'ghufran_app'@'127.0.0.1' IDENTIFIED BY 'REPLACE_WITH_A_UNIQUE_LOCAL_PASSWORD';
GRANT SELECT, INSERT, UPDATE, DELETE ON ghufran_laptop.* TO 'ghufran_app'@'127.0.0.1';
FLUSH PRIVILEGES;
```

5. Copy `.env.example` to `.env`, set the MySQL values and a one-time `BOOTSTRAP_ADMIN_EMAIL` plus unique `BOOTSTRAP_ADMIN_PASSWORD` of at least 12 characters. The seed admin is intentionally disabled with a sentinel hash; the server replaces it only when these environment values are explicitly provided. Remove the bootstrap variables after the first successful start. Never commit `.env`.
6. Set the vcpkg path and start from the project root:

```powershell
$env:VCPKG_ROOT = 'C:\tools\vcpkg'
.\scripts\run-local.ps1
```

Open `http://127.0.0.1:8080`. The server serves the frontend and API from one origin. `GET /api/health` reports whether MySQL is reachable.

## Manual build

With the prerequisites installed and `.env` loaded into the current shell:

```powershell
cmake -S . -B build -DCMAKE_TOOLCHAIN_FILE="$env:VCPKG_ROOT/scripts/buildsystems/vcpkg.cmake" -DCMAKE_BUILD_TYPE=Release
cmake --build build --config Release
.\build\Release\ghufran-server.exe
```

Do not open the website from `file://` when testing database mode; same-origin cookies and the REST API require the C++ server URL. Opening `index.html` directly is only the offline/local preview.

## Accounts, admin, and demo data

Registration creates customer accounts with PBKDF2-HMAC-SHA256 password hashes. Session cookies are opaque, HttpOnly, SameSite=Strict, and backed by hashed server-side session tokens. CSRF tokens are short-lived and verified against the current session or a guest token. Administrator routes check the server-side `admin` role; there is no frontend password or admin secret.

Do not use the placeholder seed users for sign-in. Provision the first administrator through local environment values, then remove bootstrap values. Never expose database credentials or payment secrets to browser code.

## Production deployment

- Build Release on the target platform; run behind a trusted TLS reverse proxy and set `COOKIE_SECURE=true`.
- Supply secrets through the deployment environment/secret manager, not source control. Remove bootstrap admin variables after first use.
- Use a dedicated least-privilege MySQL account, private database network, encrypted backups, rotation, monitoring, and tested restore procedures.
- Configure proxy-level request size limits, login rate limits, firewall rules, and trusted forwarded headers. The built-in login throttle is per-process; use a shared gateway limiter for multi-instance deployment.
- Keep the service and DB private, use HTTPS, and review `backend/config/security.md` before exposing traffic publicly.
- A production image upload service and a real payment gateway are not included. Product images use HTTPS URLs. The payment-gateway method is a placeholder only and never charges a customer.

## API and schema

Read [docs/API.md](docs/API.md) for API examples and security behavior. The SQL schema includes relational keys, indexes, checks, timestamps, cart, orders, reviews, contacts, sessions, coupons, newsletter, and product images. SQL values are bound through prepared statements; sort clauses are selected from a server-side allowlist.

## Verification note

The source workspace was created without a C++ compiler, CMake, MySQL server/client, vcpkg, or Node.js. Browser-level frontend checks were run, but the C++ binary, SQL import, and live API/database integration could not be built or executed in that environment. Install the prerequisites above to run those checks locally.