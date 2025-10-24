import { CallToolResult } from '@modelcontextprotocol/sdk/types.js'
import { IAPIClient } from '../../../apis/client'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

import { paramsDescriptions, toolNames, toolsDescriptions } from '../../descriptions'

export function registerGetRequirementByIdTool (server: McpServer, client: IAPIClient) {
  server.tool(
    toolNames.GET_REQUIREMENT_BY_ID,
    toolsDescriptions.GET_REQUIREMENT_BY_ID,
    {
      requirementId: z.string().describe(paramsDescriptions.REQUIREMENT_ID),
    },
    async ({ requirementId }): Promise<CallToolResult> => {
      try {
        const data = await client.getRequirementById(requirementId)
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
              text: `Error fetching requirement with id: ${requirementId}: ${err.message}`,
            },
          ],
        }
      }
    },
  )
}
