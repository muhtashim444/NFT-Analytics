import axios from 'axios';

//These variables will moved to .env
 const REACT_APP_MORALIS_API_KEY = "8vVuEP8dUKVdmuTgx7wkgyIjUWjM8eHymhMnz4g6biBRz6JwCqTq7PjEL5dvt6fT"
 const REACT_APP_MORALIS_BASE_URL = "https://deep-index.moralis.io/api/v2/"
 const REACT_APP_API_DEFAULT_LIMIT= "100"
 const REACT_APP_TOKEN_ID_FORMAT= "decimal"

/**
 * Moralis class
 */
export default class MoralisApiAccess {
  chain
  limit = REACT_APP_API_DEFAULT_LIMIT
  apiKey = REACT_APP_MORALIS_API_KEY
  baseUrl = REACT_APP_MORALIS_BASE_URL
  tokenIdFormat = REACT_APP_TOKEN_ID_FORMAT
  headers = {
    'Content-Type': 'application/json',
    'X-Api-Key': this.apiKey
  };

  /**
   * Moralis api constructor
   * @param chain rinkeby | eth
   */
  constructor( chain ) {
    this.chain = chain;
  }

  //Only for tackling GET http
  async initializeRequest(endpoint, queryStringParams = null, wait = false) {
    let response = null;
    try {
      const config = {
        headers: this.headers,
        params: queryStringParams,
      };
      const promise = axios(endpoint, config);
      response = wait === true?  await promise : promise;
    } catch (error) {
        return error;
    }
    return response;
  }

  /**
   * Process request for given url and params by including paginated response data
   * @param endpoint 
   * @param params 
   * @returns 
   */
   async processRequest(endpoint, params) {
    let records = [];
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await this.initializeRequest(url, params, true);
      const { result } = response.data;
      records = [...result];
    } catch (exp) {
      return exp;
    }
    return records;
  }

  /**
   * Get owned nfts data for given wallet
   * @param walletAddress
   * @returns array of nfts data object returned from moralis
   */
    async getNftsByWalletAddress(walletAddress) {
    let records = [];
      const endpoint = `${walletAddress}/nft`;
      const params = new URLSearchParams();
      params.append('chain', this.chain);
      params.append('format', this.tokenIdFormat);
      const response = await this.processRequest(endpoint, params)
      records = [...response];
      return records;
    }

  /**
   * Get nfts transfers filterd data for given wallet and contract addresses
   * @param walletAddress
   * @param contractAddresses
   * @returns array of nfts data object returned from moralis
   */
    async getNftTransfersHistory(tokenId, contractAddress) {
        let records = [];
        const endpoint = `nft/${contractAddress}/${tokenId}/transfers`;
        const params = new URLSearchParams();
        params.append('chain', this.chain);
        params.append('offset', String(0));
        params.append('limit', String(this.limit));
        params.append('format', this.tokenIdFormat);
        records = await this.processRequest(endpoint, params);
        return records;
    }
}
