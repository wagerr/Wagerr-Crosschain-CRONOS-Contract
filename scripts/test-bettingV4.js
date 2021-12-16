// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.

const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  //await hre.run("compile");

  /*{
	"address _factory": "0xB5Ded6b165fe77F8f26879241cf9a254e1E7dAC5",
	"address _WETH": "0xca2503482e5D6D762b524978f400f03E38d5F962"
}*/

  const signers = await ethers.getSigners();
  const deployer = signers[0];
  const user = signers[1];

  const bettingV4 = await ethers.getContractAt(
    "BettingV4",
    "0xfB41d43b533151e473A40f8a9a40aDD3D2E1475d", // deployed with VVSSwap router ,)

    deployer
  );
  const cwgr = await ethers.getContractAt(
    "ICRC20",
    "0x4EaC16E4D2bB1f737F0eC307617F38eF9b1e7D5e",
    deployer
  );

  const WCRO = await ethers.getContractAt(
    "ICRC20",
    "0xca2503482e5D6D762b524978f400f03E38d5F962"
  );

  const USDTCRO = await ethers.getContractAt(
    "ICRC20",
    "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7"
  );

  const exchangeRouterTestNet = await ethers.getContractAt(
    "IExchangeRouter",
    "0xF661bFE59b16032a02d214f27F68219AFCab87F4" // VVSSwap CRO router
  );
  //await withdraw(deployer, bettingV4);
  //await updateExchangeRouter(deployer, bettingV4);
  //await addLiquidity(user, exchangeRouterTestNet, cwgr);
  //await removeLiquidity(user, bscExchangeRouterTestNet, cwgr);
  //await addCoins(deployer, bettingV4);
  //await setFee(deployer, bettingV4);
  //await TestBet(user, deployer, bettingV4, cwgr, USDTCRO);
  //await printBetStat(bettingV4);
  //await TestRefund(user, deployer, bettingV4, cwgr);
  //await TestPayout(user, deployer, bettingV4, cwgr, WCRO);
  await testOther(user, deployer, bettingV4, cwgr, WCRO, exchangeRouterTestNet);
  //await onOffBetting(deployer, bettingV4);
}


async function withdraw(deployer, bettingV4) {
  await bettingV4.connect(deployer).withdraw(ethers.utils.parseEther("140"));
}

async function addLiquidity(user, exchangeRouter, cwgr) {
 /*await cwgr
    .connect(user)
    .approve(exchangeRouter.address, ethers.utils.parseEther("5000"));*/

  await exchangeRouter.connect(user).addLiquidityETH(
    cwgr.address,
    ethers.utils.parseEther("5000"),
    0,
    0,
    user.address,
    Math.floor(Date.now() / 1000) + 60, //10 minutes
    { value: ethers.utils.parseEther("10") }
  );
}

async function removeLiquidity(user, exchangeRouter, cwgr) {
  await exchangeRouter.connect(user).removeLiquidityETH(
    cwgr.address,
    ethers.utils.parseEther("2000"),
    0,
    0,
    user.address,
    Math.floor(Date.now() / 1000) + 60 //10 minutes
  );
}

async function testOther(
  user,
  deployer,
  bettingV4,
  cwgr,
  WCRO,
  exchangeRouter
) {

  const bet = await bettingV4.Bets("40");
  console.log(bet)
  /*const wcroBalance = await ethers.provider.getBalance(user.address);
  console.log(ethers.utils.formatEther(wcroBalance));*/

  /* const amountMinBNBIn = await bettingV4.getAmountInMin(
    WCRO.address,
    cwgr.address,
    ethers.utils.parseEther("100")
  );

  console.log("WGR-CRO: ", ethers.utils.formatEther(amountMinBNBIn));

  const amountOutCROMin = await exchangeRouter.getAmountsOut(amountMinBNBIn, [
    WCRO.address,
    cwgr.address,
  ]);

  const fee = await bettingV4.convertFeeToCoin(cwgr.address);
  console.log("fee :", ethers.utils.formatEther(fee));

  console.log("CRO-WGR: ", ethers.utils.formatEther(amountOutCROMin[1]));*/
}

async function onOffBetting(deployer, bettingV4) {
  await bettingV4.connect(deployer).onOff();
}

async function updateExchangeRouter(deployer, bettingV4) {
  await bettingV4
    .connect(deployer)
    .updateExchangeRouter("0x3380aE82e39E42Ca34EbEd69aF67fAa0683Bb5c1");
}

