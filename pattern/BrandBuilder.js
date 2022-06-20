const Brand = require('../models/brand')

function BrandBuilder() {
    this.brand = new Brand()

    this.setName = name => {
        this.brand.name = name;
        return this;
    }

    this.setPhone = phone => {
        this.brand.phone = phone;
        return this;
    }

    this.setAddress = address => {
        this.brand.address = address;
        return this;
    }

    this.buildInfo = () => this.brand;
}

module.exports = BrandBuilder;