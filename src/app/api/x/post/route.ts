import { NextResponse } from "next/server";
import OAuth from "oauth-1.0a";
import crypto from "node:crypto";

function getOAuth() {
    return new OAuth({
        consumer: {
            key: process.env.X_API_KEY!,
            secret: process.env.X_API_KEY_SECRET!,
        },
        signature_method: "HMAC-SHA1",
        hash_function(baseString: string, key: string) {
            return crypto
            .createHmac("sha1", key)
            .update(baseString)
            .digest("base64");
        },
    });
}

export async function POST() {
    const url = "https://api.x.com/2/tweets";

    const oauth = getOAuth();

    const token = {
        key: process.env.X_ACCESS_TOKEN!,
        secret: process.env.X_ACCESS_TOKEN_SECRET!,
    };

    const authHeader = oauth.toHeader(
        oauth.authorize(
            {
                url,
                method: "POST",
            },
            token
        )
    );

    const response = await fetch(url, {
        method: "POST",
        headers: {
            ...authHeader,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text: "Test post",
        }),
    });

    const data = await response.json();
    return NextResponse.json(data);
}