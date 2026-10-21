# Academic Excellence Tutors

The official Academic Excellence Tutors (AET) frontend: a welcoming, responsive website for online tutoring in Grades 8–12 under CAPS and IEB. Content follows the client’s July 2026 development brief.

The legacy website is replaced in this checkout. Its original implementation and assets remain available in Git history, including commit `37803db`.

## Stack and prerequisites

- Node.js 24 LTS (`.nvmrc`) and npm 11 or newer
- Next.js 16 App Router, React 19, TypeScript and Tailwind CSS 4
- Lucide React icons and ESLint with Next.js accessibility and TypeScript rules
- Playwright and axe-core for development-time browser and accessibility checks

Dependency versions are locked in `package-lock.json`. ESLint 9 and TypeScript 6.0 are used for compatibility with the current Next.js ESLint plugins; later major releases do not yet satisfy all plugin peer ranges. Rubik is self-hosted; its SIL Open Font License is included beside the font.

## Get started

```bash
git clone https://github.com/CourtneyFradreck/academic-excellence-tutors.git
cd academic-excellence-tutors
git switch feat/nextjs-redesign
nvm use
npm ci
npm run dev
```

Open `http://localhost:3000`. No account, service credentials, database or Firebase project is required. There is no custom backend.

## Commands

| Command             | Purpose                                                                  |
| ------------------- | ------------------------------------------------------------------------ |
| `npm run dev`       | Start the local development server                                       |
| `npm run lint`      | Run ESLint; warnings fail the check                                      |
| `npm run typecheck` | Generate Next.js route types and run TypeScript without emitting files   |
| `npm run build`     | Create an optimised production build                                     |
| `npm start`         | Serve an existing production build locally                               |
| `npm test`          | Run browser, accessibility and metadata tests against a production build |

For production verification:

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

These commands build and serve the project; they do not deploy it. The six content routes are statically prerendered. The standard Next.js runtime supplies page serving and image optimisation, with no custom submission server or API routes.

## Public URL and SEO

Copy `.env.example` to `.env.local` if you need to configure the public URL. Set `NEXT_PUBLIC_SITE_URL` to the actual public HTTP(S) origin before building for publication. Never use a guessed production domain.

The URL is optional for development. When unset or invalid, absolute canonical and Open Graph URLs are omitted, the sitemap contains no entries, and robots.txt has no sitemap reference. When configured, the sitemap includes all six routes. Because this setting is used during prerendering, rebuild after changing it. Each page has its own title, description and Open Graph text metadata.

## Routes

| Route       | Content                                                                                  |
| ----------- | ---------------------------------------------------------------------------------------- |
| `/`         | Welcome statement, tutoring introduction, subjects, service overview and learner journey |
| `/about`    | AET’s purpose, learning model and parent involvement                                     |
| `/subjects` | All ten subjects under CAPS and IEB                                                      |
| `/services` | All tutoring inclusions and enrolment arrangements                                       |
| `/enrol`    | Learner and guardian enquiry form with subject selection                                 |
| `/contact`  | Email and phone links, and an enquiry form                                               |

Legacy homepage, About, Academy, Contact and registration URLs redirect to the relevant new pages. The unsupported old pricing and terms pages return the new 404 page. No unapproved legal text is presented for acceptance.

## Folder structure

```text
public/brand/           Official artwork extracted from the newer client brief
src/app/               Six routes, shared layout, theme, metadata routes and local font
src/components/layout/ Navigation, brand and footer
src/components/ui/     Shared buttons, headings, icons and subject cards
src/components/sections/ Page heroes, learner journey and enrolment invitation
src/components/forms/  Validated forms and email-draft review interface
src/data/              Approved subjects, services and organisation details
src/lib/               Validation, draft construction and metadata helpers
src/types/             Form and email-draft types
tests/                 Playwright browser, accessibility and metadata checks
```

## How the forms work

