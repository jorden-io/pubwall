const express = require("express");
const app = express();
const pg = require("pg");
const serverless = require("serverless-http");
const cors = require("cors");
// const rateLimit = require("express-rate-limit");

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100 // limit each IP to 100 requests per windowMs
// });
// app.use(limiter);
app.use(cors());
app.use(express.json());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://https://pubwall-zaac.vercel.app");
//   next();
// });
app.get("/userinfo/:id", async (req, res) => {
  const pool = new pg.Client({
  user: "postgres",
  password: "postgres",
  host: "postgres.chyymqmacekb.us-east-2.rds.amazonaws.com",
  port: 5432,
  database: "postgres",
  ssl: {
    rejectUnauthorized: false
  }
});
  try {
    await pool.connect();
    const { id } = req.params;
    const data = await pool.query("SELECT * FROM tempuser WHERE tempuser.uid = $1;", [id]);
    await res.json(data.rows)
    //console.log(res.json(data.rows));
  } catch (error){
    console.error("ERROR::", error);
  }
  pool.end();
});

app.get("/all", async (req, res) => {
  const pool = new pg.Client({
  user: "postgres",
  password: "postgres",
  host: "postgres.chyymqmacekb.us-east-2.rds.amazonaws.com",
  port: 5432,
  database: "postgres",
  ssl: {
    rejectUnauthorized: false
  }
});
  try {
    await pool.connect();
    const data = await pool.query("SELECT * FROM messages");
    await res.json(data.rows)
    //console.log(res.json(data.rows));
  } catch (error){
    console.error("ERROR::", error);
  }
  pool.end();
});
app.get("/allgroups", async (req, res) => {
  const pool = new pg.Client({
  user: "postgres",
  password: "postgres",
  host: "postgres.chyymqmacekb.us-east-2.rds.amazonaws.com",
  port: 5432,
  database: "postgres",
  ssl: {
    rejectUnauthorized: false
  }
});
  try {
    await pool.connect();
    const data = await pool.query("SELECT tempgroup.gid, tempgroup.groupname, tempgroup.description, tempuser.name FROM tempgroup left join tempuser on tempgroup.uid = tempuser.uid");
    await res.json(data.rows)
    //console.log(res.json(data.rows));
  } catch (error){
    console.error("ERROR::", error);
  }
  pool.end();
});
app.get("/groupinfo/:id", async (req, res) => {
  const pool = new pg.Client({
  user: "postgres",
  password: "postgres",
  host: "postgres.chyymqmacekb.us-east-2.rds.amazonaws.com",
  port: 5432,
  database: "postgres",
  ssl: {
    rejectUnauthorized: false
  }
});
  try {
    await pool.connect();
    const { id } = req.params;
    const data = await pool.query("SELECT tempgroup.gid, tempgroup.groupname, tempuser.name FROM tempgroup left join tempuser on tempgroup.uid = tempuser.uid WHERE tempgroup.uid = $1;", [id]);
    await res.json(data.rows)
    //console.log(res.json(data.rows));
  } catch (error){
    console.error("ERROR::", error);
  }
  pool.end();
});
app.get("/groupmessages/:id", async (req, res) => {
  const pool = new pg.Client({
  user: "postgres",
  password: "postgres",
  host: "postgres.chyymqmacekb.us-east-2.rds.amazonaws.com",
  port: 5432,
  database: "postgres",
  ssl: {
    rejectUnauthorized: false
  }
});
  try {
    await pool.connect();
    const { id } = req.params;
    const data = await pool.query("select tempuser.name, tempuser.uid, tempuser.gender, groupmessage.gmessage, groupmessage.time from groupmessage left join tempuser on tempuser.uid = groupmessage.uid where groupmessage.gid = $1;", [id]);
    await res.json(data.rows)
    //console.log(res.json(data.rows));
  } catch (error){
    console.error("ERROR::", error);
  }
  pool.end();
});

