import { CallToolResult } from '@modelcontextprotocol/sdk/types.js'
import { IAPIClient } from '../../../apis/client'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

import { paramsDescriptions, toolNames, toolsDescriptions } from '../../descriptions'

export function registerGetTestSuiteByIdTool (server: McpServer, client: IAPIClient) {
  server.tool(
    toolNames.GET_TEST_SUITE_BY_ID,
    toolsDescriptions.GET_TEST_SUITE_BY_ID,
    {
      testSuiteId: z.string().describe(paramsDescriptions.TEST_SUITE_ID),
    },
    async ({ testSuiteId }): Promise<CallToolResult> => {
      try {
        const data = await client.getTestSuiteById(testSuiteId)
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
              text: `Error fetching test suite with id: ${testSuiteId}: ${err.message}`,
            },
          ],
        }
      }
    },
  )
}
