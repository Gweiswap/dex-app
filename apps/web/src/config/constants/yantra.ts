import { GraphQLClient } from 'graphql-request'

export const YANTRA_ADDRESS: `0x${string}` = '0x8f3BeEf59556eA09483fE0224Dd062834969FBd0'
export const XYANTRA_ADDRESS: `0x${string}` = '0x31fEA76CA17a85D8FADA9552c4A6680e91B388B4'
export const YANTRA_MASTER: `0x${string}` = '0xCf88FA4cF9681A16a03C0c0D8303062603ad1744'
export const NFT_POOL_FACTORY_ADDRESS: `0x${string}` = '0x55a60e257E0406eA1372c8439994d1E7CF2d3FF3'
export const YIELD_BOOSTER_ADDRESS: `0x${string}` = '0x50F10FC05daa70d781b99f3C5c6C4556b76CdF38'
export const DIVIDENDS_ADDRESS: `0x${string}` = '0xF37dbF5d0842F153cef3862c5FB45c06566921D5'
export const LAUNCHPAD_ADDRESS: `0x${string}` = '0x1bC206F93D16E01faE5149E6675bbF90565B3Eba'
export const POSITION_HELPER_ADDRESS: `0x${string}` = '0x92c850126b8e87923c858C43FbA0f30b9202d35d'
export const HYPER_POOL_FACTORY_ADDRESS: `0x${string}` = '0x02D0489e4ac69A2Aa9a6Ab2A6Ad9D8027dcf38FB'

export const ETH_PRICE_FEED: `0x${string}` = '0x9ef1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e' // sniper should replace the eth price feed
// export const ETH_PRICE_FEED: `0x${string}` = '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419'

export const POSITIONS_SUBGRAPH = 'https://info.yantra.exchange/subgraphs/name/yantra/exchange-positions'

export const positionsSubgraphClient = new GraphQLClient(POSITIONS_SUBGRAPH)
