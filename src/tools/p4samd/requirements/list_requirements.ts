import { CallToolResult } from '@modelcontextprotocol/sdk/types.js'
import { IAPIClient } from '../../../apis/client'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { RequirementTypes } from '../../../apis/enums'
import { z } from 'zod'

import { paramsDescriptions, toolNames, toolsDescriptions } from '../../descriptions'

export function registerListRequirementsTool (server: McpServer, client: IAPIClient) {
  server.tool(
    toolNames.LIST_REQUIREMENTS,
    toolsDescriptions.LIST_REQUIREMENTS,
    {
      systemVersion: z.string().describe(paramsDescriptions.SYSTEM_VERSION),
      length: z.number().optional().describe(paramsDescriptions.LENGTH),
      skip: z.number().optional().describe(paramsDescriptions.SKIP),
      sort: z.string().optional().describe(paramsDescriptions.SORT),
      search: z.string().optional().describe(paramsDescriptions.SEARCH),
      type: z.nativeEnum(RequirementTypes).optional().describe(paramsDescriptions.REQUIREMENT_TYPE),
    },
    async ({ systemVersion, length, skip, sort, search, type }): Promise<CallToolResult> => {
      try {
        const data = await client.listRequirements(
          systemVersion,
          length,
          skip,
          sort,
          search,
          type,
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
