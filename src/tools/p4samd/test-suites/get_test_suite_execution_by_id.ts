import { CallToolResult } from '@modelcontextprotocol/sdk/types.js'
import { IAPIClient } from '../../../apis/client'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

import { paramsDescriptions, toolNames, toolsDescriptions } from '../../descriptions'

export function registerGetTestSuiteExecutionByIdTool (server: McpServer, client: IAPIClient) {
  server.tool(
    toolNames.GET_TEST_SUITE_EXECUTION_BY_ID,
    toolsDescriptions.GET_TEST_SUITE_EXECUTION_BY_ID,
    {
      testSuiteExecutionId: z.string().describe(paramsDescriptions.TEST_SUITE_EXECUTION_BY_ID),
    },
    async ({ testSuiteExecutionId }): Promise<CallToolResult> => {
      try {
        const data = await client.getTestSuiteExecutionById(testSuiteExecutionId)
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
              text: `Error fetching test suite execution with id: ${testSuiteExecutionId}: ${err.message}`,
            },
          ],
        }
      }
    },
  )
}
