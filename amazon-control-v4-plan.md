# Plan: Amazon Control v4 First Version

**Generated**: 2026-09-13

## Overview

Implement the approved v4 first version as a local-first Amazon operations platform with one shared workflow run contract, real local/cloud media output, CC Switch-style provider routing, a visual multi-agent builder, and upgraded workspaces for all existing modules.

The repository has no Git metadata. Task-level commits required by the orchestration Skills cannot be created without initializing Git, so completion evidence is recorded in this file instead. No Git repository will be initialized as part of this implementation.

## Prerequisites

- Keep the existing Electron 37 + Node HTTP + vanilla HTML/CSS/JS architecture.
- Preserve all existing APIs and local data behavior while introducing v4 stores.
- Use bundled local media libraries so `ffmpeg` does not need to exist in `PATH`.
- Keep Provider secrets out of source, logs, exports, and project packages.

## Dependency Graph

```text
T1 ── T2 ──┬── T3 ──┐
           │        ├── T5 ── T6 ── T7 ── T8 ──┐
           └── T4 ──┘                           ├── T9 ── T10 ── T11 ── T12
                                                ┘
```

Front-end tasks T6, T7 and T8 all edit `web-dashboard/app.js` and `web-dashboard/styles.css`. They are intentionally serialized despite having no logical dependency on each other. This avoids concurrent edits to shared files.

## Tasks

### T1: Shared v4 contracts and stores
- **depends_on**: []
- **location**: `plugin-service/server.js`, `test/*.test.js`
- **description**: Freeze canonical v4 contracts before feature work: capability IDs, operation IDs, route precedence, WorkflowRun statuses, artifact types, API paths, Bridge method names, and store filenames. Add `provider-profiles.json`, `provider-routes.json`, `credential-vault.json`, `agents.json`, `agent-flows.json`, `workflow-runs.json`, `media-runs.json`, `generator-runs.json`, `verification-results.json`, `usage-ledger.json`; preserve `skills.json`. Add default records, schema version, atomic migration/backup helpers, idempotent legacy migration, WorkflowRun normalization, and workflow snapshots that retain Provider/Agent/Flow versions.
- **validation**: Existing tests pass; new store defaults are created in a temporary data directory; repeated migration is idempotent; corrupted JSON is backed up rather than silently overwritten; legacy API connections migrate to Provider Profiles and routes without losing metadata.
- **status**: Completed
- **log**: Added canonical contracts, ten v4 stores, default Agent/Flow data, idempotent legacy Provider migration, workflow snapshots and temp-directory tests.
- **files edited/created**: `plugin-service/v4-contracts.js`, `plugin-service/server.js`, `test/v4-core.test.js`

### T2: Provider profiles, routing, usage, and health
- **depends_on**: [T1]
- **location**: `plugin-service/server.js`, `test/*.test.js`
- **description**: Implement Provider Profile CRUD, capability routing with Agent/project/global precedence, fallback chains, health tests, usage ledger, currency-aware budgets, secret references, and redacted export. Reject stale/disabled/unsupported route references and provide safe reassignment or blocking when deleting an active profile.
- **validation**: Active profile selection and fallback order are deterministic; tests cover disabled providers, failures, stale references, budget reservation under concurrency, route overrides and credential rotation; secrets never appear in state, activity logs, errors, exports, or project packages.
- **status**: Completed
- **log**: Added Provider Profile CRUD, capability routes, Agent/project/global precedence, fallback chains, health tests, usage ledger, session secrets and encrypted credential storage hooks.
- **files edited/created**: `plugin-service/server.js`, `plugin-service/v4-contracts.js`, `electron/main.js`

### T3: Real media engine and provider adapters
- **depends_on**: [T1, T2]
- **location**: `plugin-service/server.js`, `package.json`, `package-lock.json`, `test/*.test.js`
- **description**: Add bundled `sharp` and `ffmpeg-static` media processing, real image/video conversion runs, media operation validation, canonical output storage under `assets/files/generated/<runId>/`, async status, retry/cancel, temporary-file cleanup, and OpenAI-compatible/generic REST adapter hooks. Define local image-to-video as deterministic storyboard/Ken Burns generation and reserve AI image-to-video for configured Providers.
- **validation**: Tests create real output files for image-to-image, image-to-video, video-to-images, and video-to-video; outputs are registered in the asset library; failures leave no successful artifact; cancellation terminates child work and marks the run cancelled; corrupt files, unsupported formats, disk errors and provider timeouts produce structured errors.
- **status**: Completed
- **log**: Added bundled sharp and @ffmpeg-installer/ffmpeg, four real media operations, generated asset registration, cancellation, cleanup and provider adapter hooks.
- **files edited/created**: `plugin-service/media-engine.js`, `plugin-service/server.js`, `package.json`, `package-lock.json`, `test/v4-media.test.js`

