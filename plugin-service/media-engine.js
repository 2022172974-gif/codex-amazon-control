const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const sharp = require('sharp');
const ffmpeg = require('@ffmpeg-installer/ffmpeg');
const { MEDIA_OPERATION_IDS } = require('./v4-contracts');

const ffmpegPath = String(ffmpeg.path || '').replace('app.asar', 'app.asar.unpacked');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function safeName(value, fallback) {
  const name = path.basename(String(value || fallback || 'output'));
  return name.replace(/[<>:"/\\|?*\x00-\x1f]/g, '-');
}

function runProcess(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      windowsHide: true,
      stdio: ['ignore', 'ignore', 'pipe']
    });
    let stderr = '';
    let cancelled = false;
    const onAbort = () => {
      cancelled = true;
      child.kill();
    };
    if (options.signal) {
      if (options.signal.aborted) onAbort();
      else options.signal.addEventListener('abort', onAbort, { once: true });
    }
    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
      if (stderr.length > 12000) stderr = stderr.slice(-12000);
      if (options.onProgress) {
        const timeMatch = stderr.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d+)/g);
        const last = timeMatch && timeMatch[timeMatch.length - 1];
        if (last) options.onProgress({ raw: last });
      }
    });
    child.on('error', reject);
    child.on('close', (code) => {
      if (options.signal) options.signal.removeEventListener('abort', onAbort);
      if (cancelled) {
        const error = new Error('media_run_cancelled');
        error.code = 'media_run_cancelled';
        reject(error);
      } else if (code === 0) {
        resolve(stderr);
      } else {
        const error = new Error(`ffmpeg_failed:${code}`);
        error.code = 'ffmpeg_failed';
        error.details = stderr.slice(-4000);
        reject(error);
      }
    });
  });
}

function validateSources(sourcePaths, expectedKind) {
  const paths = (Array.isArray(sourcePaths) ? sourcePaths : [sourcePaths]).filter(Boolean).map((item) => path.resolve(String(item)));
  if (!paths.length) throw new Error('media_source_required');
  for (const source of paths) {
    if (!fs.existsSync(source) || !fs.statSync(source).isFile()) throw new Error(`media_source_not_found:${source}`);
    const kind = /\.(mp4|mov|avi|mkv|webm|m4v)$/i.test(source) ? 'video' : /\.(png|jpe?g|webp|gif|bmp|tiff?|avif)$/i.test(source) ? 'image' : 'other';
    if (expectedKind && kind !== expectedKind) throw new Error(`media_source_type_mismatch:${source}`);
  }
  return paths;
}

async function imageMetadata(filePath) {
  const metadata = await sharp(filePath).metadata();
  const stat = fs.statSync(filePath);
  return {
    path: filePath,
    name: path.basename(filePath),
    kind: 'image',
    mimeType: metadata.format === 'jpeg' ? 'image/jpeg' : `image/${metadata.format || 'png'}`,
    width: metadata.width || 0,
    height: metadata.height || 0,
    sizeBytes: stat.size
  };
}

function videoMetadata(filePath) {
  const stat = fs.statSync(filePath);
  return {
    path: filePath,
    name: path.basename(filePath),
    kind: 'video',
    mimeType: path.extname(filePath).toLowerCase() === '.webm' ? 'video/webm' : 'video/mp4',
    sizeBytes: stat.size
  };
}

async function imageToImage(sourcePaths, outputDir, options = {}) {
  const sources = validateSources(sourcePaths, 'image');
  const width = Math.max(32, Number(options.width || 2000));
  const height = Math.max(32, Number(options.height || 2000));
  const format = ['jpeg', 'jpg', 'png', 'webp'].includes(String(options.format || '').toLowerCase())
    ? String(options.format).toLowerCase().replace('jpg', 'jpeg')
    : 'jpeg';
  const ext = format === 'jpeg' ? 'jpg' : format;
  const output = path.join(outputDir, `${safeName(options.outputName || path.parse(sources[0]).name)}-amazon.${ext}`);
  const fit = ['cover', 'contain', 'fill', 'inside', 'outside'].includes(options.fit) ? options.fit : 'cover';
  let pipeline = sharp(sources[0]).rotate().resize(width, height, {
    fit,
    background: options.background || { r: 255, g: 255, b: 255, alpha: 1 },
    withoutEnlargement: false
  });
  if (options.grayscale) pipeline = pipeline.grayscale();
  if (options.sharpen !== false) pipeline = pipeline.sharpen();
  if (format === 'jpeg') pipeline = pipeline.jpeg({ quality: Math.min(100, Math.max(10, Number(options.quality || 92))), mozjpeg: true });
  if (format === 'png') pipeline = pipeline.png({ compressionLevel: 9 });
  if (format === 'webp') pipeline = pipeline.webp({ quality: Math.min(100, Math.max(10, Number(options.quality || 90))) });
  await pipeline.toFile(output);
  return [await imageMetadata(output)];
}

