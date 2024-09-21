import { NextResponse } from "next/server";

import Company from "../../../../web-app/lib/model/CompanySchema";
import connectToDatabase from "../../../lib/mongoose";

// Notice the function definition:
export async function GET(req) {
  try {
    await connectToDatabase();

    const query = req.nextUrl.searchParams.get("walletId");
    console.log("query", query);
    const company = await Company.find({ walletId: query });

    console.log(company);

    return NextResponse.json({ success: true, data: company }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Notice the function definition:
export async function POST(req) {
  try {
    await connectToDatabase();

    const bodyObj = await req.json();
    console.log(bodyObj);
    const company = await Company.create(bodyObj);

    return NextResponse.json({ success: true, data: company }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
