# Amazon Control v3.1: Mature Seller Software-Inspired Extensible AI Operations Platform

## Summary

Amazon Control v3.1 is a local-first, extensible AI Agent operations platform for Amazon sellers and cross-border ecommerce teams. It should not be a simple form dashboard or a shallow task router. The target product is a chat-driven operations command center that combines mature seller-software workflows, local data, dragged assets, API/IPA connectors, multi-agent AI, skill/tool extensibility, and approval-controlled execution.

The design should learn from mature Amazon seller software categories and capabilities:

- Helium 10 style full-chain seller tooling: product research, keyword research, listing optimization, profitability, inventory, and operations workflows.
- Jungle Scout style product research, market intelligence, sales analytics, supplier/product validation, and inventory planning.
- SellerApp style product intelligence, listing quality, PPC optimization, profit analysis, and performance dashboards.
- Perpetua style goal-based Amazon PPC automation, optimization, and budget/bid workflows.
- Amazon official automation concepts: SP-API, Listings Items, Product Type Definitions, Feeds, Reports, and Amazon Ads API.

## Product Direction

- The main interaction is a true AI Agent command center. Users should be able to chat naturally, reference imported data, reference assets, ask follow-up questions, and ask the system to decide what to do next.
- Module pages are not the primary user flow. They are advanced editors, previews, approval surfaces, result/history views, and export panels.
- The AI must read project context, marketplace, local assets, API/IPA data, imported CSV/JSON, previous task history, available skills, tool permissions, and approval rules before deciding what to do.
- The software must not lock users into one API provider, one OpenAI model, one image generator, one video generator, one marketplace, one local path, or one workflow.

## Key Changes

- Add a true AI Agent orchestration layer instead of fixed keyword routing. The agent should understand multi-turn context, decide which module/tool/skill to use, identify missing data, and explain its reasoning.
- Add a software capability map inspired by mature seller tools: market opportunity, keyword research, competitor monitoring, profit/FBA analysis, listing quality, advertising automation, inventory forecasting, sales analytics, review intelligence, creative production, listing execution, alerts, and recap/export.
- Add a Skill/Tool Extension Center. Future skills, data software APIs, image generators, video generators, browser automation scripts, local commands, and REST APIs should be registerable without rewriting the main app.
- Add multi-model and multi-agent support. Users can create agents such as Operations Director, Product Manager, Advertising Specialist, Inventory Planner, Listing Expert, Image Director, Video Director, Compliance Reviewer, and Listing Execution Agent. Each agent can choose a model/provider, tools, permissions, budget, and output style.
- Add an asset library as the foundation of content production. Images, videos, folders, links, CSV, JSON, and files can be dragged in or selected. Imported files should copy to a configurable workspace while preserving original path metadata.
- Make image/video generation provider-agnostic. The app should support OpenAI-compatible image APIs, CapCut/Jianying-like workflows, Runway/Pika/Kling-style video providers, local scripts, and arbitrary REST APIs through generator connectors.
- Do not require API data. API/IPA, CSV, JSON, dragged files, manual input, local assets, links, and historical tasks must all be usable as data sources. The AI should use whatever is available and ask for missing data only when needed.
- API/IPA permissions default to automatic reads and approval-required writes. Reading configured data can be automatic; modifying ads, changing listings, submitting feeds, browser backend operations, deleting data, or changing connector configs must require approval.
- Automatic listing supports three paths: export upload table, submit through SP-API/Feeds after approval, or browser-assisted submission after approval. Every path must show field preview, missing fields, compliance risk, and failure/retry notes.
- Team sharing is local-first with project package import/export. Project packages can include project structure, task outputs, non-sensitive field mappings, asset index, and optionally asset files. API keys, tokens, and credentials are excluded by default.

## Module Design

