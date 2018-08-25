const express = require('express');
const router = express.Router();

const app = express();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

BlogPosts.create('Cooking','Baking','Jose','09/21/2017');
BlogPosts.create('Programming','Full stack','John','07/18/2018');

app.route('/blogPosts').get(getRequest).post(jsonParser,postRequest);

const getRequest = (req,res) => res.json(BlogPosts.get());

const postRequest = (req,res) => {
    const requiredFields= ['title','content','author','publishDate'];
    for(let i=0;i<requiredFields.length;i++){
        if(!requiredFields[i] in req.body){
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }
   const item = BlogPosts.create(req.body.title,req.body.content,req.body.author,req.body.publishDate);
   res.status(201).json(item);
}


app.route('/blogPosts/:id').put(putRequest).delete(deleteRequest);

const putRequest = (req,res) => {
    const requiredFields= ['title','content','author','publishDate'];
    for(let i=0;i<requiredFields.length;i++){
        if(!requiredFields[i] in req.body){
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }
    if (req.params.id !== req.body.id) {
        const message = (
          `Request path id (${req.params.id}) and request body id `
          `(${req.body.id}) must match`);
        console.error(message);
        return res.status(400).send(message);
      }

      BlogPosts.update({title:req.body.title,content:req.body.content,author:req.body.author,publishDate:req.body.publish});
      res.status(204).end();
}

const deleteRequest = (req,res) => {
    BlogPosts.delete(req.params.id)
    res.status(204).end();
};

module.exports = router;