### T4: Agent runtime, Skill discovery, and verification
- **depends_on**: [T1, T2]
- **location**: `plugin-service/server.js`, `test/*.test.js`
- **description**: Add eight default agents, versioned editable agent-flow graphs, node/edge validation, workflow planning, parallel specialist metadata, verifier gates, run persistence, skill discovery from configured Skill roots, and redacted Codex escalation payloads. Validation covers duplicate IDs, dangling edges, unreachable nodes, missing start/end/output, invalid condition branches, missing verifier/approval, and flow version snapshots.
- **validation**: Graph validation rejects all invalid graph classes; successful runs contain plan, agent steps, verification, artifacts and immutable flow versions; failed verification blocks delivery; publishing without an approval node is rejected for high-risk flows.
- **status**: Completed
- **log**: Added eight default Agents, versioned flows, flow validation, workflow runs, verifier gates, Skill discovery and immutable flow version snapshots.
- **files edited/created**: `plugin-service/v4-contracts.js`, `plugin-service/server.js`, `test/v4-core.test.js`

### T5: Electron and HTTP bridge extension
- **depends_on**: [T2, T3, T4]
- **location**: `electron/main.js`, `electron/preload.js`, `web-dashboard/app.js`, `test/*.test.js`
- **description**: Expose v4 Provider, route, agent, flow, workflow, media, Skill, verification, usage, and secure credential methods while retaining all existing bridge methods. Centralize error/status serialization, validate IPC sender/payloads, and make the HTTP bridge provide its service base URL instead of hard-coding port 8787.
- **validation**: Electron execution and HTTP fallback expose equivalent methods and error codes; IPC rejects invalid senders/payloads; bridge smoke tests pass; media preview/download works on both transports.
- **status**: Completed
- **log**: Extended HTTP and Electron bridges, centralized service base URL, added secure credential IPC and v4 endpoint coverage.
- **files edited/created**: `web-dashboard/app.js`, `electron/main.js`, `electron/preload.js`, `test/v4-http.test.js`

### T6: API and AI Control Center
- **depends_on**: [T2, T5]
- **location**: `web-dashboard/app.js`, `web-dashboard/styles.css`
- **description**: Replace the generic API page with capability cards, Provider profiles, model routes, one-click activation, test/health status, currency-aware cost limits, usage summary, Agent overrides, and redacted import/export. Define merge behavior for imported route/profile IDs and block deletion of active profiles until reassigned.
- **validation**: Users can create, test, switch, disable, reassign and delete profiles; active route is visible for every capability; malformed versioned imports fail safely; browser test confirms responsive layout.
- **status**: Completed
- **log**: Replaced the generic API page with capability routes, Provider Profiles, one-click activation, health, usage and Skill discovery.
- **files edited/created**: `web-dashboard/app.js`, `web-dashboard/styles.css`

### T7: Media Studio
- **depends_on**: [T3, T5]
- **location**: `web-dashboard/app.js`, `web-dashboard/styles.css`
- **description**: Replace image/video brief pages with a four-mode media workspace, source asset selection, operation settings, run progress, artifact previews, output history, and actionable Provider setup states. Canonical operation IDs are `image_to_image`, `image_to_video`, `video_to_images`, and `video_to_video`.
- **validation**: Browser tests launch and complete local image/video operations and verify preview/download output; no-provider cloud operation shows configuration guidance; missing/mixed/corrupt assets are rejected before run creation.
- **status**: Completed
- **log**: Replaced image/video brief pages with a four-mode Media Studio, source selection, local/cloud engines, real previews and history. Browser run produced a real JPG and cleaned the test run afterward.
- **files edited/created**: `web-dashboard/app.js`, `web-dashboard/styles.css`

### T8: Visual Agent Builder
- **depends_on**: [T4, T5]
- **location**: `web-dashboard/app.js`, `web-dashboard/styles.css`
- **description**: Add an SVG node canvas for Agent, Tool, Route, Condition, Parallel, Verifier, Approval, and Output nodes; allow editing positions and connections, validating flows, running a draft, and publishing versions.
- **validation**: Users can create a valid flow, see validation errors for invalid graphs, run it, and inspect persisted run evidence.
- **status**: Completed
- **log**: Added SVG node canvas, drag positioning, edge editing, validation, publish, Agent configuration and test-run history.
- **files edited/created**: `web-dashboard/app.js`, `web-dashboard/styles.css`

### T9: Shared module workbench upgrade
- **depends_on**: [T1, T6, T7, T8]
- **location**: `web-dashboard/app.js`, `web-dashboard/styles.css`, `plugin-service/server.js`
- **description**: Apply the standard context/input/run/artifacts/verification/approval/history/export structure to the 21 `UI_MODULES` entries. Use `UI_MODULES` as the display source of truth and explicitly mark non-task configuration pages where artifact/verification sections are not applicable.
- **validation**: Every task-capable module has a distinct title, input controls, artifact section, verification section, and export action; configuration pages expose their own concrete management surface; no task module falls back to a generic placeholder result.
- **status**: Completed
- **log**: Added standard evidence/verification panels and module-specific inputs; browser traversal reached all 21 modules without console errors.
- **files edited/created**: `web-dashboard/app.js`, `web-dashboard/styles.css`