async function imageToVideo(sourcePaths, outputDir, options = {}) {
  const sources = validateSources(sourcePaths, 'image');
  const width = Math.max(64, Number(options.width || 1080));
  const height = Math.max(64, Number(options.height || 1920));
  const duration = Math.max(1, Math.min(300, Number(options.duration || 6)));
  const fps = Math.max(1, Math.min(60, Number(options.fps || 30)));
  const output = path.join(outputDir, `${safeName(options.outputName || path.parse(sources[0]).name)}-${duration}s.mp4`);
  const filter = `scale=${width}:${height}:force_original_aspect_ratio=decrease,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2:color=white,format=yuv420p`;
  await runProcess(ffmpegPath, [
    '-y',
    '-loop', '1',
    '-i', sources[0],
    '-t', String(duration),
    '-r', String(fps),
    '-vf', filter,
    '-c:v', 'libx264',
    '-preset', 'veryfast',
    '-movflags', '+faststart',
    '-an',
    output
  ], options);
  return [videoMetadata(output)];
}

async function videoToImages(sourcePaths, outputDir, options = {}) {
  const sources = validateSources(sourcePaths, 'video');
  const fps = Math.max(0.05, Math.min(30, Number(options.fps || 1)));
  const maxFrames = Math.max(1, Math.min(300, Number(options.maxFrames || 12)));
  const outputPattern = path.join(outputDir, 'frame-%03d.jpg');
  const filter = `fps=${fps},scale=${Math.max(64, Number(options.width || 1280))}:-2`;
  await runProcess(ffmpegPath, [
    '-y',
    '-i', sources[0],
    '-vf', filter,
    '-frames:v', String(maxFrames),
    '-q:v', '2',
    outputPattern
  ], options);
  const outputs = fs.readdirSync(outputDir)
    .filter((name) => /^frame-\d+\.jpg$/i.test(name))
    .sort()
    .map((name) => path.join(outputDir, name));
  if (!outputs.length) throw new Error('media_no_frames_generated');
  const artifacts = [];
  for (const output of outputs) artifacts.push(await imageMetadata(output));
  return artifacts;
}

async function videoToVideo(sourcePaths, outputDir, options = {}) {
  const sources = validateSources(sourcePaths, 'video');
  const width = Math.max(64, Number(options.width || 1080));
  const height = Math.max(64, Number(options.height || 1920));
  const output = path.join(outputDir, `${safeName(options.outputName || path.parse(sources[0]).name)}-edited.mp4`);
  const args = ['-y'];
  if (options.startSeconds != null) args.push('-ss', String(Math.max(0, Number(options.startSeconds))));
  args.push('-i', sources[0]);
  if (options.duration != null) args.push('-t', String(Math.max(0.5, Number(options.duration))));
  args.push(
    '-vf', `scale=${width}:${height}:force_original_aspect_ratio=decrease,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2:color=black`,
    '-c:v', 'libx264',
    '-preset', 'veryfast',
    '-movflags', '+faststart'
  );
  if (options.muted) args.push('-an');
  else args.push('-c:a', 'aac', '-b:a', '128k');
  args.push(output);
  await runProcess(ffmpegPath, args, options);
  return [videoMetadata(output)];
}

async function runMediaOperation(input = {}) {
  const operationId = String(input.operationId || '');
  if (!MEDIA_OPERATION_IDS.includes(operationId)) throw new Error('invalid_media_operation');
  const outputDir = path.resolve(String(input.outputDir || ''));
  if (!outputDir) throw new Error('media_output_required');
  ensureDir(outputDir);
  let artifacts;
  if (operationId === 'image_to_image') artifacts = await imageToImage(input.sourcePaths, outputDir, input.options || {});
  else if (operationId === 'image_to_video') artifacts = await imageToVideo(input.sourcePaths, outputDir, input.options || {});
  else if (operationId === 'video_to_images') artifacts = await videoToImages(input.sourcePaths, outputDir, input.options || {});
  else artifacts = await videoToVideo(input.sourcePaths, outputDir, input.options || {});
  return {
    ok: true,
    operationId,
    artifacts,
    metadata: {
      engine: 'local',
      ffmpegVersion: ffmpeg.version,
      completedAt: new Date().toISOString()
    }
  };
}

module.exports = {
  runMediaOperation,
  imageMetadata,
  videoMetadata,
  ffmpegPath
};