app.post("/creategroup", async (req, res) => {
  const pool = new pg.Client({
  user: "postgres",
  password: "postgres",
  host: "postgres.chyymqmacekb.us-east-2.rds.amazonaws.com",
  port: 5432,
  database: "postgres",
  ssl: {
    rejectUnauthorized: false
  }
});
  try {
    await pool.connect();
    const { uid, groupname, description } = req.body;
    const message = await pool.query(
      "INSERT INTO tempgroup (uid, groupname, description) VALUES ($1, $2, $3)",
      [uid, groupname, description]
    );
    await res.json(message.rows);
    //console.log(res.json(message.rows));
  } catch {}
  pool.end();
});
app.post("/createuser", async (req, res) => {
  const pool = new pg.Client({
  user: "postgres",
  password: "postgres",
  host: "postgres.chyymqmacekb.us-east-2.rds.amazonaws.com",
  port: 5432,
  database: "postgres",
  ssl: {
    rejectUnauthorized: false
  }
});
  try {
    await pool.connect();
    const { name, gender } = req.body;
    const message = await pool.query(
      "INSERT INTO tempuser (name, gender) VALUES ($1, $2) RETURNING *",
      [name, gender]
    );
    await res.json(message.rows);
    //console.log(res.json(message.rows));
  } catch {}
  pool.end();
});

app.post("/sendgroupmessage", async (req, res) => {
  const pool = new pg.Client({
  user: "postgres",
  password: "postgres",
  host: "postgres.chyymqmacekb.us-east-2.rds.amazonaws.com",
  port: 5432,
  database: "postgres",
  ssl: {
    rejectUnauthorized: false
  }
});
  try {
    await pool.connect();
    const { uid, gid, gmessage } = req.body
    const data = await pool.query("INSERT INTO groupmessage (uid, gid, gmessage) values ($1, $2, $3)", [uid, gid, gmessage]);
    await res.json(data.rows)
    //console.log(res.json(data.rows));
  } catch (error){
    console.error("ERROR::", error);
  }
  pool.end();
});

app.get("/groupmembers/:id", async (req, res) => {
  const pool = new pg.Client({
  user: "postgres",
  password: "postgres",
  host: "postgres.chyymqmacekb.us-east-2.rds.amazonaws.com",
  port: 5432,
  database: "postgres",
  ssl: {
    rejectUnauthorized: false
  }
});
  try {
    await pool.connect();
    const { id } = req.params;
    const data = await pool.query("select tempuser.uid, tempuser.name, tempuser.gender, tempgroup.gid, tempgroup.groupname from gmember left join tempuser on tempuser.uid = gmember.uid left join tempgroup on tempgroup.gid = gmember.gid  where gmember.gid = $1;", [id]);
    await res.json(data.rows)
    //console.log(res.json(data.rows));
  } catch (error){
    console.error("ERROR::", error);
  }
  pool.end();
});
app.post("/joingroup", async (req, res) => {
  const pool = new pg.Client({
  user: "postgres",
  password: "postgres",
  host: "postgres.chyymqmacekb.us-east-2.rds.amazonaws.com",
  port: 5432,
  database: "postgres",
  ssl: {
    rejectUnauthorized: false
  }
});
  try {
    await pool.connect();
    const { gid, uid } = req.body;
    const message = await pool.query(
      "INSERT INTO gmember (gid, uid) VALUES ($1, $2)",
      [gid, uid]
    );
    await res.json(message.rows);
    //console.log(res.json(message.rows));
  } catch {}
  pool.end();
});
app.post("/message", async (req, res) => {
  const pool = new pg.Client({
  user: "postgres",
  password: "postgres",
  host: "postgres.chyymqmacekb.us-east-2.rds.amazonaws.com",
  port: 5432,
  database: "postgres",
  ssl: {
    rejectUnauthorized: false
  }
});
  try {
    await pool.connect();
    const { data, name, gender } = req.body;
    const message = await pool.query(
      "INSERT INTO messages (data, name, gender) VALUES ($1, $2, $3)",
      [data, name, gender]
    );
    await res.json(message.rows);
    //console.log(res.json(message.rows));
  } catch {}
  pool.end();
});
app.get("/ip", async (req, res) => {
  try {
    await res.json(req.ip)
  } catch (error){
    console.error("ERROR::", error);
  }
});
app.post("/ban", async (req, res) => {
  const pool = new pg.Client({
  user: "postgres",
  password: "postgres",
  host: "postgres.chyymqmacekb.us-east-2.rds.amazonaws.com",
  port: 5432,
  database: "postgres",
  ssl: {
    rejectUnauthorized: false
  }
});
  try {
    await pool.connect();
    const message = await pool.query(
      "INSERT INTO bannedips (ip) VALUES ($1)",
      [req.ip]
    );
    await res.json(message.rows);
    //console.log(res.json(message.rows));
  } catch {}
  pool.end();
});
//app.get("/", (req, res) => res.json("works"));

