function validatePermission(type, permissions) {
    let check = permissions.permission.some((element) => element.type == type)
    return check
}
module.exports = {validatePermission}