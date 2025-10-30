const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying Sovereign Tax Assistance Contracts...");

  // Deploy Tax Records Contract
  const CooperativeTaxRecords = await ethers.getContractFactory("CooperativeTaxRecords");
  const taxRecords = await CooperativeTaxRecords.deploy();
  await taxRecords.deployed();
  console.log("CooperativeTaxRecords deployed to:", taxRecords.address);

  // Deploy additional contracts here
  console.log("Tax system deployment completed!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });