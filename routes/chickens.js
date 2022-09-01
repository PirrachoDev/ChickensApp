const express = require('express');
const router = express.Router();
const Chickens = require('../models/chickens');
const { chickensSchema } = require('../schemas');
const ExpressError = require('../utils/ExpressError');

//Middleware
const validateChickens = async (req, res, next) => {
  const { error } = chickensSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',');
    res.render('./error', { msg });
    //throw new ExpressError(msg, 400);
  } else {
    next();
  }
}

//READ
router.get('/', async (req, res) => {
  const allChickens = await Chickens.findAll();
  res.render('./chickens/chickens', { allChickens });
})


//CREATE
router.post('/', validateChickens, async (req, res) => {
  const { chicken } = req.body;
  const newChicken = await Chickens.create(chicken);
  res.redirect(`/chickens/${newChicken.id}`);

});

router.get('/new', (req, res) => {
  res.render('./chickens/new');
});

//SHOW
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const chicken = await Chickens.findOne({ where: { id } })
  res.render('./chickens/show', { chicken });
});


router.get('/:id/edit', async (req, res) => {
  const { id } = req.params;
  const chicken = await Chickens.findOne({ where: { id } })
  res.render('./chickens/edit', { chicken });
});

//UPDATE
router.put('/:id', validateChickens, async (req, res) => {
  const { id } = req.params;
  const { chicken } = req.body;
  await Chickens.update(chicken, { where: { id } });
  res.redirect(`/chickens/${id}`);
});


//DELETE
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Chickens.destroy({ where: { id } });
  res.redirect('/chickens');
});



module.exports = router;