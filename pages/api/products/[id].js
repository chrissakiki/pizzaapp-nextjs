import dbConnect from "../../../lib/dbConnect";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
    cookies,
  } = req;

  const token = cookies.token;

  await dbConnect();

  if (method === "GET") {
    try {
      const products = await Product.findById(id);
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json("Unauthorized");
    }
    try {
      const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.status(202).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "DELETE") {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json("Unauthorized");
    }
    try {
      await Product.findByIdAndDelete(id);
      res.status(203).json("deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
