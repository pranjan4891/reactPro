import * as fs from 'fs';
import * as path from 'path';

/**
 * Saves a key-value pair to the .env file.
 * If the key already exists, its value will be updated.
 * If the key does not exist, it will be added to the end of the file.
 *
 * @param key - The name of the environment variable to save.
 * @param value - The value of the environment variable to save.
 */
export function saveToEnv(key: string, value: string): void {
  const envFilePath = path.join(__dirname, '../../.env');

  // Read current environment variables from the .env file
  let envData = fs.readFileSync(envFilePath, { encoding: 'utf8' });

  // Update the specified key in the environment variables
  const keyRegex = new RegExp(`^${key}=.*`, 'm');
  if (keyRegex.test(envData)) {
    // If key exists, replace it
    envData = envData.replace(keyRegex, `${key}=${value}`);
  } else {
    // If key does not exist, append it
    envData += `\n\n${key}=${value}\n`;
  }

  // Write the updated environment variables back to the .env file
  fs.writeFileSync(envFilePath, envData, { encoding: 'utf8' });
  console.log(`Saved ${key} to .env file`);
}
