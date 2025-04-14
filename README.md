# pDAI Supply History

A tool to track and analyze the historical supply of pDAI (PulseChain DAI) from the launch date to the present.

## Overview

This script fetches the total supply of pDAI tokens at daily intervals from the PulseChain blockchain, starting from the launch date (May 13, 2023) up to April 13, 2025. It outputs the data to a CSV file that can be used for analysis in spreadsheet software.

## Features

- Retrieves historical pDAI total supply data from the blockchain
- Samples data at daily intervals
- Outputs data in CSV format for easy analysis
- Handles RPC connection to PulseChain

## Requirements

- Node.js (v14 or higher)
- ethers.js v5.8
- A stable internet connection

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/pDAI-supply-history.git
   cd pDAI-supply-history
   ```

2. Install dependencies:
   ```
   npm install
   ```

   Or if you prefer using the requirements.txt:
   ```
   npm install -g $(cat requirements.txt)
   ```

## Usage

Run the script with:

```
node pDAI-supply-history.js
```

The script will:
1. Connect to the PulseChain RPC
2. Query the pDAI contract for total supply at daily intervals
3. Save the results to `pDAI-supply.csv` in the format:
   ```
   Date,Block,Total Supply (pDAI)
   2023-05-13,17248315,123456.789
   ...
   ```

## Data Format

The output CSV contains three columns:
- **Date**: The date in YYYY-MM-DD format
- **Block**: The block number on PulseChain
- **Total Supply (pDAI)**: The total supply of pDAI tokens at that block, formatted with 18 decimal places

## Troubleshooting

- If you encounter RPC connection issues, verify your internet connection and that the PulseChain RPC endpoint is accessible.
- Block time variations may cause slight date mismatches in the data.

## License

See the [LICENSE](LICENSE) file for details.
