# Amazon Automation Control Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

> **Execution note:** On this Windows shell, UTF-8 Chinese paths may render as mojibake in terminal output. Execute the planned file operations using Unicode-safe scripts or discovered file objects instead of retyping rendered path strings from terminal output.

**Goal:** Build the `codex亚马逊自动化总控` workspace so it matches the approved v3.0 control-package structure, with root control files and six populated module `AGENTS.md` files.

**Architecture:** Implement the deployment in four passes: scaffold the target structure, populate root package files from the approved attachment, populate module manuals from local source projects and docx handbooks, then run static validation and cleanup. Normalize all written text files to UTF-8 and keep all original source directories untouched.

**Tech Stack:** PowerShell, Python 3.14, Markdown, YAML, OOXML (`.docx`) zip/XML extraction

## Global Constraints

- Strictly use the v3.0 package structure and module names from the approved spec.
- Root `AGENTS.md` and `config/column_mapping.yaml` must come from the attachment content without semantic edits.
- Module manuals must come from the mapped local source files and docx handbooks recorded in the approved spec.
- Write target text files as UTF-8.
- Do not modify any original source directories under `D:\HuaweiMoveData\Users\YANGJUN\Documents\...`.
- Static verification only; do not attempt Chrome, MCP, CSV upload, or cross-project runtime tests in this implementation.
- The workspace is not a git repository; every commit step must use a detection command and print `SKIP: workspace is not a git repository`.

---

## File Structure Map

- Create `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\AGENTS.md`
  Responsibility: root control document copied from the approved v3.0 attachment
- Create `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\config\column_mapping.yaml`
  Responsibility: canonical Chinese-column mapping copied from the approved v3.0 attachment
