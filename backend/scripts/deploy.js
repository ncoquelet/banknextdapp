const hre = require("hardhat");

async function main() {
  const jobs = await ethers.deployContract("Jobs");
  await jobs.waitForDeployment();

  console.log(`Jobs deployed to ${jobs.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
