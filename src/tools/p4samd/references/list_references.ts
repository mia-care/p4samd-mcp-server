import { CallToolResult } from '@modelcontextprotocol/sdk/types.js'
import { IAPIClient } from '../../../apis/client'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { ReferenceCategories } from '../../../apis/enums'
import { z } from 'zod'

import { paramsDescriptions, toolNames, toolsDescriptions } from '../../descriptions'

export function registerListReferencesTool (server: McpServer, client: IAPIClient) {
  server.tool(
    toolNames.LIST_REFERENCES,
    toolsDescriptions.LIST_REFERENCES,
    {
      length: z.number().optional().describe(paramsDescriptions.LENGTH),
      skip: z.number().optional().describe(paramsDescriptions.SKIP),
      sort: z.string().optional().describe(paramsDescriptions.SORT),
      search: z.string().optional().describe(paramsDescriptions.SEARCH),
      category: z.array(z.nativeEnum(ReferenceCategories)).optional().describe(paramsDescriptions.REFERENCE_CATEGORIES),
    },
    async ({ length, skip, sort, search, category }): Promise<CallToolResult> => {
      try {
        const data = await client.listReferences(
          length,
          skip,
          sort,
          search,
          category,
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
              text: `Error fetching references: ${err.message}`,
            },
          ],
        }
      }
    },
  )
}
