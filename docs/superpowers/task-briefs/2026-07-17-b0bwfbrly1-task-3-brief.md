# Task 3 Brief: Source And Log The Free Stock Footage

Read this first. It is the requirements source for Task 3, and the exact values below should be used verbatim.

## Goal

Find, download, and log two to four free, non-AI, commercially usable stock fishing clips that can serve as context footage for the B0BWFBRLY1 Amazon A+ video.

## Files

- Create: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\manifests\stock_sources.md`
- Populate: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\stock\`

## Global Constraints

- Use only the three user-provided product clips plus free, non-AI, commercially usable fishing footage.
- Do not reuse YouTube footage without explicit permission.
- Keep the final video horizontal `16:9`.
- Keep target runtime between `32` and `38` seconds unless footage quality forces a shorter cut.
- Use short factual English subtitle overlays only.
- No voiceover by default.
- No unsupported catch or performance claims.
- End on real product footage, not on generic stock footage.
- This workspace is not a Git repository, so replace commit steps with saved checkpoint notes.

## Required Steps

### Find matching stock clips

Search for:

- pond or lake casting
- topwater fishing environment
- weed or shallow-cover fishing context

Prefer these sources:

- `https://www.pexels.com/search/videos/fishing/`
- `https://pixabay.com/videos/search/fishing/`

### Download stock clips

Save the selected clips into:

`D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\stock\`

Use descriptive names such as:

```text
stock_casting_01.mp4
stock_lake_surface_01.mp4
stock_retrieve_01.mp4
```

### Write the stock source log

Create:

`D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\manifests\stock_sources.md`

Use this structure:

```markdown
# Stock Sources

## stock_casting_01.mp4
- Source URL: <exact URL>
- Site: Pexels or Pixabay
- Downloaded: 2026-07-17
- License basis: free commercial use page reviewed on 2026-07-17
- Notes: no obvious brand logo or watermark

## stock_lake_surface_01.mp4
- Source URL: <exact URL>
- Site: Pexels or Pixabay
- Downloaded: 2026-07-17
- License basis: free commercial use page reviewed on 2026-07-17
- Notes: used only as context footage, not product proof
```

### Verification command

Run:

```powershell
Get-ChildItem 'D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\stock'
```

Expected result:

- The command lists the downloaded stock clips.

### Checkpoint note

Append one line to:

`D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\manifests\checkpoint.log`

Content:

```text
Task 3 complete: free stock clips downloaded and logged on 2026-07-17.
```

## Report Contract

Write your detailed work log to:

`D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\docs\superpowers\task-briefs\2026-07-17-b0bwfbrly1-task-3-report.md`

Your final response back to the controller must include only:

- Status: `DONE`, `DONE_WITH_CONCERNS`, `NEEDS_CONTEXT`, or `BLOCKED`
- Files changed
- Verification commands run
- Verification result summary
- Any concerns
