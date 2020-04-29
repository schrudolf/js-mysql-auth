async function seedDB(con){
    try {
        await con.query("DROP TABLE IF EXISTS users");
        console.log("users tábla törölve")
        const users = "CREATE TABLE IF NOT EXISTS teszt (id INT(11) NOT NULL AUTO_INCREMENT,email VARCHAR(50) NOT NULL, password VARCHAR(100) NOT NULL,PRIMARY KEY (id))";
        await con.query(users);
        console.log("Users tábla kész")
    }  catch(err) {
        return console.log("HIBA: " + err);
    }
}

module.exports = seedDB;


