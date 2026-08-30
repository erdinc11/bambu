#!/usr/bin/env python3
"""
Negative-space + luminance + contrast analyzer for a scroll-scrubbed hero video.

WHY THIS EXISTS
    You cannot eyeball where UI is safe to place. A subject that looks like it
    "stays right" moves. A backdrop that looks light is luma 124. Every UI
    position in this skill must cite a number produced by this script.

USAGE
    python3 analyze_video.py grid  <video>                     -> writes .10k-flow/analysis/grid.json
    python3 analyze_video.py map   <video> <start> <end> [name] -> intersection map for one interval
    python3 analyze_video.py luma  <video>                     -> backdrop value journey over time
    python3 analyze_video.py bands <video> <start> <end>        -> per-band contrast, normal + inverted
    python3 analyze_video.py region <video> <s> <e> <x0> <x1> <y0> <y1>  -> worst contrast in one rect

NO third-party packages. Pure python + ffmpeg. numpy/PIL are NOT required.
"""
import sys, os, json, subprocess

W, H = 160, 90          # analysis resolution for the grid pass
GC, GR = 16, 9          # grid columns/rows -> each cell is 6.25% x 11.1%
CELL_W, CELL_H = W // GC, H // GR
HIPASS_SIGMA = 45       # gaussian blur radius for the high-pass subject detector
HIPASS_TH = 10          # per-pixel |orig - blurred| threshold
CELL_TH = 8             # how many hot pixels make a cell "occupied"
OUTDIR = ".10k-flow/analysis"


def ff_gray(video, w, h, hipass):
    """Decode the whole video to raw 8-bit gray frames at w x h.

    hipass=True applies |original - gaussian_blur| first. THIS IS THE CORRECT
    SUBJECT DETECTOR. A naive row-median detector flags the backdrop's own
    radial falloff at the left/right edges as subject and produces phantom
    columns 0 and 15. Do not use row-median. Use the high pass.
    """
    if hipass:
        vf = ("[0:v]format=gray,split[a][b];[b]gblur=sigma=%d[bl];"
              "[a][bl]blend=all_mode=difference,scale=%d:%d" % (HIPASS_SIGMA, w, h))
        cmd = ["ffmpeg", "-v", "error", "-i", video, "-filter_complex", vf, "-f", "rawvideo", "-"]
    else:
        cmd = ["ffmpeg", "-v", "error", "-i", video, "-vf",
               "scale=%d:%d,format=gray" % (w, h), "-f", "rawvideo", "-"]
    data = subprocess.run(cmd, capture_output=True).stdout
    fs = w * h
    return [data[i * fs:(i + 1) * fs] for i in range(len(data) // fs)]


def duration(video):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                          "-of", "csv=p=0", video], capture_output=True, text=True).stdout
    return float(out.strip())


def build_grid(video):
    frames = ff_gray(video, W, H, hipass=True)
    grids = []
    for fr in frames:
        g = [[0] * GC for _ in range(GR)]
        for gy in range(GR):
            for gx in range(GC):
                hot = 0
                for y in range(gy * CELL_H, (gy + 1) * CELL_H):
                    off = y * W
                    for x in range(gx * CELL_W, (gx + 1) * CELL_W):
                        if fr[off + x] > HIPASS_TH:
                            hot += 1
                g[gy][gx] = 1 if hot > CELL_TH else 0
        grids.append(g)
    os.makedirs(OUTDIR, exist_ok=True)
    json.dump(grids, open(OUTDIR + "/grid.json", "w"))
    return grids


def load_grid(video):
    p = OUTDIR + "/grid.json"
    return json.load(open(p)) if os.path.exists(p) else build_grid(video)


def fps_of(video, grids):
    return len(grids) / duration(video)


def intersect(grids, fps, a, b):
    """Cells free across EVERY frame in [a,b). This is the only defensible
    safe zone. A cell free at one sampled frame is worthless."""
    out = [[1] * GC for _ in range(GR)]
    for f in range(int(a * fps), min(int(b * fps), len(grids))):
        for r in range(GR):
            for c in range(GC):
                if grids[f][r][c]:
                    out[r][c] = 0
    return out


def print_map(m, a, b, name):
    print("--- %s  %.2f-%.2fs   '.'=free for the WHOLE interval  '#'=subject at some point" % (name, a, b))
    print("    cell width 6.25%, cell height 11.1%")
    print("    col:  " + "".join(str(c % 10) for c in range(GC)))
    for r in range(GR):
        print("    y%3.0f%% " % (r * 100.0 / GR) + "".join("." if m[r][c] else "#" for c in range(GC)))
    free_cols = [c for c in range(GC) if all(m[r][c] for r in range(GR))]
    free_rows = [r for r in range(GR) if all(m[r][c] for c in range(GC))]
    def runs(v):
        out, cur = [], []
        for i in v:
            if cur and i == cur[-1] + 1: cur.append(i)
            else:
                if cur: out.append(cur)
                cur = [i]
        if cur: out.append(cur)
        return out
    print("    FULL-HEIGHT FREE COLUMNS: " + (", ".join(
        "x %.1f%%-%.1f%%" % (g[0] * 6.25, (g[-1] + 1) * 6.25) for g in runs(free_cols)) or "none"))
    print("    FULL-WIDTH FREE ROWS    : " + (", ".join(
        "y %.1f%%-%.1f%%" % (g[0] * 11.1, (g[-1] + 1) * 11.1) for g in runs(free_rows)) or "none"))


