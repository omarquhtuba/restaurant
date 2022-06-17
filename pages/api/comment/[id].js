import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";
import mongoose from "mongoose";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
    
  } = req;
  

  dbConnect();

  if (method === "GET") {
    try {
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    
    try {
        const post = await Product.findById(id);
    
        // Pull out comment
        const comment = post.comments.find(
          comment => comment.id === req.body.commentId
        );
    
        // Make sure comment exists
        if (!comment) {
          return res.status(404).json({ msg: 'Comment does not exist' });
        }
    
        // Get remove index
        const removeIndex = post.comments
          .map(comment => comment.id)
          .indexOf(req._id);
    
        post.comments.splice(removeIndex, 1);
    
        await post.save();
    
        res.json(post.comments);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
  }

   

  /* */

  if (method === "DELETE") {
    
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json("The product has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
}