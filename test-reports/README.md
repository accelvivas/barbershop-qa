# Test Reports

The maintained execution record is [`test-execution-summary.md`](./test-execution-summary.md). Playwright generates its interactive HTML report in `../playwright-report/`; that generated folder is ignored by Git to avoid committing transient output.

Generate a new report:

```powershell
npx.cmd playwright test --project=Chromium
npx.cmd playwright show-report
```

After a verified run, update the summary with the exact browser, date, counts, duration, and evidence references. Count unique test cases separately from browser executions: one case executed in three browsers is one unique test case and three browser executions.
