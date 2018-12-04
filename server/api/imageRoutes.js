const router = require('express').Router();

const { upload, deleteImage } = require('../../client/src/awsUtils/image.js');

router.post('/', (req, res, next) => {
  upload(req.body.data, req.body.bucket)
    .then(imageUrl => {
      res.send(imageUrl);
    })
    .catch(next);
});

router.delete('/:key/:bucket', (req, res, next) => {
  const { key, bucket } = req.params;
  console.log('key', key)
  console.log('bucket', bucket)
  deleteImage(key, bucket)
    .then(() => res.sendStatus(202))
    .catch(next);
});

module.exports = router;
