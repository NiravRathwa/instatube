import { NextRequest, NextResponse } from 'next/server';
import ytdl from 'ytdl-core';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const videoUrl = body.url as string;

    if (!ytdl.validateURL(videoUrl)) {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    const info = await ytdl.getInfo(videoUrl);

    const formats = info.formats.map((format) => ({
      quality: format.qualityLabel || format.audioQuality,
      type: format.container,
      mimeType: format.mimeType,
      itag: format.itag,
    }));

    return NextResponse.json({
      title: info.videoDetails.title,
      author: info.videoDetails.author.name,
      thumbnail: info.videoDetails.thumbnails[0]?.url,
      formats,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to retrieve video info" }, { status: 500 });
  }
}
