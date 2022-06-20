const Voucher = require('../models/voucher')

function VoucherBuilder() {
    this.voucher = new Voucher()
    this.setName = name => {
        this.voucher.name = name;
        return this;
    }
    this.setExpirationDate = expirationDate => {
        this.voucher.expirationDate = expirationDate;
        return this;
    }
    this.setPrice = price => {
        this.voucher.price = price;
        return this;
    }
    this.setBrand = brand => {
        this.voucher.brand = brand;
        return this;
    }
    this.setCategory = category => {
        this.voucher.category = category;
        return this;
    }
    this.setDescription = description => {
        this.voucher.desc = description;
        return this;
    }
    this.setImage = image => {
        this.voucher.image = image;
        return this;
    }
    this.setDiscount = discount => {
        this.voucher.discount = discount;
        return this;
    }
    this.setAvailability = availability => {
        this.voucher.Availability = availability;
        return this;
    }
    this.buildInfo = () => this.voucher;
}

module.exports = VoucherBuilder;