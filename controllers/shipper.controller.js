const Shipper = require('../models/shipper')


async function getShipperById(req, res, next) {
    const {id} = req.params
    // console.log(id)
    try {
        if (id == "" || id == null || id == undefined) {
            throw new Error('Lỗi xảy ra, vui lòng thử lại')
        }
        var shipper = await Shipper.findById(id)
        
        if (shipper == null || shipper == undefined) {
            throw new Error('Lỗi xảy ra, vui lòng thử lại')
        }
        res.status(200).json({
            status: true,
            message: 'Lấy shipper thành công',
            Shipper: shipper
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            error: e.message
        })
    }

}


module.exports = {getShipperById}