import { TestExecutionModes, TestExecutionsOutcomes } from './enums'

export const JiraUserSchema = {
  type: 'object',
  properties: {
    displayName: { type: 'string' },
    self: { type: 'string' },
    timeZone: { type: 'string' },
    accountId: { type: 'string' },
    accountType: { type: 'string' },
    active: { type: 'boolean' },
    avatarUrls: { type: 'object', additionalProperties: true },
  },
  nullable: true,
} as const

export const REQUIREMENT_TYPES = [
  'Functional',
  'Capability',
  'Security',
  'Database',
  'Installation',
  'Maintenance',
  'Regulatory',
  'Cybersecurity',
  'Privacy',
  'Infrastructure',
  'Design',
  'Performance',
]

const entitySchema = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    title: { type: 'string' },
    key: { type: 'string' },
    link: { type: 'string' },
  },
  additionalProperties: false,
} as const

const swItemSchema = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    name: { type: 'string' },
    version: { type: 'string' },
    type: { type: 'string' },
  },
} as const

export const apiRequirement = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    title: { type: 'string', nullable: true },
    link: { type: 'string', nullable: true },
    key: { type: 'string', nullable: true },
    updatedAt: { type: 'string' },
    assignee: JiraUserSchema,
    description: { type: 'string', nullable: true },
    type: { type: 'string', enum: REQUIREMENT_TYPES, nullable: true },
    risks: { type: 'array', items: entitySchema },
    tests: { type: 'array', items: entitySchema },
    softwareItems: { type: 'array', items: swItemSchema },
    status: { type: 'object', additionalProperties: true, nullable: true },
    user: JiraUserSchema,
    suggestions: { type: 'array', items: { type: 'string' } },
    mockupStatus: { type: 'string', nullable: true },
    mockupReference: { type: 'string', nullable: true },
    changeRequests: { type: 'array', items: entitySchema },
    changeRequestsSize: { type: 'number' },
    assessment: { type: 'object', additionalProperties: true },
  },
  additionalProperties: false,
} as const

export type Requirement = typeof apiRequirement

export interface GetRequirementsApiResponse {
  total: number
  length: number
  skip: number
  items: Requirement[]
}

const vulnerabilitySchema = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    vulnerabilityID: { type: 'string' },
    name: { type: 'string' },
    primaryUrl: { type: 'string' },
    installedVersion: { type: 'string' },
    status: { type: 'string' },
  },
} as const

export const apiRisk = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    title: { type: 'string', nullable: true },
    description: { type: 'string', nullable: true },
    key: { type: 'string', nullable: true },
    link: { type: 'string', nullable: true },
    hazard: { type: 'string', nullable: true },
    sequenceOfEvents: { type: 'string', nullable: true },
    hazardousSituation: { type: 'string', nullable: true },
    harm: { type: 'string', nullable: true },
    probability: { type: 'number', nullable: true },
    severity: { type: 'number', nullable: true },
    softwareItems: { type: 'array', items: swItemSchema },
    requirements: { type: 'array', items: entitySchema },
    mitigatedProbability: { type: 'number', nullable: true },
    mitigatedSeverity: { type: 'number', nullable: true },
    residualRisk: { type: 'number', nullable: true },
    type: { type: 'string', nullable: true },
    requirementsSize: { type: 'number' },
    softwareItemsSize: { type: 'number' },
    suggestions: { type: 'array', items: { type: 'string' } },
    probabilityNotes: { type: 'string', nullable: true },
    changeRequests: { type: 'array', items: entitySchema },
    changeRequestsSize: { type: 'number' },
    calculatedRisk: { type: 'number', nullable: true },
    vulnerabilities: { type: 'array', items: vulnerabilitySchema },
  },
  additionalProperties: false,
} as const

export type Risk = typeof apiRisk

export interface GetRisksApiResponse {
  total: number
  length: number
  skip: number
  items: Risk[]
}

