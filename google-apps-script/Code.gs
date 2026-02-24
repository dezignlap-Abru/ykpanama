/**
 * Google Apps Script — Yeshivas Kayitz Panama 5786
 *
 * SETUP:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Paste this code into Code.gs
 * 4. Click Deploy > New deployment
 * 5. Select "Web app"
 * 6. Set "Execute as" to "Me"
 * 7. Set "Who has access" to "Anyone"
 * 8. Click Deploy and copy the Web App URL
 * 9. Paste the URL into your .env.local as NEXT_PUBLIC_GOOGLE_SCRIPT_URL
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Create headers on first row if sheet is empty
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Timestamp",
        "First Name",
        "Last Name",
        "Hebrew Name",
        "Date of Birth",
        "Participant Phone",
        "Participant Email",
        "Weight",
        "Height",
        "Horseback Experience",
        "T-Shirt Size",
        "Father's Name",
        "Father's Phone",
        "Mother's Name",
        "Mother's Phone",
        "Parents' Email",
        "Payment Contact",
        "Payment Contact (Other)",
        "Home Address",
        "Emergency Contact",
        "Medical Condition",
        "Medical Details",
        "Past Year Details",
        "How Did You Hear",
        "Further Comments",
        "Payment Method",
        "Sponsor Interest",
        "Passport Confirmed",
        "Submitted At"
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    }

    // Append the new row
    var row = [
      new Date().toLocaleString("en-US", { timeZone: "America/Panama" }),
      data.firstName || "",
      data.lastName || "",
      data.hebrewName || "",
      data.dateOfBirth || "",
      data.participantPhone || "",
      data.participantEmail || "",
      data.weight || "",
      data.height || "",
      data.horsebackExperience || "",
      data.tshirtSize || "",
      data.fatherName || "",
      data.fatherPhone || "",
      data.motherName || "",
      data.motherPhone || "",
      data.parentsEmail || "",
      data.paymentContact || "",
      data.paymentContactOther || "",
      data.homeAddress || "",
      data.emergencyContact || "",
      data.hasMedicalCondition || "",
      data.medicalConditionDetails || "",
      data.pastYearDetails || "",
      data.howDidYouHear || "",
      data.furtherComments || "",
      data.paymentMethod || "",
      data.sponsorInterest || "",
      data.passportConfirmation || "",
      data.submittedAt || ""
    ];

    sheet.appendRow(row);

    // Send notification email (optional — update the email address)
    try {
      var subject = "New YK Panama Application: " + data.firstName + " " + data.lastName;
      var body = "New application received from " + data.firstName + " " + data.lastName + "\n\n" +
        "Email: " + data.participantEmail + "\n" +
        "Phone: " + data.participantPhone + "\n" +
        "Payment Method: " + data.paymentMethod + "\n\n" +
        "Check the Google Sheet for full details.";
      MailApp.sendEmail("chabadboquete@gmail.com", subject, body);
    } catch (emailError) {
      // Email sending failed — row is still saved
      Logger.log("Email error: " + emailError.toString());
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("Error: " + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", message: "YK Panama form endpoint is active." }))
    .setMimeType(ContentService.MimeType.JSON);
}
