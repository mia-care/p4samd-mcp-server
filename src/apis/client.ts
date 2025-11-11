// Copyright Mia srl
// SPDX-License-Identifier: Apache-2.0
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { P4samdClient } from './p4samdClient'
import {
  ChangeRequest,
  GetChangeRequestsApiResponse, GetKpisApiResponse, GetReferencesApiResponse,
  GetRequirementsApiResponse,
  GetRisksApiResponse,
  GetTestsApiResponse, GetTestSuitesApiResponse, GetTestSuitesExecutionsApiResponse,
  Requirement,
  Risk, SoftwareItem, SoftwareItemHistoryItem,
  Test, TestSuite, TestSuiteExecution,
} from './types'

export const DEFAULT_DOCUMENTATION_PATH = '/documentation/json'

export interface IAPIClient {
  listVersions (): Promise<Record<string, unknown>[]>
  listRequirements (systemVersion: string, length?: number, skip?: number, sort?: string, search?: string, type?: string[]): Promise<GetRequirementsApiResponse>
  getRequirementById (id: string): Promise<Requirement>
  listRisks (systemVersion: string, length?: number, skip?: number, sort?: string, search?: string): Promise<GetRisksApiResponse>
  getRiskById (id: string): Promise<Risk>
  listTests(systemVersion: string, length?: number, skip?: number, sort?: string, search?: string, type?: string[], executionMode?: string[], outcome?: string[]): Promise<GetTestsApiResponse>
  getTestById (id: string): Promise<Test>
  listChangeRequests(systemVersion: string, length?: number, skip?: number, sort?: string, search?: string, classification?: string[]): Promise<GetChangeRequestsApiResponse>
  getChangeRequestById (id: string): Promise<ChangeRequest>
  listReferences(length?: number, skip?: number, sort?: string, search?: string, category?: string[]): Promise<GetReferencesApiResponse>
  listKpis(systemVersion: string): Promise<GetKpisApiResponse>
  listTestSuites(systemVersionId: string, length?: number, skip?: number, sort?: string, search?: string, executionMode?: string): Promise<GetTestSuitesApiResponse>
  getTestSuiteById(id: string): Promise<TestSuite>
  listTestSuitesExecutions(systemVersionId: string, length?: number, skip?: number, sort?: string, testSuiteId?: string): Promise<GetTestSuitesExecutionsApiResponse>
  getTestSuiteExecutionById(id: string): Promise<TestSuiteExecution>
  listSoftwareItems(systemVersionId: string): Promise<SoftwareItem[]>
  getSoftwareItemHistory(id: string): Promise<SoftwareItemHistoryItem[]>
}

export class APIClient implements IAPIClient {
  #p4samdClient: P4samdClient

  constructor (
    p4samdUrl: string,
    p4samdApiKey: string,
  ) {
    this.#p4samdClient = new P4samdClient(p4samdUrl, p4samdApiKey)
    return
  }

  async listVersions (): Promise<Record<string, unknown>[]> {
    return this.#p4samdClient.listVersions()
  }

  async listRequirements (systemVersion: string, length = 10, skip = 0, search?: string, sort?: string, type?: string[]): Promise<GetRequirementsApiResponse> {
    return this.#p4samdClient.listRequirements(systemVersion, length, skip, sort, search, type)
  }

  async getRequirementById (id: string): Promise<Requirement> {
    return this.#p4samdClient.getRequirementById(id)
  }

  async listRisks (systemVersion: string, length = 10, skip = 0, sort?: string, search?: string): Promise<GetRisksApiResponse> {
    return this.#p4samdClient.listRisks(systemVersion, length, skip, sort, search)
  }

  async getRiskById (id: string): Promise<Risk> {
    return this.#p4samdClient.getRiskById(id)
  }

  async listTests (systemVersion: string, length = 10, skip = 0, sort?: string, search?: string, type?: string[], executionMode?: string[], outcome?: string[]): Promise<GetTestsApiResponse> {
    return this.#p4samdClient.listTests(systemVersion, length, skip, sort, search, type, executionMode, outcome)
  }

  async getTestById (id: string): Promise<Test> {
    return this.#p4samdClient.getTestById(id)
  }

  async listChangeRequests (systemVersion: string, length = 10, skip = 0, sort?: string, search?: string, classification?: string[]): Promise<GetChangeRequestsApiResponse> {
    return this.#p4samdClient.listChangeRequests(systemVersion, length, skip, sort, search, classification)
  }

  async getChangeRequestById (id: string): Promise<ChangeRequest> {
    return this.#p4samdClient.getChangeRequestById(id)
  }

  async listReferences (length = 10, skip = 0, sort?: string, search?: string, category?: string[]): Promise<GetReferencesApiResponse> {
    return this.#p4samdClient.listReferences(length, skip, sort, search, category)
  }

  async listKpis (systemVersion: string): Promise<GetKpisApiResponse> {
    return this.#p4samdClient.listKpis(systemVersion)
  }

  async listTestSuites (systemVersionId: string, length = 10, skip = 0, sort?: string, search?: string, executionMode?: string): Promise<GetTestSuitesApiResponse> {
    return this.#p4samdClient.listTestSuites(systemVersionId, length, skip, sort, search, executionMode)
  }

  async getTestSuiteById (id: string): Promise<TestSuite> {
    return this.#p4samdClient.getTestSuiteById(id)
  }

  async listTestSuitesExecutions (systemVersionId: string, length = 10, skip = 0, sort?: string, testSuiteId?: string): Promise<GetTestSuitesExecutionsApiResponse> {
    return this.#p4samdClient.listTestSuitesExecutions(systemVersionId, length, skip, sort, testSuiteId)
  }

  async getTestSuiteExecutionById (id: string): Promise<TestSuiteExecution> {
    return this.#p4samdClient.getTestSuiteExecutionById(id)
  }

  async listSoftwareItems (systemVersionId: string): Promise<SoftwareItem[]> {
    return this.#p4samdClient.listSoftwareItems(systemVersionId)
  }

  async getSoftwareItemHistory (id: string): Promise<SoftwareItemHistoryItem[]> {
    return this.#p4samdClient.getSoftwareItemHistory(id)
  }
}