export const apiTestSchema = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    title: { type: 'string', nullable: true },
    description: { type: 'string', nullable: true },
    key: { type: 'string', nullable: true },
    type: { type: 'string', nullable: true },
    executionMode: { type: 'string', nullable: true },
    outcome: { type: 'string', nullable: true },
    testSuite: { type: 'string', nullable: true },
    link: { type: 'string', nullable: true },
    lastTestExecution: {
      type: 'object',
      properties: {
        datetime: { type: 'string' },
        username: { type: 'string' },
      },
      nullable: true,
    },
    gitLink: { type: 'string', nullable: true },
    suggestions: { type: 'array', items: { type: 'string' } },
    requirements: { type: 'array', items: entitySchema },
    softwareItems: { type: 'array', items: swItemSchema },
    requirementsSize: { type: 'number' },
    softwareItemsSize: { type: 'number' },
    assessment: { type: 'object', additionalProperties: true },
  },
} as const

export type Test = typeof apiTestSchema

export interface GetTestsApiResponse {
  total: number
  length: number
  skip: number
  items: Test[]
}

export const apiChangeRequest = {
  type: 'object',
  properties: {
    _id: { type: 'string', nullable: true },
    title: { type: 'string', nullable: true },
    description: { type: 'string', nullable: true },
    link: { type: 'string', nullable: true },
    key: { type: 'string', nullable: true },
    systemVersionId: { type: 'string' },
    systemVersionName: { type: 'string' },
    affectedVersionId: { type: 'string', nullable: true },
    affectedVersionName: { type: 'string', nullable: true },
    dueDate: { type: 'string', nullable: true },
    approvalDate: { type: 'string', nullable: true },
    priority: { type: 'string', nullable: true },
    assignee: JiraUserSchema,
    reporter: JiraUserSchema,
    acceptanceCriteria: { type: 'string', nullable: true },
    notes: { type: 'string', nullable: true },
    classification: { type: 'string', nullable: true },
    requirements: { type: 'array', items: entitySchema, nullable: true },
    requirementsSize: { type: 'integer' },
    risks: { type: 'array', items: entitySchema, nullable: true },
    risksSize: { type: 'integer' },
    softwareItems: { type: 'array', items: { type: 'object', additionalProperties: true }, nullable: true },
    softwareItemsSize: { type: 'integer' },
    status: {
      type: 'object',
      properties: {
        statusName: { type: 'string' },
        statusCategory: { type: 'string' },
      },
      nullable: true,
    },
  },
} as const

export type ChangeRequest = typeof apiChangeRequest

export interface GetChangeRequestsApiResponse {
  total: number
  length: number
  skip: number
  items: ChangeRequest[]
}

export const apiReference = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    name: { type: 'string' },
    title: { type: 'string' },
    url: { type: 'string' },
  },
  additionalProperties: true,
} as const

export type Reference = typeof apiReference

export interface GetReferencesApiResponse {
  total: number
  length: number
  skip: number
  items: Reference[]
}

export interface KpiIndex {
  done: number
  total: number
}
export interface GetKpisApiResponse {
  changesIndex: KpiIndex
  requirementsIndex: KpiIndex
  risksIndex: KpiIndex
  testsIndex: KpiIndex
  softwareItemsIndex: KpiIndex
  versionIndex: KpiIndex
}

export const testSuiteSchema = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    name: { type: 'string' },
    executionMode: {
      type: 'string',
      enum: TestExecutionModes,
    },
    tests: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: true,
      },
    },
    type: { type: 'string' },
    apiTrigger:
      {
        type: 'object',
        properties: {
          method: { type: 'string' },
          endpoint: { type: 'string' },
          protocol: { type: 'string' },
          timeout: { type: 'number' },
          payload: { type: 'object', properties: { format: { type: 'string' }, data: { type: 'string' }, hidden: { type: 'string' } }, additionalProperties: false },
          headers: { type: 'array', items: { type: 'object', properties: { key: { type: 'string' }, value: { type: 'string' }, id: { type: 'string' }, hidden: { type: 'string' } } } },
        },
        additionalProperties: false,
      },
    systemVersionId: { type: 'string' },
    systemVersionName: { type: 'string' },
    lastExecution: { type: 'object' },
    localTestRuns: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          status: { type: 'string' },
          outcome: { type: 'string' },
          message: { type: 'string' },
          executionDatetime: { type: 'string', format: 'date-time' },
        },
        additionalProperties: true,
      },
    },
  },
} as const

export type TestSuite = typeof testSuiteSchema

