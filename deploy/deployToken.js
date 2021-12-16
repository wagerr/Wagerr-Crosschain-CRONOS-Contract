module.exports = async (hre) => {
  const { ethers } = hre;

  const Token = await ethers.getContractFactory("CRC20Token");
  const token = await Token.deploy();
  await token.deployed();

  console.log("WGR token Deployed At:", token.address);
};
module.exports.tags = ["DeployToken"];
