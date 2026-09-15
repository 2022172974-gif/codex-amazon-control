# Amazon Control Project Brief

Amazon Control is a local-first, extensible AI Agent operations platform for Amazon sellers and cross-border ecommerce teams.

## Product Positioning

- Build an AI-driven Amazon operations workbench, not a simple form dashboard.
- The primary interaction is a chat command center; module pages are advanced editors and review surfaces.
- The AI should understand project context, marketplace, assets, API data, imported files, historical tasks, available skills, and permissions before deciding what to do.

## Target Users

- The primary user is the current seller/operator building Amazon workflows.
- Future users include a small studio or team that needs project package import/export and local configuration.

## Core Capabilities

- Multi-marketplace project context for Amazon US, CA, MX, UK, DE, FR, IT, ES, JP, AU, IN, and BR.
- Data sources include API/IPA connectors, CSV, JSON, dragged-in assets, manual input, local files, links, and historical tasks.
- Core workflows include product research, profit/FBA, listing optimization, advertising diagnosis, business data analysis, inventory replenishment, compliance review, image generation, video generation, material sourcing, execution center, automatic listing drafts, and recap/export.
- The platform must support future skills, third-party tools, image/video generators, browser automation, and AI providers through an extensible tool registry.

## Storage And Sharing

- Default user data directory on this machine: `D:\AmazonControlData\app-store`.
- Storage must be configurable so the app can be shared with studio teammates.
- Default team mode is local-first with project package export/import.
- Sensitive API keys, tokens, and private credentials must not be exported by default.

## Safety

- API/IPA read operations may be automatic after configuration.
- Any write/submit action requires approval, including Amazon backend changes, advertising budget/bid changes, listing submission, Feed submission, browser-assisted backend operations, deleting data, and connector configuration changes.
