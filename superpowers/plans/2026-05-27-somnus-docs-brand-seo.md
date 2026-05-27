# Somnus Docs Brand And SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give Somnus Docs the shared Somnus `S` branding, social-sharing metadata, and crawler guidance while retaining Material's current layout, canonical links, and sitemap.

**Architecture:** Material's native `logo`, `favicon`, and `custom_dir` settings will connect static branding resources to the site. A minimal `overrides/main.html` adds only missing Open Graph and Twitter tags, while a copied `docs/robots.txt` complements MkDocs' existing generated sitemap. SVG artwork remains the editable source; committed PNG exports avoid adding an image dependency to the Python documentation build.

**Tech Stack:** Material for MkDocs 9.7.6, YAML configuration, Jinja template override, SVG/PNG static assets, built-in macOS asset rendering, MkDocs strict build verification.

---

## File Map

```text
mkdocs.yml                              Material branding and override wiring
overrides/main.html                     Open Graph and Twitter head extension
docs/robots.txt                         Root crawler directive copied by MkDocs
docs/assets/seo/docs-icon.svg           Editable compact Somnus Docs mark
docs/assets/seo/docs-og-image.svg       Editable social card artwork
docs/assets/images/logo.svg             Material navigation logo runtime asset
docs/assets/images/favicon.png          Browser favicon runtime asset
docs/assets/images/og-image.png         Sharing image runtime asset
```

### Task 1: Capture Failing Output Contracts

**Files:**

- Verify: `site/index.html`
- Verify: `site/robots.txt`
- Verify: `site/sitemap.xml`

- [ ] **Step 1: Build the existing site before changing implementation files**

Run:

```bash
CI=true .venv/bin/mkdocs build --strict
```

Expected: build succeeds and refreshes `site/` from the current Material
configuration.

- [ ] **Step 2: Verify the currently missing outputs fail**

Run:

```bash
test -f site/robots.txt
rg -n 'assets/images/docs-favicon\.png|assets/images/favicon\.png' site/index.html
rg -n 'property="og:image"|name="twitter:card"' site/index.html
rg -n 'assets/images/logo\.svg' site/index.html
```

Expected: each command fails before implementation because the current site
has no `robots.txt`, branded static assets, social metadata, or custom logo.

- [ ] **Step 3: Verify current behavior that must be retained**

Run:

```bash
rg -n 'name=description content="Somnus 的个人技术文档站"|href=https://docs\.somnus\.top/ rel=canonical' site/index.html
rg -n 'https://docs\.somnus\.top/linux/server-basics/' site/sitemap.xml
```

Expected: both commands pass, documenting the existing description,
canonical URL, and sitemap coverage.

### Task 2: Add Static Brand Artwork And Runtime Assets

**Files:**

- Create: `docs/assets/seo/docs-icon.svg`
- Create: `docs/assets/seo/docs-og-image.svg`
- Create: `docs/assets/images/logo.svg`
- Create: `docs/assets/images/favicon.png`
- Create: `docs/assets/images/og-image.png`

- [ ] **Step 1: Add the compact editable icon source**

Create `docs/assets/seo/docs-icon.svg` with the shared slate-and-cyan `S`
mark:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <title>Somnus Docs</title>
  <rect width="200" height="200" rx="44" fill="#071321" />
  <rect x="23" y="23" width="154" height="154" rx="39" fill="#0d1e2c" stroke="#22d3ee" stroke-width="6" />
  <path d="M133 64c-9-6-20-9-33-9-20 0-34 9-34 24 0 31 68 15 68 47 0 15-15 26-37 26-15 0-27-4-37-11" fill="none" stroke="#67e8f9" stroke-width="13" stroke-linecap="round" />
</svg>
```

- [ ] **Step 2: Add the editable social-card artwork**

Create `docs/assets/seo/docs-og-image.svg` as a `1200 x 630` image using the
same grid and `S` mark, with these exact visible strings:

```text
TECHNICAL REFERENCE / HANDBOOKS
Somnus Docs
可复用的技术手册、配置模板与排错记录。
DOCS.SOMNUS.TOP
```

The SVG must use the approved deep-slate background, cyan accent treatment,
and a text layout consistent with the Paper card without changing site CSS.

- [ ] **Step 3: Add the Material navigation logo**

Create `docs/assets/images/logo.svg` with the same SVG contents as
`docs/assets/seo/docs-icon.svg`. Material renders this asset inside the header
and navigation drawer.

- [ ] **Step 4: Render compatibility PNG assets without adding dependencies**

Render the SVG artwork into committed runtime files with a short temporary
macOS Swift/AppKit renderer:

```bash
swift /private/tmp/render-docs-seo-assets.swift \
  docs/assets/seo/docs-icon.svg docs/assets/images/favicon.png 200 200 \
  docs/assets/seo/docs-og-image.svg docs/assets/images/og-image.png 1200 630
