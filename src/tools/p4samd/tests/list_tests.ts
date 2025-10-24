import { CallToolResult } from '@modelcontextprotocol/sdk/types.js'
import { IAPIClient } from '../../../apis/client'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

import { paramsDescriptions, toolNames, toolsDescriptions } from '../../descriptions'
import { TestExecutionModes, TestOutcomes, TestSortOptions, TestTypes } from '../../../apis/enums'

export function registerListTestsTool (server: McpServer, client: IAPIClient) {
  server.tool(
    toolNames.LIST_TESTS,
    toolsDescriptions.LIST_TESTS,
    {
      systemVersion: z.string().describe(paramsDescriptions.SYSTEM_VERSION),
      length: z.number().optional().describe(paramsDescriptions.LENGTH),
      skip: z.number().optional().describe(paramsDescriptions.SKIP),
      sort: z.nativeEnum(TestSortOptions).optional().describe(paramsDescriptions.SORT),
      search: z.string().optional().describe(paramsDescriptions.SEARCH),
      type: z.array(z.nativeEnum(TestTypes)).optional().describe(paramsDescriptions.TEST_TYPE),
      executionMode: z.array(z.nativeEnum(TestExecutionModes)).optional().describe(paramsDescriptions.TEST_EXECUTION_MODE),
      outcome: z.array(z.nativeEnum(TestOutcomes)).optional().describe(paramsDescriptions.TEST_OUTCOME),
    },
    async ({ systemVersion, length, skip, sort, search, type, executionMode, outcome }): Promise<CallToolResult> => {
      try {
        const data = await client.listTests(
          systemVersion,
          length,
          skip,
          sort,
          search,
          type,
          executionMode,
          outcome,
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
              text: `Error fetching tests for version ${systemVersion}: ${err.message}`,
            },
          ],
        }
      }
    },
  )
}