1. A parent or guardian enters learner details, curriculum, grade and subjects on `/enrol`. The form also requires contact details and a permission/email acknowledgement. `/contact` requires a name, email address and message.
2. Client-side validation identifies missing or invalid information, shows accessible errors and focuses the first invalid field.
3. **Prepare email draft** creates an in-memory, reviewable message addressed to `academicexcellencetuts@gmail.com`. No enquiry is sent at this point.
4. **Open email app** uses a pre-addressed `mailto:` link. The visitor must review and send the message in their own email application.
5. **Copy email text** provides a fallback if no email app is configured or the app truncates a long mailto message. The complete text remains selectable when clipboard access is unavailable.

Draft preparation does not make a submission request. Form values are not saved in cookies, browser storage, a database, analytics, logs or website query strings. Opening the email app or copying text shares that text only at the visitor’s explicit request. Editing a form field removes the previous draft so an outdated message is not offered.

Forms are disabled until JavaScript has loaded, preventing native GET submissions from exposing personal information in the page URL. Direct email and phone links remain available without JavaScript.

The website cannot detect whether an email app opened, whether the visitor sent the message, or whether AET received it. It deliberately makes no delivery or completed-enrolment claim.

## Design and migration decisions

- The newer brief’s science-and-mathematics logo is used as supplied. The header displays its emblem through CSS clipping of the original file, without redrawing the artwork.
- Brand tokens are centralised in `src/app/globals.css`: light blue `#5DADE2`, yellow `#F4C430`, light green `#8FD9A8` and white. The approved navy `#1B3A6B` supplies accessible text, icons, control outlines and focus indicators.
- White backgrounds, a learning-notebook hero, restrained motion and generous spacing keep the site warm and readable. Reduced-motion and forced-colour preferences are respected.
- Existing laptop-logo variants and favicon were superseded by the newer brief’s identity. Staff portraits were not republished because the brief does not establish public staff profiles. The animated learner graphic and stock icons were replaced by lightweight, consistent iconography. All original files remain in Git history.
- Old prices, unsupported biographies and claims, stock legal terms, Firebase analytics and Firestore enrolment writes were removed. The confidential source brief is not included in the repository.

## Browser and accessibility verification

Build before running the test suite. Playwright starts a local production server when one is not already running:

```bash
npx playwright install chromium
npm run build
npm test
```

On Linux, Playwright may also require its documented browser system dependencies. To use an existing Chromium installation instead of downloading a browser:

```bash
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test
```

Tests cover all six routes at 320, 375, 768 and 1440 pixels, broken images and browser errors, navigation, keyboard interactions, form validation, permission acknowledgement, email encoding, copy success/failure, long messages, no-JavaScript behaviour, metadata and legacy URLs. Automated axe checks cover WCAG A/AA rules, including colour contrast. Screenshots and failure traces are written to ignored test output directories; run `npx playwright show-report` to inspect the HTML report.

Automated checks complement manual visual and keyboard review; they do not certify complete accessibility or verify email delivery.

## Current limitations and future integrations

- No database, custom backend, authentication, payments, administration dashboard or persistent enrolment records.
- Email drafts require the visitor to send the email. Mailto support and message-length limits vary by device and email client; copying the full message is the fallback.
- Fees are discussed directly with AET. Quotations/invoices are issued upon enrolment by AET; this website does not calculate fees, generate invoices or send billing documents.
- No lesson scheduling, lesson delivery or progress dashboard is implemented on the website. Lessons use Teams or Google Meet; learner-parent-tutor communication happens in the dedicated group chat described in the brief.
- Any future submission endpoint needs separate approval, server-side validation, appropriate personal-information handling, failure handling and a genuine receipt before a submitted confirmation can be shown. Draft construction and validation are separated from the UI so an approved submission adapter can be added later.
- Billing automation requires an approved fee structure and billing workflow. No hosting, deployment or live-service configuration was changed by this migration.
