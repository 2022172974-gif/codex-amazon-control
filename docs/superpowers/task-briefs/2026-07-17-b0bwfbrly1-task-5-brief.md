# Task 5 Brief: Verify, Tune, And Deliver The Final Video

Read this first. It is the requirements source for Task 5, and the exact values below should be used verbatim.

## Goal

Verify the final draft MP4, extract proof frames, tune if needed, and record evidence-based final verification for the B0BWFBRLY1 free-mixcut A+ video.

## Files

- Modify: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\scripts\render_b0bwfbrly1_video.py`
- Create: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\manifests\final_verification.md`
- Confirm: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\output\B0BWFBRLY1_a_plus_free_mixcut_v1.mp4`

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

## Verification Commands

### Measure final duration and size

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

Expected result:

- Printed size is `(1920, 1080)`.
- Duration is between `32` and `38` seconds.

### Extract three verification stills

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

Expected result:

- `final_check_1.jpg`, `final_check_2.jpg`, and `final_check_3.jpg` appear in the previews folder.

## Final Verification File

Create:

`D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\manifests\final_verification.md`

Use this structure:

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

## Tuning Rules

If the draft misses runtime or framing targets, you may:

- shorten or extend the stock context sections by 1 to 2 seconds each
- swap opening or close to another user clip
- adjust subtitle font size if it overlaps the subject

Then rerun the render command and both verification commands.

## Checkpoint note

Append one line to:

`D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\manifests\checkpoint.log`

Content:

```text
Task 5 complete: final MP4 verified on 2026-07-17.
```

## Report Contract

Write your detailed work log to:

`D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\docs\superpowers\task-briefs\2026-07-17-b0bwfbrly1-task-5-report.md`

Your final response back to the controller must include only:

- Status: `DONE`, `DONE_WITH_CONCERNS`, `NEEDS_CONTEXT`, or `BLOCKED`
- Files changed
- Verification commands run
- Verification result summary
- Any concerns
