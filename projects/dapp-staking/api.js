const { ApiPromise, WsProvider } = require("@polkadot/api");
const BigNumber = require("bignumber.js");
const { timetravel } = require("../manta-atlantic-stake/api");

const ASTR_DECIMALS = 18;

async function tvl() {
  const polkadotProvider = new WsProvider("wss://rpc.astar.network");
  const polkadotApi = await ApiPromise.create({ provider: polkadotProvider });
  const currentEraInfo = await polkadotApi.query.dappStaking.currentEraInfo();
  const tvl = currentEraInfo.totalLocked.toString()
  const tvlBn = new BigNumber(tvl);
  const totalLocked = tvlBn.div(10 ** ASTR_DECIMALS).toFixed(4);
  return {
    astar: totalLocked,
  };
}

module.exports = {
  timetravel: false,
  methodology:
    "Total value locked is the total amount of ASTR tokens deposited to the dApp Staking program",
  astar: { tvl },
};
