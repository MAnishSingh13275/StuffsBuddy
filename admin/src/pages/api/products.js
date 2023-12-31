import { Product } from "@/models/Products";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }
  if (method === "PUT") {
    const { title, desc, price, _id, images } = req.body;
    await Product.updateOne({ _id }, { title, desc, price, images });
    res.json(true);
  }

  if (method === "POST") {
    const { title, desc, price, images } = req.body;
    const productDoc = await Product.create({
      title,
      desc,
      price,
      images,
    });
    res.json(productDoc);
  }

  if (method === "DELETE") {
    await Product.deleteOne({ _id: req.body.id });
    res.json(req.body.id);
  }
}
