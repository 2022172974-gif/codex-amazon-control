const CAPABILITY_IDS = ['chat', 'reasoning', 'image', 'video', 'speech', 'data', 'embedding'];
const MEDIA_OPERATION_IDS = ['image_to_image', 'image_to_video', 'video_to_images', 'video_to_video'];
const WORKFLOW_STATUSES = ['queued', 'planning', 'running', 'verifying', 'completed', 'failed', 'cancelled', 'approval_required'];
const NODE_TYPES = ['agent', 'tool', 'route', 'condition', 'parallel', 'verifier', 'approval', 'output'];

const DEFAULT_AGENTS = [
  {
    id: 'orchestrator',
    name: '总控编排 Agent',
    role: 'orchestrator',
    description: '理解目标、拆解任务、选择流程、协调专家并汇总结果。',
    capability: 'reasoning',
    skills: ['swarm-planner'],
    tools: ['workflow-router'],
    permissions: ['read', 'plan'],
    memoryScope: 'project',
    maxConcurrency: 4,
    budget: { amount: 0, currency: 'USD', period: 'run' },
    retries: 1,
    version: 1,
    enabled: true
  },
  {
    id: 'business-analyst',
    name: '业务分析 Agent',
    role: 'specialist',
    description: '负责选品、利润、广告、数据、库存和经营判断。',
    capability: 'reasoning',
    skills: ['amazon-product-manager', 'amazon-advertising-strategy', 'amazon-fba-calculator'],
    tools: ['profit-calc', 'ad-diagnosis', 'inventory-plan', 'csv-stats'],
    permissions: ['read', 'analyze'],
    memoryScope: 'project',
    maxConcurrency: 3,
    budget: { amount: 0, currency: 'USD', period: 'run' },
    retries: 1,
    version: 1,
    enabled: true
  },
  {
    id: 'creative-director',
    name: '创意导演 Agent',
    role: 'specialist',
    description: '把产品卖点、图片和视频素材转成适合亚马逊的创意方案。',
    capability: 'image',
    skills: ['imagegen'],
    tools: ['image-brief', 'video-brief'],
    permissions: ['read', 'generate'],
    memoryScope: 'project',
    maxConcurrency: 2,
    budget: { amount: 0, currency: 'USD', period: 'run' },
    retries: 1,
    version: 1,
    enabled: true
  },
  {
    id: 'media-producer',
    name: '媒体制作 Agent',
    role: 'executor',
    description: '执行图片处理、图片转视频、视频拆帧和视频转码。',
    capability: 'video',
    skills: [],
    tools: ['media-engine'],
    permissions: ['read', 'generate'],
    memoryScope: 'asset',
    maxConcurrency: 2,
    budget: { amount: 0, currency: 'USD', period: 'run' },
    retries: 1,
    version: 1,
    enabled: true
  },
  {
    id: 'listing-compliance',
    name: 'Listing 与合规 Agent',
    role: 'specialist',
    description: '负责 Listing、关键词覆盖、图片视频合规和上架风险。',
    capability: 'reasoning',
    skills: ['amazon-listing-optimization', 'amazon-product-compliance'],
    tools: ['listing-draft', 'compliance-check'],
    permissions: ['read', 'draft'],
    memoryScope: 'project',
    maxConcurrency: 2,
    budget: { amount: 0, currency: 'USD', period: 'run' },
    retries: 1,
    version: 1,
    enabled: true
  },
  {
    id: 'connector-manager',
    name: '连接器管理 Agent',
    role: 'operator',
    description: '负责 Provider Profile、能力路由、同步和健康检查。',
    capability: 'data',
    skills: [],
    tools: ['provider-router'],
    permissions: ['read', 'configure'],
    memoryScope: 'system',
    maxConcurrency: 1,
    budget: { amount: 0, currency: 'USD', period: 'run' },
    retries: 1,
    version: 1,
    enabled: true
  },
  {
    id: 'evidence-verifier',
    name: '证据验证 Agent',
    role: 'verifier',
    description: '检查输入完整性、计算逻辑、产物文件、Provider 和合规风险。',
    capability: 'reasoning',
    skills: [],
    tools: ['workflow-verifier'],
    permissions: ['read', 'verify'],
    memoryScope: 'run',
    maxConcurrency: 4,
    budget: { amount: 0, currency: 'USD', period: 'run' },
    retries: 0,
    version: 1,
    enabled: true
  },
  {
    id: 'recap-memory',
    name: '复盘记忆 Agent',
    role: 'memory',
    description: '沉淀运行记录、决策、用量、风险和后续动作。',
    capability: 'reasoning',
    skills: [],
    tools: ['memory-writer'],
    permissions: ['read', 'write_memory'],
    memoryScope: 'project',
    maxConcurrency: 1,
    budget: { amount: 0, currency: 'USD', period: 'run' },
    retries: 1,
    version: 1,
    enabled: true
  }
];