- Create `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\raw\`
  Responsibility: raw-data intake directory required by the package layout
- Create `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\processed\`
  Responsibility: processed-data output directory required by the package layout
- Create `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\reports\`
  Responsibility: report output directory required by the package layout
- Create `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\skills\`
  Responsibility: skill-definition directory required by the package layout
- Create `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\选品与开发\AGENTS.md`
  Responsibility: normalized module handbook copied from the existing 选品与开发 project
- Create `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\亚马逊广告分析\AGENTS.md`
  Responsibility: normalized module handbook copied from the existing 亚马逊广告分析 project
- Create `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\亚马逊合规与分析审查\AGENTS.md`
  Responsibility: normalized module handbook copied from the existing 亚马逊合格与分析审查 project but renamed to the v3.0 package name
- Create `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\数据分析\AGENTS.md`
  Responsibility: normalized module handbook extracted from the approved 数据分析 docx source
- Create `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\图片与剪辑\AGENTS.md`
  Responsibility: normalized module handbook extracted from the approved 多媒体制作 docx source
- Create `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\商品视频来源图片来源商品\AGENTS.md`
  Responsibility: normalized module handbook copied from the existing 站外推广来源分析 markdown source but renamed to the v3.0 package name

### Task 1: Scaffold the v3.0 Target Structure

**Files:**
- Create: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\AGENTS.md`
- Create: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\config\column_mapping.yaml`
- Create: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\raw\`
- Create: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\data\processed\`
- Create: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\reports\`
- Create: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\skills\`
- Create: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\选品与开发\AGENTS.md`
- Create: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\亚马逊广告分析\AGENTS.md`
- Create: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\亚马逊合规与分析审查\AGENTS.md`
- Create: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\数据分析\AGENTS.md`
- Create: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\图片与剪辑\AGENTS.md`
- Create: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\商品视频来源图片来源商品\AGENTS.md`

**Interfaces:**
- Consumes: approved deployment spec at `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\docs\superpowers\specs\2026-07-16-amazon-automation-control-deployment-design.md`
- Produces: the complete empty file/directory skeleton that Tasks 2 and 3 populate

- [ ] **Step 1: Write the failing structure check**

```powershell
$root = 'D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控'
$paths = @(
  'AGENTS.md',
  'config',
  'config\column_mapping.yaml',
  'data',
  'data\raw',
  'data\processed',
  'reports',
  'skills',
  '选品与开发',
  '选品与开发\AGENTS.md',
  '亚马逊广告分析',
  '亚马逊广告分析\AGENTS.md',
  '亚马逊合规与分析审查',
  '亚马逊合规与分析审查\AGENTS.md',
  '数据分析',
  '数据分析\AGENTS.md',
  '图片与剪辑',
  '图片与剪辑\AGENTS.md',
  '商品视频来源图片来源商品',
  '商品视频来源图片来源商品\AGENTS.md'
)
$paths | ForEach-Object {
  $full = Join-Path $root $_
  if (Test-Path $full) { "PRESENT $_" } else { "MISSING $_" }
}
```

- [ ] **Step 2: Run the structure check and confirm it fails for missing paths**

Run:

```powershell
$root = 'D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控'
$paths = @(
  'AGENTS.md',
  'config',
  'config\column_mapping.yaml',
  'data',
  'data\raw',
  'data\processed',
  'reports',
  'skills',
  '选品与开发',
  '选品与开发\AGENTS.md',
  '亚马逊广告分析',
  '亚马逊广告分析\AGENTS.md',
  '亚马逊合规与分析审查',
  '亚马逊合规与分析审查\AGENTS.md',
  '数据分析',
  '数据分析\AGENTS.md',
  '图片与剪辑',
  '图片与剪辑\AGENTS.md',
  '商品视频来源图片来源商品',
  '商品视频来源图片来源商品\AGENTS.md'
)
$paths | ForEach-Object {
  $full = Join-Path $root $_
  if (Test-Path $full) { "PRESENT $_" } else { "MISSING $_" }
}
```

Expected: at least one line starts with `MISSING`, and in a fresh workspace most or all lines are `MISSING`.

- [ ] **Step 3: Create the directory tree and placeholder files**

```powershell
$root = 'D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控'
$dirs = @(
  'config',
  'data',
  'data\raw',
  'data\processed',
  'reports',
  'skills',
  '选品与开发',
  '亚马逊广告分析',
  '亚马逊合规与分析审查',
  '数据分析',
  '图片与剪辑',
  '商品视频来源图片来源商品'
)
$files = @(
  'AGENTS.md',
  'config\column_mapping.yaml',
  '选品与开发\AGENTS.md',
  '亚马逊广告分析\AGENTS.md',
  '亚马逊合规与分析审查\AGENTS.md',
  '数据分析\AGENTS.md',
  '图片与剪辑\AGENTS.md',
  '商品视频来源图片来源商品\AGENTS.md'
)
$dirs | ForEach-Object {
  New-Item -ItemType Directory -Force -Path (Join-Path $root $_) | Out-Null
}
$files | ForEach-Object {
  New-Item -ItemType File -Force -Path (Join-Path $root $_) | Out-Null
}
```

- [ ] **Step 4: Re-run the structure check and confirm it passes**

Run:

```powershell
$root = 'D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控'
$paths = @(
  'AGENTS.md',
  'config',
  'config\column_mapping.yaml',
  'data',
  'data\raw',
  'data\processed',
  'reports',
  'skills',
  '选品与开发',
  '选品与开发\AGENTS.md',
  '亚马逊广告分析',
  '亚马逊广告分析\AGENTS.md',
  '亚马逊合规与分析审查',
  '亚马逊合规与分析审查\AGENTS.md',
  '数据分析',
  '数据分析\AGENTS.md',
  '图片与剪辑',
  '图片与剪辑\AGENTS.md',
  '商品视频来源图片来源商品',
  '商品视频来源图片来源商品\AGENTS.md'
)
$paths | ForEach-Object {
  $full = Join-Path $root $_
  if (Test-Path $full) { "PRESENT $_" } else { "MISSING $_" }
}
```

Expected: every line starts with `PRESENT`.

- [ ] **Step 5: Record the non-git commit skip**

Run:

```powershell
$root = 'D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控'
if (Test-Path (Join-Path $root '.git')) {
  git -C $root add AGENTS.md config\column_mapping.yaml `
    选品与开发\AGENTS.md 亚马逊广告分析\AGENTS.md 亚马逊合规与分析审查\AGENTS.md `
    数据分析\AGENTS.md 图片与剪辑\AGENTS.md 商品视频来源图片来源商品\AGENTS.md
  git -C $root commit -m "chore: scaffold amazon automation control layout"
} else {
  'SKIP: workspace is not a git repository'
}
```

Expected: `SKIP: workspace is not a git repository`

### Task 2: Populate the Root Control Files from the Approved Attachment

**Files:**
- Modify: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\AGENTS.md`
- Modify: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\config\column_mapping.yaml`

**Interfaces:**
- Consumes: placeholder files from Task 1
- Consumes: `D:\CodexData\.codex\attachments\53a5278b-9265-4dfc-b34b-4c62470881ad\pasted-text.txt`
- Produces: final root control files that Task 4 validates

- [ ] **Step 1: Write the failing content check**

```powershell
$root = 'D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控'
$checks = @(
  @{ Path = 'AGENTS.md'; Pattern = 'CodeX 亚马逊全链路自动化总控' },
  @{ Path = 'AGENTS.md'; Pattern = '项目路由规则' },
  @{ Path = 'config\column_mapping.yaml'; Pattern = 'column_mapping:' },
  @{ Path = 'config\column_mapping.yaml'; Pattern = '商品名称: product_name' }
)
$checks | ForEach-Object {
  $full = Join-Path $root $_.Path
  if (Select-String -Path $full -Pattern $_.Pattern -SimpleMatch -Quiet) {
    "FOUND_CONTENT $($_.Path) :: $($_.Pattern)"
  } else {
    "MISSING_CONTENT $($_.Path) :: $($_.Pattern)"
  }
}
```

- [ ] **Step 2: Run the content check and confirm the placeholders fail**

Run:

```powershell
$root = 'D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控'
$checks = @(
  @{ Path = 'AGENTS.md'; Pattern = 'CodeX 亚马逊全链路自动化总控' },
  @{ Path = 'AGENTS.md'; Pattern = '项目路由规则' },
  @{ Path = 'config\column_mapping.yaml'; Pattern = 'column_mapping:' },
  @{ Path = 'config\column_mapping.yaml'; Pattern = '商品名称: product_name' }
)
$checks | ForEach-Object {
  $full = Join-Path $root $_.Path
  if (Select-String -Path $full -Pattern $_.Pattern -SimpleMatch -Quiet) {
    "FOUND_CONTENT $($_.Path) :: $($_.Pattern)"
  } else {
    "MISSING_CONTENT $($_.Path) :: $($_.Pattern)"
  }
}
```

Expected: every line starts with `MISSING_CONTENT`.

- [ ] **Step 3: Extract the root Markdown and YAML blocks from the attachment and write them as UTF-8**

```powershell
$root = 'D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控'
$attachment = 'D:\CodexData\.codex\attachments\53a5278b-9265-4dfc-b34b-4c62470881ad\pasted-text.txt'
$text = Get-Content -Raw -Encoding utf8 $attachment
$agents = [regex]::Match(
  $text,
  '文件一：根目录总控 /AGENTS\.md.*?```markdown\s*(.*?)\s*```',
  [System.Text.RegularExpressions.RegexOptions]::Singleline
).Groups[1].Value
$yaml = [regex]::Match(
  $text,
  '文件二：列名映射配置 `/config/column_mapping\.yaml`\s*```yaml\s*(.*?)\s*```',
  [System.Text.RegularExpressions.RegexOptions]::Singleline
).Groups[1].Value
if ([string]::IsNullOrWhiteSpace($agents)) { throw 'Failed to extract root AGENTS.md block from attachment' }
if ([string]::IsNullOrWhiteSpace($yaml)) { throw 'Failed to extract column_mapping.yaml block from attachment' }
[System.IO.File]::WriteAllText((Join-Path $root 'AGENTS.md'), $agents.Trim() + [Environment]::NewLine, [System.Text.UTF8Encoding]::new($false))
[System.IO.File]::WriteAllText((Join-Path $root 'config\column_mapping.yaml'), $yaml.Trim() + [Environment]::NewLine, [System.Text.UTF8Encoding]::new($false))
```

- [ ] **Step 4: Re-run the content check and confirm it passes**

Run:

```powershell
$root = 'D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控'
$checks = @(
  @{ Path = 'AGENTS.md'; Pattern = 'CodeX 亚马逊全链路自动化总控' },
  @{ Path = 'AGENTS.md'; Pattern = '项目路由规则' },
  @{ Path = 'config\column_mapping.yaml'; Pattern = 'column_mapping:' },
  @{ Path = 'config\column_mapping.yaml'; Pattern = '商品名称: product_name' }
)
$checks | ForEach-Object {
  $full = Join-Path $root $_.Path
  if (Select-String -Path $full -Pattern $_.Pattern -SimpleMatch -Quiet) {
    "FOUND_CONTENT $($_.Path) :: $($_.Pattern)"
  } else {
    "MISSING_CONTENT $($_.Path) :: $($_.Pattern)"
  }
}
```

Expected: every line starts with `FOUND_CONTENT`.

- [ ] **Step 5: Record the non-git commit skip**

Run:

```powershell
$root = 'D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控'
if (Test-Path (Join-Path $root '.git')) {
  git -C $root add AGENTS.md config\column_mapping.yaml
  git -C $root commit -m "docs: add root amazon automation control files"
} else {
  'SKIP: workspace is not a git repository'
}
```

Expected: `SKIP: workspace is not a git repository`

### Task 3: Populate the Six Module Handbooks with UTF-8 Normalization

**Files:**
- Modify: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\选品与开发\AGENTS.md`
- Modify: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\亚马逊广告分析\AGENTS.md`
- Modify: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\亚马逊合规与分析审查\AGENTS.md`
- Modify: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\数据分析\AGENTS.md`
- Modify: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\图片与剪辑\AGENTS.md`
- Modify: `D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控\商品视频来源图片来源商品\AGENTS.md`

