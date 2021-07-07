const User = require("../../models/user");
const { v4: uuidv4 } = require("uuid");

const getRoom = (req, res, next) => {
  console.log("req", req);
  const randomGenUniqueName = uuidv4();
  res.status(200).send({ roomUrl: randomGenUniqueName });
};

// const getEditProduct = (req,res,next) => {
//     //for query params
//     // const { id } = req.query;
//     const { id } = req.params;
//     Product.getById(id,product => {
//         res.render('admin/edit-product',{product,pageTitle:'Edit Product',editing:true});
//     });
// }

// const postAddProduct = (req,res,next) => {
//     const {title,description,price} = req.body;
//     const product = new Product(null,title,description,price);
//     product.save();
//     console.log(req.body);
//     res.redirect('/admin/products');
// }

const postAddUser = (req, res, next) => {
  const { name } = req.body;
  const user = new User(null, name);
  user.save();
  res.status(200).send({ success: true, msg: "User added" });
};

module.exports = {
  postAddUser,
  getRoom,
};
