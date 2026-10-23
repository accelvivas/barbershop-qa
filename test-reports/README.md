# Test Reports

The maintained execution record is [`test-execution-summary.md`](./test-execution-summary.md). Playwright generates its interactive HTML report in `../playwright-report/`; that generated folder is ignored by Git to avoid committing transient output.

Generate a new report:

```powershell
npx.cmd playwright test --project=Chromium
npx.cmd playwright show-report
```

Run only the valid-login case in Chromium:

```powershell
npm.cmd run test:tc002
```

TC-002 requires the approved dedicated QA account configured in the ignored `.env` file. Its verified Chromium execution passed on October 23, 2026.

After a verified run, update the summary with the exact browser, date, counts, duration, and evidence references. Count unique test cases separately from browser executions: one case executed in three browsers is one unique test case and three browser executions.
