import { NextResponse } from "next/server";

const INDEXNOW_KEY = "ggm78a9c21ef45b98129034dcba11e99";
const HOST = "ggmtechnologies.com";
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const urls: string[] = body.urls || [
      `https://${HOST}/`,
      `https://${HOST}/services`,
      `https://${HOST}/blog`,
      `https://${HOST}/work`,
      `https://${HOST}/shop`,
    ];

    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls.slice(0, 10000),
    };

    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({
      success: res.ok,
      status: res.status,
      submittedCount: urls.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "active",
    protocol: "IndexNow",
    host: HOST,
    keyLocation: KEY_LOCATION,
  });
}
