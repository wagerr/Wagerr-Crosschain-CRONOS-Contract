// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.

const { assert } = require("chai");
const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  //await hre.run("compile");

  const signers = await ethers.getSigners();
  const deployer = signers[0];

  const cwgr = await ethers.getContractAt(
    "CRC20Token",
    "0x4EaC16E4D2bB1f737F0eC307617F38eF9b1e7D5e",
    deployer
  );

  //await burn(cwgr, deployer);
  //await mint(cwgr, deployer);
}

async function burn(cwgr, deployer) {
  await cwgr.connect(deployer).burn(ethers.utils.parseEther("2000"));
}

async function mint(cwgr, deployer) {
  await cwgr.connect(deployer).mint(ethers.utils.parseEther("2000"));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
