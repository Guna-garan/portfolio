const SPREADSHEET_ID_PROPERTY = "SPREADSHEET_ID";
const CONTACT_API_TOKEN_PROPERTY = "CONTACT_API_TOKEN";
const HEADERS = ["Name", "Email", "Message"];
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

function doPost(event) {
  let payload;
  try {
    payload = JSON.parse(event.postData.contents);
  } catch (error) {
    return jsonResponse({ ok: false, error: "invalid_json" });
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return jsonResponse({ ok: false, error: "invalid_payload" });
  }

  const expectedToken = PropertiesService.getScriptProperties().getProperty(
    CONTACT_API_TOKEN_PROPERTY
  );
  if (
    !expectedToken ||
    expectedToken.length < 32 ||
    typeof payload.token !== "string" ||
    payload.token !== expectedToken
  ) {
    return jsonResponse({ ok: false, error: "unauthorized" });
  }

  if (
    typeof payload.Name !== "string" ||
    typeof payload.Email !== "string" ||
    typeof payload.Message !== "string"
  ) {
    return jsonResponse({ ok: false, error: "invalid_fields" });
  }

  const name = cleanText(payload.Name);
  const email = payload.Email.trim();
  const message = cleanText(payload.Message);
  if (
    !name ||
    name.length > MAX_NAME_LENGTH ||
    !email ||
    email.length > MAX_EMAIL_LENGTH ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !message ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return jsonResponse({ ok: false, error: "invalid_fields" });
  }

  const spreadsheetId = PropertiesService.getScriptProperties().getProperty(
    SPREADSHEET_ID_PROPERTY
  );
  if (!spreadsheetId) {
    return jsonResponse({ ok: false, error: "not_configured" });
  }

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) {
    return jsonResponse({ ok: false, error: "temporarily_unavailable" });
  }

  try {
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheets()[0];
    if (!sheet) {
      return jsonResponse({ ok: false, error: "sheet_unavailable" });
    }

    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    } else {
      const existingHeaders = sheet
        .getRange(1, 1, 1, HEADERS.length)
        .getDisplayValues()[0];
      if (HEADERS.some((header, index) => existingHeaders[index] !== header)) {
        return jsonResponse({ ok: false, error: "invalid_sheet_headers" });
      }
    }

    const row = [name, email, message].map(escapeFormula);
    const nextRow = sheet.getLastRow() + 1;
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
    return jsonResponse({ ok: true });
  } catch (error) {
    console.error("Unable to save a contact submission.");
    return jsonResponse({ ok: false, error: "storage_error" });
  } finally {
    lock.releaseLock();
  }
}

function cleanText(value) {
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
}

function escapeFormula(value) {
  return /^[\t\r ]*[=+\-@]/.test(value) ? "'" + value : value;
}

function jsonResponse(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(
    ContentService.MimeType.JSON
  );
}
