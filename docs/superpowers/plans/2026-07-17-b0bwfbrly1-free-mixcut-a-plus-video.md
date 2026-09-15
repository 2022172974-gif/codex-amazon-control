# B0BWFBRLY1 Free Mixcut A+ Video Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build one zero-budget Amazon A+ horizontal product video for `B0BWFBRLY1` using the user's three real product clips plus free non-AI fishing footage with clear source logging.

**Architecture:** Use a small Python-based editing pipeline so the output is reproducible and does not depend on a GUI editor being installed. The pipeline will inspect the user clips, ingest a small set of free stock clips with license notes, assemble a 16:9 timeline with light subtitle overlays, and render one draft plus one final MP4.

**Tech Stack:** PowerShell, bundled Python, pip-installed `moviepy`, `imageio-ffmpeg`, optional `numpy`, local filesystem outputs

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

---

### Task 1: Bootstrap The Editing Workspace

**Files:**
- Create: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\README.md`
- Create: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\manifests\input_clips.md`
- Create: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\scripts\render_b0bwfbrly1_video.py`
- Create: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\inputs\`
- Create: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\stock\`
- Create: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\previews\`
- Create: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\output\`

**Interfaces:**
- Consumes: user clip paths from the approved spec
- Produces: stable working directory structure and an initial render script path for later tasks

- [ ] **Step 1: Create the working directories**

Run:

```powershell
New-Item -ItemType Directory -Force `
  'D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\inputs' `
  'D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\stock' `
  'D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\previews' `
  'D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\output' `
  'D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\manifests' `
  'D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\scripts'
```

Expected: six directories are created or reported as already existing.

- [ ] **Step 2: Write the workspace README**

Write:

```markdown
# B0BWFBRLY1 Video Workspace

- Purpose: build a free-mixcut Amazon A+ video
- Inputs: 3 user clips plus free non-AI stock clips
- Outputs: preview stills, source manifests, draft MP4, final MP4
```

To:

`D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\README.md`

- [ ] **Step 3: Record the three provided user clips in a manifest**

Write:

```markdown
# Input Clips

- Clip 1: `D:/HuaweiMoveData/Users/YANGJUN/Documents/xwechat_files/wxid_in7358saird122_1ef0/msg/video/2026-07/6efd54b3ebd135cedf31516aad4f1087.mp4`
- Clip 2: `D:/HuaweiMoveData/Users/YANGJUN/Documents/xwechat_files/wxid_in7358saird122_1ef0/msg/video/2026-07/0ef8ea0b60b78b0b7d9381750148f45c.mp4`
- Clip 3: `D:/HuaweiMoveData/Users/YANGJUN/Documents/xwechat_files/wxid_in7358saird122_1ef0/msg/video/2026-07/18c8bcd2a44c55b118c6614ce827add4.mp4`

Observed durations on 2026-07-17:

- Clip 1: about 11 seconds
- Clip 2: about 11 seconds
- Clip 3: about 14 seconds
```

To:

`D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\manifests\input_clips.md`

- [ ] **Step 4: Create the initial Python script skeleton**

Write:

```python
from pathlib import Path

PROJECT_DIR = Path(r"D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1")
INPUTS = [
    Path(r"D:\HuaweiMoveData\Users\YANGJUN\Documents\xwechat_files\wxid_in7358saird122_1ef0\msg\video\2026-07\6efd54b3ebd135cedf31516aad4f1087.mp4"),
    Path(r"D:\HuaweiMoveData\Users\YANGJUN\Documents\xwechat_files\wxid_in7358saird122_1ef0\msg\video\2026-07\0ef8ea0b60b78b0b7d9381750148f45c.mp4"),
    Path(r"D:\HuaweiMoveData\Users\YANGJUN\Documents\xwechat_files\wxid_in7358saird122_1ef0\msg\video\2026-07\18c8bcd2a44c55b118c6614ce827add4.mp4"),
]

def main() -> None:
    print("B0BWFBRLY1 render workspace ready")
    for clip in INPUTS:
        print(clip, clip.exists())

if __name__ == "__main__":
    main()
```

To:

`D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\scripts\render_b0bwfbrly1_video.py`

- [ ] **Step 5: Verify the script can see the input clips**

Run:

```powershell
& 'C:\Users\YANGJUN\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' `
  'D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\scripts\render_b0bwfbrly1_video.py'
```

Expected: the script prints `True` for all three input clip paths.

- [ ] **Step 6: Save a checkpoint note**

Write one line to:

`D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\manifests\checkpoint.log`

Content:

```text
Task 1 complete: workspace and script skeleton created on 2026-07-17.
```

### Task 2: Install The Video Runtime And Inspect The User Clips

