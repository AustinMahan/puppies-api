var express = require('express');
var router = express.Router();

const cage = [
  {
    id: 1,
    name: 'Wes',
    sex: 'M',
    breed: 'chaweeny',
    aggresive: true
  },
  {
    id: 2,
    name: 'Micheal',
    sex: 'M',
    breed: 'bull',
    aggresive: false
  }
];

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(cage);
});

router.get('/:id', function (req, res, next) {
  var id = req.params.id;
  var onePup = cage.filter(function (pup) {
    return pup.id == id;
  });
  res.send(onePup);
});

router.post('/', function (req, res, next) {
  var data = req.body;
  console.log(cage[cage.length - 1].id + 1);
  data.id = cage[cage.length - 1].id + 1;
  data.aggresive = Boolean(data.aggresive);
  cage.push(data)
  var out = { message: 'Pup added', data: data };
  res.send(out);
});

router.put('/:id', function (req, res, next) {
  var id = req.params.id
  var data = req.body;
  if (data.name && data.sex && data.breed && data.aggressive) {
    cage.forEach(function (pup, i) {
      if (pup.id == id) {
        var pupUpdate = req.body;
        pupUpdate.id = id;
        pupUpdate.aggressive = Boolean(pupUpdate.aggressive);
        cage[i] = pupUpdate;
        res.status(200).send(pupUpdate);
      }
    });
  }else {
    res.status(400).send('Bad Request');
  }
  res.status(404).send('Pup not found');
});

router.delete('/:id', function (req, res, next) {
  var id = req.params.id;
  cage.forEach(function (pup, i) {
    if (pup.id == id) {
      cage.splice(i, 1);
      res.status(200).send(pup);
    }
  });
  res.status(404).send('Pup not found');
});

module.exports = router;