**Interfaces:**
- Consumes: target directories and empty module files from Task 1
- Consumes: source files and docx handbooks from the approved spec
- Produces: six populated UTF-8 module manuals that Task 4 validates

- [ ] **Step 1: Write the failing module-content check**

```powershell
$root = 'D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控'
$checks = @(
  @{ Path = '选品与开发\AGENTS.md'; Pattern = 'Project Identity' },
  @{ Path = '亚马逊广告分析\AGENTS.md'; Pattern = '广告诊断' },
  @{ Path = '亚马逊合规与分析审查\AGENTS.md'; Pattern = '合规优先于商业利益' },
  @{ Path = '数据分析\AGENTS.md'; Pattern = '亚马逊数据分析助手' },
  @{ Path = '图片与剪辑\AGENTS.md'; Pattern = '交互协作模式' },
  @{ Path = '商品视频来源图片来源商品\AGENTS.md'; Pattern = '内容素材溯源与站外推广分析助手' }
)
$checks | ForEach-Object {
  $full = Join-Path $root $_.Path
  if (Select-String -Path $full -Pattern $_.Pattern -SimpleMatch -Quiet) {
    "FOUND_CONTENT $($_.Path) :: $($_.Pattern)"
  } else {
    "MISSING_CONTENT $($_.Path) :: $($_.Pattern)"
  }
}
```

