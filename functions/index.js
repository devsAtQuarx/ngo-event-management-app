const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

exports.sendNotification = functions.database.ref('nots/') //tokens
  .onWrite(event=>{

    var request = event.data.val()
    console.log(request)

    var payload = {
      data : {
        title : request.tokDet.title,
        content : request.tokDet.content,
        link : request.tokDet.link,
        //image : request.tokDet.imgUrl
      }
    }

    for(let token in request) {
      if(token != 'tokDet') {
        console.log(token)
        admin.messaging().sendToDevice(token, payload)
          .then(function (response) {
            console.log('sent: ', response)
          })
          .catch(function (error) {
            console.log('err: ', error)
          })
      }
    }

  })

const nodemailer = require('nodemailer');
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

exports.sendContactMessage = functions.database.ref('contactUsMail/').onWrite(event => {
  var mail = event.data.val()

  var uid = Object.keys(mail)
  uid = uid[0]

  const mailOptions = {
    to: 'umangfoundadm@gmail.com',
    subject:  mail[uid].sub,
    html :
          "<p>" + "Name : " + mail[uid].name + "</p>"+
          "<p>"+ "Email: " + mail[uid].email +"</p>" +
          "<p>"+ "Phone No: " + mail[uid].ph +"</p>" +
          "<p>" + "Description(Query): " + mail[uid].desc + "</p>"+
          "<p> --- Login Details --- </p>" +
          "<p>"+ "Logged By Name: " + mail[uid].loginName +"</p>" +
          "<p>"+ "Logged By Email: " +mail[uid].loginEmail +"</p>" +
          "<p>"+ "Logged By UID: "+ uid +"</p>"

  };

  return mailTransport.sendMail(mailOptions).then(() => {
    return console.log('Mail sent to: umangfoundadm@gmail.com')
  });
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