async function addCoins(deployer, bettingV4) {
  /*await bettingV4
    .connect(deployer)
    .addCoin("CUSDT", "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7");*/
  await bettingV4
    .connect(deployer)
    .addCoin("CRO", "0xca2503482e5D6D762b524978f400f03E38d5F962"); //WCRO address
  await bettingV4
    .connect(deployer)
    .addCoin("WGR", "0x4EaC16E4D2bB1f737F0eC307617F38eF9b1e7D5e");
}

async function setFee(deployer, bettingV4) {
  await bettingV4
    .connect(deployer)
    .setFee(ethers.utils.parseEther("0.001009820"));
}
async function TestBet(user, deployer, bettingV4, cwgr, USDTCRO) {
  await cwgr
    .connect(user)
    .approve(bettingV4.address, ethers.utils.parseEther("110"));

  //for (i = 0; i < 10; i++) {
  await bettingV4
    .connect(user)
    .betWithWGR("4201036777010001", ethers.utils.parseEther("105"));
  //}*/
 
  /*await bettingV4.connect(user).betWithNativeCoin("420103877c010001", {
    value: ethers.utils.parseEther("1"),
  });*/

  /*await BUSD.connect(user).approve(
    bettingV4.address,
    ethers.utils.parseEther("100")
  );
  await bettingV4
    .connect(user)
    .betWithToken("sdfsdfsfsdfsdf", "BUSD", ethers.utils.parseEther("50"));
*/
  console.log(
    "total Bets:",
    ethers.utils.formatEther(await bettingV4.totalBets("total"))
  );

  console.log(
    "total Bets (WGR):",
    ethers.utils.formatEther(await bettingV4.totalBets("WGR"))
  );
  console.log(
    "total Bets (CRO):",
    ethers.utils.formatEther(await bettingV4.totalBets("CRO"))
  );
}

async function TestRefund(user, deployer, bettingV4, cwgr, CUSDT) {
  //bnb
  betIndex = Number(await bettingV4.betIndex());
  await bettingV4.connect(deployer).refund(betIndex - 1);

  console.log(
    "total Refunds:",
    ethers.utils.formatEther(await bettingV4.totalRefunds("total"))
  );
  console.log(
    "total Refunds (WGR):",
    ethers.utils.formatEther(await bettingV4.totalRefunds("WGR"))
  );
  console.log(
    "total Refunds (CRO):",
    ethers.utils.formatEther(await bettingV4.totalRefunds("CRO"))
  );
}

async function TestPayout(user, deployer, bettingV4, cwgr) {
  //bwgr
  
    const tx = await bettingV4
      .connect(deployer)
      .processPayout(
        40,
        ethers.utils.parseEther("10000"),
        "2be2d2f59653b461b49d03124a0c00bd7aa0beb0d7391cbef1bdbb54db3595ee",
        "win"
      );
  
    await tx.wait(1);
 

  console.log(
    "total Payout:",
    ethers.utils.formatEther(await bettingV4.totalPayout("total"))
  );
  console.log(
    "total Payout (WGR):",
    ethers.utils.formatEther(await bettingV4.totalPayout("WGR"))
  );

  console.log(
    "total Payout (CRO):",
    ethers.utils.formatEther(await bettingV4.totalPayout("CRO"))
  );
}

async function printBetStat(bettingV4) {
  console.log(
    "total Bets:",
    ethers.utils.formatEther(await bettingV4.totalBets("total"))
  );

  console.log(
    "total Bets (WGR):",
    ethers.utils.formatEther(await bettingV4.totalBets("WGR"))
  );
  console.log(
    "total Bets (CRO):",
    ethers.utils.formatEther(await bettingV4.totalBets("CRO"))
  );

  console.log(
    "total Refunds:",
    ethers.utils.formatEther(await bettingV4.totalRefunds("total"))
  );
  console.log(
    "total Refunds (WGR):",
    ethers.utils.formatEther(await bettingV4.totalRefunds("WGR"))
  );
  console.log(
    "total Refunds (CRO):",
    ethers.utils.formatEther(await bettingV4.totalRefunds("CRO"))
  );

  console.log(
    "total Payout:",
    ethers.utils.formatEther(await bettingV4.totalPayout("total"))
  );
  console.log(
    "total Payout (WGR):",
    ethers.utils.formatEther(await bettingV4.totalPayout("WGR"))
  );

  console.log(
    "total Payout (CRO):",
    ethers.utils.formatEther(await bettingV4.totalPayout("CRO"))
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
