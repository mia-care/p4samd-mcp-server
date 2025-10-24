import { CallToolResult } from '@modelcontextprotocol/sdk/types.js'
import { IAPIClient } from '../../../apis/client'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

import { paramsDescriptions, toolNames, toolsDescriptions } from '../../descriptions'

export function registerListKpisTool (server: McpServer, client: IAPIClient) {
  server.tool(
    toolNames.LIST_KPIS,
    toolsDescriptions.LIST_KPIS,
    {
      systemVersion: z.string().describe(paramsDescriptions.SYSTEM_VERSION),
    },
    async ({ systemVersion }): Promise<CallToolResult> => {
      try {
        const data = await client.listKpis(systemVersion)
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
              text: `Error fetching kpis for version ${systemVersion}: ${err.message}`,
            },
          ],
        }
      }
    },
  )
}