**Files:**
- Modify: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\scripts\render_b0bwfbrly1_video.py`
- Create: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\manifests\clip_report.md`
- Create: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\previews\contact_sheet.jpg`

**Interfaces:**
- Consumes: workspace from Task 1
- Produces: dependable local editing libraries, clip metadata, and still-frame previews used to choose timeline segments

- [ ] **Step 1: Install the minimum Python packages**

Run:

```powershell
& 'C:\Users\YANGJUN\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' -m pip install moviepy imageio-ffmpeg numpy
```

Expected: pip reports successful installation of `moviepy`, `imageio-ffmpeg`, and `numpy`.

- [ ] **Step 2: Extend the script to inspect clip metadata and capture preview frames**

Replace the script with:

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

- [ ] **Step 3: Run the inspection script**

Run:

```powershell
& 'C:\Users\YANGJUN\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' `
  'D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\scripts\render_b0bwfbrly1_video.py'
```

Expected: the command prints the paths to `clip_report.md` and `contact_sheet.jpg` and the preview images are generated.

- [ ] **Step 4: Review the contact sheet and select the strongest timeline moments**

Use the generated `contact_sheet.jpg` to decide:

- best opening product shot
- best detail close-up
- best action-ready closing shot

Then append a short note to:

`D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\manifests\clip_report.md`

Content example:

```markdown
## Edit Picks

- Opening: clip 3 preview 1
- Details: clip 1 preview 2 and clip 2 preview 3
- Closing: clip 3 preview 3
```

- [ ] **Step 5: Save a checkpoint note**

Append:

```text
Task 2 complete: runtime installed and clip previews selected on 2026-07-17.
```

To:

`D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\manifests\checkpoint.log`

### Task 3: Source And Log The Free Stock Footage

**Files:**
- Create: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\manifests\stock_sources.md`
- Populate: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\stock\`

**Interfaces:**
- Consumes: approved design constraints and chosen product-timeline needs from Task 2
- Produces: 2 to 4 downloadable stock clips with documented source URLs and license notes

- [ ] **Step 1: Find two to four matching stock clips**

Search for:

- pond or lake casting
- topwater fishing environment
- weed or shallow-cover fishing context

Prefer sources from:

- `https://www.pexels.com/search/videos/fishing/`
- `https://pixabay.com/videos/search/fishing/`

- [ ] **Step 2: Download the selected stock clips into the stock folder**

Save them under descriptive names such as:

```text
stock_casting_01.mp4
stock_lake_surface_01.mp4
stock_retrieve_01.mp4
```

Path:

`D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\stock\`

- [ ] **Step 3: Document the stock sources and license basis**

Write:

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

To:

`D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\manifests\stock_sources.md`

- [ ] **Step 4: Verify the stock folder contains the chosen assets**

Run:

```powershell
Get-ChildItem 'D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\stock'
```

Expected: the command lists the downloaded stock clips.

- [ ] **Step 5: Save a checkpoint note**

Append:

```text
Task 3 complete: free stock clips downloaded and logged on 2026-07-17.
```

To:

`D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\manifests\checkpoint.log`

### Task 4: Assemble The Timeline And Render The Draft

**Files:**
- Modify: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\scripts\render_b0bwfbrly1_video.py`
- Create: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\output\B0BWFBRLY1_a_plus_free_mixcut_v1.mp4`

**Interfaces:**
- Consumes: chosen product shots from Task 2 and stock assets from Task 3
- Produces: one draft MP4 matching the approved structure

- [ ] **Step 1: Replace the script with a minimal composition pipeline**

Write:

```python
from pathlib import Path

from moviepy import (
    ColorClip,
    CompositeVideoClip,
    TextClip,
    VideoFileClip,
    concatenate_videoclips,
)

PROJECT_DIR = Path(r"D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1")
OUTPUT = PROJECT_DIR / "output" / "B0BWFBRLY1_a_plus_free_mixcut_v1.mp4"
USER_CLIPS = [
    Path(r"D:\HuaweiMoveData\Users\YANGJUN\Documents\xwechat_files\wxid_in7358saird122_1ef0\msg\video\2026-07\6efd54b3ebd135cedf31516aad4f1087.mp4"),
    Path(r"D:\HuaweiMoveData\Users\YANGJUN\Documents\xwechat_files\wxid_in7358saird122_1ef0\msg\video\2026-07\0ef8ea0b60b78b0b7d9381750148f45c.mp4"),
    Path(r"D:\HuaweiMoveData\Users\YANGJUN\Documents\xwechat_files\wxid_in7358saird122_1ef0\msg\video\2026-07\18c8bcd2a44c55b118c6614ce827add4.mp4"),
]
STOCK_CLIPS = sorted((PROJECT_DIR / "stock").glob("*.mp4"))

def fit_clip(path: Path, start: float, end: float) -> VideoFileClip:
    clip = VideoFileClip(str(path)).subclipped(start, end)
    return clip.resized(height=1080).cropped(x_center=clip.w / 2, width=1920, y_center=clip.h / 2, height=1080)

def text_overlay(text: str, duration: float):
    return TextClip(
        text=text,
        font_size=56,
        color="white",
        method="caption",
        size=(1400, None),
        stroke_color="black",
        stroke_width=2,
    ).with_position(("center", 940)).with_duration(duration)