def rel(v):
    c = v / 255.0
    return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4


def contrast(a, b):
    ra, rb = rel(a), rel(b)
    hi, lo = max(ra, rb), min(ra, rb)
    return (hi + 0.05) / (lo + 0.05)


def mean_rect(fr, w, h, x0, x1, y0, y1):
    xs = range(int(x0 * w / 100), max(int(x0 * w / 100) + 1, int(x1 * w / 100)))
    ys = range(int(y0 * h / 100), max(int(y0 * h / 100) + 1, int(y1 * h / 100)))
    v = [fr[y * w + x] for y in ys for x in xs]
    return sum(v) // len(v)


def cmd_luma(video):
    """Backdrop value journey. Sample the frame EDGES, which are backdrop in an
    isolated-subject plate. Use this to decide when a scene may use dark text
    (light backdrop) vs light text (dark backdrop), and where acts begin/end."""
    fw, fh = 64, 36
    frames = ff_gray(video, fw, fh, hipass=False)
    fps = len(frames) / duration(video)
    print("t       backdrop   bar")
    for i in range(0, len(frames), max(1, int(fps / 4))):
        fr = frames[i]
        edge = [fr[y * fw + x] for y in range(fh) for x in list(range(0, 5)) + list(range(fw - 5, fw))]
        m = sum(edge) // len(edge)
        print("%6.2f  %5d      %s" % (i / fps, m, "#" * (m // 6)))
    print("\nREAD IT LIKE THIS: luma <= 25 -> dark act, use light text, no scrim needed.")
    print("luma >= 190 -> light act, inverted text works. 60..189 -> mid, scrim REQUIRED.")


def cmd_bands(video, a, b):
    fw, fh = 200, 112
    frames = ff_gray(video, fw, fh, hipass=False)
    fps = len(frames) / duration(video)
    print("Worst-frame contrast in the top band (y0-11%) and bottom band (y89-100%)")
    print("region      luma  darkInk  whiteInk  inverted   verdict")
    for nm, y0, y1 in (("top   ", 0, 11), ("bottom", 89, 100)):
        wl = None
        for f in range(int(a * fps), int(b * fps)):
            L = mean_rect(frames[f], fw, fh, 3, 97, y0, y1)
            if wl is None or L < wl[0] or abs(L - 128) < abs(wl[0] - 128):
                wl = (L,)
        L = wl[0]
        print("%s %6d  %7.2f  %8.2f  %8.2f   %s" % (
            nm, L, contrast(17, L), contrast(244, L), contrast(abs(255 - L), L),
            "OK" if max(contrast(17, L), contrast(244, L), contrast(abs(255 - L), L)) >= 4.5 else "FAIL"))


def cmd_region(video, a, b, x0, x1, y0, y1):
    fw, fh = 200, 112
    frames = ff_gray(video, fw, fh, hipass=False)
    fps = len(frames) / duration(video)
    worst = None
    for f in range(int(a * fps), int(b * fps)):
        L = mean_rect(frames[f], fw, fh, x0, x1, y0, y1)
        c = contrast(L, abs(255 - L))
        if worst is None or c < worst[1]:
            worst = (L, c)
    L, c = worst
    print("rect x%.0f-%.0f%% y%.0f-%.0f%%  t %.2f-%.2f" % (x0, x1, y0, y1, a, b))
    print("  worst backdrop luma      : %d" % L)
    print("  inverted text luma       : %d" % abs(255 - L))
    print("  inverted contrast        : %.2f  %s" % (c, "PASS" if c >= 4.5 else "FAIL -> scrim needed here"))
    print("  dark ink #111312 contrast: %.2f" % contrast(17, L))
    print("  white ink #F4F3F0        : %.2f" % contrast(244, L))
    if c < 4.5:
        need = 205 if L < 128 else 205
        alpha = (need - L) / (237.0 - L) if L < 237 else 0
        print("  FIX: local scrim rgba(237,236,234,%.2f) with a FLAT CORE covering this rect." % min(0.94, max(0.5, alpha)))


def main():
    if len(sys.argv) < 3:
        print(__doc__); sys.exit(1)
    mode, video = sys.argv[1], sys.argv[2]
    if mode == "grid":
        g = build_grid(video); print("frames: %d  -> %s/grid.json" % (len(g), OUTDIR))
    elif mode == "map":
        g = load_grid(video); fps = fps_of(video, g)
        a, b = float(sys.argv[3]), float(sys.argv[4])
        print_map(intersect(g, fps, a, b), a, b, sys.argv[5] if len(sys.argv) > 5 else "interval")
    elif mode == "luma":
        cmd_luma(video)
    elif mode == "bands":
        cmd_bands(video, float(sys.argv[3]), float(sys.argv[4]))
    elif mode == "region":
        cmd_region(video, float(sys.argv[3]), float(sys.argv[4]),
                   *[float(x) for x in sys.argv[5:9]])
    else:
        print(__doc__)

main()
