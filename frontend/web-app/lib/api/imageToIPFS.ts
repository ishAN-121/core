import axios from "axios";

export default async function pinImageToIPFS(input) {
  try {
    const data = new FormData();
    data.append("file", input);

    const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_JWT}` },
    });
    return response;
  } catch (error) {
    return error;
  }
}
