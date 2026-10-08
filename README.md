# OBS Overlay System (1920x1080, Ubuntu)
Folder: `~/obs-overlay`. Optional: `sudo apt install fonts-inter` (falls back to DM Sans/system sans). Optional `assets/logo.png` (shown on scene.html).
Edit `config.js` once; every source reads it. Any key can be overridden per source in the URL.

## Sources (add each as Browser Source, tick "Local file", disable "Shutdown when not visible" for chat/alerts)
| Source | File + params | Purpose |
|---|---|---|
| scene.html | `?type=starting&min=10` / `brb&min=5` / `outro` / `intermission&t=Q%26A&s=Ask%20away` / `face` / `study` / `bg` | full 1920x1080 background screens |
| cam.html | `?shape=sq|circle|rect` | accent ring only (transparent centre) |
| chat.html | `?bg=1&ttl=90` | live chat |
| alerts.html | `?ms=5000` | alert card |
| timer.html | `?mode=down&min=25`, `mode=up`, `mode=pomo&work=25&brk=5`, `at=2026-10-10T18:00`, `style=pill|panel` | timer |
| info.html | `?style=bar` or `style=card&p=80` | title/activity, or session progress |

Colours: `theme=slate|sage|amber` (slate recommended) or `accent=#hex`. Fonts: Inter 700 titles, 500 body, uppercase labels 600 with .14em spacing.

## Layouts (canvas 1920x1080, 32px safe margin). Browser source size = box size, position = X,Y.
- **02 Main** (content full-bleed): info 700x64 @32,32 · alerts 520x96 @700,32 · cam 320x320 @32,728 · chat 440x520 @1448,520
- **03 Face cam**: scene.html?type=face · cam 1200x675 @48,190 · chat 600x690 @1272,190 · timer pill 260x64 @1612,40 · alerts 520x96 @700,32
- **04 Study**: scene.html?type=study · screen capture 1280x720 @32,32 · cam 280x280 @32,768 · timer panel (`style=panel&mode=pomo`) 480x280 @336,768 · info card (`style=card&p=80`) 472x280 @840,768 · chat 544x1016 @1344,32
- **01 Starting / 05 BRB / 07 Outro / 06 Intermission**: scene.html full canvas; optional cam circle 420x420 @1280,330 above it; optional chat 480x600 @1400,300.

## OBS scene/group hierarchy
Scenes: 01 Starting Soon, 02 Main Content, 03 Face Cam, 04 Study, 05 BRB, 06 Intermission, 07 Outro. Top to bottom in each scene: `GRP Alerts`, `GRP Chat`, `GRP Info` (info, timer), `GRP Face Cam` (cam ring above webcam), `GRP Decoration` (scene.html), `GRP Main Content` (Screen Capture / Game Capture / Window Capture).
To reuse across scenes: build them once, then Add Source > pick existing (not "Create new"), and set per-scene positions. Share one camera and one chat instance (Add Existing) so edits propagate. Toggle with the eye icon per group (or hotkeys in Settings > Hotkeys). Hiding groups does not change anything else because gameplay is full-bleed; the Study/Face layouts have their own balanced backdrop.

## Camera (OBS Video Capture Device, Linux V4L2)
1. Add Video Capture Device (v4l2), resolution 1280x720.
2. Filters on the webcam: (a) **Crop/Pad**: crop to your box aspect (square for circle/rounded-square; none for 16:9). (b) **Image Mask/Blend**: path `assets/masks/circle-800.png` (or `rounded-square-800.png`, `rounded-16x9-1600.png`), Type *Alpha Mask (Alpha Channel)*. Order matters: crop first, mask second.
3. Scale (Ctrl+S / Edit Transform) to the box in the layout table, then put the `cam.html` ring source above it with identical position/size. Keep aspect ratio equal to the mask or corners distort.
4. Group them as `GRP Face Cam`; the eye icon hides both. No placeholder is drawn, so nothing covers the camera.

## Chat
- **Twitch**: works as is; set `twitchChannel`. Read-only anonymous IRC WebSocket: no API key, no login, no extra service.
- **YouTube**: needs a YouTube Data API v3 key (Google Cloud console, free quota) and the live video ID in `ytApiKey`/`ytVideoId`. Polls roughly every 6s, quota-limited. For long streams consider reducing polling or using StreamElements/Restream chat as a fallback browser source.
- Test without a stream: `chat.html?test=1`.

## Alerts: what's local vs. needs a platform
- **Local, no service**: look, animation, queue, test mode (`alerts.html?test=1`; in OBS right-click > Interact, press 1-5), the `pushAlert('sub','Name','detail')` function, timers, scenes, mock chat.
- **Twitch real events**: needs a user access token (scopes `moderator:read:followers channel:read:subscriptions bits:read`) and your app Client ID in config.js (`twitchToken`, `twitchClientId`). Uses EventSub over WebSocket, no server of your own. Tokens expire (~4h for implicit tokens), so regenerate before streaming. Follow, sub, gift, cheer, raid are wired.
- **YouTube / donations / memberships**: YouTube has no push API for these. Use `alerts.html?ws=ws://localhost:PORT` with any small bridge that sends `{"type":"member","name":"X","detail":"..."}` (e.g. a script polling the YouTube API, or StreamElements/Streamlabs webhooks). Those bridges are not included.
- Not included: automatic "latest subscriber" lookup (set `lastSub` manually), sound, hosts (deprecated on Twitch).

## Customising
Title/handles/next stream/theme: `config.js`. One-off changes: URL params. Colours/radius/fonts: `shared/theme.css` (`--r`, `--panel`). Logo: `assets/logo.png`. Background image: add `background:url(...)` on `body` in `scene.html`. After editing, right-click source > Refresh (or "Refresh cache of current page").
Troubleshooting: blank source means the local file path is wrong; chat blank means check channel spelling; set the source size to the box size.
# OBS_overlay