- Product Research and Market Validation: keyword, ASIN, category, price band, review barrier, estimated demand, competition pressure, supply risk, profit assumptions, and Go/Test/Avoid decisions.
- Advertising Diagnosis: target ACoS, ACoS, ROAS, CTR, CVR, CPC, search-term layering, negative keywords, budget migration, bid suggestions, wasted spend, campaign structure, and approval action lists.
- Inventory and Replenishment: cover days, sales forecast, inbound inventory, lead time, safety stock, stockout risk, overstock, aging inventory, storage cost, liquidation suggestions, and purchase approval drafts.
- Listing Optimization: title, bullets, description, Search Terms, A+ content, keyword coverage, listing quality, image readiness, conversion blockers, advertising readiness, and upload drafts.
- Data Analysis: chat-goal-driven investigation such as "why did profit drop", "why did conversion fall", "which SKU drags performance", "which campaign wastes spend", and "what changed this week".
- Image Generation: use selected assets and desired outcome to generate main images, secondary images, A+ images, scene images, size images, comparison images, prompts, constraints, platform parameters, and material usage notes.
- Video Generation: use selected assets and desired outcome to generate 15/30/45 second scripts, storyboards, subtitles, voiceovers, shot lists, editing instructions, generator parameters, and required missing footage.
- Compliance Review: marketplace, category, material, listing copy, image/video content, IP/sensitive words, certification, labeling, and account-health risks before listing, ads, creative, or execution actions.
- Automatic Listing: generate listing drafts, upload tables, field mapping, missing-field checklists, compliance checks, SP-API/Feeds submission drafts, and browser-assisted execution drafts.
- Recap and Export: weekly/monthly business review, task history, decision logs, risk logs, action list, exports, and project package creation.

## Interfaces And Local Data

- Keep current Electron API methods and add: `listAssets()`, `importAssets()`, `getAsset()`, `deleteAsset()`, `listSkills()`, `installSkill()`, `listAgents()`, `saveAgent()`, `submitAssistantTurn()`, `runTool()`, `listToolRuns()`, `approveAction()`, `executeApprovedAction()`, `exportProjectPackage()`, and `importProjectPackage()`.
- Add local files: `assets.json`, `assets/files/*`, `agents.json`, `skills.json`, `tool-registry.json`, `tool-runs.json`, `assistant-sessions.json`, `action-drafts.json`, `listing-drafts.json`, `project-packages/*`, and `ai-providers.json`.
- Every AI response must show: data/assets/history used, tools called, conclusion, reasoning basis, missing data, next recommended actions, executable actions, risk level, and approval state.
- Every skill/tool must declare: capability, input schema, output schema, supported modules, risk level, approval requirement, invocation method, and fallback behavior.

## Implementation Order

1. Context source files and decisions.
2. Asset library and asset references in chat.
3. AI provider and multi-agent configuration.
4. Skill/tool registry.
5. AI-first assistant turn pipeline.
6. Deep advertising, inventory, data, profit, listing, compliance, product research, and recap modules.
7. Image/video generator connector expansion.
8. Approval-gated automatic listing execution.
9. Project package import/export for studio sharing.

## Test Plan

- Without API connectors, dragged advertising CSV, inventory JSON, images, and videos can still drive advertising, inventory, image, video, Listing, and recap workflows.
- With API connectors, the AI can automatically read configured data but cannot write to Amazon or change configuration without approval.
- After adding a third-party image/video skill, chat and module pages can discover and call it.
- Multiple agents can use different models and tool permissions.
- Project packages can be exported and imported on another computer without leaking API keys or tokens.
- Automatic listing can export a table; SP-API/Feeds and browser-assisted submission require approval.
- `npm run dev` and `npm run package:win` remain usable.

## Assumptions

- Real AI first, local rule fallback.
- Multi-model, multi-agent, multi-skill, multi-connector architecture.
- Default current-machine data directory remains `D:\AmazonControlData\app-store`, but the data directory must be configurable for other users.
- API reads can be automatic after setup; all write/submit actions require approval.
- Dragged CSV/JSON/assets can fully replace API data when enough information is available.
