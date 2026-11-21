#!/usr/bin/env python3
"""Builds the static RemX Australia site.
Edit the CONFIG block below (phone, email, etc.) then run:  python3 build.py
Every page shares the same header and footer, so they only need changing here."""
from pathlib import Path

CONFIG = {
    "name": "RemX Australia",
    "legal": "RemX Australia Pty Ltd",
    "phone": "(08) 0000 0000",          # TODO: replace with real number
    "phone_link": "+61800000000",       # TODO: same number, international format
    "email": "info@example.com.au",      # TODO: replace with real email
    "suburb": "Ascot",
    "postcode": "6104",
    "street": "",                        # TODO: optional street address
    "hours": "Mon–Fri 7:00am – 5:00pm",
    "site_url": "https://www.example.com.au",  # TODO: live domain
    "form_action": "",  # optional: Formspree / form-service URL; blank = opens email client
}
C = CONFIG
OUT = Path(__file__).parent

ICON = {
 "soil": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17h18M3 21h18"/><path d="M7 13c0-3 2-5 5-8 3 3 5 5 5 8a5 5 0 0 1-10 0z"/></svg>',
 "mine": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20l6-10 4 6 3-4 7 8z"/><path d="M14 6l3-3 3 3-3 3z"/></svg>',
 "leaf": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19c0-8 6-14 15-14 0 9-6 15-14 15"/><path d="M5 19l8-8"/></svg>',
 "drum": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="7" ry="2.5"/><path d="M5 5v14c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V5"/><path d="M5 11c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5"/></svg>',
 "water": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8c2 0 2-1.5 4-1.5S8 8 10 8s2-1.5 4-1.5S16 8 18 8s2-1.5 4-1.5"/><path d="M2 13c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5"/><path d="M2 18c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5"/></svg>',
 "truck": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 6h13v10H1zM14 10h4l4 4v2h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>',
 "check": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>',
 "pin": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
 "phone": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
 "mail": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>',
 "clock": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
 "shield": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>',
}

# ---------- Shared layout ----------
AC = ' aria-current="page"'
NAV = [("index.html","Home"),("services.html","Services"),("projects.html","Projects"),("about.html","About")]

def header(active):
    links = "".join(f'<li><a href="{h}"{AC if h==active else ""}>{t}</a></li>' for h,t in NAV)
    return f'''<a class="skip" href="#main">Skip to content</a>
<div class="topbar"><div class="container"><span class="hide-sm">Environmental remediation &amp; mine closure specialists, {C["suburb"]}, Perth WA</span><span><a href="tel:{C["phone_link"]}">{C["phone"]}</a> &nbsp;·&nbsp; <a href="mailto:{C["email"]}">{C["email"]}</a></span></div></div>
<header class="site-header"><nav class="container nav" aria-label="Main">
<a class="logo" href="index.html" aria-label="{C["name"]} home"><img src="assets/favicon.svg" width="40" height="40" alt=""><span>Rem<b>X</b><small>Australia</small></span></a>
<button class="menu-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="nav-links"><span></span><span></span><span></span></button>
<ul class="nav-links" id="nav-links">{links}<li><a class="btn btn--primary" href="contact.html"{AC if active=="contact.html" else ""}>Get a quote</a></li></ul>
</nav></header>'''

