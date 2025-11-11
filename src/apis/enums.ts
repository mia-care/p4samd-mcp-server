export enum RequirementTypes {
  Functional = 'Functional',
  Capability = 'Capability',
  Security = 'Security',
  Database = 'Database',
  Installation = 'Installation',
  Maintenance = 'Maintenance',
  Regulatory = 'Regulatory',
  Cybersecurity = 'Cybersecurity',
  Privacy = 'Privacy',
  Infrastructure = 'Infrastructure',
  Design = 'Design',
  Performance = 'Performance',
}

export enum TestSortOptions {
  KeyAsc = 'key',
  KeyDesc = '-key',
  TitleAsc = 'title',
  TitleDesc = '-title',
  TypeAsc = 'type',
  TypeDesc = '-type',
  ExecutionModeAsc = 'executionMode',
  ExecutionModeDesc = '-executionMode',
  OutcomeAsc = 'outcome',
  OutcomeDesc = '-outcome',
  LastExecutionDatetimeAsc = 'lastExecutionDatetime',
  LastExecutionDatetimeDesc = '-lastExecutionDatetime',
  RequirementsSizeAsc = 'requirementsSize',
  RequirementsSizeDesc = '-requirementsSize',
  SoftwareItemsSizeAsc = 'softwareItemsSize',
  SoftwareItemsSizeDesc = '-softwareItemsSize',
}

export enum TestTypes {
  System = 'System',
  Integration = 'Integration',
}

export enum TestExecutionModes {
  Manual = 'Manual',
  Automatic = 'Automatic',
}

export enum TestOutcomes {
  ToDo = 'TO DO',
  Success = 'SUCCESS',
  Failed = 'FAILED',
}

export enum ChangeRequestClassifications {
  BugFix = 'bugfix',
  HotFix = 'hotfix',
  Major = 'Major',
  Minor = 'minor',
}

export enum ReferenceCategories {
  Plan = 'plan',
  SOP = 'SOP',
  Regulation = 'regulation',
  Guideline = 'guideline',
  Other = 'other',
  Standard = 'standard',
}

export enum TestExecutionsOutcomes {
  Created = 'created',
  InProgress = 'in-progress',
  NotRun = 'not-run',
  Running = 'Running',
  Completed = 'completed',
  Success = 'success',
  Failed = 'failed',
  RunFailed = 'run-failed',
}
