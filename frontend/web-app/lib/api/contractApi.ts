import { initWeb3Airdao, initWeb3Oasis } from "@/lib/contract/contract";
import contractABI1 from "@/lib/contract/contractAbi1.json";
import contractABI2 from "@/lib/contract/contractAbi2.json";
import { contractAddress1, contractAddress2 } from "@/lib/contract/contractAddress";

const web3Instance1 = initWeb3Airdao();
const web3Instance2 = initWeb3Oasis();

const contractInstance1 = new web3Instance1.eth.Contract(contractABI1, contractAddress1);
const contractInstance2 = new web3Instance2.eth.Contract(contractABI2, contractAddress2);

// export async function getAllReviews(walletAddress: string) {
//   try {
//     console.log("walletAddress", walletAddress);
//     console.log("contractInstance", contractInstance);

//     const result = contractInstance.methods.getAllReviews(walletAddress).call();
//     console.log("result", result);
//     return result;
//   } catch (error) {
//     console.error("Error fetching services:", error);
//   }
// }

export async function testContract1() {
  try {
    const result = await contractInstance1.methods.name().call();
    console.log("result1", result);
    return result;
  } catch (error) {
    console.error("Error fetching services:", error);
  }
}
export async function testContract2() {
  try {
    const result = await contractInstance2.methods.name().call();
    console.log("result2", result);
    return result;
  } catch (error) {
    console.error("Error fetching services:", error);
  }
}
