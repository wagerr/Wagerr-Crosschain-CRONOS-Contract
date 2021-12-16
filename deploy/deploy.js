const { assert } = require("chai");

module.exports = async (hre) => {
  const { upgrades, ethers } = hre;

  const network = hre.network.name;

  if (["hardhat", "ganache", "localhost"].includes(network)) {
    const Token = await ethers.getContractFactory("CRC20Token");
    const token = await Token.deploy();
    await token.deployed();

    console.log("token Deployed At:", token.address);

    const Betting = await ethers.getContractFactory("BettingV4");
    const betting = await upgrades.deployProxy(
      Betting,
      [
        token.address,
        "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
        "0xD99D1c33F9fC3444f8101754aBC46c52416550D1",
      ],
      {
        kind: "uups",
      }
    );
    await betting.deployed();

    console.log("betting contract deployed At:", betting.address);
  } else if (network == "testnet") {
    const Betting = await ethers.getContractFactory("BettingV4");
    const betting = await upgrades.deployProxy(
      Betting,
      [
        "0x4EaC16E4D2bB1f737F0eC307617F38eF9b1e7D5e", //CWGR
        "0xca2503482e5D6D762b524978f400f03E38d5F962", //WCRO
        "0xF661bFE59b16032a02d214f27F68219AFCab87F4", //VVSSwap router CRONOS testnet
      ],
      {
        kind: "uups",
      }
    );
    await betting.deployed();

    console.log("betting contract deployed At:", betting.address);
  }
};
module.exports.tags = ["Deploy"];