- [ ] **Step 2: Run the module-content check and confirm the placeholders fail**

Run:

```powershell
$root = 'D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控'
$checks = @(
  @{ Path = '选品与开发\AGENTS.md'; Pattern = 'Project Identity' },
  @{ Path = '亚马逊广告分析\AGENTS.md'; Pattern = '广告诊断' },
  @{ Path = '亚马逊合规与分析审查\AGENTS.md'; Pattern = '合规优先于商业利益' },
  @{ Path = '数据分析\AGENTS.md'; Pattern = '亚马逊数据分析助手' },
  @{ Path = '图片与剪辑\AGENTS.md'; Pattern = '交互协作模式' },
  @{ Path = '商品视频来源图片来源商品\AGENTS.md'; Pattern = '内容素材溯源与站外推广分析助手' }
)
$checks | ForEach-Object {
  $full = Join-Path $root $_.Path
  if (Select-String -Path $full -Pattern $_.Pattern -SimpleMatch -Quiet) {
    "FOUND_CONTENT $($_.Path) :: $($_.Pattern)"
  } else {
    "MISSING_CONTENT $($_.Path) :: $($_.Pattern)"
  }
}
```

Expected: every line starts with `MISSING_CONTENT`.

- [ ] **Step 3: Copy the source manuals to ASCII temp paths, extract text, and write the six target files as UTF-8**

