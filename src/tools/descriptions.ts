// Copyright Mia srl
// SPDX-License-Identifier: Apache-2.0
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

export const toolNames = {
  // p4samd
  LIST_VERSIONS: 'list_versions',
  LIST_REQUIREMENTS: 'list_requirements',
  GET_REQUIREMENT_BY_ID: 'get_requirement_by_id',

  LIST_RISKS: 'list_risks',
  GET_RISK_BY_ID: 'get_change_request_by_id.ts',

  LIST_TESTS: 'list_tests',
  GET_TEST_BY_ID: 'get_test_by_id',

  LIST_CHANGE_REQUESTS: 'list_change_requests',
  GET_CHANGE_REQUEST_BY_ID: 'get_change_request_by_id',

  LIST_REFERENCES: 'list_references',

  LIST_KPIS: 'list_kpis',

  LIST_TEST_SUITES: 'list_test_suites',
  GET_TEST_SUITE_BY_ID: 'get_test_suite_by_id',
  LIST_TEST_SUITES_EXECUTIONS: 'list_test_suites_executions',
  GET_TEST_SUITE_EXECUTION_BY_ID: 'get_test_suite_execution_by_id',

  LIST_SOFTWARE_ITEMS: 'list_software_items',
  GET_SOFTWARE_ITEM_HISTORY: 'get_software_item_history',

}

export const toolsDescriptions = {
  // p4samd
  LIST_VERSIONS: `Lists the System Versions.`,
  LIST_REQUIREMENTS: `List the Requirements for a specific System Version. The API is paginated. I return also the total number of items. You can filter the requirements by type and search string.`,
  GET_REQUIREMENT_BY_ID: `Get a specific Requirement by its _id.`,

  LIST_RISKS: `List the Risks for a specific System Version. The API is paginated. I return also the total number of items. You can filter the risks by type and search string.`,
  GET_RISK_BY_ID: `Get a specific Risk by its _id.`,

  LIST_TESTS: `List the Tests for a specific System Version. The API is paginated. I return also the total number of items. You can filter the tests by type and search string.`,
  GET_TEST_BY_ID: `Get a specific Test by its _id.`,

  LIST_CHANGE_REQUESTS: `List the Change Requests for a specific System Version. The API is paginated. I return also the total number of items. You can filter the change requests by classification and search string.`,
  GET_CHANGE_REQUEST_BY_ID: `Get a specific Change Request by its _id.`,

  LIST_REFERENCES: `List all the References (Plans, SOPs, Regulations, Standards, Guidelines, etc.) used in the project.The API is paginated. I return also the total number of items. You can filter the references by search string.`,

  LIST_KPIS: `List the KPIs for a specific System Version. The API returns 6 indexes, each of them show the number of done and total:
  changesIndex: is the kpi about change requests,
  requirementsIndex: is the kpi about requirements,
  risksIndex: is the kpi about risks,
  testsIndex: is the kpi about tests,
  softwareItemsIndex: is the kpi about software items,
  versionIndex: is the kpi about the system version overall progress.`,

  LIST_TEST_SUITES: `List the Test Suites for a specific System Version.`,
  GET_TEST_SUITE_BY_ID: `Get a specific Test Suite by its _id.`,
  LIST_TEST_SUITES_EXECUTIONS: `List the Test Suite executions for a specific System Version. The API is paginated. I return also the total number of items. You can filter the test suites executions by test suite id`,
  GET_TEST_SUITE_EXECUTION_BY_ID: `Get a specific Test Suite execution by its _id.`,

  LIST_SOFTWARE_ITEMS: `List the Software Items for a specific System Version.
  In the response in each item there is the field "verificationStatus", the meaning of the values are the following:
  "OK": the software item is implemented and has design data in p4samd. Versions (designed and implemented) are the same. The Software Item is Approved,
  "OK_MISSING_APPROVAL": the software item is implemented and has design data in p4samd. Versions (designed and implemented) are the same. The Software Item is NOT Approved,
  "VERSION_DISCREPANCY": the software item is implemented and has design data in p4samd. Versions (designed and implemented) are different,
  "MISSING_DESIGN": the software item is implemented but the in p4samd there is no design data for it,
  "MISSING_TAG": this is only for software items of type "Project". It means that the software item is implemented but there is no tag associated to it in the Project Section,
  "MISSING_IMPLEMENTATION": the software item is not implemented yet.,
  "UNDETECTABLE": the software item is not detectable (e.g., for software items of type "Other"). Thus we cannot determine if it is implemented or not.
  "INVALID_VERSION": the software item is implemented but the detected version is not valid (e.g., it does not follow semantic versioning).
  `,

  GET_SOFTWARE_ITEM_HISTORY: `Get the history of a specific Software Item by its _id. The history includes all the changes made to the software item over time.The format of the output is a JSON file`,
}

export const paramsDescriptions = {
  // P4SaMD
  SYSTEM_VERSION_NAME: `The System Version name to check (e.g., 'v1.2.3' or '0.2.3). This value must be one of the names returned by the ${toolNames.LIST_VERSIONS} tool.`,
  SYSTEM_VERSION_ID: `The unique identifier of the System Version to check. This value must be one of the _id fields returned by the ${toolNames.LIST_VERSIONS} tool.`,

  LENGTH: `The length of items to return in the response`,
  SKIP: `The number of items to skip before starting to collect the result set`,
  SEARCH: `A search string to filter the results based on a substring of some fields`,
  SORT: `The field by which to sort the results (e.g., 'name', 'createdAt'). Prefix with '-' for descending order.`,

  REQUIREMENT_TYPE: `The type of requirements to filter (e.g., 'functional', 'non-functional', 'regulatory')`,
  REQUIREMENT_ID: `The unique identifier of the requirement to retrieve. This value must be one of the _id fields returned by the ${toolNames.LIST_REQUIREMENTS} tool.`,

  RISK_ID: `The unique identifier of the risk to retrieve. This value must be one of the _id fields returned by the ${toolNames.LIST_RISKS} tool.`,

  TEST_TYPE: `The type of tests to filter (e.g.,  'Integration', 'System')`,
  TEST_EXECUTION_MODE: `The execution mode of tests to filter (e.g., 'Manual', 'Automatic')`,
  TEST_OUTCOME: `The outcomes of tests to filter (e.g., 'TO DO', 'SUCCESS', 'FAILED')`,
  TEST_ID: `The unique identifier of the test to retrieve. This value must be one of the _id fields returned by the ${toolNames.LIST_TESTS} tool.`,

  CHANGE_REQUEST_CLASSIFICATION: `The classification of change requests to filter (e.g., 'minor', 'major', 'bugfix', 'hotfix)`,
  CHANGE_REQUEST_ID: `The unique identifier of the change request to retrieve. This value must be one of the _id fields returned by the ${toolNames.LIST_CHANGE_REQUESTS} tool.`,

  REFERENCE_CATEGORIES: `The categories of references to filter (e.g., 'Plan', 'SOP', 'Regulation', 'Standard', 'Guideline')`,

  TEST_SUITE_ID: `The unique identifier of the test suite to retrieve. This value must be one of the _id fields returned by the ${toolNames.LIST_TEST_SUITES} tool.`,
  TEST_SUITE_EXECUTION_BY_ID: `The unique identifier of the test suite execution to retrieve. This value must be one of the _id fields returned by the ${toolNames.LIST_TEST_SUITES_EXECUTIONS} tool.`,

  SOFTWARE_ITEM_ID: `The unique identifier of the software item to retrieve. This value must be one of the _id fields returned by the ${toolNames.LIST_SOFTWARE_ITEMS} tool.`,
}
