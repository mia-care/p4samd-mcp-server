import { CallToolResult } from '@modelcontextprotocol/sdk/types.js'
import { IAPIClient } from '../../../apis/client'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

import { paramsDescriptions, toolNames, toolsDescriptions } from '../../descriptions'

export function registerListSoftwareItemsTool (server: McpServer, client: IAPIClient) {
  server.tool(
    toolNames.LIST_SOFTWARE_ITEMS,
    toolsDescriptions.LIST_SOFTWARE_ITEMS,
    {
      systemVersionId: z.string().describe(paramsDescriptions.SYSTEM_VERSION_ID),
    },
    async ({ systemVersionId }): Promise<CallToolResult> => {
      try {
        const data = await client.listSoftwareItems(systemVersionId)
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
              text: `Error fetching Software Items for version ${systemVersionId}: ${err.message}`,
            },
          ],
        }
      }
    },
  )
}