```

The temporary renderer reads each SVG with `NSImage`, draws it into an
`NSBitmapImageRep` at the provided dimensions, and writes PNG data. It is not
committed and does not become part of MkDocs dependencies.

- [ ] **Step 5: Confirm raster asset dimensions**

Run:

```bash
sips -g pixelWidth -g pixelHeight docs/assets/images/favicon.png docs/assets/images/og-image.png
```

Expected: `favicon.png` is `200 x 200`; `og-image.png` is `1200 x 630`.

### Task 3: Wire Material Branding, Social Metadata, And Robots

**Files:**

- Modify: `mkdocs.yml`
- Create: `overrides/main.html`
- Create: `docs/robots.txt`

- [ ] **Step 1: Configure Material to use branded runtime assets**

Under `theme:` in `mkdocs.yml`, retain the current palette and feature list
while adding:

```yaml
  custom_dir: overrides
  logo: assets/images/logo.svg
  favicon: assets/images/favicon.png
```

- [ ] **Step 2: Add a focused social-metadata template override**

Create `overrides/main.html`:

```jinja
{% extends "base.html" %}

{% block extrahead %}
  {{ super() }}
  {% set social_title = config.site_name %}
  {% if page.meta and page.meta.title %}
    {% set social_title = page.meta.title ~ " - " ~ config.site_name %}
  {% elif page.title and not page.is_homepage %}
    {% set social_title = (page.title | striptags) ~ " - " ~ config.site_name %}
  {% endif %}
  {% set social_description = page.meta.description if page.meta and page.meta.description else config.site_description %}
  <meta property="og:site_name" content="{{ config.site_name }}">
  <meta property="og:title" content="{{ social_title }}">
  <meta property="og:description" content="{{ social_description }}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="{{ config.site_url }}assets/images/og-image.png">
  <meta property="og:image:type" content="image/png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{{ social_title }}">
  <meta name="twitter:description" content="{{ social_description }}">
  <meta name="twitter:image" content="{{ config.site_url }}assets/images/og-image.png">
{% endblock %}
```

This block adds missing social tags only; Material continues emitting the
native description, canonical, favicon, and page title.

- [ ] **Step 3: Add root crawler guidance**

Create `docs/robots.txt`:

```text
User-agent: *
Allow: /

Sitemap: https://docs.somnus.top/sitemap.xml
```

### Task 4: Validate Built Output And Visual Preview

**Files:**

- Verify: `site/index.html`
- Verify: `site/robots.txt`
- Verify: `site/sitemap.xml`
- Verify: `site/assets/images/favicon.png`
- Verify: `site/assets/images/logo.svg`
- Verify: `site/assets/images/og-image.png`

- [ ] **Step 1: Run the strict production-equivalent build**

Run:

```bash
CI=true .venv/bin/mkdocs build --strict
```

Expected: PASS with no warning about internal design or planning documents,
because they live under `superpowers/` outside the published `docs/` tree.

- [ ] **Step 2: Check HTML metadata and Material branding output**

Run:

```bash
rg -n 'name=description content="Somnus 的个人技术文档站"|href=https://docs\.somnus\.top/ rel=canonical|assets/images/favicon\.png|assets/images/logo\.svg|property="og:image"|summary_large_image|1200|630' site/index.html
```

Expected: the existing description and canonical remain; favicon, logo, Open
Graph image, Twitter card, and image dimensions are now present.

- [ ] **Step 3: Check crawler and sitemap outputs**

Run:

```bash
rg -n 'Sitemap: https://docs\.somnus\.top/sitemap\.xml' site/robots.txt
rg -n 'https://docs\.somnus\.top/linux/server-basics/' site/sitemap.xml
```

Expected: both commands pass; robots references the generated full-site
sitemap, and existing page coverage is retained.

- [ ] **Step 4: Check copied image dimensions**

Run:

```bash
sips -g pixelWidth -g pixelHeight site/assets/images/favicon.png site/assets/images/og-image.png
```

Expected: built runtime image sizes remain `200 x 200` and `1200 x 630`.

- [ ] **Step 5: Preview the homepage visually**

Run:

```bash
.venv/bin/mkdocs serve
```

Open `http://127.0.0.1:8000/` and verify that the tab favicon and Material
header/drawer logo show the cyan `S`, while the existing layout and palette
remain unchanged. Open `http://127.0.0.1:8000/assets/images/og-image.png` to
inspect the sharing image.

- [ ] **Step 6: Commit verified implementation**

Run:

```bash
git add mkdocs.yml overrides/main.html docs/robots.txt docs/assets/seo/docs-icon.svg docs/assets/seo/docs-og-image.svg docs/assets/images/logo.svg docs/assets/images/favicon.png docs/assets/images/og-image.png
git commit -m "feat: add branding and sharing assets for Somnus Docs"
```

Expected: implementation is committed on `main`, separate from design and
plan documentation commits.