```powershell
$root = 'D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控'
$temp = 'C:\temp\codex\amazon-control-sources'
New-Item -ItemType Directory -Force -Path $temp | Out-Null

Copy-Item -LiteralPath 'D:\HuaweiMoveData\Users\YANGJUN\Documents\选品与开发\AGENTS.md' -Destination (Join-Path $temp 'selection_source.md') -Force
Copy-Item -LiteralPath 'D:\HuaweiMoveData\Users\YANGJUN\Documents\亚马逊广告分析\AGENTS.md' -Destination (Join-Path $temp 'ads_source.md') -Force
Copy-Item -LiteralPath 'D:\HuaweiMoveData\Users\YANGJUN\Documents\亚马逊合格与分析审查\AGENTS.md' -Destination (Join-Path $temp 'compliance_source.md') -Force
Copy-Item -LiteralPath 'D:\HuaweiMoveData\Users\YANGJUN\Documents\商品视频来源图片来源商品站外推广来源分析、\docs\项目规范手册.md' -Destination (Join-Path $temp 'content_source.md') -Force

$dataDocx = Get-ChildItem -LiteralPath 'D:\HuaweiMoveData\Users\YANGJUN\Documents\xwechat_files\wxid_in7358saird122_1ef0\msg\file\2026-07' -File |
  Where-Object { $_.Name -like '*数据分析项目规范手册*' } |
  Select-Object -First 1
if (-not $dataDocx) { throw 'Could not locate the 数据分析 docx source' }
Copy-Item -LiteralPath $dataDocx.FullName -Destination (Join-Path $temp 'data_analysis_manual.docx') -Force

$mediaDocx = Get-ChildItem -LiteralPath 'D:\HuaweiMoveData\Users\YANGJUN\Documents\xwechat_files\wxid_in7358saird122_1ef0\msg\file\2026-07' -File |
  Where-Object { $_.Name -like '*多媒体智能制作项目规范手册*' } |
  Select-Object -First 1
if (-not $mediaDocx) { throw 'Could not locate the 多媒体制作 docx source' }
Copy-Item -LiteralPath $mediaDocx.FullName -Destination (Join-Path $temp 'multimedia_manual.docx') -Force

$env:SRC_SELECTION = Join-Path $temp 'selection_source.md'
$env:SRC_ADS = Join-Path $temp 'ads_source.md'
$env:SRC_COMPLIANCE = Join-Path $temp 'compliance_source.md'
$env:SRC_CONTENT = Join-Path $temp 'content_source.md'
$env:SRC_DATA_DOCX = Join-Path $temp 'data_analysis_manual.docx'
$env:SRC_MEDIA_DOCX = Join-Path $temp 'multimedia_manual.docx'
$env:DST_SELECTION = Join-Path $root '选品与开发\AGENTS.md'
$env:DST_ADS = Join-Path $root '亚马逊广告分析\AGENTS.md'
$env:DST_COMPLIANCE = Join-Path $root '亚马逊合规与分析审查\AGENTS.md'
$env:DST_DATA = Join-Path $root '数据分析\AGENTS.md'
$env:DST_MEDIA = Join-Path $root '图片与剪辑\AGENTS.md'
$env:DST_CONTENT = Join-Path $root '商品视频来源图片来源商品\AGENTS.md'
$env:PYTHONIOENCODING = 'utf-8'
@'
import os
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

W_NS = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}

def read_text_guess(path_str: str) -> str:
    data = Path(path_str).read_bytes()
    for encoding in ("utf-8-sig", "utf-8", "gb18030", "gbk"):
        try:
            return data.decode(encoding)
        except UnicodeDecodeError:
            continue
    return data.decode("utf-8", errors="replace")

def docx_to_markdown(path_str: str) -> str:
    with zipfile.ZipFile(path_str) as archive:
        xml = archive.read("word/document.xml")
    root = ET.fromstring(xml)
    paragraphs = []
    for paragraph in root.findall(".//w:p", W_NS):
        texts = [node.text for node in paragraph.findall(".//w:t", W_NS) if node.text]
        if texts:
            line = "".join(texts).strip()
            if line:
                paragraphs.append(line)
    return "\n\n".join(paragraphs).strip() + "\n"

def write_utf8(path_str: str, content: str) -> None:
    Path(path_str).write_text(content, encoding="utf-8")

write_utf8(os.environ["DST_SELECTION"], read_text_guess(os.environ["SRC_SELECTION"]))
write_utf8(os.environ["DST_ADS"], read_text_guess(os.environ["SRC_ADS"]))
write_utf8(os.environ["DST_COMPLIANCE"], read_text_guess(os.environ["SRC_COMPLIANCE"]))
write_utf8(os.environ["DST_CONTENT"], read_text_guess(os.environ["SRC_CONTENT"]))
write_utf8(os.environ["DST_DATA"], docx_to_markdown(os.environ["SRC_DATA_DOCX"]))
write_utf8(os.environ["DST_MEDIA"], docx_to_markdown(os.environ["SRC_MEDIA_DOCX"]))
'@ | python -
```

