import { CallToolResult } from '@modelcontextprotocol/sdk/types.js'
import { IAPIClient } from '../../../apis/client'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

import { paramsDescriptions, toolNames, toolsDescriptions } from '../../descriptions'

export function registerListTestSuitesExecutionsTool (server: McpServer, client: IAPIClient) {
  server.tool(
    toolNames.LIST_TEST_SUITES_EXECUTIONS,
    toolsDescriptions.LIST_TEST_SUITES_EXECUTIONS,
    {
      systemVersionId: z.string().describe(paramsDescriptions.SYSTEM_VERSION_ID),
      length: z.number().optional().describe(paramsDescriptions.LENGTH),
      skip: z.number().optional().describe(paramsDescriptions.SKIP),
      sort: z.string().optional().describe(paramsDescriptions.SORT),
      testSuiteId: z.string().optional().describe(paramsDescriptions.TEST_SUITE_ID),
    },
    async ({ systemVersionId, length, skip, sort, testSuiteId }): Promise<CallToolResult> => {
      try {
        const data = await client.listTestSuitesExecutions(
          systemVersionId,
          length,
          skip,
          sort,
          testSuiteId
        )
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data),
            },
          ],
        }
      } catch (error) {
        const err = error as Error
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching test suites executions for version id ${systemVersionId}: ${err.message}`,
            },
          ],
        }
      }
    },
  )
}
