# Task 4 Brief: Assemble The Timeline And Render The Draft

Read this first. It is the requirements source for Task 4, and the exact values below should be used verbatim.

## Goal

Use the approved opening product image, the three approved user clips, and the two downloaded fishing-context stock clips to assemble a 16:9 Amazon A+ draft video and render `B0BWFBRLY1_a_plus_free_mixcut_v1.mp4`.

## Files

- Modify: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\scripts\render_b0bwfbrly1_video.py`
- Create: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\output\B0BWFBRLY1_a_plus_free_mixcut_v1.mp4`

## Global Constraints

- Use only the approved product image, the three user-provided product clips, and the downloaded free, non-AI, commercially usable fishing footage.
- Do not reuse YouTube footage without explicit permission.
- Keep the final video horizontal `16:9`.
- Keep target runtime between `32` and `38` seconds unless footage quality forces a shorter cut.
- Use short factual English subtitle overlays only.
- No voiceover by default.
- No unsupported catch or performance claims.
- End on real product footage, not on generic stock footage.
- This workspace is not a Git repository, so replace commit steps with saved checkpoint notes.

## Required Composition Script

Replace the script with this exact pipeline:

```python
from pathlib import Path

from moviepy import (
    ColorClip,
    CompositeVideoClip,
    ImageClip,
    TextClip,
    VideoFileClip,
    concatenate_videoclips,
)

PROJECT_DIR = Path(r"D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1")
OUTPUT = PROJECT_DIR / "output" / "B0BWFBRLY1_a_plus_free_mixcut_v1.mp4"
OPENING_IMAGE = Path(r"C:\Users\YANGJUN\AppData\Local\Temp\codex-clipboard-395cefe8-d9b9-42ad-b611-ccda572eba07.png")
USER_CLIPS = [
    Path(r"D:\HuaweiMoveData\Users\YANGJUN\Documents\xwechat_files\wxid_in7358saird122_1ef0\msg\video\2026-07\6efd54b3ebd135cedf31516aad4f1087.mp4"),
    Path(r"D:\HuaweiMoveData\Users\YANGJUN\Documents\xwechat_files\wxid_in7358saird122_1ef0\msg\video\2026-07\0ef8ea0b60b78b0b7d9381750148f45c.mp4"),
    Path(r"D:\HuaweiMoveData\Users\YANGJUN\Documents\xwechat_files\wxid_in7358saird122_1ef0\msg\video\2026-07\18c8bcd2a44c55b118c6614ce827add4.mp4"),
]
STOCK_CLIPS = sorted((PROJECT_DIR / "stock").glob("*.mp4"))

def fit_clip(path: Path, start: float, end: float) -> VideoFileClip:
    clip = VideoFileClip(str(path)).subclipped(start, end)
    scaled = clip.resized(height=1080)
    return scaled.cropped(x_center=scaled.w / 2, width=1920, y_center=scaled.h / 2, height=1080)

def fit_image(path: Path, duration: float) -> ImageClip:
    image = ImageClip(str(path)).with_duration(duration)
    scaled = image.resized(height=1080)
    return scaled.cropped(x_center=scaled.w / 2, width=1920, y_center=scaled.h / 2, height=1080)

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

def section(base_clip, subtitle: str):
    return CompositeVideoClip([base_clip, text_overlay(subtitle, base_clip.duration)], size=(1920, 1080))

def main() -> None:
    if len(STOCK_CLIPS) < 2:
        raise RuntimeError("Need at least two stock clips in the stock folder before rendering.")

    opening = section(fit_image(OPENING_IMAGE, 4.0), "5PCS Topwater Frog Lure Set")
    support = section(fit_clip(USER_CLIPS[0], 0.5, 6.5), "Topwater Frog Action")
    context_a = section(fit_clip(STOCK_CLIPS[0], 0.0, 5.0), "Ideal for Topwater Fishing")
    details = section(fit_clip(USER_CLIPS[1], 1.0, 8.0), "5 Colors  |  Double Hooks")
    context_b = section(fit_clip(STOCK_CLIPS[1], 0.0, 5.0), "Fishing Context Footage")
    close = section(fit_clip(USER_CLIPS[2], 2.0, 9.0), "Built for Bass and Snakehead")

    video = concatenate_videoclips(
        [opening, support, context_a, details, context_b, close],
        method="compose",
    )
    background = ColorClip(size=(1920, 1080), color=(0, 0, 0), duration=video.duration)
    final = CompositeVideoClip([background, video], size=(1920, 1080))
    final.write_videofile(str(OUTPUT), fps=30, codec="libx264", audio=False)

if __name__ == "__main__":
    main()
```

## Verification

Run:

```powershell
& 'C:\Users\YANGJUN\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' `
  'D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\scripts\render_b0bwfbrly1_video.py'
```

Expected result:

- MoviePy renders `B0BWFBRLY1_a_plus_free_mixcut_v1.mp4` without raising exceptions.

Then run:

```powershell
Get-Item 'D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\output\B0BWFBRLY1_a_plus_free_mixcut_v1.mp4'
```

Expected result:

- PowerShell reports the MP4 file with a non-zero size.

## Checkpoint note

Append one line to:

`D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\manifests\checkpoint.log`

Content:

```text
Task 4 complete: draft MP4 rendered on 2026-07-17.
```

## Report Contract

Write your detailed work log to:

`D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\docs\superpowers\task-briefs\2026-07-17-b0bwfbrly1-task-4-report.md`

Your final response back to the controller must include only:

- Status: `DONE`, `DONE_WITH_CONCERNS`, `NEEDS_CONTEXT`, or `BLOCKED`
- Files changed
- Verification commands run
- Verification result summary
- Any concerns
