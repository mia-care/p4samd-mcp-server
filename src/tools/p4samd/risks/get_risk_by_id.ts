import { CallToolResult } from '@modelcontextprotocol/sdk/types.js'
import { IAPIClient } from '../../../apis/client'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

import { paramsDescriptions, toolNames, toolsDescriptions } from '../../descriptions'

export function registerGetRiskByIdTool (server: McpServer, client: IAPIClient) {
  server.tool(
    toolNames.GET_RISK_BY_ID,
    toolsDescriptions.GET_RISK_BY_ID,
    {
      riskId: z.string().describe(paramsDescriptions.REQUIREMENT_ID),
    },
    async ({ riskId }): Promise<CallToolResult> => {
      try {
        const data = await client.getRiskById(riskId)
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
              text: `Error fetching risk with id: ${riskId}: ${err.message}`,
            },
          ],
        }
      }
    },
  )
}
