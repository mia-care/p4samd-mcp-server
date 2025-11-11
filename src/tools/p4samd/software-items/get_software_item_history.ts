import { CallToolResult } from '@modelcontextprotocol/sdk/types.js'
import { IAPIClient } from '../../../apis/client'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

import { paramsDescriptions, toolNames, toolsDescriptions } from '../../descriptions'

export function registerGetSoftwareItemHistoryTool (server: McpServer, client: IAPIClient) {
  server.tool(
    toolNames.GET_SOFTWARE_ITEM_HISTORY,
    toolsDescriptions.GET_SOFTWARE_ITEM_HISTORY,
    {
      softwareItemId: z.string().describe(paramsDescriptions.SOFTWARE_ITEM_ID),
    },
    async ({ softwareItemId }): Promise<CallToolResult> => {
      try {
        const data = await client.getSoftwareItemHistory(softwareItemId)
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
              text: `Error fetching Software Item History for software item ${softwareItemId}: ${err.message}`,
            },
          ],
        }
      }
    },
  )
}
