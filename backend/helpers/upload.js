const { Storage } = require('@google-cloud/storage');
const path = require('path');
const serviceKey = path.join(__dirname, '../keys.json');

const storage = new Storage({
    keyFilename: serviceKey,
    projectId: 'metal-summer-269312'
});
const bucket = storage.bucket('task-bucket1');

const uploadFile = file => new Promise((resolve, reject) => {
    const { originalname, buffer } = file

    const blob = bucket.file(originalname.replace(/ /g, "_"));
    const blobStream = blob.createWriteStream({
        resumable: false
    });

    blobStream.on('finish', () => {
        resolve(blob.name);
    }).on('error', err => {
        console.log(err);
        reject(`Unable to upload image, something went wrong`);
    }).end(buffer);
});

module.exports = {
    uploadFile
};
