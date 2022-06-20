const Cart = require('../models/cart')

function CartBuilder() {
    this.cart = new Cart()
    this.setTotalPrice = totalPrice => {
        this.cart.totalPrice = totalPrice;
        return this;
    }
    this.setUser = user => {
        this.cart.user = user;
        return this;
    }
    this.setProducts = products => {
        this.cart.products = products;
        return this;
    }
    this.buildInfo = () => this.cart;
}

module.exports = CartBuilder