app.get("/hello", async (req, res) => {
  res.json("jello");
});
app.get("/isbanned", async (req, res) => {
    const pool = new pg.Client({
  user: "postgres",
  password: "postgres",
  host: "postgres.chyymqmacekb.us-east-2.rds.amazonaws.com",
  port: 5432,
  database: "postgres",
  ssl: {
    rejectUnauthorized: false
  }
});
  try {
    await pool.connect();
    const message = await pool.query(
      "SELECT ip FROM bannedips WHERE ip = $1",
      [req.ip]
    );
    await res.json(message.rows);
    //console.log(res.json(message.rows));
  } catch {}
  pool.end();
});

app.get("/myconversations/:id", async (req, res) => {
  const pool = new pg.Client({
  user: "postgres",
  password: "postgres",
  host: "postgres.chyymqmacekb.us-east-2.rds.amazonaws.com",
  port: 5432,
  database: "postgres",
  ssl: {
    rejectUnauthorized: false
  }
});
  try {
    await pool.connect();
    const { id } = req.params;
    const data = await pool.query("SELECT pconvo.pcmid, pconvo.suid, pconvo.ruid, tempuser.name FROM pconvo LEFT JOIN tempuser on pconvo.suid = tempuser.uid WHERE pconvo.ruid = $1;", [id]);
    //const data = await pool.query("SELECT * FROM pconvo WHERE pconvo.ruid = $1;", [id]);

    await res.json(data.rows)
    //console.log(res.json(data.rows));
  } catch (error){
    console.error("ERROR::", error);
  }
  pool.end();
});

app.post("/pmessages", async (req, res) => {
  const pool = new pg.Client({
  user: "postgres",
  password: "postgres",
  host: "postgres.chyymqmacekb.us-east-2.rds.amazonaws.com",
  port: 5432,
  database: "postgres",
  ssl: {
    rejectUnauthorized: false
  }
});
  try {
    await pool.connect();
    const { suid, ruid } = req.body;
    //const data = await pool.query("select * from pmessage where pmessage.pcmid = $1", [pcmid]);
    const data = await pool.query("select * from pmessage where pmessage.ruid = $1 and pmessage.suid = $2 or pmessage.ruid = $3 and pmessage.suid = $4", [suid, ruid, ruid, suid]);

    await res.json(data.rows)
    //console.log(res.json(data.rows));
  } catch (error){
    console.error("ERROR::", error);
  }
  pool.end();
});

app.post("/sendpm", async (req, res) => {
  const pool = new pg.Client({
  user: "postgres",
  password: "postgres",
  host: "postgres.chyymqmacekb.us-east-2.rds.amazonaws.com",
  port: 5432,
  database: "postgres",
  ssl: {
    rejectUnauthorized: false
  }
});
  try {
    await pool.connect();
    const {pcmid, suid, ruid, message} = req.body;
    const pm = await pool.query(
      "insert into pmessage (pcmid, suid, ruid, message) values ($1, $2, $3, $4)",
      [pcmid, suid, ruid, message]
    );
    await res.json(pm.rows);
    //console.log(res.json(message.rows));
  } catch {}
  pool.end();
});
app.post("/createconvo", async (req, res) => {
  const pool = new pg.Client({
  user: "postgres",
  password: "postgres",
  host: "postgres.chyymqmacekb.us-east-2.rds.amazonaws.com",
  port: 5432,
  database: "postgres",
  ssl: {
    rejectUnauthorized: false
  }
});
  try {
    await pool.connect();
    const {suid, ruid} = req.body;
    const pm = await pool.query(
      "insert into pconvo (suid, ruid) values ($1, $2), ($2, $1)",
      [suid, ruid]
    );
    await res.json(pm.rows);
    //console.log(res.json(message.rows));
  } catch {}
  pool.end();
});
module.exports.handler = serverless(app);