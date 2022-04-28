/**
 * Gererate Token Uri from ipfs hash
 * Check if ipfs hash found convert it to tokenUri
 * otherwise return input value as is
 * @param ipfsHash
 * @returns tokenUri
 */
export function generateFunctionalUrl(ipfsHash) {
    let functionalUrl = ipfsHash;
    if (functionalUrl != null && functionalUrl != undefined) {
      if (ipfsHash.startsWith('ipfs://ipfs/')) {
        functionalUrl = ipfsHash.replace('ipfs://ipfs/', 'https://ipfs.io/ipfs/');
      } else if (ipfsHash.startsWith('ipfs://')) {
        functionalUrl = ipfsHash.replace('ipfs://', 'https://ipfs.io/ipfs/');
      }
    }
    return functionalUrl;
}
/**
 * Validates given object
 * @param {Object} value
 */
 function isValidObject(value) {
    return (value && (typeof value === 'object') && (value.constructor === Object));
  }


/**
 * Generates a meatdata object from Metadata string field.
 * @param nftMetaData 
 * @returns returns object of NFT metadata
 */
export function transformMetaData(nftMetaData) {
    let response = {
        title: '',
        description: '',
        externalLink: '',
        imageURL: '',
        animationUrl: ''
    };
    try {
        const parsedMeta = JSON.parse(nftMetaData);
        if (isValidObject(parsedMeta) === true) {
            response = {
                title: parsedMeta?.name,
                description: parsedMeta?.description,
                externalLink: parsedMeta?.external_link,
                imageURL: generateFunctionalUrl(parsedMeta?.image),
                animationUrl: parsedMeta?.animation_url
            }
        }
    }       
catch (err) {
    console.log(err);
}
return response;
}

/**
 * Generates an array of meatdata objects from Metadata string field.
 * @param nfts 
 * @returns returns array of objects with valid NFT metadata
 */
 export function transformNfts(nfts) {
    const transformedNfts = [];
    nfts.forEach((nft) => {
        transformedNfts.push({...nft,...transformMetaData(nft.metadata)})
    })
    return transformedNfts;
}
