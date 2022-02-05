const mongoose = require("mongoose");
const chalk = require("chalk");
const Departments = require("../models/_department");
const Adjective = require("../models/_adjective");
const Product = require("../models/Product");

const GenerateProuducts = async () => {
  for (Depindex in Departments) {
    const Department = Departments[Depindex];
    const keys = Object.keys(Department);
    for (Productindex in Department[keys[1]]) {
      const ProductName = Department[keys[1]][Productindex];
      //   console.log("Product Name", ProductName);
      await Product.create({
        product_type: ProductName,
        product_name:
          Adjective[Math.floor(Math.random() * Adjective.length)] +
          " " +
          ProductName,
        product_department: keys[1],
        product_departmentId: Department[keys[0]],
        product_image_sm: `/${Department[keys[0]]}/${ProductName.replace(
          /\s/g,
          ""
        ).toLowerCase()}_150.png`,
        product_image_md: `/${Department[keys[0]]}/${ProductName.replace(
          /\s/g,
          ""
        ).toLowerCase()}_300.png`,
        product_image_lg: `/${Department[keys[0]]}/${ProductName.replace(
          /\s/g,
          ""
        ).toLowerCase()}_600.png`,
      });
    }
  }
};

mongoose.connection.on("open", async () => {
  const count = await Product.countDocuments();
  console.log(chalk.greenBright(`[INFO] NUMBER OF PRODUCTS: ${count}`));
  if (count == 0) {
    await GenerateProuducts();
    console.log(chalk.yellowBright(`[STATUS] FINISHED PROUDCTS GENERATION`));
    const count = await Product.countDocuments();
    console.log(chalk.greenBright(`[INFO] NUMBER OF PRODUCTS: ${count}`));
  }
});
