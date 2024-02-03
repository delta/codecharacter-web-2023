/* tslint:disable */
/* eslint-disable */
/**
 * CodeCharacter API
 * Specification of the CodeCharacter API
 *
 * The version of the OpenAPI document: 2024.0.1
 * Contact: delta@nitt.edu
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import * as runtime from '../runtime';
import type {
  CreateMapRevisionRequest,
  GameMap,
  GameMapRevision,
  GameMapType,
  GenericError,
  MapCommitByCommitIdResponse,
  UpdateLatestMapRequest,
} from '../models/index';

export interface CreateMapRevisionOperationRequest {
  createMapRevisionRequest: CreateMapRevisionRequest;
}

export interface GetLatestMapRequest {
  type?: GameMapType;
}

export interface GetMapByCommitIDRequest {
  commitId: string;
}

export interface GetMapRevisionsRequest {
  type?: GameMapType;
}

export interface UpdateLatestMapOperationRequest {
  updateLatestMapRequest: UpdateLatestMapRequest;
}

/**
 * MapApi - interface
 *
 * @export
 * @interface MapApiInterface
 */
export interface MapApiInterface {
  /**
   * Create map revision
   * @summary Create map revision
   * @param {CreateMapRevisionRequest} createMapRevisionRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof MapApiInterface
   */
  createMapRevisionRaw(
    requestParameters: CreateMapRevisionOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<void>>;

  /**
   * Create map revision
   * Create map revision
   */
  createMapRevision(
    createMapRevisionRequest: CreateMapRevisionRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<void>;

  /**
   * Get latest map
   * @summary Get latest map
   * @param {GameMapType} [type] map type
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof MapApiInterface
   */
  getLatestMapRaw(
    requestParameters: GetLatestMapRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<GameMap>>;

  /**
   * Get latest map
   * Get latest map
   */
  getLatestMap(
    type?: GameMapType,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<GameMap>;

  /**
   *
   * @summary Get the Map and image of the commit ID
   * @param {string} commitId
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof MapApiInterface
   */
  getMapByCommitIDRaw(
    requestParameters: GetMapByCommitIDRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<MapCommitByCommitIdResponse>>;

  /**
   * Get the Map and image of the commit ID
   */
  getMapByCommitID(
    commitId: string,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<MapCommitByCommitIdResponse>;

  /**
   * Get list of all map revision IDs
   * @summary Get map revisions
   * @param {GameMapType} [type] map type
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof MapApiInterface
   */
  getMapRevisionsRaw(
    requestParameters: GetMapRevisionsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Array<GameMapRevision>>>;

  /**
   * Get list of all map revision IDs
   * Get map revisions
   */
  getMapRevisions(
    type?: GameMapType,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Array<GameMapRevision>>;

  /**
   * Update latest map
   * @summary Update latest map
   * @param {UpdateLatestMapRequest} updateLatestMapRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof MapApiInterface
   */
  updateLatestMapRaw(
    requestParameters: UpdateLatestMapOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<void>>;

  /**
   * Update latest map
   * Update latest map
   */
  updateLatestMap(
    updateLatestMapRequest: UpdateLatestMapRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<void>;
}

/**
 *
 */
export class MapApi extends runtime.BaseAPI implements MapApiInterface {
  /**
   * Create map revision
   * Create map revision
   */
  async createMapRevisionRaw(
    requestParameters: CreateMapRevisionOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<void>> {
    if (
      requestParameters.createMapRevisionRequest === null ||
      requestParameters.createMapRevisionRequest === undefined
    ) {
      throw new runtime.RequiredError(
        'createMapRevisionRequest',
        'Required parameter requestParameters.createMapRevisionRequest was null or undefined when calling createMapRevision.',
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
        path: `/user/map/revisions`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: requestParameters.createMapRevisionRequest,
      },
      initOverrides,
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Create map revision
   * Create map revision
   */
  async createMapRevision(
    createMapRevisionRequest: CreateMapRevisionRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<void> {
    await this.createMapRevisionRaw(
      { createMapRevisionRequest: createMapRevisionRequest },
      initOverrides,
    );
  }

  /**
   * Get latest map
   * Get latest map
   */
  async getLatestMapRaw(
    requestParameters: GetLatestMapRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<GameMap>> {
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
        path: `/user/map/latest`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Get latest map
   * Get latest map
   */
  async getLatestMap(
    type?: GameMapType,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<GameMap> {
    const response = await this.getLatestMapRaw({ type: type }, initOverrides);
    return await response.value();
  }

  /**
   * Get the Map and image of the commit ID
   */
  async getMapByCommitIDRaw(
    requestParameters: GetMapByCommitIDRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<MapCommitByCommitIdResponse>> {
    if (
      requestParameters.commitId === null ||
      requestParameters.commitId === undefined
    ) {
      throw new runtime.RequiredError(
        'commitId',
        'Required parameter requestParameters.commitId was null or undefined when calling getMapByCommitID.',
      );
    }

    const queryParameters: any = {};

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
        path: `/user/map/revision/{commitId}`.replace(
          `{${'commitId'}}`,
          encodeURIComponent(String(requestParameters.commitId)),
        ),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Get the Map and image of the commit ID
   */
  async getMapByCommitID(
    commitId: string,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<MapCommitByCommitIdResponse> {
    const response = await this.getMapByCommitIDRaw(
      { commitId: commitId },
      initOverrides,
    );
    return await response.value();
  }

  /**
   * Get list of all map revision IDs
   * Get map revisions
   */
  async getMapRevisionsRaw(
    requestParameters: GetMapRevisionsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Array<GameMapRevision>>> {
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
        path: `/user/map/revisions`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Get list of all map revision IDs
   * Get map revisions
   */
  async getMapRevisions(
    type?: GameMapType,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Array<GameMapRevision>> {
    const response = await this.getMapRevisionsRaw(
      { type: type },
      initOverrides,
    );
    return await response.value();
  }

  /**
   * Update latest map
   * Update latest map
   */
  async updateLatestMapRaw(
    requestParameters: UpdateLatestMapOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<void>> {
    if (
      requestParameters.updateLatestMapRequest === null ||
      requestParameters.updateLatestMapRequest === undefined
    ) {
      throw new runtime.RequiredError(
        'updateLatestMapRequest',
        'Required parameter requestParameters.updateLatestMapRequest was null or undefined when calling updateLatestMap.',
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
        path: `/user/map/latest`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: requestParameters.updateLatestMapRequest,
      },
      initOverrides,
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Update latest map
   * Update latest map
   */
  async updateLatestMap(
    updateLatestMapRequest: UpdateLatestMapRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<void> {
    await this.updateLatestMapRaw(
      { updateLatestMapRequest: updateLatestMapRequest },
      initOverrides,
    );
  }
}
