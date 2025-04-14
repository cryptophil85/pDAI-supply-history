// You can copy this code and run it in open source software such as vscode to see the block balances yourself
// It will require Node JS an Ethers

const { ethers } = require("ethers"); // Ethers v5.8
const fs = require("fs");

const provider = new ethers.providers.JsonRpcProvider("https://rpc.pulsechain.com");

const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; // DAI
const daiAbi = ["function totalSupply() view returns (uint256)"];

const launchBlock = 17248315; // May 13, 2023
const launchDate = new Date("2023-05-13T00:00:00Z");
const endDate = new Date("2025-04-13T00:00:00Z");

const BLOCKS_PER_DAY = 8640; // Approx - based on 10 second block time, days where blocks were slower will cause date mismatches.
const OUTPUT_FILE = "pDAI-supply.csv"; // You can use the csv file this code creates in spreadsheet software.

async function main() {
  const dai = new ethers.Contract(daiAddress, daiAbi, provider);
  let currentDate = new Date(launchDate);
  let blockNumber = launchBlock;

  const header = "Date,Block,Total Supply (pDAI)\n";
  fs.writeFileSync(OUTPUT_FILE, header);

  while (currentDate <= endDate) {
    try {
      const supply = await dai.totalSupply({ blockTag: blockNumber });
      const dateStr = currentDate.toISOString().split("T")[0];
      const formattedSupply = ethers.utils.formatUnits(supply, 18);
      const line = `${dateStr},${blockNumber},${formattedSupply}\n`;

      fs.appendFileSync(OUTPUT_FILE, line);
      console.log(line.trim());
    } catch (error) {
      console.error(`Failed on ${currentDate.toISOString().split("T")[0]} at block ${blockNumber}:`, error.message);
    }

    // Move to next day
    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    blockNumber += BLOCKS_PER_DAY;
  }

  console.log(`\n✅ Done. Data saved to: ${OUTPUT_FILE}`);
}

main().catch(console.error);
