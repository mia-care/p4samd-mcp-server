import { CallToolResult } from '@modelcontextprotocol/sdk/types.js'
import { ChangeRequestClassifications } from '../../../apis/enums'
import { IAPIClient } from '../../../apis/client'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

import { paramsDescriptions, toolNames, toolsDescriptions } from '../../descriptions'

export function registerListChangeRequestsTool (server: McpServer, client: IAPIClient) {
  server.tool(
    toolNames.LIST_CHANGE_REQUESTS,
    toolsDescriptions.LIST_CHANGE_REQUESTS,
    {
      systemVersion: z.string().describe(paramsDescriptions.SYSTEM_VERSION),
      length: z.number().optional().describe(paramsDescriptions.LENGTH),
      skip: z.number().optional().describe(paramsDescriptions.SKIP),
      sort: z.string().optional().describe(paramsDescriptions.SORT),
      search: z.string().optional().describe(paramsDescriptions.SEARCH),
      classification: z.array(z.nativeEnum(ChangeRequestClassifications)).optional().describe(paramsDescriptions.CHANGE_REQUEST_CLASSIFICATION),
    },
    async ({ systemVersion, length, skip, sort, search, classification }): Promise<CallToolResult> => {
      try {
        const data = await client.listChangeRequests(
          systemVersion,
          length,
          skip,
          sort,
          search,
          classification,
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
              text: `Error fetching change requests for version ${systemVersion}: ${err.message}`,
            },
          ],
        }
      }
    },
  )
}
