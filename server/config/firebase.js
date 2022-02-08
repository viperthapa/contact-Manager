const firebaseAdmin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');

// change the path of json file
const serviceAccount = require('../firebase-key.json');


const admin = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
});

const storageRef = admin.storage().bucket('gs://contact--manager.appspot.com');

exports.uploadFile = async (path, filename) => {

    return storageRef.upload(path, {

        public: true,
        destination: `/uploads/hashnode/${filename}`,
        metadata: {
            firebaseStorageDownloadTokens: uuidv4(),
        }
    });
}

