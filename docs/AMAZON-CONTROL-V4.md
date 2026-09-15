# Amazon Control v4

Amazon Control v4 upgrades the local workbench from brief generation to real workflow execution.

## Capabilities

- Four media operations: `image_to_image`, `image_to_video`, `video_to_images`, and `video_to_video`.
- Local media processing with bundled `sharp` and `@ffmpeg-installer/ffmpeg`; no system `ffmpeg` installation is required.
- Generated images and videos are saved under the configured data directory and registered in the asset library.
- Provider Profiles support chat, reasoning, image, video, speech, data, and embedding capabilities.
- Capability routing resolves Agent overrides first, then project overrides, then global defaults.
- Provider credentials are session-only in browser mode and encrypted with Electron `safeStorage` in the desktop app.
- Eight default Agents: orchestrator, business analyst, creative director, media producer, listing/compliance, connector manager, evidence verifier, and recap memory.
- The visual Agent Builder supports role editing, node dragging, edge editing, validation, publishing, test runs, and persisted verification results.

## Local Data

- `provider-profiles.json`
- `provider-routes.json`
- `credential-vault.json`
- `agents.json`
- `agent-flows.json`
- `workflow-runs.json`
- `media-runs.json`
- `generator-runs.json`
- `verification-results.json`
- `usage-ledger.json`

Legacy `api-connections.json` records are migrated into Provider Profiles and capability routes without copying plaintext credentials into the new profile records.

## Service Interfaces

- `GET/POST /provider-profiles`
- `POST /provider-profiles/:id/test`
- `DELETE /provider-profiles/:id`
- `GET/POST /provider-routes`
- `GET /usage`
- `GET/POST /agents`
- `GET/POST /agent-flows`
- `POST /agent-flows/:id/publish`
- `GET/POST /workflow-runs`
- `GET/POST /media/runs`
- `GET/POST/DELETE /media/runs/:id`
- `POST /media/runs/:id/cancel`
- `GET /media/operations`
- `GET /skills/discover`
- `GET /verifications`

## Verification

- `node --test "test/*.test.js"`
- `npm run dev`
- `npm run package:win`

The automated suite validates real local outputs for all four media operations, Provider routing and redaction, legacy migration, Agent graph validation, workflow verification, Skill discovery, HTTP bridge behavior, and the packaged Windows build.
