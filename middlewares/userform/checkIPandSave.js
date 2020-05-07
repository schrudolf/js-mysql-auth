const publicIp = require('public-ip');

module.exports = async (con,email) => {
    try{
    const ip = await (async () => {
            let userIp = await publicIp.v4();
            return userIp;
    })();
    const date = await new Date().toLocaleString()
    await con.query("UPDATE users SET ipAddress=?, lastlogin=? WHERE email=?", [ip,date,email])
    return;
    } catch(err) {
        console.log(err);
    }
}