// !!! CMD: firebase deploy to submit the changes to the firebase cloud storage !!!
// import firebase functions
const functions = require('firebase-functions');

// firebase offers a tool included by default that we can use to validate the token
const admin = require('firebase-admin');

// generate a unique id using uuid package
const UUID = require('uuid-v4');

// temporally save the file to then forward it to the cloud storage
// for that we need the file system package from node
const fs = require('fs');

// google cloud configs
const gcConfig = {
	projectId: 'awesome-places-1518203085771',
	keyFilename: 'awesome-places.json'
};

// firebase storage is based on the google cloud storage and
// @google-cloud /storage have some useful SDK we can use conveniently
// store data in there
const gcs = require('@google-cloud/storage')(gcConfig);

// to the admin toolkit works we need to initialize it and that after the google cloud storage init
admin.initializeApp({
	credential: admin.credential.cert(require('./awesome-places.json'))
});

// cors middleware is required to allow access to our function from other origin
// from app not running on the same same server as firebase app does
// cors execute a function with origin config to true allowing access from any origin
const cors = require('cors')({ origin: true });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.storeImage = functions.https.onRequest((request, response) => {
	cors(request, response, () => {
		// check if we don't have a request header object we get from firebase
		if (!request.headers.authorization || !request.headers.authorization.startsWith('Bearer ')) {
			console.log('Not token present!');
			response.status(403).json({ error: 'Unauthorized' });
			return
		}

		// get the token from the request header
		let idToken;
		idToken = request.headers.authorization.split('Bearer ')[1];

		return new Promise((resolve, reject) => {
			// execute the admin to verify the token's validity
			admin.auth().verifyIdToken(idToken)
			// we could get also some data like the user id
				.then(decodedToken => {
					console.log('Decoded token: ', decodedToken);
					// get the body from the request
					const body = JSON.parse(request.body);

					// save the file in temp file
					fs.writeFileSync('/tmp/uploaded-image.jpg', body.image, 'base64', error => {
						console.log(error);
						return response.status(500).json({ error: error })
					});

					// init and get a unique id
					const uuid = UUID();

					// store the data (base64 image) in the firebase cloud storage
					const bucket = gcs.bucket('awesome-places-1518203085771.appspot.com');
					return bucket.upload('/tmp/uploaded-image.jpg', {
						uploadType: 'media',
						destination: '/places/' + uuid + '.jpg',
						metadata: {
							metadata: {
								contentType: 'image/jpeg',
								firebaseStorageDownloadTokens: uuid
							}
						}
					}, (error, file) => {
						if (!error) {
							resolve(
								response.status(201).json({
									imageUrl: 'https://firebasestorage.googleapis.com/v0/b/' +
									bucket.name +
									'/o/' +
									encodeURIComponent(file.name) +
									'?alt=media&token=' +
									uuid
								})
							)
						} else {
							console.log(error);
							response.status(500).json({ error: error })
						}
					})
				})
				.catch(error => {
					console.log('Token is invalid: ', error);
					response.status(403).json({ error: "Unauthorized" });
					reject(new Error('Something went wrong!'))
				})
		});
	})

	// response.send("Hello from Firebase!");
});
