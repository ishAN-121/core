import { NextResponse } from "next/server";

import Company from "../../../../lib/model/CompanySchema";
import connectToDatabase from "../../../../lib/mongoose";

// Notice the function definition:
export async function GET(req) {
  try {
    await connectToDatabase();

    const walletId = req.nextUrl.searchParams.get("walletId");
    console.log("query", walletId);
    const company = await Company.findOne({ walletId: walletId });

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
    const walletId = req.nextUrl.searchParams.get("walletId");

    const company = await Company.findOne({ walletId: walletId });

    if (!company) {
      return NextResponse.json({ success: false, error: "Company not found" }, { status: 404 });
    }

    const updateServiceObj = {
      serviceName: bodyObj.name,
      serviceLink: bodyObj.phoneNumber,
      serviceKeywords: bodyObj.categories,
    };

    company.services.push(updateServiceObj);

    await company.save();

    return NextResponse.json({ success: true, data: company }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
