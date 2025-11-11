import { CallToolResult } from '@modelcontextprotocol/sdk/types.js'
import { IAPIClient } from '../../../apis/client'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

import { TestExecutionModes } from '../../../apis/enums'
import { paramsDescriptions, toolNames, toolsDescriptions } from '../../descriptions'

export function registerListTestSuitesTool (server: McpServer, client: IAPIClient) {
  server.tool(
    toolNames.LIST_TEST_SUITES,
    toolsDescriptions.LIST_TEST_SUITES,
    {
      systemVersionId: z.string().describe(paramsDescriptions.SYSTEM_VERSION_ID),
      length: z.number().optional().describe(paramsDescriptions.LENGTH),
      skip: z.number().optional().describe(paramsDescriptions.SKIP),
      sort: z.string().optional().describe(paramsDescriptions.SORT),
      search: z.string().optional().describe(paramsDescriptions.SEARCH),
      executionMode: z.nativeEnum(TestExecutionModes).optional().describe(paramsDescriptions.TEST_EXECUTION_MODE),
    },
    async ({ systemVersionId, length, skip, sort, search, executionMode }): Promise<CallToolResult> => {
      try {
        const data = await client.listTestSuites(
          systemVersionId,
          length,
          skip,
          sort,
          search,
          executionMode,
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
              text: `Error fetching test suites for version id ${systemVersionId}: ${err.message}`,
            },
          ],
        }
      }
    },
  )
}