- [ ] **Step 4: Re-run the module-content check and confirm it passes**

Run:

```powershell
$root = 'D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控'
$checks = @(
  @{ Path = '选品与开发\AGENTS.md'; Pattern = 'Project Identity' },
  @{ Path = '亚马逊广告分析\AGENTS.md'; Pattern = '广告诊断' },
  @{ Path = '亚马逊合规与分析审查\AGENTS.md'; Pattern = '合规优先于商业利益' },
  @{ Path = '数据分析\AGENTS.md'; Pattern = '亚马逊数据分析助手' },
  @{ Path = '图片与剪辑\AGENTS.md'; Pattern = '交互协作模式' },
  @{ Path = '商品视频来源图片来源商品\AGENTS.md'; Pattern = '内容素材溯源与站外推广分析助手' }
)
$checks | ForEach-Object {
  $full = Join-Path $root $_.Path
  if (Select-String -Path $full -Pattern $_.Pattern -SimpleMatch -Quiet) {
    "FOUND_CONTENT $($_.Path) :: $($_.Pattern)"
  } else {
    "MISSING_CONTENT $($_.Path) :: $($_.Pattern)"
  }
}
```

Expected: every line starts with `FOUND_CONTENT`.

- [ ] **Step 5: Record the non-git commit skip**

Run:

