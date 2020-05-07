const publicIp = require('public-ip');

module.exports = async (con,email) => {
    try{
    const ip = await (async () => {
            let userIp = await publicIp.v4();
            return userIp;
    })();
    await con.query("UPDATE users SET ipAddress=? WHERE email=?", [ip,email])
    return;
    } catch(err) {
        console.log(err);
    }
}