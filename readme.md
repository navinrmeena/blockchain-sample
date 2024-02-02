# first code

synchronous [solidity]

asynchronous [javascriptl

cooking

Synchronous

1. Put popcorn in microwave
2. Wait for popcorn to finish
3. Pour drinks for everyone

Asynchronous

1. Put popcorn in the mircrowave
2. Pour drinks for everyone
3. Wait for popcorn to finish

Promise
-Pending
-Fulfilled
-Rejected

- we always use async function for deploying our solidity code

```js
async function main() {}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

to compile our solidity code in js we use `solcjs`
to add yarn we type `corepack enable`;

# ehter.js

- The ethers.js library aims to be a complete and compact library for interacting with the Ethereum Blockchain and its ecosystem.

# EncryptKeys

- we can encrypt our private key and store locally

-steps to encrypt key

1. we create file `encryptKey.js`
2. crearte a function to encrypt our private adress

```js
require("dotenv").config();
const ethers = require("ethers");
const fs = require("fs");

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
  const encryptedJsonKey = await wallet.encrypt(
    process.env.PRIVATE_KEY_PASSWORD
  );
  console.log(encryptedJsonKey);
  // we store a encrypted password and we pass pass password while we run the code

  fs.writeFileSync("./encryptedJsonKey.json", encryptedJsonKey);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```