def footer():
    addr = (C["street"]+", " if C["street"] else "") + f'{C["suburb"]} WA {C["postcode"]}'
    return f'''<footer class="site-footer"><div class="container">
<div class="footer-grid">
<div><a class="logo" href="index.html"><img src="assets/favicon.svg" width="40" height="40" alt=""><span>Rem<b>X</b><small style="color:#8eaa9f">Australia</small></span></a>
<p>Perth-based environmental remediation contractors returning contaminated and disturbed land to safe, stable and productive use across Western Australia.</p>
<p class="ack">We acknowledge the Whadjuk Noongar people, Traditional Custodians of the land on which we work, and pay our respects to Elders past and present.</p></div>
<div><h4>Services</h4><ul><li><a href="services.html#contaminated-land">Contaminated land</a></li><li><a href="services.html#mine-closure">Mine closure</a></li><li><a href="services.html#rehabilitation">Land rehabilitation</a></li><li><a href="services.html#hazardous-materials">Hazardous materials</a></li><li><a href="services.html#groundwater">Groundwater</a></li><li><a href="services.html#civil">Civil &amp; earthworks</a></li></ul></div>
<div><h4>Company</h4><ul><li><a href="about.html">About us</a></li><li><a href="projects.html">Projects</a></li><li><a href="contact.html">Contact</a></li><li><a href="privacy.html">Privacy policy</a></li></ul></div>
<div><h4>Get in touch</h4><ul><li><a href="tel:{C["phone_link"]}">{C["phone"]}</a></li><li><a href="mailto:{C["email"]}">{C["email"]}</a></li><li>{addr}</li><li>{C["hours"]}</li></ul></div>
</div>
<div class="footer-bottom"><span>© <span data-year>2026</span> {C["legal"]}. All rights reserved.</span><span>Ascot · Perth · Western Australia</span></div>
</div></footer>
<script src="assets/main.js" defer></script>'''

def schema():
    return f'''<script type="application/ld+json">{{"@context":"https://schema.org","@type":"LocalBusiness","name":"{C["legal"]}","description":"Environmental remediation, contaminated land, mine closure and rehabilitation contractors based in Ascot, Perth, Western Australia.","url":"{C["site_url"]}","telephone":"{C["phone_link"]}","email":"{C["email"]}","address":{{"@type":"PostalAddress","streetAddress":"{C["street"]}","addressLocality":"{C["suburb"]}","addressRegion":"WA","postalCode":"{C["postcode"]}","addressCountry":"AU"}},"areaServed":"Western Australia","openingHours":"Mo-Fr 07:00-17:00"}}</script>'''

def page(fname, title, desc, body, active=None):
    html = f'''<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="canonical" href="{C["site_url"]}/{'' if fname=='index.html' else fname}">
<meta property="og:type" content="website"><meta property="og:title" content="{title}"><meta property="og:description" content="{desc}"><meta property="og:locale" content="en_AU">
<meta name="theme-color" content="#0e3b33">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/styles.css">
{schema() if fname in ("index.html","contact.html") else ""}
</head>
<body>
{header(active or fname)}
<main id="main">
{body}
</main>
{footer()}
</body>
</html>
'''
    (OUT/fname).write_text(html, encoding="utf-8")

def cta(top=False):
    return f'''<section class="section"{"" if top else ' style="padding-top:0"'}><div class="container"><div class="cta reveal">
<div><h2>Got a site that needs attention?</h2><p>Tell us what you're dealing with. We'll come back to you within one business day with practical next steps and a no-obligation quote.</p></div>
<div class="btn-row"><a class="btn btn--dark" href="contact.html">Request a quote</a><a class="btn btn--ghost" href="tel:{C["phone_link"]}">Call {C["phone"]}</a></div>
</div></div></section>'''

SERVICES = [
 ("contaminated-land","soil","Contaminated land remediation","Excavation, treatment and validated removal of impacted soils from industrial, commercial and residential sites, from hydrocarbons and heavy metals to PFAS and legacy fill.",
   ["Soil excavation, segregation &amp; disposal","On-site treatment &amp; stockpile management","Underground storage tank (UST) removal","Validation support &amp; clearance reporting"]),
 ("mine-closure","mine","Mine closure","Practical delivery of closure plans for mine sites and exploration areas, decommissioning infrastructure and making landforms safe, stable and non-polluting.",
   ["Infrastructure decommissioning &amp; demolition","Landform reshaping &amp; batter works","Waste rock &amp; tailings capping","Abandoned mine safety works"]),
 ("rehabilitation","leaf","Land rehabilitation","Restoring disturbed ground so it can support native vegetation or its next use, with erosion control and revegetation built to last in WA conditions.",
   ["Topsoil management &amp; respreading","Ripping, contouring &amp; erosion control","Seeding, planting &amp; weed management","Track, pad &amp; drill-site rehabilitation"]),
 ("hazardous-materials","drum","Hazardous materials","Safe handling, packaging and removal of hazardous and regulated waste in line with WA environmental and work health &amp; safety requirements.",
   ["Regulated &amp; controlled waste removal","Drum, chemical &amp; legacy waste clean-ups","Licensed transport &amp; disposal coordination","Decontamination of plant &amp; structures"]),
 ("groundwater","water","Groundwater &amp; water management","Supporting works for impacted groundwater and surface water, including dewatering, collection and treatment during remediation projects.",
   ["Dewatering &amp; water treatment support","Sediment &amp; stormwater controls","Bore &amp; well decommissioning","Drainage &amp; containment works"]),
 ("civil","truck","Civil &amp; earthworks","Our own crews and plant for the bulk earthworks that remediation and closure projects depend on, in the metro area and out to regional and remote WA.",
   ["Bulk earthworks &amp; site preparation","Plant &amp; operator hire","Demolition &amp; site clearing","Remote &amp; regional mobilisation"]),
]

