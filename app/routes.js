//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here


///Contact table
router.get('/contacts/contacts-info', function(req, res) {

  //set back to the previous page
  req.session.data.back = req.headers.referer

  //set the success banner back to false this will mean the banner will only show once for the user
  req.session.data.successBanner = "false"

  res.render('contacts/contacts-info');
});

////////////////////////////////////////////
////////ADD A CONTACT

//Enter a name
router.get('/contacts/add-a-contact/enter-a-name', function(req, res) {

  //set back to the previous page
  req.session.data.back = req.headers.referer
  res.render('contacts/add-a-contact/enter-a-name');
});

router.post('/contacts/add-a-contact/enter-a-name', function(req, res) {

  //If the user has come from check-you-answers then redirect back to that page, else continue to enter an email
  if (req.session.data['back'].includes("check-your-answers")) {
    res.redirect('/contacts/add-a-contact/check-your-answers');
  } else {
    res.redirect('/contacts/add-a-contact/enter-an-email');
  }

});



//Enter an email
router.get('/contacts/add-a-contact/enter-an-email', function(req, res) {
  res.render('contacts/add-a-contact/enter-an-email');
});

router.post('/contacts/add-a-contact/enter-an-email', function(req, res) {
  res.redirect('/contacts/add-a-contact/check-your-answers');
});


//Check your answers
router.get('/contacts/add-a-contact/check-your-answers', function(req, res) {
  res.render('contacts/add-a-contact/check-your-answers');
});

router.post('/contacts/add-a-contact/check-your-answers', function(req, res) {


  // session data
  let name = req.session.data['name']
  let email = req.session.data['email']

  // make an object to hold data
  let newContact = {
    name,
    email
  };

  // add the new contact object to the contacts array
  req.session.data.contacts.push(newContact);

  //blank the name and email in case another contact is added
  req.session.data.name = ""
  req.session.data.email = ""

  res.redirect('/contacts/add-a-contact/contact-set-up');
});


//Success - Contact set up
router.get('/contacts/add-a-contact/contact-set-up', function(req, res) {


  res.render('contacts/add-a-contact/contact-set-up');
});


////////////////////////////////////////////
////////REMOVE A CONTACT

//Enter a name
router.get('/contacts/remove-a-contact/youre-about-to-remove-a-contact', function(req, res) {

  //set back to the previous page
  req.session.data.back = req.headers.referer
  res.render('contacts/remove-a-contact/youre-about-to-remove-a-contact');
});

router.post('/contacts/remove-a-contact/youre-about-to-remove-a-contact', function(req, res) {

  //get the ID of the contact that you want to remove
  let contactID = req.session.data['contactID']

  //get the contacts List
  let contacts = req.session.data['contacts']

  //set the removed contacts name to so we can use it in the success banner after it has been removed
  req.session.data.removedName = req.session.data.contacts[contactID]['name']

  //remove the object that is in the position set by the contact ID
  if (contactID > -1) {
    contacts.splice(contactID, 1);
  }

  //set success banner to true
  req.session.data.successBanner = "true"

  res.redirect('/contacts/contacts-info');

});

