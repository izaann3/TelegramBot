// configuración
var apiToken = "Token del bot";
var appUrl   = "Url del deploy";
var apiUrl   = "https://api.telegram.org/bot"+apiToken;
var command  = {
  "/start": "¡Bienvenido! Me presento, mi nombre es Marcos y te ayudaré durante todo tu proceso. Dime, ¿Qué necesitas?:\n\n🔧 /contacto - Solicitar ayuda de un asistente\n❓ /faq - Ver preguntas frecuentes\n📤 /exit - Terminar conversación",
  "/contacto": "Un asistente de nuestro equipo se pondrá en contacto con usted lo antes posible. En breve recibirá más información.",
  "/exit": "¡Hasta otra! 😊 Tu conversación ha sido cerrada. Si necesitas más ayuda, no dudes en volver a contactarnos.",
  "/faq": "Aquí tienes algunas preguntas frecuentes:\n\n1️⃣ ¿Cómo puedo contactar con soporte?\n   - Puedes escribir /contacto y nuestro equipo te ayudará.\n\n2️⃣ ¿Cuáles son los horarios de atención?\n   - Nuestro horario de atención es de lunes a viernes, de 9:00 a 18:00.\n\n3️⃣ ¿Puedo recibir asistencia fuera del horario de atención?\n   - Sí, pero las respuestas pueden demorar más tiempo. Te responderemos lo antes posible.",
  "error": "Opción no reconocida. Por favor, selecciona una opción del menú."
}

// configurar el webhook
function setWebhook(){
  var url = apiUrl + "/setwebhook?url="+appUrl;
  var res = UrlFetchApp.fetch(url).getContentText();
  Logger.log(res);
}

function doPost(e){
  var webhookData = JSON.parse(e.postData.contents);
  var from = webhookData.message.from.id;
  var username = webhookData.message.from.first_name || "Sin nombre";
  var text = webhookData.message.text;
  var date = new Date();

  // Guardar los detalles del mensaje en Google Sheets
  var sheet = SpreadsheetApp.openById("1J99folm4vfr6hUQr4EvAFLfOjhp0jsZdyWpyw1asTfY").getActiveSheet();
  sheet.appendRow([from, username, text, date]);

  // Si el comando es /contacto, se envía un correo
  if (text === "/contacto") {
    sendEmail(); 
  }

  // Si el comando no está en el objeto 'command', se responde con un error
  var sendText;
  if (typeof command[text] == 'undefined') {
    sendText = encodeURIComponent(command["error"]); // Mensaje de error
  } else {
    sendText = encodeURIComponent(command[text]);
  }

  // Enviar respuesta al usuario de Telegram
  var url  = apiUrl+"/sendmessage?parse_mode=HTML&chat_id="+from+"&text="+sendText;
  var opts = {"muteHttpExceptions": true}
  UrlFetchApp.fetch(url, opts).getContentText();
}

// Función para enviar el correo
function sendEmail() {
  var email = "tu email";
  var subject = "Solicitud de contacto desde el bot de Telegram";
  var body = "Una persona ha solicitado ayuda a través del bot de Telegram. Por favor, contacte con el usuario lo antes posible.";
  
  // Enviar correo electrónico
  MailApp.sendEmail(email, subject, body);
}

function doGet(e){
  return ContentService.createTextOutput("Método GET no permitido");
}