# ================= HOME =================
svc_cards = "".join(f'''<article class="card reveal"><div class="icon">{ICON[ic]}</div><h3>{t}</h3><p>{d}</p><a class="more" href="services.html#{sid}">Learn more →</a></article>''' for sid,ic,t,d,_ in SERVICES)
home = f'''
<section class="hero"><div class="container">
<span class="eyebrow" style="color:#f2b072">Environmental remediation · Perth, WA</span>
<h1>Restoring land to <em>safe, productive</em> use.</h1>
<p class="lead">RemX Australia is an Ascot-based remediation and contracting business. We clean up contaminated sites, carry out mine closure works and rehabilitate disturbed land for industry, government and developers across Western Australia.</p>
<div class="btn-row"><a class="btn btn--primary" href="contact.html">Request a quote</a><a class="btn btn--ghost" href="services.html">Our services</a></div>
<div class="hero-badges"><span class="badge">{ICON["check"]}Safety-first culture</span><span class="badge">{ICON["check"]}Metro, regional &amp; remote WA</span><span class="badge">{ICON["check"]}Assess → remediate → validate</span></div>
</div></section>

<section class="stats"><div class="container"><div class="stats-grid">
<div class="stat"><strong>Perth</strong><span>Headquartered in Ascot, WA</span></div>
<div class="stat"><strong>Statewide</strong><span>Metro, Wheatbelt, Goldfields &amp; Pilbara</span></div>
<div class="stat"><strong>End-to-end</strong><span>From site set-up to sign-off</span></div>
<div class="stat"><strong>Zero harm</strong><span>Safety on every job</span></div>
</div></div></section>

<section class="section"><div class="container">
<div class="section-head"><span class="eyebrow">What we do</span><h2>Remediation and closure, delivered by people who do the work.</h2><p class="lead">Consultants write the plan; we put it into practice. RemX brings the crews, plant and know-how to deliver remediation and closure projects safely, on budget and to the standard regulators expect.</p></div>
<div class="grid grid-3">{svc_cards}</div>
</div></section>

<section class="section section--sand"><div class="container split">
<div class="reveal"><span class="eyebrow">Why RemX</span><h2>A contractor that understands contamination.</h2>
<p class="lead">Contaminated sites and closure works carry risk to people, the environment and your timeline. We plan carefully, communicate clearly and leave your site ready for what comes next.</p>
<ul class="check-list">
<li><strong>Local and responsive.</strong> Based in Ascot, minutes from Perth Airport and the eastern industrial areas, with crews ready to go to regional sites.</li>
<li><strong>We work with your consultant.</strong> We follow your environmental consultant's remediation action plan and support their validation.</li>
<li><strong>Compliance is built in.</strong> Waste tracking, documentation and safety systems that hold up to client and regulator scrutiny.</li>
<li><strong>Straightforward pricing.</strong> Clear scopes, honest variations and no surprises at the end of the job.</li>
</ul>
<a class="btn btn--dark" href="about.html">About RemX</a></div>
<div class="info-panel reveal">
<div class="contact-item">{ICON["pin"]}<div><strong>Based in Ascot, Perth</strong>Close to the airport and eastern industrial areas, with crews ready for regional and remote WA.</div></div>
<div class="contact-item">{ICON["shield"]}<div><strong>Safety first</strong>Each job gets its own safety and environmental management plans and inducted crews.</div></div>
<div class="contact-item">{ICON["drum"]}<div><strong>Waste tracked</strong>Waste is classified, transported and documented on every load.</div></div>
<div class="contact-item">{ICON["truck"]}<div><strong>Our own crews &amp; plant</strong>We do the work ourselves, managed end to end.</div></div>
</div>
</div></section>

<section class="section section--dark"><div class="container">
<div class="section-head"><span class="eyebrow" style="color:#f2b072">How we work</span><h2>A clear process from first call to final sign-off.</h2></div>
<div class="steps">
<div class="step reveal"><h3>Scope</h3><p>We review your site, reports and constraints, then agree on what success looks like.</p></div>
<div class="step reveal"><h3>Plan</h3><p>Methodology, safety and environmental management plans, programme and a fixed or schedule-of-rates price.</p></div>
<div class="step reveal"><h3>Deliver</h3><p>Our crews and plant mobilise and carry out the works, reporting progress as we go.</p></div>
<div class="step reveal"><h3>Close out</h3><p>Validation support, waste documentation and handover so you can move on with confidence.</p></div>
</div></div></section>

<section class="section"><div class="container">
<div class="section-head"><span class="eyebrow">Who we work with</span><h2>Trusted across industry and government.</h2></div>
<div class="chips reveal"><span class="chip">Mining &amp; resources</span><span class="chip">Oil &amp; gas</span><span class="chip">Property developers</span><span class="chip">Local &amp; state government</span><span class="chip">Defence &amp; infrastructure</span><span class="chip">Fuel &amp; service stations</span><span class="chip">Industrial &amp; manufacturing</span><span class="chip">Environmental consultants</span><span class="chip">Builders &amp; head contractors</span></div>
</div></section>

{cta()}
'''
page("index.html","RemX Australia | Environmental Remediation & Mine Closure, Perth WA",
     "RemX Australia is an Ascot, Perth-based environmental remediation contractor. We handle contaminated land clean-ups, mine closure, land rehabilitation and hazardous materials across WA.", home)

