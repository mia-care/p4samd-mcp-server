import { CallToolResult } from '@modelcontextprotocol/sdk/types.js'
import { IAPIClient } from '../../../apis/client'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

import { paramsDescriptions, toolNames, toolsDescriptions } from '../../descriptions'

export function registerListRisksTool (server: McpServer, client: IAPIClient) {
  server.tool(
    toolNames.LIST_RISKS,
    toolsDescriptions.LIST_RISKS,
    {
      systemVersion: z.string().describe(paramsDescriptions.SYSTEM_VERSION),
      length: z.number().optional().describe(paramsDescriptions.LENGTH),
      skip: z.number().optional().describe(paramsDescriptions.SKIP),
      sort: z.string().optional().describe(paramsDescriptions.SORT),
      search: z.string().optional().describe(paramsDescriptions.SEARCH),
    },
    async ({ systemVersion, length, skip, sort, search }): Promise<CallToolResult> => {
      try {
        const data = await client.listRisks(
          systemVersion,
          length,
          skip,
          sort,
          search,
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
              text: `Error fetching requirements for version ${systemVersion}: ${err.message}`,
            },
          ],
        }
      }
    },
  )
}
