import { CallToolResult } from '@modelcontextprotocol/sdk/types.js'
import { IAPIClient } from '../../../apis/client'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

import { paramsDescriptions, toolNames, toolsDescriptions } from '../../descriptions'

export function registerGetTestByIdTool (server: McpServer, client: IAPIClient) {
  server.tool(
    toolNames.GET_TEST_BY_ID,
    toolsDescriptions.GET_TEST_BY_ID,
    {
      testId: z.string().describe(paramsDescriptions.REQUIREMENT_ID),
    },
    async ({ testId }): Promise<CallToolResult> => {
      try {
        const data = await client.getTestById(testId)
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
              text: `Error fetching test with id: ${testId}: ${err.message}`,
            },
          ],
        }
      }
    },
  )
}