# ================= SERVICES =================
blocks = []
for i,(sid,ic,t,d,items) in enumerate(SERVICES):
    lis = "".join(f"<li>{x}</li>" for x in items)
    rev = ""
    bg = " section--sand" if i % 2 else ""
    blocks.append(f'''<section class="section{bg}" id="{sid}"><div class="container split{rev}">
<div class="reveal"><div class="icon-lg">{ICON[ic]}</div><h2>{t}</h2><p class="lead">{d}</p><a class="btn btn--dark" href="contact.html?service={sid}">Enquire about this service</a></div>
<div class="info-panel reveal"><h3>What's included</h3><ul class="check-list check-list--light">{lis}</ul></div></div></section>''')
services = f'''
<section class="page-hero"><div class="container"><div class="crumbs"><a href="index.html">Home</a> / Services</div>
<h1>Remediation services across Western Australia</h1>
<p class="lead">From one-off contaminated soil removals to full mine closure programmes, RemX brings the crews, equipment and environmental know-how to get the job done properly.</p></div></section>
{"".join(blocks)}
<section class="section"><div class="container" style="max-width:860px">
<div class="section-head center"><span class="eyebrow">FAQ</span><h2>Common questions</h2></div>
<div class="faq">
<details><summary>Do you work with our environmental consultant?</summary><p>Yes. Most of our work follows a remediation action plan or closure plan prepared by an environmental consultant. We work closely with them on sampling, validation and reporting.</p></details>
<details><summary>Do you work outside the Perth metro area?</summary><p>Yes. We're based in Ascot and regularly plan works for regional and remote sites across WA, including mobilising plant, crews and accommodation.</p></details>
<details><summary>Can you manage the disposal of contaminated waste?</summary><p>We arrange classification, licensed transport and disposal at appropriately licensed facilities, and provide the waste tracking documentation you need for your records and for regulators.</p></details>
<details><summary>How quickly can you start?</summary><p>That depends on scope and approvals, but we aim to respond to every enquiry within one business day and can often mobilise quickly for urgent clean-ups.</p></details>
<details><summary>How do you price jobs?</summary><p>We can provide lump-sum prices for well-defined scopes, or schedule-of-rates pricing where volumes are uncertain, which is common with contaminated soils.</p></details>
</div></div></section>
{cta()}
'''
page("services.html","Services | RemX Australia — Remediation, Mine Closure & Rehabilitation",
     "Contaminated land remediation, mine closure, land rehabilitation, hazardous materials, groundwater and civil earthworks services across Western Australia from RemX Australia, Ascot.", services)

