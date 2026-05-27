# Somnus Docs Brand And SEO Design

**Date:** 2026-05-27  
**Status:** Approved for implementation planning

## Goal

Extend `Somnus Docs` with the same visual identity used by the Lab and Paper
sites while preserving its existing Material for MkDocs reading experience.
The site should gain a recognizable `S` favicon and header logo, a branded
social-sharing image, and explicit crawler guidance.

## Current State

`Somnus Docs` is a Material for MkDocs site published at
`https://docs.somnus.top/`.

- `mkdocs.yml` already defines `site_description` and `site_url`.
- Material already emits page canonical links from `site_url`.
- MkDocs already generates `sitemap.xml`.
- The rendered site currently uses Material's default book logo and default
  favicon.
- No branded Open Graph image or `robots.txt` is configured.

## Scope

### Included

- Add a Docs-specific favicon in the existing Somnus visual family.
- Replace Material's default header and drawer logo with the branded `S` mark.
- Add a `1200 x 630` Open Graph sharing image for `Somnus Docs`.
- Emit Open Graph and Twitter sharing metadata through a Material template
  extension.
- Add a root `robots.txt` referencing the existing generated sitemap.
- Verify that existing description, canonical URL, and sitemap behavior remains
  intact.

### Excluded

- Changing the Material light/dark palettes or accent color.
- Redesigning page layouts, navigation, cards, typography, or article content.
- Generating per-page social images.
- Replacing MkDocs' existing canonical URL or sitemap implementation.

## Visual Direction

The new resources will use the established Somnus identity:

- Deep slate background.
- Cyan outline and pale cyan `S` monogram.
- Subtle technical grid treatment in the larger social image.
- Clear, restrained typography suited to a technical reference site.

The Open Graph image copy will be:

- Title: `Somnus Docs`
- Description: `可复用的技术手册、配置模板与排错记录。`
- Domain label: `DOCS.SOMNUS.TOP`

The favicon and navigation logo will use the compact `S` mark without text so
they remain legible at small sizes.

## Architecture

### Static Assets

Maintain editable SVG source artwork under `docs/assets/seo/`, then provide the
runtime assets Material references under `docs/assets/images/`:

```text
docs/assets/seo/docs-icon.svg
docs/assets/seo/docs-og-image.svg
docs/assets/images/favicon.png
docs/assets/images/logo.svg
docs/assets/images/og-image.png
```

The SVG logo may be used directly in the header, while raster PNG output will
be committed for browser favicon and Open Graph compatibility. Because this
repository does not currently carry an image-generation dependency, this
change will not introduce a new production or build dependency solely to
regenerate two static brand images. The SVG source artwork remains the editable
source of truth, and MkDocs copies the committed runtime assets unchanged.

### MkDocs Configuration

Update `mkdocs.yml` to configure Material's supported branding hooks:

- `theme.logo` points to the new `S` logo.
- `theme.favicon` points to the generated favicon.
- `theme.custom_dir` enables a minimal override template directory.

Existing palette, features, description, URL, and navigation settings remain
unchanged.

### Head Metadata

Add a minimal `overrides/main.html` extending Material's base template and its
`extrahead` block. It will emit:

- `og:site_name` as `Somnus Docs`.
- `og:title` and Twitter title based on page/site title available to Material.
- `og:description` and Twitter description using configured page or site
  description.
- `og:type` as `website`.
- `og:image`, `twitter:image`, and `og:image:type` pointing to the absolute
  Docs sharing-image URL.
- Image dimensions `1200` by `630`.
- `twitter:card` as `summary_large_image`.

Material continues to own the existing document title, description tag,
favicon insertion, and canonical links; the override adds only missing social
metadata.

### Crawl Guidance

Add `docs/robots.txt` so MkDocs copies it to the published root:

```text
User-agent: *
Allow: /

Sitemap: https://docs.somnus.top/sitemap.xml
```

This supplements, rather than replaces, MkDocs' generated full-site sitemap.

## Validation

Build the site with its existing strict workflow and inspect the generated
output:

- `mkdocs build --strict` succeeds.
- `site/index.html` retains its description and canonical URL.
- `site/index.html` references the branded favicon, branded header logo, and
  absolute Open Graph image.
- `site/index.html` includes Open Graph and Twitter metadata with the expected
  description and `1200 x 630` dimensions.
- `site/robots.txt` points to `https://docs.somnus.top/sitemap.xml`.
- `site/sitemap.xml` continues to contain the existing documentation pages.
- The rendered homepage is visually inspected in local preview for favicon,
  navigation logo, and unchanged content layout.

## Implementation Boundary

Keep the change focused on branding assets, MkDocs configuration, one template
extension, crawler output, and verification. No general theme restyling or
content edits should be included in this work, and no image-generation
dependency should be added to the documentation build.