const DEFAULT_AGENT_FLOWS = [
  {
    id: 'default-business-flow',
    name: '默认业务分析流程',
    description: '总控规划、专家分析、独立验证、审批检查和结果交付。',
    version: 1,
    status: 'published',
    risk: 'medium',
    nodes: [
      { id: 'start', type: 'agent', label: '总控编排', agentId: 'orchestrator', x: 80, y: 160 },
      { id: 'route', type: 'route', label: '能力路由', capability: 'reasoning', x: 290, y: 160 },
      { id: 'specialists', type: 'parallel', label: '业务专家并行', agentIds: ['business-analyst', 'listing-compliance'], x: 500, y: 160 },
      { id: 'verify', type: 'verifier', label: '证据验证', agentId: 'evidence-verifier', x: 720, y: 160 },
      { id: 'approval', type: 'approval', label: '高风险审批', required: false, x: 930, y: 160 },
      { id: 'output', type: 'output', label: '结果交付', x: 1140, y: 160 }
    ],
    edges: [
      { id: 'e1', from: 'start', to: 'route' },
      { id: 'e2', from: 'route', to: 'specialists' },
      { id: 'e3', from: 'specialists', to: 'verify' },
      { id: 'e4', from: 'verify', to: 'approval' },
      { id: 'e5', from: 'approval', to: 'output' }
    ],
    createdAt: '2026-09-13T00:00:00.000Z',
    updatedAt: '2026-09-13T00:00:00.000Z'
  },
  {
    id: 'default-media-flow',
    name: '默认媒体生产流程',
    description: '创意规划、媒体执行、文件验证和结果交付。',
    version: 1,
    status: 'published',
    risk: 'low',
    nodes: [
      { id: 'start', type: 'agent', label: '创意导演', agentId: 'creative-director', x: 80, y: 160 },
      { id: 'route', type: 'route', label: '媒体路由', capability: 'image', x: 290, y: 160 },
      { id: 'produce', type: 'tool', label: '媒体制作', toolId: 'media-engine', x: 500, y: 160 },
      { id: 'verify', type: 'verifier', label: '产物验证', agentId: 'evidence-verifier', x: 720, y: 160 },
      { id: 'approval', type: 'approval', label: '付费确认', required: false, x: 930, y: 160 },
      { id: 'output', type: 'output', label: '结果交付', x: 1140, y: 160 }
    ],
    edges: [
      { id: 'e1', from: 'start', to: 'route' },
      { id: 'e2', from: 'route', to: 'produce' },
      { id: 'e3', from: 'produce', to: 'verify' },
      { id: 'e4', from: 'verify', to: 'approval' },
      { id: 'e5', from: 'approval', to: 'output' }
    ],
    createdAt: '2026-09-13T00:00:00.000Z',
    updatedAt: '2026-09-13T00:00:00.000Z'
  }
];

function createDefaultProviderRoutes() {
  return CAPABILITY_IDS.map((capability) => ({
    id: `route-${capability}-global`,
    capability,
    scopeType: 'global',
    scopeId: '',
    profileIds: [],
    fallbackProfileIds: [],
    maxCost: 0,
    currency: 'USD',
    timeoutMs: capability === 'video' ? 300000 : 60000,
    maxRetries: 1,
    enabled: true,
    updatedAt: new Date().toISOString()
  }));
}