# ================= PROJECTS =================
PROJ = [
 ("Contaminated land","Former service station remediation","Removing underground fuel tanks, excavating and disposing of hydrocarbon-impacted soil, and supporting validation so the site can be redeveloped.","soil"),
 ("Mine closure","Exploration camp &amp; pad closure","Decommissioning infrastructure, removing waste, reshaping disturbed areas and preparing ground for revegetation at a remote WA site.","mine"),
 ("Rehabilitation","Drill pad &amp; track rehabilitation","Ripping, respreading topsoil and seeding cleared exploration tracks and drill pads to support native vegetation regrowth.","leaf"),
 ("Industrial","Legacy industrial site clean-up","Segregating mixed fill, managing asbestos-containing material with licensed partners, and removing legacy drums and chemical waste.","drum"),
 ("Development","Residential subdivision pre-works","Identifying and removing impacted fill before civil works start, keeping the developer's programme on track.","truck"),
 ("Water","Dewatering &amp; water treatment support","Managing impacted groundwater encountered during excavation with temporary collection, treatment and containment.","water"),
]
cards = "".join(f'''<article class="project reveal"><div class="project__body"><div class="icon">{ICON[ic]}</div><span class="project__tag">{tag}</span><h3 style="margin-top:.4em">{t}</h3><p>{d}</p></div></article>''' for tag,t,d,ic in PROJ)
projects = f'''
<section class="page-hero"><div class="container"><div class="crumbs"><a href="index.html">Home</a> / Projects</div>
<h1>The kind of work we deliver</h1>
<p class="lead">Every site is different, but the goal is the same: leave it safe, compliant and ready for its next use. Here are typical projects RemX delivers for clients across WA.</p></div></section>
<section class="section"><div class="container"><div class="grid grid-3">{cards}</div></div></section>
<section class="section section--sand"><div class="container">
<div class="reveal center" style="max-width:760px;text-align:center"><span class="eyebrow">Your project</span><h2>Got a site with a story?</h2><p class="lead center">Whether it's a single tank pull or a multi-stage closure programme, we'd like to hear about it. Send through your reports or a few photos and we'll tell you how we'd approach it.</p><a class="btn btn--primary" href="contact.html">Start a conversation</a></div></div></section>
{cta()}
'''
page("projects.html","Projects | RemX Australia — Remediation Work in Western Australia",
     "Typical remediation, mine closure and rehabilitation projects delivered by RemX Australia across Perth and regional Western Australia.", projects)

