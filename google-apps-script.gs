// Google Apps Script for handling form submissions to Google Sheets
// Deploy this as a web app (new deployment, type: web app, execute as: me, access: anyone)

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || '{}');
    const name = data.name || '';
    const phone = String(data.phone || '').trim();
    const email = data.email || '';
    const region = data.region || '';
    const now = new Date();

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName('Sheet1') || spreadsheet.getSheets()[0];

    const headers = sheet.getRange(1, 1, 1, 5).getValues()[0];
    const expectedHeaders = ['Ism-familiya', 'Telefon raqami', 'Email manzili', 'Viloyat', 'Sana'];
    if (headers.join('|') !== expectedHeaders.join('|')) {
      sheet.clear();
      sheet.appendRow(expectedHeaders);
    }

    const nextRow = sheet.getLastRow() + 1;
    const phoneValue = phone.toString().startsWith('+') ? "'" + phone : phone;

    sheet.getRange(nextRow, 1, 1, 5).setValues([[name, phoneValue, email, region, now]]);
    sheet.getRange(nextRow, 2).setNumberFormat('@');
    sheet.getRange(nextRow, 5).setNumberFormat('dd/MM/yyyy HH:mm:ss');

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Data successfully added to Google Sheet'
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