```powershell
$root = 'D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控'
if (Test-Path (Join-Path $root '.git')) {
  git -C $root add 选品与开发\AGENTS.md 亚马逊广告分析\AGENTS.md 亚马逊合规与分析审查\AGENTS.md `
    数据分析\AGENTS.md 图片与剪辑\AGENTS.md 商品视频来源图片来源商品\AGENTS.md
  git -C $root commit -m "docs: add amazon automation module handbooks"
} else {
  'SKIP: workspace is not a git repository'
}
```

Expected: `SKIP: workspace is not a git repository`

### Task 4: Run Static Validation and Clean Temporary Artifacts

**Files:**
- Modify: `C:\temp\codex\amazon-control-sources\` (delete after use)

**Interfaces:**
- Consumes: populated root files from Task 2
- Consumes: populated module files from Task 3
- Produces: a clean workspace with validation evidence from shell output only

- [ ] **Step 1: Write the final validation command**

```powershell
$root = 'D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控'
$checks = @(
  @{ Path = 'AGENTS.md'; Pattern = 'CodeX 亚马逊全链路自动化总控' },
  @{ Path = 'AGENTS.md'; Pattern = '项目路由规则' },
  @{ Path = 'AGENTS.md'; Pattern = '@Chrome [任务]' },
  @{ Path = 'config\column_mapping.yaml'; Pattern = 'column_mapping:' },
  @{ Path = 'config\column_mapping.yaml'; Pattern = '销售额: sales' },
  @{ Path = '数据分析\AGENTS.md'; Pattern = '销售表现' },
  @{ Path = '数据分析\AGENTS.md'; Pattern = '流量与转化' },
  @{ Path = '数据分析\AGENTS.md'; Pattern = '竞品对标' },
  @{ Path = '数据分析\AGENTS.md'; Pattern = '库存效能' },
  @{ Path = '图片与剪辑\AGENTS.md'; Pattern = '全自动模式' },
  @{ Path = '图片与剪辑\AGENTS.md'; Pattern = '交互协作模式' }
)
$checks | ForEach-Object {
  $full = Join-Path $root $_.Path
  if (Select-String -Path $full -Pattern $_.Pattern -SimpleMatch -Quiet) {
    "PASS $($_.Path) :: $($_.Pattern)"
  } else {
    "FAIL $($_.Path) :: $($_.Pattern)"
  }
}
```

- [ ] **Step 2: Run the final validation and confirm it passes**

Run:

```powershell
$root = 'D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控'
$checks = @(
  @{ Path = 'AGENTS.md'; Pattern = 'CodeX 亚马逊全链路自动化总控' },
  @{ Path = 'AGENTS.md'; Pattern = '项目路由规则' },
  @{ Path = 'AGENTS.md'; Pattern = '@Chrome [任务]' },
  @{ Path = 'config\column_mapping.yaml'; Pattern = 'column_mapping:' },
  @{ Path = 'config\column_mapping.yaml'; Pattern = '销售额: sales' },
  @{ Path = '数据分析\AGENTS.md'; Pattern = '销售表现' },
  @{ Path = '数据分析\AGENTS.md'; Pattern = '流量与转化' },
  @{ Path = '数据分析\AGENTS.md'; Pattern = '竞品对标' },
  @{ Path = '数据分析\AGENTS.md'; Pattern = '库存效能' },
  @{ Path = '图片与剪辑\AGENTS.md'; Pattern = '全自动模式' },
  @{ Path = '图片与剪辑\AGENTS.md'; Pattern = '交互协作模式' }
)
$checks | ForEach-Object {
  $full = Join-Path $root $_.Path
  if (Select-String -Path $full -Pattern $_.Pattern -SimpleMatch -Quiet) {
    "PASS $($_.Path) :: $($_.Pattern)"
  } else {
    "FAIL $($_.Path) :: $($_.Pattern)"
  }
}
```

Expected: every line starts with `PASS`.

- [ ] **Step 3: Remove the temporary extraction directory**

```powershell
$temp = 'C:\temp\codex\amazon-control-sources'
if (Test-Path $temp) {
  Remove-Item -LiteralPath $temp -Recurse -Force
}
```

- [ ] **Step 4: Verify cleanup succeeded**

Run:

```powershell
$temp = 'C:\temp\codex\amazon-control-sources'
if (Test-Path $temp) {
  "TEMP_PRESENT $temp"
} else {
  "TEMP_ABSENT $temp"
}
```

Expected: `TEMP_ABSENT C:\temp\codex\amazon-control-sources`

- [ ] **Step 5: Record the non-git commit skip**

Run:

```powershell
$root = 'D:\HuaweiMoveData\Users\YANGJUN\Documents\codex亚马逊自动化总控'
if (Test-Path (Join-Path $root '.git')) {
  git -C $root add AGENTS.md config\column_mapping.yaml `
    选品与开发\AGENTS.md 亚马逊广告分析\AGENTS.md 亚马逊合规与分析审查\AGENTS.md `
    数据分析\AGENTS.md 图片与剪辑\AGENTS.md 商品视频来源图片来源商品\AGENTS.md
  git -C $root commit -m "docs: validate amazon automation control deployment"
} else {
  'SKIP: workspace is not a git repository'
}
```

Expected: `SKIP: workspace is not a git repository`
