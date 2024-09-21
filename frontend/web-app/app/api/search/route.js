import { NextResponse } from "next/server";
import Company from "../../../lib/model/CompanySchema";
import connectToDatabase from "../../../lib/mongoose";

export async function GET(req) {
  try {
    await connectToDatabase();

    const query = req.nextUrl.searchParams.get("query");
    console.log("query", query);
    try {
      const services = await Company.aggregate([
        { $unwind: "$services" }, // Deconstruct services array
        {
          $match: {
            $or: [
              { "services.serviceName": { $regex: query, $options: "i" } }, // Match serviceName with regex
              { "services.serviceKeywords": { $in: [new RegExp(query, "i")] } }, // Match serviceKeywords with regex
            ],
          },
        },
        {
          $project: {
            _id: 0, // Exclude company _id if you don’t want it
            serviceName: "$services.serviceName",
            serviceLink: "$services.serviceLink",
            serviceKeywords: "$services.serviceKeywords",
          },
        },
      ]);

      return NextResponse.json({ success: true, data: services }, { status: 200 });
    } catch (error) {
      console.error("Error searching services:", error);
      throw error;
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
