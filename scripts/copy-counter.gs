/**
 * Copy counter for the prompt library — the backend for `lib/copy-counter.ts`.
 *
 * It is a Google Apps Script web app bound to a spreadsheet: `doGet` returns
 * every count in one payload, `doPost` bumps one slug. The sheet is both the
 * store and the dashboard, so the numbers are readable without any extra tool.
 *
 * ── Setup ────────────────────────────────────────────────────────────────────
 *  1. Create a spreadsheet at https://sheets.new and name it something like
 *     "fuadev — prompt copies".
 *  2. Extensions → Apps Script. Delete the sample `myFunction` and paste this
 *     whole file in.
 *  3. Save, then Deploy → New deployment → gear icon → Web app.
 *       Execute as:      Me
 *       Who has access:  Anyone            ← must be "Anyone", not "Anyone with
 *                                            a Google account", or the browser
 *                                            gets a login page instead of JSON.
 *  4. Authorize when Google asks. The "unverified app" screen is expected for
 *     your own script: Advanced → Go to <project name> (unsafe).
 *  5. Copy the web app URL (it ends in `/exec`) into `.env.local` as
 *     NEXT_PUBLIC_COPY_COUNTER_URL, and add the same variable in Vercel.
 *
 * Re-deploying after an edit: Deploy → Manage deployments → pencil → Version:
 * New version. Editing the code alone does not change what the URL serves.
 *
 * ── What this is not ─────────────────────────────────────────────────────────
 * The URL is public and unauthenticated, which is what lets the browser call it
 * without a secret. Anyone who finds it can inflate a count. That is acceptable
 * for a vanity metric and is not safe for anything you would make a decision on.
 */

/** Tab that holds the counts; created on first write if it is missing. */
var SHEET_NAME = 'copies';

/** Mirrors the slug rule in `lib/prompts.ts` so junk never reaches the sheet. */
var SLUG_PATTERN = /^[a-z0-9-]{1,64}$/;

/** A flood of unknown slugs stops creating rows once the sheet holds this many. */
var MAX_TRACKED_SLUGS = 200;

var LOCK_TIMEOUT_MS = 10000;

/** Read path: every count in one request, so a page fetches this once. */
function doGet() {
  return jsonResponse({ ok: true, counts: readCounts() });
}

/**
 * Write path. The lock matters: read-modify-write on a sheet is not atomic, and
 * two visitors copying at the same second would otherwise lose one increment.
 */
function doPost(e) {
  var slug = readSlug(e);
  if (!slug) {
    return jsonResponse({ ok: false, error: 'invalid slug' });
  }

  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(LOCK_TIMEOUT_MS);
  } catch (err) {
    return jsonResponse({ ok: false, error: 'busy' });
  }

  try {
    var count = incrementSlug(slug);
    if (count === null) {
      return jsonResponse({ ok: false, error: 'slug limit reached' });
    }
    return jsonResponse({ ok: true, slug: slug, count: count });
  } finally {
    lock.releaseLock();
  }
}

/** Accepts the slug from a JSON body or from the query string. */
function readSlug(e) {
  var raw = '';

  if (e && e.postData && e.postData.contents) {
    try {
      var body = JSON.parse(e.postData.contents);
      raw = body && body.slug ? String(body.slug) : '';
    } catch (err) {
      raw = '';
    }
  }

  if (!raw && e && e.parameter && e.parameter.slug) {
    raw = String(e.parameter.slug);
  }

  raw = raw.trim();
  return SLUG_PATTERN.test(raw) ? raw : '';
}

function getSheet() {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  var existing = doc.getSheetByName(SHEET_NAME);
  if (existing) {
    return existing;
  }

  var created = doc.insertSheet(SHEET_NAME);
  created.appendRow(['slug', 'count', 'last_copied_at']);
  created.setFrozenRows(1);
  return created;
}

/** Data rows only — an empty sheet (header alone) reads as no rows. */
function readRows(sheet) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return [];
  }
  return sheet.getRange(2, 1, lastRow - 1, 3).getValues();
}

function readCounts() {
  var rows = readRows(getSheet());
  var counts = {};

  for (var i = 0; i < rows.length; i++) {
    var slug = String(rows[i][0]).trim();
    if (!SLUG_PATTERN.test(slug)) {
      continue;
    }
    var value = Number(rows[i][1]);
    counts[slug] = isNaN(value) || value < 0 ? 0 : Math.floor(value);
  }

  return counts;
}

/** Returns the new count, or null when the sheet has hit MAX_TRACKED_SLUGS. */
function incrementSlug(slug) {
  var sheet = getSheet();
  var rows = readRows(sheet);

  for (var i = 0; i < rows.length; i++) {
    if (String(rows[i][0]).trim() !== slug) {
      continue;
    }
    var current = Number(rows[i][1]);
    var next = (isNaN(current) || current < 0 ? 0 : Math.floor(current)) + 1;
    sheet.getRange(i + 2, 2, 1, 2).setValues([[next, new Date()]]);
    return next;
  }

  if (rows.length >= MAX_TRACKED_SLUGS) {
    return null;
  }

  sheet.appendRow([slug, 1, new Date()]);
  return 1;
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}
