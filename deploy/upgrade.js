const { assert } = require("chai");

module.exports = async (hre) => {
  const { upgrades, ethers } = hre;

  const Betting = await ethers.getContractFactory("Betting");
  const bettingold = await Betting.attach(
    "0xfB41d43b533151e473A40f8a9a40aDD3D2E1475d" ///old -> "0xD4AA2d3668fdD3cC145287378121A5D3a8f98190"
  );

  const bettingNew = await ethers.getContractFactory("Betting");
  const bettingUpgrade = await upgrades.upgradeProxy(bettingold, bettingNew);

  assert((await bettingUpgrade.version()) === "v5");

  console.log("Betting v5 address:", bettingUpgrade.address);
};
module.exports.tags = ["Upgrade"];
