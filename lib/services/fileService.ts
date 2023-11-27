const fs = require("fs");

export const filePath = "token.txt";

// Function to write a string token to a file
export const writeTokenToFile = async (token: string) => {
  try {
    await fs.promises.writeFile(filePath, token);
    console.log(`Token "${token}" has been written to ${filePath}`);
  } catch (err) {
    console.error(`Error writing token to file: ${err}`);
  }
};

// Function to read a string token from a file
export const readTokenFromFile = async () => {
  return process.env.ACCESS_TOKEN;
  //   try {
  //     const token = await fs.promises.readFile(filePath, 'utf8');
  //     console.log(`Token read from ${filePath}: ${token}`);
  //     return token;
  //   } catch (err) {
  //     console.error(`Error reading token from file: ${err}`);
  //     return null;
  //   }
};

// const tokenToWrite = 'mySecretToken123';

// writeTokenToFile(filePath, tokenToWrite)
//   .then(() => {
//     // Reading the token after writing
//     readTokenFromFile(filePath);
//   })
//   .catch((err) => {
//     console.error('Error:', err);
//   });
