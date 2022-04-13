const express = require("express");
const nmap = require("libnmap");

const app = express();
const port = 5000;

const options = {
  range: [
    "localhost"
  ],
  ports: "0-10000"
};

let data = null;

nmap.scan(options, (err, report) => {
  if(err) {
    throw new Error(err);
  }

  data = {
    name: "network",
    value: 0,
    children: [
      { 
        name: "host",
        children: [
          { name: "port service", value: 1 },
          { name: "port service", value: 1 },
        ]
      },
    ]
  };

  for(let host in report) {
    let ip = report[host]["host"][0]["address"][0]["item"]["addr"];
    let ports = report[host]["host"][0]["ports"][0]["port"];
    for(let p of ports) {
      if(p["service"]) {
        console.log(p["item"]["portid"], p["service"][0]["item"]["name"]);
      }
    }
  }
});


app.get("/", (req, res) => {
  res.send(data);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
