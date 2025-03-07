import { google } from "googleapis";
import { NextResponse } from "next/server";
import credentials from "../../config/service-account.json";

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
    });

    const analytics = google.analyticsdata({ version: "v1beta", auth });

    const response = await analytics.properties.runReport({
      property: "properties/420340524",
      requestBody: {
        dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
        metrics: [{ name: "screenPageViews" }],
      },
    });
    const totalViews = response.data.rows?.[0]?.metricValues?.[0]?.value || 0;
    return NextResponse.json(totalViews);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
