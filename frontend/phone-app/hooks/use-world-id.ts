import { IVerifyResponse } from "@/lib/world-coin/backend";
import { AppErrorCodes, ResponseStatus } from "@/lib/world-coin/bridge";
import { VerificationLevel } from "@/lib/world-coin/config";
<<<<<<< Updated upstream
import { decryptResponse, encryptRequest, exportKey, generateKey } from "@/lib/world-coin/crypto";
import { encodeAction, generateSignal } from "@/lib/world-coin/hashing";
=======
import {
  decryptResponse,
  encryptRequest,
  exportKey,
} from "@/lib/world-coin/crypto";
import { generateSignal } from "@/lib/world-coin/hashing";
>>>>>>> Stashed changes
import { ISuccessResult } from "@/lib/world-coin/result";
import {
  buffer_decode,
  verification_level_to_credential_types,
} from "@/lib/world-coin/utils";
import { verify } from "@/lib/world-coin/verify";
import { useState } from "react";

enum CredentialType {
  Orb = "orb",
  Device = "device",
}

type BridgeResponse =
  | {
      status: ResponseStatus.Retrieved | ResponseStatus.Initialized;
      response: null;
    }
  | {
      status: ResponseStatus.Completed;
      response: { iv: string; payload: string };
    };

type BridgeResult =
  | ISuccessResult
  | (Omit<ISuccessResult, "verification_level"> & {
      credential_type: CredentialType;
    })
  | { error_code: AppErrorCodes };

function generateIv(){
    return window.crypto.getRandomValues(new Uint8Array(16));
}

async function generateKey(){
    return await window.crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt'])
}

export default function useWorldId() {
  const [verificationStatus, setVerificationStatus] = useState<
    "initialized" | "completed" | "polling" | "failed" | null
  >(null);
  const [connectURI, setConnectURI] = useState<string | null>(null);
  const [key, setKey] = useState<any>(null);
  const [iv, setIv] = useState<any>(null);
  const bridge_url = "https://bridge.worldcoin.org";
<<<<<<< Updated upstream
  {key,iv} = await generateKey()
=======
  let request_id: string | null = null;

>>>>>>> Stashed changes
  const handleSign = async () => {
    const generatedKey = await generateKey();
    console.log("GENERATED KEY",generatedKey);
    setKey(generatedKey);

    const generatedIv = generateIv();
    setIv(generatedIv);
    console.log("GENERATED IV",generatedIv);
    const encodedBody = await encryptRequest(
      generatedKey,
      generatedIv,
      JSON.stringify({
        app_id: "app_550b2d74aa400425dd38ee091d21ea90",
        action_description: "test1",
        action: encodeAction("test1"),
        signal: generateSignal("").digest,
        credential_types: verification_level_to_credential_types(
          VerificationLevel.Device
        ),
        verification_level: VerificationLevel.Device,
      })
    );
    console.log("IV",iv)
    console.log("KEY",key)
    const res = await fetch(
      new URL("/request", "https://bridge.worldcoin.org"),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(encodedBody),
      }
    );
    console.log(res);
    const { request_id } = (await res.json()) as { request_id: string };
    console.log("REQ ID", request_id);
    const connectURI = `https://worldcoin.org/verify?t=wld&i=${request_id}&k=${encodeURIComponent(
      await exportKey(generatedKey)
    )}${
      bridge_url && bridge_url !== "https://bridge.worldcoin.org"
        ? `&b=${encodeURIComponent(bridge_url)}`
        : ""
    }`;
    console.log("CURI", connectURI);
    setConnectURI(connectURI);

    startPolling();
    return connectURI ;
  };

  function startPolling() {
    let new_res = null;
    let response: any = null;
    const pollBridgeResponse = async () => {
      let stopPolling = false;
      const poll = async () => {
        while (!stopPolling) {
          const new_res = await fetch(
            new URL(`/response/${request_id}`, bridge_url)
          );
          const res = (await new_res.json()) as BridgeResponse;
          console.log("RESULT", res);

          if (res.status === "completed") {
            response = res.response;
            console.log("DONE!!!!");
            stopPolling = true;
            break;
          }
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      };

      const done_polling = async () => {
        await new Promise((resolve) => setTimeout(resolve, 62000));
        console.log("CANCELLING POLLING");
        stopPolling = true;
        // clearInterval(interval);
      };

      poll();
      await done_polling();

      await pollBridgeResponse();

      console.log("FINALRES", response);
      if (response != null) {
        console.log("NEW_RES", new_res);

        const result = JSON.parse(
          await decryptResponse(
            key,
            buffer_decode(response.iv),
            response.payload
          )
        ) as BridgeResult;
        console.log(result);
        console.log("stringgy", JSON.stringify(result));

        //{"proof":"0x06fb42606083a1b9ad8e931f2c318f79aacdf4666cab7d517d95ebfca412cb6713557c71a2f71a78a20a525909b523e85ffae8f2d295150f4c7e9207142e6a4c0fd6637615524f96d7841fd373e22bff9ad549ac2294fef0e700976ba1cb27b12a9abfc9e51671fb5184ae2702b6f0fc2a050be9c58dc319c267799d1da07b9715a052012157fb904e0deeaae1f6ca2679ed0190337839940913c895322ab83e001b604a495d499eaab29f8f1130d5062d4c270896cd5aeb363e60ad3b745d0a2ce34ac23c218b7ab01b98c3108bd7dd050b306d41062d8d2c0d60cdcc2c88e2090226884c1c252416f9d0af21536ccf04092335cab0de0942d41d1842af3939","merkle_root":"0x916c2ef552f8252f600f9dc6b5c719eea5534da6825468ae80188d67bdf7164","nullifier_hash":"0x208db54221fbb53fd83847966f2cf961515ccdf045c70a0f97eb2abbb08653bd","credential_type":"device"}
        const proof: ISuccessResult = {
          proof: result.proof,
          merkle_root: result.merkle_root,
          nullifier_hash: result.nullifier_hash,
          verification_level: VerificationLevel.Device,
        };
        const success: IVerifyResponse = await verify(
          proof,
          "app_550b2d74aa400425dd38ee091d21ea90",
          "test1",
          ""
        );
        console.log("SUCCESS", success);
      }
    };
  }

  function checkStatus(){

  }

  return { handleSign,checkStatus };
}
