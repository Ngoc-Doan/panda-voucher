const Category = require('../models/category')

function CategoryBuilder() {
    this.category = new Category()

    this.setName = name => {
        this.category.name = name;
        return this;
    }

    this.buildInfo = () => this.category;
}

module.exports = CategoryBuilder;