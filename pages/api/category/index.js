import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  const { method, query: { cat }} = req;

  

  dbConnect();

  if (method === "GET") {
    try {
      const products = await Product.find({ category: {
        $in: [cat]
    }});
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  }

}