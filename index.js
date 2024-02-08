#!/usr/bin/env node

const { execSync } = require("child_process");
const os = require("os");

function copyToClipboard(text) {
  const platform = os.platform();
  try {
    if (platform === "win32") {
      execSync(`echo ${text} | clip`);
    } else if (platform === "darwin") {
      execSync(`echo "${text}" | pbcopy`);
    } else if (platform === "linux") {
      if (execSync("command -v xclip").toString().trim()) {
        execSync(`echo "${text}" | xclip -selection clipboard`);
      } else if (execSync("command -v xsel").toString().trim()) {
        execSync(`echo "${text}" | xsel --clipboard --input`);
      } else {
        console.error(
          "Clipboard tool not found. Please install xclip or xsel."
        );
        process.exit(1);
      }
    } else {
      console.error(`Unsupported platform: ${platform}`);
      process.exit(1);
    }
  } catch (error) {
    console.error("Error copying to clipboard:", error);
  }
}

copyToClipboard(process.cwd());
console.log(`Directory ${process.cwd()} copied to clipboard.`);
