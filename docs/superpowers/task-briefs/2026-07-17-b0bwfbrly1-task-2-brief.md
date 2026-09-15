# Task 2 Brief: Install The Video Runtime And Inspect The User Clips

Read this first. It is the requirements source for Task 2, and the exact values below should be used verbatim.

## Goal

Install the minimum local Python video runtime, inspect the three provided user clips, generate preview stills, build a contact sheet, and write a clip report that identifies the strongest candidate moments for the timeline.

## Files

- Modify: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\scripts\render_b0bwfbrly1_video.py`
- Create: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\manifests\clip_report.md`
- Create: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\previews\contact_sheet.jpg`

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

### Install packages

Run:

```powershell
& 'C:\Users\YANGJUN\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' -m pip install moviepy imageio-ffmpeg numpy
```

Expected result:

- pip reports successful installation of `moviepy`, `imageio-ffmpeg`, and `numpy`.

### Replace the script with this exact inspection pipeline

```python
from pathlib import Path
from math import floor

from moviepy import VideoFileClip
from PIL import Image, ImageDraw

PROJECT_DIR = Path(r"D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1")
PREVIEW_DIR = PROJECT_DIR / "previews"
REPORT_PATH = PROJECT_DIR / "manifests" / "clip_report.md"
CONTACT_SHEET = PREVIEW_DIR / "contact_sheet.jpg"
INPUTS = [
    Path(r"D:\HuaweiMoveData\Users\YANGJUN\Documents\xwechat_files\wxid_in7358saird122_1ef0\msg\video\2026-07\6efd54b3ebd135cedf31516aad4f1087.mp4"),
    Path(r"D:\HuaweiMoveData\Users\YANGJUN\Documents\xwechat_files\wxid_in7358saird122_1ef0\msg\video\2026-07\0ef8ea0b60b78b0b7d9381750148f45c.mp4"),
    Path(r"D:\HuaweiMoveData\Users\YANGJUN\Documents\xwechat_files\wxid_in7358saird122_1ef0\msg\video\2026-07\18c8bcd2a44c55b118c6614ce827add4.mp4"),
]

def inspect_clip(path: Path) -> dict:
    with VideoFileClip(str(path)) as clip:
        frame_times = [0.2, max(0.2, clip.duration / 2), max(0.2, clip.duration - 0.3)]
        preview_paths = []
        for idx, frame_time in enumerate(frame_times, start=1):
            frame = clip.get_frame(frame_time)
            image = Image.fromarray(frame)
            preview_path = PREVIEW_DIR / f"{path.stem}_{idx}.jpg"
            image.save(preview_path, quality=92)
            preview_paths.append(preview_path)
        return {
            "name": path.name,
            "duration": round(clip.duration, 2),
            "size": f"{clip.w}x{clip.h}",
            "fps": round(clip.fps, 2),
            "previews": preview_paths,
        }

def write_report(rows: list[dict]) -> None:
    lines = ["# Clip Report", ""]
    for row in rows:
        lines.extend([
            f"## {row['name']}",
            f"- Duration: {row['duration']}s",
            f"- Resolution: {row['size']}",
            f"- FPS: {row['fps']}",
            "",
        ])
    REPORT_PATH.write_text("\n".join(lines), encoding="utf-8")

def build_contact_sheet(rows: list[dict]) -> None:
    thumbs = []
    labels = []
    for row in rows:
        for preview in row["previews"]:
            thumbs.append(Image.open(preview).convert("RGB"))
            labels.append(preview.stem)
    resized = [img.resize((320, 180)) for img in thumbs]
    sheet = Image.new("RGB", (960, 180 * len(rows)), "white")
    draw = ImageDraw.Draw(sheet)
    for idx, image in enumerate(resized):
        x = (idx % 3) * 320
        y = floor(idx / 3) * 180
        sheet.paste(image, (x, y))
        draw.text((10 + x, 10 + y), labels[idx], fill="black")
    sheet.save(CONTACT_SHEET, quality=92)

def main() -> None:
    PREVIEW_DIR.mkdir(parents=True, exist_ok=True)
    rows = [inspect_clip(path) for path in INPUTS]
    write_report(rows)
    build_contact_sheet(rows)
    print(REPORT_PATH)
    print(CONTACT_SHEET)

if __name__ == "__main__":
    main()
```

### Run the inspection script

Run:

```powershell
& 'C:\Users\YANGJUN\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' `
  'D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\scripts\render_b0bwfbrly1_video.py'
```

Expected result:

- The command prints the paths to `clip_report.md` and `contact_sheet.jpg`.
- Preview images are generated in the previews folder.

### Add edit picks to the clip report

Append an `## Edit Picks` section to `clip_report.md` after reviewing the generated contact sheet.

Use this structure:

```markdown
## Edit Picks

- Opening: <clip and preview choice>
- Details: <clip and preview choice>
- Closing: <clip and preview choice>
```

### Checkpoint note

Append one line to:

`D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\manifests\checkpoint.log`

Content:

```text
Task 2 complete: runtime installed and clip previews selected on 2026-07-17.
```

## Report Contract

Write your detailed work log to:

`D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\docs\superpowers\task-briefs\2026-07-17-b0bwfbrly1-task-2-report.md`

Your final response back to the controller must include only:

- Status: `DONE`, `DONE_WITH_CONCERNS`, `NEEDS_CONTEXT`, or `BLOCKED`
- Files changed
- Verification commands run
- Verification result summary
- Any concerns
