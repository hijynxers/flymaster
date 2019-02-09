// Saves a new message on the Firebase DB.
function saveMessage(messageText) {
    // Add a new message entry to the Firebase database.
    window.alert('fart');
    return firebase.firestore().collection('messages').add({
        name: "finalTest",
        text: "hopefully",
        profilePicUrl: getProfilePicUrl(),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(function (error) {
        console.error('Error writing new message to Firebase Database', error);
    });
}

function testFunction(id) {
    window.alert(id);
}

// Displays a Message in the UI.
function displayMessage(id, timestamp, name, text, picUrl, imageUrl) {
    var fart = '';
    iterator = iterator + 1;
    t = "testFunction(\""+name+"\")"
    fart += `<div onclick=` +t+ ` class="card">
                <img src="images/img_avatar.png" alt="Avatar" style="width:100%">
                <div class="container">
                    <div class="name"><b>` + name + `</b></div>
                    <div class="string">` + text + `</div>
                </div>
            </div>`
    document.getElementById('cardStock').innerHTML += fart;
}

// Loads chat messages history and listens for upcoming ones.
function loadMessages() {
    // Create the query to load the last 12 messages and listen for new ones.
    var query = firebase.firestore()
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .limit(12);

    // Start listening to the query.
    query.onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
            if (change.type === 'removed') {
                deleteMessage(change.doc.id);
            } else {
                var message = change.doc.data();
                console.log(message);
                displayMessage(change.doc.id, message.timestamp, message.name,
                    message.text, message.profilePicUrl, message.imageUrl);
            }
        });
    });
}

// Shortcuts to DOM Elements.
var messageListElement = document.getElementById('messages');
var messageFormElement = document.getElementById('message-form');
var messageInputElement = document.getElementById('message');
var submitButtonElement = document.getElementById('submit');
var imageButtonElement = document.getElementById('submitImage');
var imageFormElement = document.getElementById('image-form');
var mediaCaptureElement = document.getElementById('mediaCapture');
var userPicElement = document.getElementById('user-pic');
var userNameElement = document.getElementById('user-name');
// var signInButtonElement = document.getElementById('sign-in');
// var signOutButtonElement = document.getElementById('sign-out');
// var signInSnackbarElement = document.getElementById('must-signin-snackbar');

var iterator = 0;
document.getElementById('addFly').addEventListener('click', function () {
    var area = document.getElementById("testText");
    str = area.value;
    document.getElementById("textTop").innerHTML = str;
});

document.getElementById('save').addEventListener('click', function () {
    iterator = iterator + 1;
    document.getElementById('textTop').innerHTML = iterator;
    // document.getElementById("textTop").innerHTML = "CHANGED";
    // saveMessage("message");   
});

// Signs-in Friendly Chat.
function signIn() {
    // Sign into Firebase using popup auth & Google as the identity provider.
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
}

// Adds a size to Google Profile pics URLs.
function addSizeToGoogleProfilePic(url) {
    if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
        return url + '?sz=150';
    }
    return url;
}

/*
class fly {
    constructor(name, str) {
        this.name = name;
        this.str = str;
    }
}

const f1 = new fly("test_name", "test_string");
const f2 = new fly("test_name", "test_string");
const f3 = new fly("test_name", "test_string");
const f4 = new fly("test_name", "test_string");
const f5 = new fly("test_name", "test_string");
const f6 = new fly("test_name", "test_string");
const f7 = new fly("test_name", "test_string");

var lst = [f1, f2, f3, f4, f5, f6, f7];

var html = '';
lst.forEach(element => {
    html += `<div id="spot` + name + ` class="card">
                <img src="images/img_avatar.png" alt="Avatar" style="width:100%">
                <div class="container">
                    <div class="name"><b>` + element.name + `</b></div>
                    <div class="string">` + element.str + `</div>
                </div>
            </div>`
});
document.getElementById('cardContainer').innerHTML += html;

*/

/* *****************************
*******  Firebase Auth  ********
*******************************/

// Checks that the Firebase SDK has been correctly setup and configured.
function checkSetup() {
    if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
        window.alert('You have not configured and imported the Firebase SDK. ' +
            'Make sure you go through the codelab setup instructions and make ' +
            'sure you are running the codelab using `firebase serve`');
    } 
}

// Checks that Firebase has been imported.
checkSetup();



// Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
    return firebase.auth().currentUser.photoURL || '/images/profile_placeholder.png';
}

// Returns the signed-in user's display name.
function getUserName() {
    return firebase.auth().currentUser.displayName;
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
    if (user) { // User is signed in!
        // Get the signed-in user's profile pic and name.
        var profilePicUrl = getProfilePicUrl();
        var userName = getUserName();

        // Set the user's profile pic and name.
        userPicElement.style.backgroundImage = 'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')';
        userNameElement.textContent = userName;

        // Show user's profile and sign-out button.
        // userNameElement.removeAttribute('hidden');
        // userPicElement.removeAttribute('hidden');
        // signOutButtonElement.removeAttribute('hidden');

        // Hide sign-in button.
        // signInButtonElement.setAttribute('hidden', 'true');

        // We save the Firebase Messaging Device token and enable notifications.
// TODO: COME BACK TO THIS!!!!
        // saveMessagingDeviceToken();
    } else { // User is signed out!
        // Hide user's profile and sign-out button.
        userNameElement.setAttribute('hidden', 'true');
        userPicElement.setAttribute('hidden', 'true');
        // signOutButtonElement.setAttribute('hidden', 'true');

        // Show sign-in button.
        // signInButtonElement.removeAttribute('hidden');
    }
}

// Initiate firebase auth.
function initFirebaseAuth() {
    // Listen to auth state changes.
    firebase.auth().onAuthStateChanged(authStateObserver);
    // if (firebase.auth().onAuthStateChanged(authStateObserver)) {
    //     window.alert('something changed');
    // }
}
// initialize Firebase
initFirebaseAuth();
// load existing messages
loadMessages();
