// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.

const { assert } = require("chai");
const hre = require("hardhat");
const { ethers } = hre;

const network = hre.network.name;

const configs = {
  testnet: {
    betting: {
      latest: "0xfB41d43b533151e473A40f8a9a40aDD3D2E1475d",
    },
  },
  mainnet: {
    betting: {
      latest: "",
    },
  },
};

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  //await hre.run("compile");

  const signers = await ethers.getSigners();
  const deployer = signers[0];

  const betting = await ethers.getContractAt(
    "Betting",
    configs[network].betting.latest, //old -> "0xD4AA2d3668fdD3cC145287378121A5D3a8f98190",
    deployer
  );

  console.log(await betting.version());
  assert((await betting.version()) === "v5");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