# ================= ABOUT =================
about = f'''
<section class="page-hero"><div class="container"><div class="crumbs"><a href="index.html">Home</a> / About</div>
<h1>Practical people for complex sites</h1>
<p class="lead">RemX Australia is a Western Australian environmental remediation and contracting business based in Ascot, Perth.</p></div></section>
<section class="section"><div class="container split">
<div class="reveal"><span class="eyebrow">Our story</span><h2>Built for remediation.</h2>
<p>RemX Australia was set up to fill a gap between environmental consultants and general civil contractors: a team that knows earthworks <em>and</em> understands contamination, waste regulations and closure requirements.</p>
<p>From our base in Ascot, close to Perth Airport and the city's eastern industrial areas, we support clients across the metro area and out to regional and remote Western Australia. Our crews are trained for contaminated and hazardous environments, and our project managers keep consultants, clients and regulators informed at every stage.</p>
<p>We're growing, and we're investing in people, plant and systems to take on larger and more complex projects across Australia.</p></div>
<div class="info-panel reveal"><h3>At a glance</h3>
<dl class="facts"><dt>Company</dt><dd>{C["legal"]}</dd><dt>Head office</dt><dd>{C["suburb"]}, Perth WA {C["postcode"]}</dd><dt>Service area</dt><dd>Perth metro, regional &amp; remote Western Australia</dd><dt>Specialties</dt><dd>Contaminated land, mine closure, rehabilitation, hazardous materials</dd><dt>Clients</dt><dd>Mining, government, developers, industry &amp; consultants</dd></dl></div></div></section>
<section class="section section--sand"><div class="container">
<div class="section-head"><span class="eyebrow">Our values</span><h2>What you can expect from us</h2></div>
<div class="grid grid-2">
<div class="value reveal"><h3>Safety without compromise</h3><p>Every task is planned and risk-assessed. Nobody is asked to do work that isn't safe, and every person goes home safe at the end of the day.</p></div>
<div class="value reveal"><h3>Care for Country</h3><p>We respect the land we work on and the communities around it, and we aim to leave every site better than we found it.</p></div>
<div class="value reveal"><h3>Doing what we say</h3><p>Clear scopes, honest communication and a programme we stick to. When things change, you'll hear it from us first.</p></div>
<div class="value reveal"><h3>Quality you can sign off</h3><p>Thorough records, waste tracking and close-out documentation, so your project is complete in the paperwork as well as on the ground.</p></div>
</div></div></section>
<section class="section"><div class="container split split--rev">
<div class="reveal"><span class="eyebrow">Safety &amp; compliance</span><h2>Systems that stand up to scrutiny.</h2>
<ul class="check-list">
<li>Project-specific safety, environmental and traffic management plans</li>
<li>Crews inducted and trained for contaminated and hazardous work</li>
<li>Waste classification, tracking and disposal records for every load</li>
<li>Work carried out in line with WA environmental and WHS legislation</li>
</ul><a class="btn btn--dark" href="contact.html">Talk to our team</a></div>
<div class="info-panel reveal" style="display:grid;place-items:center;min-height:280px"><div style="width:120px;color:#f2b072">{ICON["shield"]}</div></div></div></section>
<section class="section section--dark"><div class="container split">
<div><span class="eyebrow" style="color:#f2b072">Careers</span><h2>Join a growing WA team.</h2><p class="lead">We're always keen to hear from plant operators, supervisors, project managers and environmental professionals who take pride in their work.</p></div>
<div><a class="btn btn--primary" href="mailto:{C["email"]}?subject=Careers%20enquiry">Send us your CV</a></div></div></section>
{cta(top=True)}
'''
page("about.html","About | RemX Australia — Perth Remediation Contractors",
     "Learn about RemX Australia, an environmental remediation and contracting business based in Ascot, Perth, WA. Safety-first crews for contaminated land and mine closure.", about)

