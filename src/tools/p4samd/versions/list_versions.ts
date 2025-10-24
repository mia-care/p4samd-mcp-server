import { CallToolResult } from '@modelcontextprotocol/sdk/types.js'
import { IAPIClient } from '../../../apis/client'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { toolNames, toolsDescriptions } from '../../descriptions'

export function registerListVersionsTool (server: McpServer, client: IAPIClient) {
  server.tool(
    toolNames.LIST_VERSIONS,
    toolsDescriptions.LIST_VERSIONS,
    {},
    async (): Promise<CallToolResult> => {
      try {
        const data = await client.listVersions()
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
              text: `Error fetching p4samd system versions for company: ${err.message}`,
            },
          ],
        }
      }
    },
  )
}