### T10: Chat and workflow routing integration
- **depends_on**: [T4, T9]
- **location**: `plugin-service/server.js`, `web-dashboard/app.js`, `test/*.test.js`
- **description**: Add conversation/session IDs, route chat turns into WorkflowRuns, include asset/media intent, select the correct agent flow, expose progress, resolve stale asset references, and offer explicit approval-gated Codex escalation when tasks require implementation work.
- **validation**: Chat can initiate media conversion and business workflows, preserve multi-turn context, reject missing assets before execution, and return a verified result summary with missing-data guidance.
- **status**: Completed
- **log**: Chat now infers image/video operations, resolves imported assets, executes media runs and returns real artifact counts.
- **files edited/created**: `plugin-service/server.js`, `test/v4-media.test.js`

### T11: Integration, business, and browser validation
- **depends_on**: [T3, T6, T7, T8, T9, T10]
- **location**: `plugin-service/server.js`, `electron/main.js`, `electron/preload.js`, `web-dashboard/app.js`, `web-dashboard/styles.css`, `test/*.test.js`, `output/playwright/**`
- **description**: Add cross-module integration tests, Amazon business-result assertions, browser dogfooding for desktop/mobile, file validation, error-path checks, isolated temporary data/ports, cleanup, and regression fixes.
- **validation**: Explicit per-file syntax checks pass, all automated tests pass without touching production data, browser flows complete, and media artifacts pass metadata checks.
- **status**: Completed
- **log**: 27 automated tests pass; all 21 modules traverse; browser console has 0 errors; mobile width has no horizontal overflow; real media output is validated.
- **files edited/created**: `test/v4-core.test.js`, `test/v4-media.test.js`, `test/v4-http.test.js`, `output/playwright/v4-media-studio.png`, `output/playwright/v4-media-mobile.png`

### T12: Packaging and migration verification
- **depends_on**: [T11]
- **location**: `package.json`, `package-lock.json`, `electron/**/*`, `docs/**/*`
- **description**: Configure `asarUnpack`/resource resolution for `ffmpeg-static`, `sharp` and platform image packages, set version 4.0.0, verify native Electron ABI rebuilds, update v4 documentation, validate v3 migration/rollback with backups, and ensure `npm run dev` and `npm run package:win` remain usable.
- **validation**: Packaging succeeds and the packaged app contains bundled executable media dependencies, loads native modules, is idempotent when migrating v3 data, and can roll back a failed migration.
- **status**: Completed
- **log**: Version set to 4.0.0; packaged native dependencies and asarUnpack verified; Windows installer built; packaged executable generated a real image using bundled ffmpeg and sharp.
- **files edited/created**: `package.json`, `package-lock.json`, `release/Amazon-Control-4.0.0-Setup.exe`, `docs/AMAZON-CONTROL-V4.md`

## Parallel Execution Groups

| Wave | Tasks | Can Start When |
|------|-------|----------------|
| 1 | T1 | Immediately |
| 2 | T2 | T1 complete |
| 3 | T3, T4 | T2 complete |
| 4 | T5 | T3 and T4 complete |
| 5 | T6 | T5 complete |
| 6 | T7 | T6 complete |
| 7 | T8 | T7 complete |
| 8 | T9 | T8 complete |
| 9 | T10 | T9 complete |
| 10 | T11 | T10 complete |
| 11 | T12 | T11 complete |

## Testing Strategy

- Preserve the existing 15 tests and add focused v4 tests without weakening old assertions.
- Use temporary data directories for migration, Provider, Agent, and media tests.
- Generate tiny fixture images/videos and verify real output by file existence, dimensions, duration, MIME type, and asset registration.
- Test route precedence, fallback, budgets, health failures, cancelled runs, verifier rejection, and missing credentials.
- Use `agent-browser` for desktop/mobile workspace checks and normal user interaction flows.
- Run `node --check`, `npm test`, `npm run dev`, and `npm run package:win`.

## Risks & Mitigations

- The repository is not a Git worktree: record evidence in this plan and avoid destructive history operations.
- The scope spans many files and can create merge conflicts when edited concurrently: execute dependency waves sequentially and keep shared files under one owner per wave.
- Cloud Provider APIs differ: ship editable generic adapters and presets, validate local deterministic processing first, and never claim a cloud call succeeded without an artifact.
- FFmpeg binaries are platform-specific: use `ffmpeg-static` and verify the packaged executable resolves the bundled binary.
- Credential persistence differs between Electron and browser mode: use safe storage in Electron and session-only credentials in browser mode.
