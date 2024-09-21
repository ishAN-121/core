"use server"
import { IVerifyResponse, verifyCloudProof } from "./backend";
import { ISuccessResult } from "./result";
export async function verify(
    proof: ISuccessResult,
	app_id: `app_${string}`,
	action: string,
	signal?: string,
  ): Promise< IVerifyResponse> {
    const verifyRes = await verifyCloudProof(proof, app_id, action, signal);
    console.log(verifyRes);
    console.log(app_id)
    if (verifyRes.success) {
      return { success: true };
    } else {
      return { success: false, code: verifyRes.code, attribute: verifyRes.attribute, detail: verifyRes.detail };
    }
  }