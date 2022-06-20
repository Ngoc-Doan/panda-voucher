const User = require('../models/user')

function UserBuilder() {
    this.user = new User()
    this.setType = type => {
        this.user.type = type;
        return this;
    }
    this.setUsername = username => {
        this.user.username = username;
        return this;
    }
    this.setPassword = password => {
        this.user.password = password;
        return this;
    }
    this.setImage = image => {
        this.user.image = image;
        return this;
    }
    this.setName = name => {
        this.user.name = name;
        return this;
    }
    this.setEmail = email => {
        this.user.email = email;
        return this;
    }

    this.setCity = city => {
        this.user.city = city;
        return this;
    }

    this.setDistrict = district => {
        this.user.district = district;
        return this;
    }

    this.setCode = code => {
        this.user.code = code;
        return this;
    }

    this.setPhone = phone => {
        this.user.phone = phone;
        return this;
    }

    this.setStreet = street => {
        this.user.street = street;
        return this;
    }

    this.setUrl = url => {
        this.user.url = url;
        return this;
    }

    this.setDescription = desc => {
        this.user.desc = desc;
        return this;
    }

    this.buildInfo = () => this.user;
}

module.exports = UserBuilder