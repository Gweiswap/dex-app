# Tokens management

All the tokens are in `/packages/tokens/src/[chainId].ts`. They are instances of the `Token` class defined in the SDK.
Before adding a new **farm** or **pool** you need to make sure the Tokens are in this file.
To add a Token to the exchange lists:

- For the default list: `/config/constant/tokenLists/yantra-default.tokenlist.json`
- For other lists, check the token-lists project in the `yantra-toolkit` repo
- To blacklist a token: `/config/constant/tokenLists/yantra-unsupported.tokenlist.json`
