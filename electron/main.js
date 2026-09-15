const { app, BrowserWindow, ipcMain, shell, dialog, safeStorage } = require('electron');
const path = require('path');
const { createTaskService } = require('../plugin-service/server');

let mainWindow;
let taskService;

function dataDirectory() {
  return process.env.AMAZON_CONTROL_DATA_DIR || 'D:\\AmazonControlData\\app-store';
}

function assertTrustedIpc(event) {
  const url = String(event?.senderFrame?.url || '');
  if (!url.startsWith('file://') && !/^http:\/\/(127\.0\.0\.1|localhost)(:\d+)?\//i.test(url)) {
    throw new Error('untrusted_ipc_sender');
  }
}

// Keep Electron caches and user data off the C drive when the data directory is on D.
app.setPath('userData', dataDirectory());

function registerIpc() {
  ipcMain.handle('amazon:submitTask', (_event, payload) => taskService.submitTask(payload));
  ipcMain.handle('amazon:listTasks', () => taskService.listTasks());
  ipcMain.handle('amazon:getTask', (_event, taskId) => taskService.getTask(taskId));
  ipcMain.handle('amazon:importCsv', (_event, moduleKey, filePath) => taskService.importCsv(moduleKey, filePath));
  ipcMain.handle('amazon:exportTask', (_event, taskId, format) => taskService.exportTask(taskId, format));
  ipcMain.handle('amazon:getAppState', () => taskService.getAppState());
  ipcMain.handle('amazon:listApiConnections', () => taskService.listApiConnections());
  ipcMain.handle('amazon:saveApiConnection', (_event, payload) => taskService.saveApiConnection(payload));
  ipcMain.handle('amazon:deleteApiConnection', (_event, id) => taskService.deleteApiConnection(id));
  ipcMain.handle('amazon:testApiConnection', (_event, id) => taskService.testApiConnection(id));
  ipcMain.handle('amazon:syncApiConnection', (_event, id) => taskService.syncApiConnection(id));
  ipcMain.handle('amazon:listDataImports', () => taskService.listDataImports());
  ipcMain.handle('amazon:saveDataImport', (_event, payload) => taskService.saveDataImport(payload));
  ipcMain.handle('amazon:deleteDataImport', (_event, id) => taskService.deleteDataImport(id));
  ipcMain.handle('amazon:previewDataSource', (_event, payload) => taskService.previewDataSource(payload));
  ipcMain.handle('amazon:listProjects', () => taskService.listProjects());
  ipcMain.handle('amazon:saveProject', (_event, payload) => taskService.saveProject(payload));
  ipcMain.handle('amazon:deleteProject', (_event, id) => taskService.deleteProject(id));
  ipcMain.handle('amazon:listApprovals', () => taskService.listApprovals());
  ipcMain.handle('amazon:listActionDrafts', () => taskService.listActionDrafts());
  ipcMain.handle('amazon:listExecutionQueue', () => taskService.listExecutionQueue());
  ipcMain.handle('amazon:listSkills', () => taskService.listSkills());
  ipcMain.handle('amazon:saveSkill', (_event, payload) => taskService.saveSkill(payload));
  ipcMain.handle('amazon:deleteSkill', (_event, id) => taskService.deleteSkill(id));
  ipcMain.handle('amazon:listTools', () => taskService.listTools());
  ipcMain.handle('amazon:saveTool', (_event, payload) => taskService.saveTool(payload));
  ipcMain.handle('amazon:deleteTool', (_event, id) => taskService.deleteTool(id));
  ipcMain.handle('amazon:runTool', (_event, payload) => taskService.runTool(payload));
  ipcMain.handle('amazon:listToolRuns', () => taskService.listToolRuns());
  ipcMain.handle('amazon:listListingDrafts', () => taskService.listListingDrafts());
  ipcMain.handle('amazon:saveListingDraft', (_event, payload) => taskService.saveListingDraft(payload));
  ipcMain.handle('amazon:deleteListingDraft', (_event, id) => taskService.deleteListingDraft(id));
  ipcMain.handle('amazon:transitionListingDraft', (_event, id, status) => taskService.transitionListingDraft(id, status));
  ipcMain.handle('amazon:exportListingDraftCsv', (_event, id) => taskService.exportListingDraftCsv(id));
  ipcMain.handle('amazon:listProjectPackages', () => taskService.listProjectPackages());
  ipcMain.handle('amazon:exportProjectPackage', (_event, projectId) => taskService.exportProjectPackage(projectId));
  ipcMain.handle('amazon:importProjectPackage', (_event, filePath) => taskService.importProjectPackage(filePath));
  ipcMain.handle('amazon:approveAction', (_event, id) => taskService.approveAction(id));
  ipcMain.handle('amazon:rejectAction', (_event, id) => taskService.rejectAction(id));
  ipcMain.handle('amazon:executeApprovedAction', (_event, id) => taskService.executeApprovedAction(id));
  ipcMain.handle('amazon:listAssets', (_event, filters) => taskService.listAssets(filters));
  ipcMain.handle('amazon:importAssets', (_event, payload) => taskService.importAssets(payload));
  ipcMain.handle('amazon:uploadAssets', (_event, payload) => taskService.uploadAssets(payload));
  ipcMain.handle('amazon:getAsset', (_event, assetId) => taskService.getAsset(assetId));
  ipcMain.handle('amazon:deleteAsset', (_event, assetId) => taskService.deleteAsset(assetId));
  ipcMain.handle('amazon:listAssistantMessages', () => taskService.listAssistantMessages());
  ipcMain.handle('amazon:submitAssistantMessage', (_event, payload) => taskService.submitAssistantMessage(payload));
  ipcMain.handle('amazon:codexStatus', () => taskService.getCodexStatus());
  ipcMain.handle('amazon:submitCodexTask', (_event, payload) => taskService.submitCodexTask(payload));
  ipcMain.handle('amazon:listProviderProfiles', () => taskService.listProviderProfiles());
  ipcMain.handle('amazon:saveProviderProfile', (event, payload = {}) => {
    assertTrustedIpc(event);
    const { secret, ...profileInput } = payload;
    const profile = taskService.saveProviderProfile(profileInput);
    if (secret) {
      taskService.setProviderSecret(profile.id, secret);
      if (safeStorage.isEncryptionAvailable()) {
        taskService.setEncryptedProviderCredential(profile.id, safeStorage.encryptString(String(secret)).toString('base64'));
      }
    }
    return taskService.listProviderProfiles().find((item) => item.id === profile.id) || profile;
  });
  ipcMain.handle('amazon:deleteProviderProfile', (event, id, force) => {
    assertTrustedIpc(event);
    return taskService.deleteProviderProfile(id, { force: !!force });
  });
  ipcMain.handle('amazon:testProviderProfile', (event, id) => {
    assertTrustedIpc(event);
    return taskService.testProviderProfile(id);
  });
  ipcMain.handle('amazon:listProviderRoutes', () => taskService.listProviderRoutes());
  ipcMain.handle('amazon:saveProviderRoute', (event, payload) => {
    assertTrustedIpc(event);
    return taskService.saveProviderRoute(payload);
  });
  ipcMain.handle('amazon:listAgents', () => taskService.listAgents());
  ipcMain.handle('amazon:saveAgent', (event, payload) => {
    assertTrustedIpc(event);
    return taskService.saveAgent(payload);
  });
  ipcMain.handle('amazon:deleteAgent', (event, id) => {
    assertTrustedIpc(event);
    return taskService.deleteAgent(id);
  });
  ipcMain.handle('amazon:listAgentFlows', () => taskService.listAgentFlows());
  ipcMain.handle('amazon:saveAgentFlow', (event, payload) => {
    assertTrustedIpc(event);
    return taskService.saveAgentFlow(payload);
  });
  ipcMain.handle('amazon:publishAgentFlow', (event, id) => {
    assertTrustedIpc(event);
    return taskService.publishAgentFlow(id);
  });
  ipcMain.handle('amazon:listWorkflowRuns', () => taskService.listWorkflowRuns());
  ipcMain.handle('amazon:getWorkflowRun', (_event, id) => taskService.getWorkflowRun(id));
  ipcMain.handle('amazon:submitWorkflowRun', (event, payload) => {
    assertTrustedIpc(event);
    return taskService.submitWorkflowRun(payload);
  });
  ipcMain.handle('amazon:listMediaOperations', () => taskService.listMediaOperations());
  ipcMain.handle('amazon:listMediaRuns', () => taskService.listMediaRuns());
  ipcMain.handle('amazon:getMediaRun', (_event, id) => taskService.getMediaRun(id));
  ipcMain.handle('amazon:submitMediaRun', (event, payload) => {
    assertTrustedIpc(event);
    return taskService.submitMediaRun(payload);
  });
  ipcMain.handle('amazon:cancelMediaRun', (event, id) => {
    assertTrustedIpc(event);
    return taskService.cancelMediaRun(id);
  });
  ipcMain.handle('amazon:deleteMediaRun', (event, id) => {
    assertTrustedIpc(event);
    return taskService.deleteMediaRun(id);
  });
  ipcMain.handle('amazon:listVerificationResults', (_event, filters) => taskService.listVerificationResults(filters));
  ipcMain.handle('amazon:getUsageSummary', (_event, filters) => taskService.getUsageSummary(filters));
  ipcMain.handle('amazon:discoverSkills', (_event, filters) => taskService.discoverSkills(filters));
  ipcMain.handle('amazon:openPath', (_event, filePath) => shell.openPath(filePath));
  ipcMain.handle('amazon:selectAssetFiles', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openFile', 'multiSelections'],
      filters: [
        { name: 'Assets and data', extensions: ['png', 'jpg', 'jpeg', 'webp', 'gif', 'bmp', 'mp4', 'mov', 'avi', 'mkv', 'webm', 'csv', 'json', 'zip', 'rar', '7z'] },
        { name: 'All files', extensions: ['*'] }
      ]
    });
    return result.canceled ? [] : result.filePaths;
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 960,
    minWidth: 1120,
    minHeight: 720,
    backgroundColor: '#f4f6f2',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
      allowRunningInsecureContent: false
    }
  });

  mainWindow.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith('file://')) event.preventDefault();
  });

  mainWindow.loadFile(path.join(__dirname, '..', 'web-dashboard', 'index.html'));
}

const gotSingleInstanceLock = app.requestSingleInstanceLock();

if (!gotSingleInstanceLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (!mainWindow) return;
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  });

  app.whenReady().then(() => {
  taskService = createTaskService({ dataDir: dataDirectory() });
  if (safeStorage.isEncryptionAvailable()) {
    for (const entry of taskService.listEncryptedProviderCredentials()) {
      try {
        taskService.setProviderSecret(entry.providerId, safeStorage.decryptString(Buffer.from(entry.ciphertext, 'base64')));
      } catch (error) {
        console.warn(`Provider credential could not be decrypted: ${entry.providerId}: ${error.message}`);
      }
    }
  }
  try {
    taskService.startServer(Number(process.env.AMAZON_CONTROL_PORT || 8787));
  } catch (error) {
    console.warn(`Amazon Control service start skipped: ${error.message}`);
  }
  registerIpc();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
  });

  app.on('window-all-closed', () => {
    if (taskService) taskService.stopServer();
    if (process.platform !== 'darwin') app.quit();
  });
}
