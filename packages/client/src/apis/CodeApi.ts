/* tslint:disable */
/* eslint-disable */
/**
 * CodeCharacter API
 * Specification of the CodeCharacter API
 *
 * The version of the OpenAPI document: 2023.0.1
 * Contact: delta@nitt.edu
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import * as runtime from '../runtime';
import type {
  Code,
  CodeRevision,
  CodeType,
  CreateCodeRevisionRequest,
  GenericError,
  UpdateLatestCodeRequest,
} from '../models';

export interface CreateCodeRevisionOperationRequest {
  createCodeRevisionRequest: CreateCodeRevisionRequest;
}

export interface GetCodeRevisionsRequest {
  type?: CodeType;
}

export interface GetLatestCodeRequest {
  type?: CodeType;
}

export interface UpdateLatestCodeOperationRequest {
  updateLatestCodeRequest: UpdateLatestCodeRequest;
}

/**
 * CodeApi - interface
 *
 * @export
 * @interface CodeApiInterface
 */
export interface CodeApiInterface {
  /**
   * Create code revision
   * @summary Create code revision
   * @param {CreateCodeRevisionRequest} createCodeRevisionRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CodeApiInterface
   */
  createCodeRevisionRaw(
    requestParameters: CreateCodeRevisionOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<void>>;

  /**
   * Create code revision
   * Create code revision
   */
  createCodeRevision(
    createCodeRevisionRequest: CreateCodeRevisionRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<void>;

  /**
   * Get list of all code revision IDs
   * @summary Get code revisions
   * @param {CodeType} [type] code type
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CodeApiInterface
   */
  getCodeRevisionsRaw(
    requestParameters: GetCodeRevisionsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Array<CodeRevision>>>;

  /**
   * Get list of all code revision IDs
   * Get code revisions
   */
  getCodeRevisions(
    type?: CodeType,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Array<CodeRevision>>;

  /**
   * Get latest code
   * @summary Get latest code
   * @param {CodeType} [type] code type
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CodeApiInterface
   */
  getLatestCodeRaw(
    requestParameters: GetLatestCodeRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Code>>;

  /**
   * Get latest code
   * Get latest code
   */
  getLatestCode(
    type?: CodeType,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Code>;

  /**
   * Update latest code
   * @summary Update latest code
   * @param {UpdateLatestCodeRequest} updateLatestCodeRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CodeApiInterface
   */
  updateLatestCodeRaw(
    requestParameters: UpdateLatestCodeOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<void>>;

  /**
   * Update latest code
   * Update latest code
   */
  updateLatestCode(
    updateLatestCodeRequest: UpdateLatestCodeRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<void>;
}

/**
 *
 */
export class CodeApi extends runtime.BaseAPI implements CodeApiInterface {
  /**
   * Create code revision
   * Create code revision
   */
  async createCodeRevisionRaw(
    requestParameters: CreateCodeRevisionOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<void>> {
    if (
      requestParameters.createCodeRevisionRequest === null ||
      requestParameters.createCodeRevisionRequest === undefined
    ) {
      throw new runtime.RequiredError(
        'createCodeRevisionRequest',
        'Required parameter requestParameters.createCodeRevisionRequest was null or undefined when calling createCodeRevision.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = await token('http-bearer', []);

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request(
      {
        path: `/user/code/revisions`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: requestParameters.createCodeRevisionRequest,
      },
      initOverrides,
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Create code revision
   * Create code revision
   */
  async createCodeRevision(
    createCodeRevisionRequest: CreateCodeRevisionRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<void> {
    await this.createCodeRevisionRaw(
      { createCodeRevisionRequest: createCodeRevisionRequest },
      initOverrides,
    );
  }

  /**
   * Get list of all code revision IDs
   * Get code revisions
   */
  async getCodeRevisionsRaw(
    requestParameters: GetCodeRevisionsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Array<CodeRevision>>> {
    const queryParameters: any = {};

    if (requestParameters.type !== undefined) {
      queryParameters['type'] = requestParameters.type;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = await token('http-bearer', []);

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request(
      {
        path: `/user/code/revisions`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Get list of all code revision IDs
   * Get code revisions
   */
  async getCodeRevisions(
    type?: CodeType,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Array<CodeRevision>> {
    const response = await this.getCodeRevisionsRaw(
      { type: type },
      initOverrides,
    );
    return await response.value();
  }

  /**
   * Get latest code
   * Get latest code
   */
  async getLatestCodeRaw(
    requestParameters: GetLatestCodeRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Code>> {
    const queryParameters: any = {};

    if (requestParameters.type !== undefined) {
      queryParameters['type'] = requestParameters.type;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = await token('http-bearer', []);

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request(
      {
        path: `/user/code/latest`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Get latest code
   * Get latest code
   */
  async getLatestCode(
    type?: CodeType,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Code> {
    const response = await this.getLatestCodeRaw({ type: type }, initOverrides);
    return await response.value();
  }

  /**
   * Update latest code
   * Update latest code
   */
  async updateLatestCodeRaw(
    requestParameters: UpdateLatestCodeOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<void>> {
    if (
      requestParameters.updateLatestCodeRequest === null ||
      requestParameters.updateLatestCodeRequest === undefined
    ) {
      throw new runtime.RequiredError(
        'updateLatestCodeRequest',
        'Required parameter requestParameters.updateLatestCodeRequest was null or undefined when calling updateLatestCode.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = await token('http-bearer', []);

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request(
      {
        path: `/user/code/latest`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: requestParameters.updateLatestCodeRequest,
      },
      initOverrides,
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Update latest code
   * Update latest code
   */
  async updateLatestCode(
    updateLatestCodeRequest: UpdateLatestCodeRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<void> {
    await this.updateLatestCodeRaw(
      { updateLatestCodeRequest: updateLatestCodeRequest },
      initOverrides,
    );
  }
}
