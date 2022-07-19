import fs from 'fs';
import { ethers } from "ethers";
import prompts, { PromptObject } from 'prompts';

const questions: PromptObject[] = [
  {
    type: 'number',
    name: 'numberOfWallets',
    message: 'How many wallets do you want to generate?',
    initial: 100,
    min: 1,
  },
  {
    type: 'text',
    name: 'fileName',
    message: 'Enter the output file name',
    initial: 'wallets',
    validate: (value: string) =>
      value.length > 0 || 'Please enter a valid file name',
  },
];

(async () => {
  console.clear();

  const { numberOfWallets, fileName } = await prompts(questions);

  const accounts = [];

  for (let i = 0; i < numberOfWallets; i++) {
    const wallet = ethers.Wallet.createRandom({ });
    accounts.push({ address: wallet.address, privateKey: wallet.privateKey, mnemonic: wallet.mnemonic.phrase });
  }

  await fs.writeFile(`${fileName}.json`, JSON.stringify(accounts, null, 2), { encoding: 'utf-8' }, (c) => c);
})();
