const express = require("express");
const { FormModel } = require("../model/FormModel");

const FormRouter = express.Router()



// post request
FormRouter.post('/add', async (req, res) => {
  console.log(req.body);
    try {
      const form = new FormModel(req.body);
      await form.save();
      res.status(201).json(form);
    } catch (err) {
      res.status(500).json({ error: 'Unable to create the form.' });
    }
  });


// Get Request 
  FormRouter.get('/', async (req, res) => {
    try {
      const forms = await FormModel.find();
      res.json(forms);
    } catch (err) {
      res.status(500).json({ error: 'Unable to fetch forms.' });
    }
  });

//   Get a single form by ID (GET):

FormRouter.get('/:id', async (req, res) => {
    try {
      const form = await FormModel.findOne({"formId":req.params.id});
      if (!form) {
        return res.status(404).json({ error: 'Form not found.' });
      }
      res.json(form);
    } catch (err) {
      res.status(500).json({ error: 'Unable to fetch the form.' });
    }
  });

//   Update a form (PUT or PATCH):
// This route will handle updating an existing form in the database.


FormRouter.put('/update/:id', async (req, res) => {
    try {
      const form = await FormModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!form) {
        return res.status(404).json({ error: 'Form not found.' });
      }
      res.json(form);
    } catch (err) {
      res.status(500).json({ error: 'Unable to update the form.' });
    }
  });


//   Delete a form (DELETE):
// This route will handle deleting a specific form based on its ID.


FormRouter.delete('/delete/:id', async (req, res) => {
    try {
      const form = await FormModel.findByIdAndDelete(req.params.id);
      if (!form) {
        return res.status(404).json({ error: 'Form not found.' });
      }
      res.json({ message: 'Form deleted successfully.' });
    } catch (err) {
      res.status(500).json({ error: 'Unable to delete the form.' });
    }
  });
 

  module.exports={FormRouter}