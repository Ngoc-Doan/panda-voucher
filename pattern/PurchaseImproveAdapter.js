const fetch = require("node-fetch");

async function purchaseImprove(req, res, next) {
    cookie = req.cookies
    var {
        user,
        validation,
        check,
        name,
        phone,
        email,
        cart,
        shipper,
        address,
        district,
        city,
        note,
        password
    } = req.body
    const query = {
        user,
        validation,
        check,
        name,
        phone,
        email,
        cart,
        shipper,
        address,
        district,
        city,
        note,
        password
    }
    fetch(`${process.env.URL}/api/buys/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `connect.sid=${cookie['connect.sid']};token=${cookie.token}`
        },
        body: JSON.stringify(query)
    }).then(res => res.text())
    .then(data => {
        data = JSON.parse(data)
        if (data.status) {
            fetch(`${process.env.URL}/api/carts/all`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `connect.sid=${cookie['connect.sid']};token=${cookie.token}`
                },
                body: JSON.stringify({cart})
            }).then(res => res.text())
            .then(d => {
                d = JSON.parse(d)
                if (d.status) {
                    return res.status(200).json({
                        status: true,
                        message: 'Thanh toán sản phẩm thành công',
                        Buy: data.Buy
                    })
                }
                else {
                    throw new Error('Lỗi xảy ra, vui lòng refresh lại trang')
                }
            }).catch(e => {
                res.status(500).json({
                    status: false,
                    error: e.message
                })
            })
        }
        else {
            res.status(500).json({
                status: false,
                error: data.error
            })
        }
    }).catch(e => {
        res.status(500).json({
            status: false,
            error: e.message
        })
    })
}

module.exports = {purchaseImprove}