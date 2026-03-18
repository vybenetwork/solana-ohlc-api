/**
 * Vybe API client: single entry point wiring the API modules.
 */

import { createHttpClient } from './client.js';
import { getToken } from './tokens.js';
import { getLabeledProgramAccount, getTrades, type GetTradesParams } from './trades.js';
import { getCandles, type GetCandlesParams } from './candles.js';
import { getMarketCandles } from './market-candles.js';
import type {
  VybeCandlesResponse,
  VybeProgramsResponse,
  VybeToken,
  VybeTradesResponse,
} from '../types/api.js';

export interface VybeClient {
  getToken(mintAddress: string): Promise<VybeToken>;
  getTrades(params: GetTradesParams): Promise<VybeTradesResponse>;
  getCandles(mintAddress: string, params?: GetCandlesParams): Promise<VybeCandlesResponse>;
  getMarketCandles(marketAddress: string, params?: GetCandlesParams): Promise<VybeCandlesResponse>;
  getLabeledProgramAccount(programAddress: string): Promise<VybeProgramsResponse>;
}

export function createClient(apiKey: string): VybeClient {
  const http = createHttpClient(apiKey);
  return {
    getToken: (mintAddress: string) => getToken(http, mintAddress),
    getTrades: (params: GetTradesParams) => getTrades(http, params),
    getCandles: (mintAddress: string, params?: GetCandlesParams) => getCandles(http, mintAddress, params),
    getMarketCandles: (marketAddress: string, params?: GetCandlesParams) => getMarketCandles(http, marketAddress, params),
    getLabeledProgramAccount: (programAddress: string) => getLabeledProgramAccount(http, programAddress),
  };
}

