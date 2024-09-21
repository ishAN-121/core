// import axios from "axios";
// import 

// export default async function pinImageToIPFS(input) {
//   try {
//     const data = new FormData();
//     data.append("file", input);

//     const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
//       headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_JWT}` },
//     });
//     return response;
//   } catch (error) {
//     return error;
//   }
// }

import { pinata } from "../../pinataConfig"

async function uploadJsonToIPFS(object){
  try {
    const upload = await pinata.upload.json(object)
    console.log(upload);
    return upload.IpfsHash
  } catch (error) {
    console.log(error)
  }
}

async function uploadImageToIPFS(file){
  try {
      const upload = await pinata.upload.file(file)
      console.log(upload);
      return upload.IpfsHash
  } catch (error) {
      console.log(error)
  }
}

async function retriveJsonFromIPFS(IpfsHash: string){
  try {
    const ipfsUrl = await pinata.gateways.convert(IpfsHash)
    const response = await fetch(ipfsUrl)
    return response.json()
  } catch (error) {
    console.log(error)
  }
}

async function RetriveImageFromIPFS(IpfsHash: string){
    const ipfsUrl = await pinata.gateways.convert(IpfsHash)
    return(
        <div>
            <img src={ipfsUrl} alt="uploaded image" />
        </div>
    )
}

export { uploadJsonToIPFS, uploadImageToIPFS, retriveJsonFromIPFS, RetriveImageFromIPFS }; 

