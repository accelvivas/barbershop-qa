# Test Screenshots

This folder contains intentionally captured, sanitized portfolio evidence. It must not contain artificial results or sensitive information.

TC-001 captures a full-page screenshot only after all assertions pass. Run:

```powershell
npm.cmd run test:chromium
```

A successful run creates `TC-001_Homepage_Chromium_PASS.png`. Failure screenshots are created automatically under `test-results/` and are intentionally ignored by Git because they are transient diagnostic artifacts.

TC-002 creates its sanitized PASS evidence only after the login redirect and authenticated account interface assertions succeed:

```powershell
npm.cmd run test:tc002
```

Successful evidence filename: `TC-002_Valid_Login_chromium_PASS.png`. Account identity fields are masked automatically before capture.

## Verified Evidence

- `TC-001_Homepage_Chromium_PASS.png` — generated after the verified Chromium PASS on October 23, 2026.
- `TC-002_Valid_Login_chromium_PASS.png` — generated after the verified authenticated Chromium PASS on October 23, 2026.

Review every image before committing it. Remove credentials, customer details, session data, and unrelated desktop content.
