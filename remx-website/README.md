# RemX Australia website

A static website for RemX Australia Pty Ltd, an environmental remediation and mine closure contractor in Ascot, Perth WA. It needs no database or CMS and can be hosted anywhere: Netlify, Vercel, GitHub Pages, cPanel, VentraIP and so on.

## Pages
- `index.html`: home page with hero, services overview, why RemX, process, industries and a call to action
- `services.html`: six services, each with its own section and anchor link, plus an FAQ
- `projects.html`: typical project types
- `about.html`: story, values, safety and compliance, careers
- `contact.html`: enquiry form with validation, contact details and map
- `privacy.html`, `404.html`, `sitemap.xml`, `robots.txt`

## Before going live (fill these in)
Open `build.py`, update the `CONFIG` block, then run `python3 build.py` to rebuild every page:

| Setting | What to put |
|---|---|
| `phone` / `phone_link` | Real office number |
| `email` | Real enquiries email |
| `street` | Street address (optional; currently shows "Ascot WA 6104") |
| `site_url` | Live domain, used for SEO tags and the sitemap |
| `form_action` | Optional form-service URL, e.g. a free Formspree endpoint, so enquiries arrive by email without opening the visitor's mail app |

Also check the copy on the Services, Projects and About pages against what RemX actually does. The project cards describe **typical** work, not named case studies, so swap in real projects and photos when they're available.

## Included
- Fully responsive, from phones up to wide desktop
- On-page SEO: titles, meta descriptions, canonical URLs, Open Graph tags, LocalBusiness structured data, sitemap
- Accessibility: skip link, semantic landmarks, labelled form fields, keyboard-friendly menu, reduced-motion support
- Original SVG illustrations, so there are no stock-photo licensing issues
- Acknowledgement of Country in the footer
