

module.exports =
    function timeSum(first, second) {
        const firstTime = first.split(":");
        const secondTime = second.split(":");

        const x = parseInt(firstTime[0]) * 60 + parseInt(firstTime[1]);
        const y = parseInt(secondTime[0]) * 60 + parseInt(secondTime[1]);

        if(x > y) {
            return x - y;
        }
        else return y - x;
}
