const HEARTBEAT = 5000;

import { changeStream } from "@/lib/mongoChangeStream";

export async function GET(request: Request) {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    }
}