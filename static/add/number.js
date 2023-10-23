

module.exports = {
    function (amount) {
        if(typeof amount === 'number' && (amount > 0 && amount < 10)) {
            return "0" + amount;
        } else return amount;
    }
}