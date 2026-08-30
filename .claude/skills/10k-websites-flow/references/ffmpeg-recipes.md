# ffmpeg recipes

Use the current workspace as the project root. Raw segment videos and handoff PNGs
stay in the root. Review frames stay under .10k-flow/review. Only processed assets go
under assets.

## Validate a delivered segment

Run:

    ffprobe -v error -show_entries format=duration:stream=codec_name,width,height,r_frame_rate -of default=noprint_wrappers=1 segment-01.mp4

A normal segment is a readable video with the storyboard's expected duration, 16:9
dimensions, and a video stream. Do not reject a file only because its duration is
slightly different if the visual journey is intact. Record the actual duration before
encoding.

## Extract review frames

For a six-second segment:

    ffmpeg -ss 0 -i segment-01.mp4 -frames:v 1 -q:v 2 .10k-flow/review/segment-01-start.jpg
    ffmpeg -ss 3 -i segment-01.mp4 -frames:v 1 -q:v 2 .10k-flow/review/segment-01-mid.jpg
    ffmpeg -sseof -0.1 -i segment-01.mp4 -update 1 -frames:v 1 -q:v 2 .10k-flow/review/segment-01-end.jpg

Inspect the start, middle, and end before accepting the segment.

## Extract the handoff frame

The next starting image must be a full-quality PNG:

    ffmpeg -sseof -0.1 -i segment-01.mp4 -update 1 -frames:v 1 -q:v 1 segment-01-end.png

Do not chain from the review JPEG.

## Encode a single approved segment

    ffmpeg -i segment-01.mp4 -c:v libx264 -crf 18 -preset slow -g 8 -keyint_min 8 -pix_fmt yuv420p -movflags +faststart -an assets/hero-scrub.mp4

For busy texture or particle footage, test a higher CRF and a modest downscale only
after checking the worst frames. Keep the short keyframe interval.

## Join approved raw segments

Preferred path: concatenate raw segments and encode once. For three segments:

    ffmpeg -i segment-01.mp4 -i segment-02.mp4 -i segment-03.mp4 -filter_complex "[0:v][1:v][2:v]concat=n=3:v=1:a=0[v]" -map "[v]" -c:v libx264 -crf 18 -preset slow -g 8 -keyint_min 8 -pix_fmt yuv420p -movflags +faststart -an assets/hero-scrub.mp4

Use the actual accepted segment count and keep every segment's raw source available.
If a visible join remains, inspect the seam at scrub speed. Prefer redesigning the
seam into motion. Use a short crossfade only when the motion is correct but texture
refresh makes the cut visible.

## Poster and ending still

    ffmpeg -i assets/hero-scrub.mp4 -frames:v 1 -q:v 2 assets/hero-poster.jpg
    ffmpeg -sseof -0.1 -i assets/hero-scrub.mp4 -update 1 -frames:v 1 -q:v 2 assets/hero-ending.jpg

Inspect the ending with the website header mocked over it at a wide window and a
short window. If the subject is cut off, choose a better ending frame or trim the raw
video before encoding again.

## Supporting stills

For photographic support images:

    ffmpeg -i support-01.png -vf scale=1920:-2 -q:v 2 assets/support-01.jpg

Keep screenshots and sharp interface imagery as PNG or lossless WebP. Do not convert
them to lossy JPEG.

## Safe tail trim

If the video is strong until an unwanted drift near the end, trim before encoding:

    ffmpeg -i segment-01.mp4 -t 4.3 -c:v libx264 -crf 18 -preset slow -g 8 -keyint_min 8 -pix_fmt yuv420p -movflags +faststart -an assets/hero-scrub.mp4

Re-extract poster and ending stills after every trim.
