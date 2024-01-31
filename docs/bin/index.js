#!/usr/bin/env node
import { execSync, spawnSync } from "child_process";
import readline from "readline";

console.log(
  "\x1b[34m=== Snowfall-js-plugin: Serve JSDoc Documentation ===\x1b[0m\n"
);
async function installHttpServer() {
  console.error(
    "\x1b[33mTo serve the JSDoc documentation page http-server must be installed as a dev dependency.\x1b[0m\n"
  );

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const answer = await new Promise((resolve) => {
    rl.question(
      "Do you want to install http-server as a dev dependency? (y/n) ",
      (userAnswer) => {
        resolve(userAnswer.toLowerCase());
      }
    );
  });

  rl.close();

  if (answer === "y") {
    console.log("\nInstalling http-server as dev dependency...");
    try {
      execSync("npm install http-server --save-dev");
      console.log("\x1b[32mhttp-server installed successfully.");
      console.log("Starting demo...\n\x1b[0m");
    } catch (installError) {
      console.error(
        "\x1b[31mError installing http-server:\x1b[31m",
        installError.message
      );
      process.exit(1);
    }
  } else {
    console.log(
      "\x1b[31mPlease install http-server as a dev dependency to use this script.\x1b[33m"
    );
    process.exit(1);
  }
}

try {
  execSync("http-server --version");
} catch (error) {
  await installHttpServer();
}

try {
  const command = "npx";
  const args = [
    "http-server",
    "./node_modules/snowfall-js-plugin/docs",
    "-d",
    "false",
    "-o",
    "index.html",
  ];
  const result = spawnSync(command, args, { stdio: "inherit" });
} catch (e) {
  console.log("Error running http-server: ", e);
}
