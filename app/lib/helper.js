
function success(msg, errorCode) {
    throw new global.errs.Success();
}

module.exports = {
    success,
}