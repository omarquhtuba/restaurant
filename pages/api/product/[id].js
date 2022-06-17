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
      const product = await Product.findById(id);
  if(product){
      // Pull out comment
      const comment = product.comments.find(
        comment => comment.id === req.body._id
      );
  
      // Make sure comment exists
      if (comment) {
        return res.status(404).json({ msg: 'Comment exist' });
      }
      await product.updateOne({ $push: { comments: req.body.comment }});
      res.status(200).json("the comment is posted");
      
  }else{
    const comment = product.comments.find(
      comment => comment.id === req.body.commentId
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    // Get remove index
    const removeIndex = product.comments
      .map(comment => comment.id)
      .indexOf(req.price);

    product.comments.splice(removeIndex, 1);

    await product.save();
    res.json(product.comments);
}   
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }}

    /*try {
      if( !mongoose.Types.ObjectId.isValid(id) ) return false;
    const product = await Product.findById(id);
  if(!product.comments.includes(req.body._id)){
      await product.updateOne({ $push: { comments: req.body.comment }});
      res.status(200).json("the comment is posted");
  }else{
      await product.updateOne({ $pull: { comments: req.body._id }});
      res.status(200).json("the comment has been deleted");  
  }
    } catch (err) {
      res.status(500).json(err);
    }
  }*/

  /* try {
    const post = await Product.findById(id);

    // Pull out comment
    const comment = post.comments.find(
      comment => comment.id === req.body._id
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
  }*/

  if (method === "DELETE") {
    
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json("The product has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
}