function normalizeProviderProfile(input = {}) {
  const capabilityList = Array.isArray(input.capabilities)
    ? input.capabilities
    : (input.capability ? [input.capability] : []);
  const capabilities = capabilityList
    .map((item) => String(item || '').trim())
    .filter((item, index, list) => CAPABILITY_IDS.includes(item) && list.indexOf(item) === index);
  return {
    id: String(input.id || ''),
    name: String(input.name || '未命名 Provider').trim(),
    providerKind: String(input.providerKind || 'openai-compatible').trim(),
    profileKind: String(input.profileKind || 'cloud').trim(),
    type: String(input.type || 'ai').trim(),
    capabilities,
    endpoint: String(input.endpoint || '').trim(),
    testEndpoint: String(input.testEndpoint || '').trim(),
    model: String(input.model || '').trim(),
    imageModel: String(input.imageModel || '').trim(),
    videoModel: String(input.videoModel || '').trim(),
    authMethod: String(input.authMethod || 'bearer').trim(),
    secretMode: String(input.secretMode || 'session').trim(),
    credentialRef: String(input.credentialRef || '').trim(),
    headers: input.headers && typeof input.headers === 'object' ? input.headers : {},
    requestMapping: input.requestMapping && typeof input.requestMapping === 'object' ? input.requestMapping : {},
    responseMapping: input.responseMapping && typeof input.responseMapping === 'object' ? input.responseMapping : {},
    price: input.price && typeof input.price === 'object' ? input.price : {},
    limits: input.limits && typeof input.limits === 'object' ? input.limits : {},
    enabled: input.enabled !== false,
    status: String(input.status || 'configured'),
    lastTestAt: input.lastTestAt || '',
    lastTestStatus: input.lastTestStatus || '',
    lastLatencyMs: Number(input.lastLatencyMs || 0),
    errorRate: Number(input.errorRate || 0),
    health: input.health && typeof input.health === 'object' ? input.health : { state: 'unknown' },
    legacyConnectionId: String(input.legacyConnectionId || ''),
    notes: String(input.notes || ''),
    createdAt: input.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

function resolveProviderRoute(routes = [], capability, context = {}) {
  const candidates = (Array.isArray(routes) ? routes : [])
    .filter((item) => item && item.capability === capability && item.enabled !== false)
    .filter((item) => {
      if (item.scopeType === 'agent') return item.scopeId === context.agentId;
      if (item.scopeType === 'project') return item.scopeId === context.projectId;
      return item.scopeType === 'global';
    });
  const rank = { agent: 3, project: 2, global: 1 };
  const selected = candidates.sort((a, b) => {
    const rankDiff = (rank[b.scopeType] || 0) - (rank[a.scopeType] || 0);
    if (rankDiff) return rankDiff;
    return String(b.updatedAt || '').localeCompare(String(a.updatedAt || ''));
  })[0];
  if (!selected) {
    return { capability, scopeType: '', scopeId: '', profileId: '', profileIds: [], fallbackProfileIds: [] };
  }
  const profileIds = Array.isArray(selected.profileIds) ? selected.profileIds.filter(Boolean) : [];
  return {
    ...selected,
    profileId: profileIds[0] || selected.profileId || '',
    profileIds,
    fallbackProfileIds: Array.isArray(selected.fallbackProfileIds) ? selected.fallbackProfileIds.filter(Boolean) : []
  };
}

function validateAgentFlow(flow = {}, options = {}) {
  const errors = [];
  const warnings = [];
  const nodes = Array.isArray(flow.nodes) ? flow.nodes : [];
  const edges = Array.isArray(flow.edges) ? flow.edges : [];
  const nodeIds = new Set();
  for (const node of nodes) {
    const id = String(node && node.id || '');
    if (!id) errors.push({ code: 'missing_node_id', message: '节点缺少 id' });
    else if (nodeIds.has(id)) errors.push({ code: 'duplicate_node_id', message: `节点 id 重复：${id}` });
    else nodeIds.add(id);
    if (!NODE_TYPES.includes(node && node.type)) errors.push({ code: 'invalid_node_type', message: `节点类型无效：${id || 'unknown'}` });
  }
  const adjacency = new Map(nodes.map((node) => [node.id, []]));
  const incoming = new Map(nodes.map((node) => [node.id, 0]));
  const edgeIds = new Set();
  for (const edge of edges) {
    const id = String(edge && edge.id || '');
    if (id && edgeIds.has(id)) errors.push({ code: 'duplicate_edge_id', message: `连线 id 重复：${id}` });
    if (id) edgeIds.add(id);
    if (!nodeIds.has(edge.from) || !nodeIds.has(edge.to)) {
      errors.push({ code: 'dangling_edge', message: `连线指向不存在节点：${edge.from} -> ${edge.to}` });
      continue;
    }
    adjacency.get(edge.from).push(edge.to);
    incoming.set(edge.to, (incoming.get(edge.to) || 0) + 1);
  }
  const starts = nodes.filter((node) => (incoming.get(node.id) || 0) === 0).map((node) => node.id);
  if (!starts.length) errors.push({ code: 'missing_start', message: '流程缺少起始节点' });
  if (!nodes.some((node) => node.type === 'output')) errors.push({ code: 'missing_output', message: '流程缺少输出节点' });
  if (options.requireVerifier !== false && !nodes.some((node) => node.type === 'verifier')) {
    errors.push({ code: 'missing_verifier', message: '流程缺少验证节点' });
  }
  if (flow.risk === 'high' && !nodes.some((node) => node.type === 'approval')) {
    errors.push({ code: 'missing_approval', message: '高风险流程必须包含审批节点' });
  }
  for (const node of nodes.filter((item) => item.type === 'condition')) {
    if ((adjacency.get(node.id) || []).length < 2) errors.push({ code: 'invalid_condition_branch', message: `条件节点需要至少两个出口：${node.id}` });
  }
  const visiting = new Set();
  const visited = new Set();
  function visit(id) {
    if (visiting.has(id)) {
      errors.push({ code: 'cycle_detected', message: `流程存在环：${id}` });
      return;
    }
    if (visited.has(id)) return;
    visiting.add(id);
    for (const next of adjacency.get(id) || []) visit(next);
    visiting.delete(id);
    visited.add(id);
  }
  nodes.forEach((node) => visit(node.id));
  const unreachable = nodes.filter((node) => !visited.has(node.id)).map((node) => node.id);
  if (unreachable.length) errors.push({ code: 'unreachable_nodes', message: `存在不可达节点：${unreachable.join(', ')}` });
  for (const node of nodes.filter((item) => item.type !== 'output')) {
    if (!(adjacency.get(node.id) || []).length && node.type !== 'approval') warnings.push({ code: 'dead_end', message: `节点没有后续连接：${node.id}` });
  }
  return { valid: errors.length === 0, errors, warnings };
}

function normalizeAgentFlow(input = {}) {
  return {
    id: String(input.id || ''),
    name: String(input.name || '未命名流程').trim(),
    description: String(input.description || '').trim(),
    version: Math.max(1, Number(input.version || 1)),
    status: ['draft', 'published', 'archived'].includes(input.status) ? input.status : 'draft',
    risk: ['low', 'medium', 'high'].includes(input.risk) ? input.risk : 'low',
    nodes: Array.isArray(input.nodes) ? input.nodes.map((node) => ({ ...node })) : [],
    edges: Array.isArray(input.edges) ? input.edges.map((edge) => ({ ...edge })) : [],
    createdAt: input.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

function normalizeWorkflowRun(input = {}) {
  const status = WORKFLOW_STATUSES.includes(input.status) ? input.status : 'queued';
  return {
    runId: String(input.runId || ''),
    conversationId: String(input.conversationId || ''),
    projectId: String(input.projectId || ''),
    marketplace: String(input.marketplace || ''),
    module: String(input.module || 'assistant'),
    intent: String(input.intent || ''),
    sourceMediaType: String(input.sourceMediaType || ''),
    targetMediaType: String(input.targetMediaType || ''),
    mediaOperation: String(input.mediaOperation || ''),
    flowId: String(input.flowId || ''),
    flowVersion: Number(input.flowVersion || 0),
    agentId: String(input.agentId || ''),
    agentVersion: Number(input.agentVersion || 0),
    providerRouteSnapshot: input.providerRouteSnapshot || {},
    inputAssets: Array.isArray(input.inputAssets) ? input.inputAssets : [],
    agentSteps: Array.isArray(input.agentSteps) ? input.agentSteps : [],
    toolRuns: Array.isArray(input.toolRuns) ? input.toolRuns : [],
    artifacts: Array.isArray(input.artifacts) ? input.artifacts : [],
    verification: input.verification || { status: 'pending', checks: [] },
    missingData: Array.isArray(input.missingData) ? input.missingData : [],
    actions: Array.isArray(input.actions) ? input.actions : [],
    approval: input.approval || { status: 'not_required' },
    cost: input.cost || { amount: 0, currency: 'USD', estimated: true },
    errors: Array.isArray(input.errors) ? input.errors : [],
    status,
    progress: Number(input.progress || 0),
    startedAt: input.startedAt || new Date().toISOString(),
    completedAt: input.completedAt || '',
    updatedAt: new Date().toISOString()
  };
}

module.exports = {
  CAPABILITY_IDS,
  MEDIA_OPERATION_IDS,
  WORKFLOW_STATUSES,
  NODE_TYPES,
  DEFAULT_AGENTS,
  DEFAULT_AGENT_FLOWS,
  createDefaultProviderRoutes,
  normalizeProviderProfile,
  resolveProviderRoute,
  validateAgentFlow,
  normalizeAgentFlow,
  normalizeWorkflowRun
};
