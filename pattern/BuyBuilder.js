const Buy = require('../models/buy')

function BuyBuilder() {
    this.buy = new Buy()
    this.setValidation = validation => {
        this.buy.validation = validation;
        return this;
    }
    this.setCancel = cancel => {
        this.buy.cancel = cancel;
        return this;
    }
    this.setReceive = receive => {
        this.buy.receive = receive;
        return this;
    }
    this.setCheck = check => {
        this.buy.check = check;
        return this;
    }
    this.setName = name => {
        this.buy.name = name;
        return this;
    }
    this.setPhone = phone => {
        this.buy.phone = phone;
        return this;
    }
    this.setOrderDate = orderDate => {
        this.buy.orderDate = orderDate;
        return this;
    }
    this.setDeliveryDate = deliveryDate => {
        this.buy.deliveryDate = deliveryDate;
        return this;
    }
    this.setEmail = email => {
        this.buy.email = email;
        return this;
    }
    this.setUser = user => {
        this.buy.user = user;
        return this;
    }
    this.setTotalPrice = totalPrice => {
        this.buy.totalPrice = totalPrice;
        return this;
    }
    this.setProducts = products => {
        this.buy.products = products;
        return this;
    }
    this.setShipper = shipper => {
        this.buy.shipper = shipper;
        return this;
    }
    this.setAddress = address => {
        this.buy.address = address;
        return this;
    }
    this.setDistrict = district => {
        this.buy.district = district;
        return this;
    }
    this.setCity = city => {
        this.buy.city = city;
        return this;
    }
    this.setNote = note => {
        this.buy.note = note;
        return this;
    }
    this.buildInfo = () => this.buy;
}

module.exports = BuyBuilder;