import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

import { IAPIClient } from '../apis/client'

import { registerGetChangeRequestByIdTool } from './p4samd/change-requests/get_change_request_by_id'
import { registerGetRequirementByIdTool } from './p4samd/requirements/get_requirement_by_id'
import { registerGetRiskByIdTool } from './p4samd/risks/get_risk_by_id'
import { registerGetTestByIdTool } from './p4samd/tests/get_test_by_id'
import { registerGetTestSuiteByIdTool } from './p4samd/test-suites/get_test_suite_by_id'
import { registerGetTestSuiteExecutionByIdTool } from './p4samd/test-suites/get_test_suite_execution_by_id'
import { registerListChangeRequestsTool } from './p4samd/change-requests/list_change_requests'
import { registerListKpisTool } from './p4samd/kpis/list_kpis'
import { registerListReferencesTool } from './p4samd/references/list_references'
import { registerListRequirementsTool } from './p4samd/requirements/list_requirements'
import { registerListRisksTool } from './p4samd/risks/list_risks'
import { registerListTestsTool } from './p4samd/tests/list_tests'
import { registerListTestSuitesExecutionsTool } from './p4samd/test-suites/list_test_suites_executions'
import { registerListTestSuitesTool } from './p4samd/test-suites/list_test_suites'
import { registerListVersionsTool } from './p4samd/versions/list_versions'
import { registerListSoftwareItemsTool } from './p4samd/software-items/list_software_items'
import { registerGetSoftwareItemHistoryTool } from './p4samd/software-items/get_software_item_history'


export function addP4SaMDCapabilities (server: McpServer, client: IAPIClient) {
  registerListVersionsTool(server, client)

  registerListRequirementsTool(server, client)
  registerGetRequirementByIdTool(server, client)

  registerListRisksTool(server, client)
  registerGetRiskByIdTool(server, client)

  registerListTestsTool(server, client)
  registerGetTestByIdTool(server, client)

  registerListChangeRequestsTool(server, client)
  registerGetChangeRequestByIdTool(server, client)

  registerListReferencesTool(server, client)

  registerListKpisTool(server, client)

  registerListTestSuitesTool(server, client)
  registerGetTestSuiteByIdTool(server, client)

  registerListTestSuitesExecutionsTool(server, client)
  registerGetTestSuiteExecutionByIdTool(server, client)

  registerListSoftwareItemsTool(server, client)
  registerGetSoftwareItemHistoryTool(server, client)
}
