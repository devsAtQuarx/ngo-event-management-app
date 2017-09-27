
importScripts('https://www.gstatic.com/firebasejs/4.3.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.3.1/firebase-messaging.js')

var config = {
  apiKey: "AIzaSyA5VY_ZN2eM_RmfmmTmLfwmw5iuVLaUTdQ",
  authDomain: "umang-foundation.firebaseapp.com",
  databaseURL: "https://umang-foundation.firebaseio.com",
  projectId: "umang-foundation",
  storageBucket: "umang-foundation.appspot.com",
  messagingSenderId: "930652074537"
}
firebase.initializeApp(config)

const messaging = firebase.messaging()

//when app is not opend
messaging.setBackgroundMessageHandler(function (payload) {
  const title = payload.data.title
  const options = {
    body : payload.data.content,
    icon : 'http://www.tomevans.co/wp-content/uploads/2012/12/icon_square_udemy.png',
    //image : payload.data.image
  }

  self.addEventListener('notificationclick', function(event) {
    let url = payload.data.link
    console.log(url)
    event.notification.close(); // Android needs explicit close.
    event.waitUntil(
      clients.matchAll({type: 'window'}).then( windowClients => {
        // Check if there is already a window/tab open with the target URL
        for (var i = 0; i < windowClients.length; i++) {
          var client = windowClients[i];
          // If so, just focus it.
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        // If not, then open the target URL in a new window/tab.
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
    );
  });

  return self.registration.showNotification(title, options)
})

/*messaging.onMessage(function (payload) {
  window.alert('pushNOt' , payload) //toast or alert etc
})*/

/*

curl -X POST -H "Authorization: key=AAAA2K8vsik:APA91bHPns7uotMLt4UKTvC31VCw0idt73-LoX_dIV8FJxYWAWIHb6LbJTmlTLPey8hYjiVCxPT-zBMj40pxT6QSrixQ7Db4ktdBNr685fQs1fzR2bR2rXDBRlUUSJcFdvjXg8Apn1cJ" -H "Content-Type: application/json" -d '{
  "notification": {
    "title": "Portugal vs. Denmark",
    "body": "5 to 1",
    "icon": "firebase-logo.png",
    "click_action": "http://localhost:8081"
  },
  "to": "cCYbdZq51Yw:APA91bFWakEDmJT4GbTojpMJxnhBOBke9TQv89zR_BnvGRvqZAojK4Fr4H7INRENaCkzA7pLb9X_z-DL3QALlS2MnbUun9aeQ2CHkk5RvqDEWN28jScowHfXsit4bNVe1Do7xLXn7vlG"
}' "https://fcm.googleapis.com/fcm/send"

curl -X POST -H "Authorization: key=AAAA2K8vsik:APA91bHPns7uotMLt4UKTvC31VCw0idt73-LoX_dIV8FJxYWAWIHb6LbJTmlTLPey8hYjiVCxPT-zBMj40pxT6QSrixQ7Db4ktdBNr685fQs1fzR2bR2rXDBRlUUSJcFdvjXg8Apn1cJ" -H "Content-Type: application/json" -d '{
  "notification": {
    "title": "Portugal vs. Denmark",
    "body": "5 to 1",
    "icon": "firebase-logo.png",
    "click_action": "https://umang-foundation.firebaseapp.com"
  },
  "to": "d6X3jWhPu8A:APA91bFsHDp7AYbf5q3QeudMHzhsCbCmCd0N2BXTrJarCHZG2AyTuMrzglvlG82o6_Wm4IQ2lTzlSChtQ2ZIasw_CO8DAdOWhLOgOUG_FQkdhks2aCNU3gl6Dc4w_pvDcRGcYA5LDVyr"
}' "https://fcm.googleapis.com/fcm/send"


 */



