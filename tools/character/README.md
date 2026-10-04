# Character walk-cycle renderer

Renders `assets/character-walk.webp`: a 24-frame sprite sheet of a hooded figure
seen from behind, walking. It is a black silhouette; the page adds the rim light
and the reflection in CSS.

How it is made: the rigged human `Xbot.glb` and its `walk` clip, from the three.js
examples (`examples/models/gltf/Xbot.glb`), dressed with simple volumes that
follow the skeleton (hoodie, hood, trousers, shoes, backpack). Each frame is
rendered from a camera placed behind the figure.

To re-render (needs Node, Playwright and `npm i three@0.160.0`):

1. Put `Xbot.glb` in `models/`, next to `render.html`.
2. Run `node render-frames.js Xbot.glb out/k 24 "fov=18.5&w=640&h=1200&hx=0.9"`.
3. Crop all frames to one shared bounding box, then lay them side by side into the sheet.

Tweak the clothing in `render.html` (the `capsule(...)` / `blob(...)` calls).
