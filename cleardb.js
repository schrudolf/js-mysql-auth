async function seedDB(con){
    try {
        await createUsers(con);
        await userToken(con);
    }  catch(err) {
        return console.log("HIBA: " + err);
    }
}

async function createUsers(con){
    try{
    await con.query("DROP TABLE IF EXISTS users");
    console.log("users tábla törölve")
    const users = "CREATE TABLE IF NOT EXISTS users (id INT(11) NOT NULL AUTO_INCREMENT,email VARCHAR(50) NOT NULL, password VARCHAR(100) NOT NULL,ipAddress VARCHAR(30) NULL,PRIMARY KEY (id))";
    await con.query(users);
    console.log("Users tábla kész")
    }  catch(err) {
        return console.log("createUsers error: " + err);
    }
}

async function userToken(con){
    try{
        await con.query("DROP TABLE IF EXISTS userToken");
        console.log("userToken tábla törölve");
        const userToken = "CREATE TABLE IF NOT EXISTS userToken (id INT(11) NOT NULL AUTO_INCREMENT,userid INT(11) NOT NULL,token VARCHAR(100) NOT NULL,expire VARCHAR(30) NOT NULL,PRIMARY KEY (id))";
        await con.query(userToken);
        console.log("userToken tábla kész!")
    }catch(err){
        return console.log("UserToken error:" + err)
    }
}

module.exports = seedDB;


