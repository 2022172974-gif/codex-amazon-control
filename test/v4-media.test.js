const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const sharp = require('sharp');
const { createTaskService } = require('../plugin-service/server');

test('local media engine produces real files for all four operations', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'amazon-control-media-'));
  const service = createTaskService({ dataDir: dir });
  const source = path.join(dir, 'source.png');
  await sharp({
    create: {
      width: 640,
      height: 640,
      channels: 4,
      background: { r: 240, g: 120, b: 40, alpha: 1 }
    }
  }).png().toFile(source);

  const imageRun = await service.submitMediaRun({
    operationId: 'image_to_image',
    sourcePaths: [source],
    marketplace: 'US',
    options: { width: 500, height: 500, format: 'png' }
  });
  assert.equal(imageRun.status, 'completed');
  assert.equal(imageRun.artifacts.length, 1);
  assert.equal(fs.existsSync(imageRun.artifacts[0].path), true);
  assert.equal(imageRun.artifacts[0].width, 500);
  assert.ok(imageRun.artifacts[0].assetId);

  const videoRun = await service.submitMediaRun({
    operationId: 'image_to_video',
    sourcePaths: [imageRun.artifacts[0].path],
    marketplace: 'US',
    options: { width: 320, height: 320, duration: 1, fps: 15 }
  });
  assert.equal(videoRun.status, 'completed');
  assert.equal(videoRun.artifacts[0].kind, 'video');
  assert.ok(fs.statSync(videoRun.artifacts[0].path).size > 100);

  const framesRun = await service.submitMediaRun({
    operationId: 'video_to_images',
    sourcePaths: [videoRun.artifacts[0].path],
    marketplace: 'US',
    options: { fps: 1, maxFrames: 2, width: 320 }
  });
  assert.equal(framesRun.status, 'completed');
  assert.ok(framesRun.artifacts.length >= 1);
  assert.equal(framesRun.artifacts.every((item) => item.kind === 'image'), true);

  const editedRun = await service.submitMediaRun({
    operationId: 'video_to_video',
    sourcePaths: [videoRun.artifacts[0].path],
    marketplace: 'US',
    options: { width: 320, height: 320, muted: true, duration: 1 }
  });
  assert.equal(editedRun.status, 'completed');
  assert.equal(editedRun.artifacts[0].kind, 'video');
  assert.ok(fs.statSync(editedRun.artifacts[0].path).size > 100);

  service.stopServer();
  fs.rmSync(dir, { recursive: true, force: true });
});

test('media run cancellation and invalid sources return structured failures', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'amazon-control-media-fail-'));
  const service = createTaskService({ dataDir: dir });
  await assert.rejects(
    () => service.submitMediaRun({ operationId: 'image_to_video', sourcePaths: [path.join(dir, 'missing.png')] }),
    /media_source_not_found/
  );
  await assert.rejects(
    () => service.submitMediaRun({ operationId: 'unknown', sourcePaths: [] }),
    /invalid_media_operation/
  );
  service.stopServer();
  fs.rmSync(dir, { recursive: true, force: true });
});

test('chat routes an imported image into a real image-to-video artifact', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'amazon-control-chat-media-'));
  const service = createTaskService({ dataDir: dir });
  const source = path.join(dir, 'chat-source.png');
  await sharp({
    create: {
      width: 320,
      height: 320,
      channels: 4,
      background: { r: 30, g: 150, b: 220, alpha: 1 }
    }
  }).png().toFile(source);
  const result = await service.submitAssistantMessage({
    marketplace: 'US',
    message: `美国站，把这张图片转成视频 ${source}`,
    options: { duration: 1, width: 320, height: 320, fps: 15 }
  });
  assert.equal(result.mediaRun.operationId, 'image_to_video');
  assert.equal(result.mediaRun.status, 'completed');
  assert.equal(result.mediaRun.artifacts.length, 1);
  assert.equal(fs.existsSync(result.mediaRun.artifacts[0].path), true);
  assert.match(result.assistantMessage.content, /真实媒体文件/);
  service.stopServer();
  fs.rmSync(dir, { recursive: true, force: true });
});
