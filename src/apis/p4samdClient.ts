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


import { request } from 'undici'
import {
  ChangeRequest,
  GetChangeRequestsApiResponse, GetKpisApiResponse, GetReferencesApiResponse,
  GetRequirementsApiResponse,
  GetRisksApiResponse,
  GetTestsApiResponse,
  Requirement,
  Risk,
  Test,
} from './types'

export class P4samdClient {
  #p4samdUrl: string
  #apiKey: string

  constructor (p4samdUrl: string, apiKey: string) {
    this.#p4samdUrl = p4samdUrl
    this.#apiKey = apiKey
  }

  async listVersions (): Promise<Record<string, unknown>[]> {
    const res = await request(
      `${this.#p4samdUrl}/p4samd-m2m/system-versions`,
      { method: 'GET', headers: { secret: this.#apiKey } },
    )

    console.error(JSON.stringify(res))

    return await res.body.json() as Record<string, unknown>[]
  }

  async listRequirements (systemVersion: string, length: number, skip: number, sort?: string, search?: string, type?: string): Promise<GetRequirementsApiResponse> {
    const res = await request(
      `${this.#p4samdUrl}/p4samd-m2m/requirements`,
      {
        method: 'GET',
        query: {
          systemVersion,
          length,
          skip,
          ...sort && { sort },
          ...search && { search },
          ...type && { type },
        },
        headers: { secret: this.#apiKey },
      },
    )
    return await res.body.json() as GetRequirementsApiResponse
  }

  async getRequirementById (id: string): Promise<Requirement> {
    const res = await request(
      `${this.#p4samdUrl}/p4samd-m2m/drawer-requirement/${id}`,
      {
        method: 'GET',
        headers: { secret: this.#apiKey },
      },
    )

    return await res.body.json() as Requirement
  }

  async listRisks (systemVersion: string, length: number, skip: number, sort?: string, search?: string): Promise<GetRisksApiResponse> {
    const res = await request(
      `${this.#p4samdUrl}/p4samd-m2m/risks`,
      {
        method: 'GET',
        query: {
          systemVersion,
          length,
          skip,
          ...search && { search },
          ...sort && { sort },
        },
        headers: { secret: this.#apiKey },
      },
    )
    return await res.body.json() as GetRisksApiResponse
  }

  async getRiskById (id: string): Promise<Risk> {
    const res = await request(
      `${this.#p4samdUrl}/p4samd-m2m/drawer-risk/${id}`,
      {
        method: 'GET',
        headers: { secret: this.#apiKey },
      },
    )

    return await res.body.json() as Risk
  }

  async listTests (systemVersion: string, length: number, skip: number, sort?: string, search?: string, type?: string[], executionMode?: string[], outcome?: string[]): Promise<GetTestsApiResponse> {
    const res = await request(
      `${this.#p4samdUrl}/p4samd-m2m/tests`,
      {
        method: 'GET',
        query: {
          systemVersion,
          length,
          skip,
          ...search && { search },
          ...sort && { sort },
          ...type && { type: type.join(',') },
          ...executionMode && { executionMode: executionMode.join(',') },
          ...outcome && { outcome: outcome.join(',') },
        },
        headers: { secret: this.#apiKey },
      },
    )
    return await res.body.json() as GetTestsApiResponse
  }

  async getTestById (id: string): Promise<Test> {
    const res = await request(
      `${this.#p4samdUrl}/p4samd-m2m/drawer-test/${id}`,
      {
        method: 'GET',
        headers: { secret: this.#apiKey },
      },
    )

    return await res.body.json() as Test
  }

  async listChangeRequests (systemVersion: string, length: number, skip: number, sort?: string, search?: string, classification?: string[]): Promise<GetChangeRequestsApiResponse> {
    const res = await request(
      `${this.#p4samdUrl}/p4samd-m2m/change-requests`,
      {
        method: 'GET',
        query: {
          systemVersion,
          length,
          skip,
          ...search && { search },
          ...sort && { sort },
          ...classification && { classification: classification.join(',') },
        },
        headers: { secret: this.#apiKey },
      },
    )
    return await res.body.json() as GetChangeRequestsApiResponse
  }

  async getChangeRequestById (id: string): Promise<ChangeRequest> {
    const res = await request(
      `${this.#p4samdUrl}/p4samd-m2m/drawer-change-request/${id}`,
      {
        method: 'GET',
        headers: { secret: this.#apiKey },
      },
    )

    return await res.body.json() as ChangeRequest
  }

  async listReferences (length: number, skip: number, sort?: string, search?: string, category?: string[]): Promise<GetReferencesApiResponse> {
    const res = await request(
      `${this.#p4samdUrl}/p4samd-m2m/references`,
      {
        method: 'GET',
        query: {
          length,
          skip,
          ...search && { search },
          ...sort && { sort },
          ...category && { category: category.join(',') },
        },
        headers: { secret: this.#apiKey },
      },
    )
    return await res.body.json() as GetReferencesApiResponse
  }

  async listKpis (systemVersion: string): Promise<GetKpisApiResponse> {
    const res = await request(
      `${this.#p4samdUrl}/p4samd-m2m/kpis/${systemVersion}`,
      {
        method: 'GET',
        headers: { secret: this.#apiKey },
      },
    )
    return await res.body.json() as GetKpisApiResponse
  }
}
