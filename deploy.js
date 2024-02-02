require("dotenv").config();

// import { ethers } from "ethers";
const ganache = require("ganache");

const ethers = require("ethers");
const fs = require("fs");

async function main() {
  // compile them in our code
  // compile them separately
  // http://127.0.0.1:7545
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);


  // const provider = new ethers.providers.Web3Provider(ganache.provider());
  // signer = await provider.getSigner();x

  const encryptedJson = fs.readFileSync("./encryptedJsonKey.json", "utf8");
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);


// ************************ when we are using encpted private key in json format *************************
  // let wallet = ethers.Wallet.fromEncryptedJsonSync(
  //   encryptedJson,
  //   process.env.PRIVATE_KEY_PASSWORD
  // );
  // wallet = wallet.connect(provider);
// ***********************$$$$$$$$$$$$$$$******************************


  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const ContractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("deploying please wait");
  const contract = await ContractFactory.deploy(); //stop here until function fully execute
  const transactionReceipt = await contract.deploymentTransaction().wait(1); //this is for wating for one block conformation
  console.log("Here is the deployment transaction(transaction response): ");
  console.log(contract.deploymentTransaction);
  console.log("Here is the transaction receipt: ");
  console.log(transactionReceipt);

  // const bytecode = fs.readFileSync(
  //   "./SimpleStorage_sol_SimpleStorage.bin",
  //   "utf8"
  // );
  // const chunkSize = 100; // Adjust the chunk size as needed
  // const chunks = [];
  // for (let i = 0; i < bytecode.length; i += chunkSize) {
  //   chunks.push(bytecode.substring(i, i + chunkSize));
  // }
  // const data = "0x" + chunks.join("");

  // const tx = {
  //   nonce: 2,
  //   gasPrice: 20000000000,
  //   gasLimit: 1000000,
  //   to: null,
  //   value: 0,
  //   data: data,
  //   chainId: "1337",
  // };
  // // const signedTx = await wallet.signTransaction(tx);
  // // console.log(signedTx);
  // // this is to sign transection not to send
  // const sendtx = await wallet.sendTransaction(tx);
  // console.log(sendtx);

  const Currentfevnumber = await contract.retrieve();
  console.log(Currentfevnumber);

  const transactionResponse = await contract.store("7");
  const transactionReceipt1 = await transactionResponse.wait(1);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
