# Task 1 Brief: Bootstrap The Editing Workspace

Read this first. It is the requirements source for Task 1, and the exact values below should be used verbatim.

## Goal

Create the working directory structure, record the three user input clips, and add the initial Python render script skeleton for the B0BWFBRLY1 free-mixcut A+ video workspace.

## Files

- Create: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\README.md`
- Create: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\manifests\input_clips.md`
- Create: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\scripts\render_b0bwfbrly1_video.py`
- Create: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\inputs\`
- Create: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\stock\`
- Create: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\previews\`
- Create: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\output\`

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

## Required Content

### README content

```markdown
# B0BWFBRLY1 Video Workspace

- Purpose: build a free-mixcut Amazon A+ video
- Inputs: 3 user clips plus free non-AI stock clips
- Outputs: preview stills, source manifests, draft MP4, final MP4
```

### Input manifest content

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

### Python script content

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

### Verification command

```powershell
& 'C:\Users\YANGJUN\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' `
  'D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\scripts\render_b0bwfbrly1_video.py'
```

Expected result:

- The script prints `True` for all three input clip paths.

### Checkpoint note

Append one line to:

`D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\video\B0BWFBRLY1\manifests\checkpoint.log`

Content:

```text
Task 1 complete: workspace and script skeleton created on 2026-07-17.
```

## Report Contract

Write your detailed work log to:

`D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\docs\superpowers\task-briefs\2026-07-17-b0bwfbrly1-task-1-report.md`

Your final response back to the controller must include only:

- Status: `DONE`, `DONE_WITH_CONCERNS`, `NEEDS_CONTEXT`, or `BLOCKED`
- Files changed
- Verification command run
- Verification result summary
- Any concerns
