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

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