def section(base_clip: VideoFileClip, subtitle: str):
    return CompositeVideoClip([base_clip, text_overlay(subtitle, base_clip.duration)], size=(1920, 1080))

def main() -> None:
    if len(STOCK_CLIPS) < 2:
        raise RuntimeError("Need at least two stock clips in the stock folder before rendering.")

    opening = section(fit_clip(USER_CLIPS[2], 0.0, 4.0), "5PCS Topwater Frog Lure Set")
    details = section(fit_clip(USER_CLIPS[0], 1.0, 8.0), "5 Colors  |  Double Hooks  |  Topwater Action")
    context_a = section(fit_clip(STOCK_CLIPS[0], 0.0, 6.0), "Ideal for Topwater Fishing")
    context_b = section(fit_clip(STOCK_CLIPS[1], 0.0, 6.0), "Works Around Weeds and Cover")
    close = section(fit_clip(USER_CLIPS[1], 0.0, 7.0), "Built for Bass and Snakehead")

    video = concatenate_videoclips([opening, details, context_a, context_b, close], method="compose")
    background = ColorClip(size=(1920, 1080), color=(0, 0, 0), duration=video.duration)
    final = CompositeVideoClip([background, video], size=(1920, 1080))
    final.write_videofile(str(OUTPUT), fps=30, codec="libx264", audio=False)

if __name__ == "__main__":
    main()
```

- [ ] **Step 2: Render the draft**

Run:

```powershell
& 'C:\Users\YANGJUN\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' `
  'D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\scripts\render_b0bwfbrly1_video.py'
```

Expected: MoviePy renders `B0BWFBRLY1_a_plus_free_mixcut_v1.mp4` without raising exceptions.

- [ ] **Step 3: Verify the draft file exists**

Run:

```powershell
Get-Item 'D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\output\B0BWFBRLY1_a_plus_free_mixcut_v1.mp4'
```

Expected: PowerShell reports the MP4 file with a non-zero size.

- [ ] **Step 4: Save a checkpoint note**

Append:

```text
Task 4 complete: draft MP4 rendered on 2026-07-17.
```

To:

`D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\manifests\checkpoint.log`

### Task 5: Verify, Tune, And Deliver The Final Video

**Files:**
- Modify: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\scripts\render_b0bwfbrly1_video.py`
- Create: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\manifests\final_verification.md`
- Confirm: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\output\B0BWFBRLY1_a_plus_free_mixcut_v1.mp4`

**Interfaces:**
- Consumes: draft render from Task 4
- Produces: verified final video plus an evidence-based verification note

- [ ] **Step 1: Inspect final duration and frame size with Python**

Run:

```powershell
@'
from moviepy import VideoFileClip
from pathlib import Path
path = Path(r"D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\output\B0BWFBRLY1_a_plus_free_mixcut_v1.mp4")
with VideoFileClip(str(path)) as clip:
    print({"duration": round(clip.duration, 2), "size": (clip.w, clip.h), "fps": clip.fps})
'@ | & 'C:\Users\YANGJUN\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' -
```

Expected: the printed size is `(1920, 1080)` and the duration is between `32` and `38` seconds.

- [ ] **Step 2: Extract three verification stills from the final MP4**

Run:

```powershell
@'
from moviepy import VideoFileClip
from pathlib import Path
from PIL import Image
video = Path(r"D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\output\B0BWFBRLY1_a_plus_free_mixcut_v1.mp4")
out_dir = Path(r"D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\previews")
times = [1.0, 16.0, 31.0]
with VideoFileClip(str(video)) as clip:
    for idx, t in enumerate(times, start=1):
        frame = clip.get_frame(min(t, clip.duration - 0.2))
        Image.fromarray(frame).save(out_dir / f"final_check_{idx}.jpg", quality=92)
'@ | & 'C:\Users\YANGJUN\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' -
```

Expected: `final_check_1.jpg`, `final_check_2.jpg`, and `final_check_3.jpg` appear in the previews folder.

- [ ] **Step 3: Write the final verification note**

Write:

```markdown
# Final Verification

- Final file: `output/B0BWFBRLY1_a_plus_free_mixcut_v1.mp4`
- Verified on: 2026-07-17
- Format: 1920x1080
- Runtime: <fill with measured runtime>
- Audio: none
- Opening uses real product footage: yes
- Ending uses real product footage: yes
- Stock source log present: yes
- AI-generated footage used: no
- YouTube footage used: no
```

To:

`D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\manifests\final_verification.md`

- [ ] **Step 4: If verification misses the runtime or framing target, tune the script and rerender**

Allowed tuning:

- shorten or extend the stock context sections by 1 to 2 seconds each
- swap opening or close from a different user clip
- adjust subtitle font size if it overlaps the subject

Then rerun the render command from Task 4 Step 2 and the verification commands from Task 5 Steps 1 and 2.

- [ ] **Step 5: Save a final checkpoint note**

Append:

```text
Task 5 complete: final MP4 verified on 2026-07-17.
```

To:

`D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\manifests\checkpoint.log`