export interface GetTestSuitesApiResponse {
  total: number
  length: number
  skip: number
  items: TestSuite[]
}

export const testSuiteExecutionSchema = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    systemVersionId: { type: 'string' },
    testJobsIds: {
      type: 'array',
      items: { type: 'string' },
    },
    testJobs: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          jobId: { type: 'string' },
          testId: { type: 'string' },
          testSuite: testSuiteSchema,
          fileId: { type: 'string' },
          status: { type: 'string', enum: [ 'SUCCESS', 'ERROR', 'WARNING' ] },
          outcome: { type: 'string', enum: TestExecutionsOutcomes },
          message: { type: 'string' },
          result: { type: 'object', properties: { success: { type: 'number' }, failed: { type: 'number' }, skipped: { type: 'number' } }, additionalProperties: false },
          testsResults: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, outcome: { type: 'string' } } } },
          executionDatetime: { type: 'string', format: 'date-time' },
        },
      },
    },
    note: { type: 'string' },
    executor: { type: 'object', properties: { name: { type: 'string' }, email: { type: 'string' } } },
    testJobsCount: { type: 'number' },
    createdAt: { type: 'string' },
  },
} as const

export type TestSuiteExecution = typeof testSuiteExecutionSchema

export interface GetTestSuitesExecutionsApiResponse {
  total: number
  length: number
  skip: number
  items: TestSuiteExecution[]
}

export const SWI_VERIFICATION_STATUS = {
  OK: 'OK',
  OK_MISSING_APPROVAL: 'OK_MISSING_APPROVAL',
  VERSION_DISCREPANCY: 'VERSION_DISCREPANCY',
  MISSING_IMPLEMENTATION: 'MISSING_IMPLEMENTATION',
  MISSING_DESIGN: 'MISSING_DESIGN',
  UNDETECTABLE: 'UNDETECTABLE',
  MISSING_TAG: 'MISSING_TAG',
  INVALID_VERSION: 'INVALID_VERSION',
}

export const SWI_VERIFICATION_TYPES = {
  PROJECT: 'project',
  SERVICE: 'service',
  LIBRARY: 'library',
  OTHER: 'other',
}

const softwareItemSchema = {
  type: 'object',
  $id: 'swiVerificationSchema',
  properties: {
    _id: { type: 'string' },
    name: { type: 'string' },
    expectedVersion: { type: 'string' },
    detectedVersion: { type: 'string' },
    type: { type: 'string', enum: Object.values(SWI_VERIFICATION_TYPES) },
    verificationStatus: { type: 'string', enum: Object.values(SWI_VERIFICATION_STATUS), default: SWI_VERIFICATION_STATUS.UNDETECTABLE },
    isSoup: { type: 'boolean' },
    isApproved: { type: 'boolean' },
    isMedicalDevice: { type: 'boolean' },
    class: { type: 'string' },
    manufacturer: { type: 'string' },
    repositoryLink: { type: 'string' },
    repositoryId: { type: 'string' },
    license: { type: 'string' },
    verificationReason: { type: 'string' },
    requiredSwHw: { type: 'string' },
    implementationLink: { type: 'string' },
    isAI: { type: 'boolean' },
    aiType: { type: 'string', enum: [ 'model', 'agent' ] },
    aiBiasMitigation: { type: 'string' },
    aiTransparencyExplainability: { type: 'string' },
    aiModelTechnicalDocumentation: { type: 'string' },
    aiModelLocation: { type: 'string' },
    aiRiskClassification: { type: 'string', enum: [ 'unacceptable', 'high-risk', 'limited', 'minimum' ] },
    aiRiskClassificationDescription: { type: 'string' },
    callToActionUrl: { type: 'string' },
    children: {
      type: 'array',
      items: { $ref: 'swiVerificationSchema' },
    },
    suggestions: { type: 'array', items: { type: 'string' } },
    vulnerabilities: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: true,
      },
    },
    vulnerabilitiesOtherVersions: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: true,
      },
    },
    openVulnerabilitiesCount: { type: 'number' },
    acceptedVulnerabilitiesCount: { type: 'number' },
  },
} as const

export type SoftwareItem = typeof softwareItemSchema

export interface SoftwareItemHistoryItem {
  action: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata: any
}

