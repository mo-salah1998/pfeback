const mongoose = require('mongoose')
const Product = require('./Product')
const Variant = require('./Variant')

const subCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
})


subCategorySchema.pre('deleteOne', async function (next) {
    const subCategory = await this.model.findOne({ _id: this._conditions._id }).populate('products')
    const variantsToDelete = []
    subCategory.products.forEach(product => {
        product.variants.forEach(variant => variantsToDelete.push(variant))
    })
    await Variant.deleteMany({ _id: { $in: variantsToDelete } })
    await Product.deleteMany({ _id: { $in: subCategory.products.map(product => product._id) } })
    const Category = require('./Category')

    await Category.updateOne({ _id: subCategory.category }, { $pull: { subCategories: subCategory._id } })

    next();
})



module.exports = mongoose.model('SubCategory', subCategorySchema)