# ================= CONTACT =================
addr = (C["street"]+", " if C["street"] else "") + f'{C["suburb"]} WA {C["postcode"]}'
opts = "".join(f'<option value="{sid}">{t.replace("&amp;","&")}</option>' for sid,_,t,_,_ in SERVICES)
contact = f'''
<section class="page-hero"><div class="container"><div class="crumbs"><a href="index.html">Home</a> / Contact</div>
<h1>Let's talk about your site</h1>
<p class="lead">Call, email or send an enquiry below. We reply to every enquiry within one business day.</p></div></section>
<section class="section"><div class="container contact-grid">
<div>
<div class="contact-card">
<h3>RemX Australia</h3>
<div class="contact-item">{ICON["phone"]}<div><strong>Phone</strong><a href="tel:{C["phone_link"]}">{C["phone"]}</a></div></div>
<div class="contact-item">{ICON["mail"]}<div><strong>Email</strong><a href="mailto:{C["email"]}">{C["email"]}</a></div></div>
<div class="contact-item">{ICON["pin"]}<div><strong>Office</strong>{addr}<br>Perth, Western Australia</div></div>
<div class="contact-item">{ICON["clock"]}<div><strong>Hours</strong>{C["hours"]}<br>Urgent works by arrangement</div></div>
</div>
<div class="map"><iframe title="Map of Ascot, WA" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q={(addr+', Western Australia').replace(' ','%20')}&z=14&output=embed"></iframe></div>
</div>
<form class="form" id="enquiry-form" action="{C["form_action"]}" method="post" data-mailto="{C["email"]}" novalidate>
<h3>Send an enquiry</h3>
<div class="form-row">
<div class="field"><label for="name">Full name *</label><input id="name" name="name" autocomplete="name" required><div class="err">Please enter your name.</div></div>
<div class="field"><label for="company">Company</label><input id="company" name="company" autocomplete="organization"></div>
</div>
<div class="form-row">
<div class="field"><label for="email">Email *</label><input id="email" name="email" type="email" autocomplete="email" required><div class="err">Please enter a valid email.</div></div>
<div class="field"><label for="phone">Phone</label><input id="phone" name="phone" type="tel" autocomplete="tel"></div>
</div>
<div class="field"><label for="service">Service required *</label><select id="service" name="service" required><option value="">Select a service…</option>{opts}<option value="other">Something else</option></select><div class="err">Please choose a service.</div></div>
<div class="field"><label for="location">Site location</label><input id="location" name="location" placeholder="Suburb or town, WA"></div>
<div class="field"><label for="message">Tell us about the project *</label><textarea id="message" name="message" required placeholder="What's on site, rough volumes or area, timing, and any reports you already have."></textarea><div class="err">Please add a few details.</div></div>
<button class="btn btn--primary" type="submit">Send enquiry</button>
<p class="form-note">By submitting, you agree to us contacting you about your enquiry. See our <a href="privacy.html">privacy policy</a>.</p>
<div class="form-success" tabindex="-1" role="status">Thanks, your enquiry is on its way. We'll be in touch within one business day.</div>
</form>
</div></section>
<script>(function(){{var s=new URLSearchParams(location.search).get('service');if(s){{var el=document.getElementById('service');if(el.querySelector('option[value="'+s+'"]'))el.value=s;}}}})();</script>
'''
page("contact.html","Contact | RemX Australia — Ascot, Perth WA",
     "Contact RemX Australia in Ascot, Perth for environmental remediation, contaminated land, mine closure and rehabilitation quotes across Western Australia.", contact, "contact.html")

# ================= PRIVACY =================
privacy = f'''
<section class="page-hero"><div class="container"><div class="crumbs"><a href="index.html">Home</a> / Privacy</div><h1>Privacy policy</h1></div></section>
<section class="section"><div class="container" style="max-width:820px">
<p>{C["legal"]} respects your privacy. This policy explains how we handle personal information collected through this website.</p>
<h3>What we collect</h3><p>When you send an enquiry we collect the details you provide, such as your name, company, email, phone number, site location and project information.</p>
<h3>How we use it</h3><p>We use your information only to respond to your enquiry, prepare quotes and deliver our services. We do not sell or rent personal information.</p>
<h3>Storage and security</h3><p>We take reasonable steps to protect your information from misuse, loss and unauthorised access.</p>
<h3>Access and correction</h3><p>You can ask to see or correct the personal information we hold about you by emailing <a href="mailto:{C["email"]}">{C["email"]}</a>.</p>
<h3>Contact</h3><p>For privacy questions, contact us at <a href="mailto:{C["email"]}">{C["email"]}</a> or {C["phone"]}.</p>
</div></section>'''
page("privacy.html","Privacy Policy | RemX Australia","Privacy policy for RemX Australia Pty Ltd.", privacy, "privacy.html")

# ================= 404 / SEO files =================
page("404.html","Page not found | RemX Australia","Page not found.", '''<section class="page-hero" style="padding:140px 0"><div class="container"><h1>Page not found</h1><p class="lead">The page you're looking for has moved or doesn't exist.</p><a class="btn btn--primary" href="index.html">Back to home</a></div></section>''', "404.html")

pages = ["", "services.html", "projects.html", "about.html", "contact.html", "privacy.html"]
(OUT/"sitemap.xml").write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    "".join(f'  <url><loc>{C["site_url"]}/{p}</loc></url>\n' for p in pages) + "</urlset>\n")
(OUT/"robots.txt").write_text(f"User-agent: *\nAllow: /\nSitemap: {C['site_url']}/sitemap.xml\n")
print("Built", len(pages)+1, "pages")
