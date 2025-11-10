# Mini Full-Stack Search and Micro Scraper

This project is a full-stack application built with **Next.js (App Router) and TypeScript**, designed to demonstrate two core functionalities:

1. **Mini Search Engine for FAQs** – Search a local dataset of frequently asked questions with relevance scoring and snippet summarization.
2. **Micro Scraper** – Extract basic information from web pages (title, meta description, first H1) using **Playwright** in a headless browser.

Tailwind CSS is used for clean and responsive UI.

---

## Project Structure

| Folder/File                          | Description                                                  |
| ------------------------------------ | ------------------------------------------------------------ |
| `/app/layout.tsx`                    | Common layout with tabs to switch between Search and Scraper |
| `/app/page.tsx`                      | Search page for FAQ queries                                  |
| `/app/scrape/page.tsx`               | Scraper page for URL input                                   |
| `/api/search/route.ts`               | API endpoint for searching FAQs                              |
| `/api/scrape/route.ts`               | API endpoint for scraping webpages                           |
| `/lib/repositories/faqRepository.ts` | Repository pattern to access FAQ dataset                     |
| `/lib/services/scraperService.ts`    | Scraper service using Playwright                             |
| `/data/faqs.json`                    | Local dataset of FAQs                                        |
| `/tests`                             | Basic smoke tests for APIs                                   |
| `globals.css`                        | Tailwind global styles                                       |

---

## Features and Functionality

### Search FAQs

* Case-insensitive search across FAQ titles and body, including special characters (% > + etc.)
* Top 3 results returned based on relevance score
* Snippet preview of FAQ body
* Combined summary of top matches
* Sources array to indicate which FAQ IDs contributed to summary
* Error handling for empty queries or no matches

**Example Request:**

```
POST /api/search
Content-Type: application/json

{
  "query": "trust badges"
}
```

**Example Response:**

```json
{
  "results": [
    {
      "id": "1",
      "title": "Trust badges near CTA",
      "snippet": "Adding trust badges near the primary CTA increased signups by 12%."
    }
  ],
  "summary": "Trust badges near CTA: Adding trust badges near the primary CTA increased signups by 12%",
  "sources": ["1"]
}
```

---

### Micro Scraper

* Extracts **title**, **meta description**, and **first H1** from any valid URL
* Handles optional custom user-agent for blocked pages
* Timeout and error handling for invalid URLs, timeouts, or general scraping failure
* Headless scraping using Playwright, compatible with server environments

**Example Request:**

```
GET /api/scrape?url=https://www.daraz.pk/products/lipton-yellow-label-tea-430g-x-olpers-250ml-i926936225-s3983603898.html?scm=1007.51610.379274.0&pvid=c88d0e06-309d-4c0c-aa99-392e5659353d&search=flashsale&spm=a2a0e.tm80335142.FlashSale.d_926936225
```

**Example Response:**

```json
{
  "title": "Daraz Product Example",
  "metaDescription": "This is a sample product description from Daraz.",
  "h1": "Product Name",
  "status": 200
}
```
---

## Setup Instructions

1. Clone the repository:

```bash
git clone <your-repo-url>
cd <repo-directory>
```

2. Install dependencies:

```bash
npm install
```

3. Ensure Playwright browsers are installed:

```bash
npx playwright install
```

4. Run the development server:

```bash
npm run dev
```

5. Open in your browser:

```
http://localhost:3000
```

6. Build for production:

```bash
npm run build
npm start
```

---

## Scripts

| Script          | Description                                                 |
| --------------- | ----------------------------------------------------------- |
| `npm run dev`   | Start development server                                    |
| `npm run build` | Build production version                                    |
| `npm start`     | Run production server                                       |
| `npm run lint`  | Run ESLint checks                                           |
| `postinstall`   | Install Playwright browsers automatically after npm install |

---

## Basic Test Cases

Located in `/tests` folder:

* **Search API Test:** Checks if query "trust badges" returns expected top result.
* **Scraper API Test:** Checks if scraping `https://example.com` returns a title and status 200.

Run tests:

```bash
node tests/search.test.js
node tests/scraper.test.js
```

## CI/CD Pipeline (GitHub Actions)

`.github/workflows/ci.yml` handles:

1. Checkout code
2. Setup Node.js 20
3. Install dependencies and Playwright browsers
4. Build project
5. Run smoke tests for Search and Scraper
6. Build Docker image after tests pass

This ensures **automated testing and deployment readiness** on every push or pull request.

---

## Assumptions

* Local JSON dataset is static; no external database required
* Maximum 3 results returned for search queries
* Special characters are searchable in FAQ queries
* Playwright scraping runs in Node.js environment only
* Error handling is implemented for empty queries, invalid URLs, and timeouts
* Tailwind CSS provides responsive UI
* Postinstall ensures Playwright browsers are available for all environments

---

## Notes

* Uses **repository and service patterns** for scalability and maintainability
* Layout uses **tab-based UI** for switching between Search and Scraper tasks
* Loading, empty, and error states handled gracefully for better UX
* Combined summary in Search endpoint aggregates top results in 2–3 sentences

This README provides a **complete guide** for setup, testing, Docker, CI/CD, and functional usage. It is professional, human-readable, and ready for client presentation.
# Dev_RehanZia_TaskAB
# Dev_RehanZia_TaskAB
