import { CallToolResult } from '@modelcontextprotocol/sdk/types.js'
import { IAPIClient } from '../../../apis/client'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

import { paramsDescriptions, toolNames, toolsDescriptions } from '../../descriptions'

export function registerGetChangeRequestByIdTool (server: McpServer, client: IAPIClient) {
  server.tool(
    toolNames.GET_CHANGE_REQUEST_BY_ID,
    toolsDescriptions.GET_CHANGE_REQUEST_BY_ID,
    {
      changeRequestId: z.string().describe(paramsDescriptions.CHANGE_REQUEST_ID),
    },
    async ({ changeRequestId }): Promise<CallToolResult> => {
      try {
        const data = await client.getChangeRequestById(changeRequestId)
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
              text: `Error fetching change request with id: ${changeRequestId}: ${err.message}`,
            },
          ],
        }
      }
    },
  )
}
