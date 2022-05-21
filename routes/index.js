const express = require('express');
const router = express.Router();
const homecontroller = require('../controllers/homecontrollers');

router.get('/',homecontroller.home);
router.get('/create',homecontroller.create);
router.post('/create-project',homecontroller.createproject);
router.get('/project-page',homecontroller.projectpage);
router.get('/issue-page',homecontroller.issuepage);
router.post('/create-issue',homecontroller.createissue);

//filters
router.post('/label-filter',homecontroller.labelfilter);
router.post('/author-filter',homecontroller.authorfilter);
router.post('/search',homecontroller.search);
module.exports = router;