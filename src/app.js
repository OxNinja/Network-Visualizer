const express = require("express");
const nmap = require("libnmap");
const path = require("path");

const app = express();
const port = 5000;

const asyncMiddleware = fn =>
  (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "base.html"));
});


app.post("/scan", asyncMiddleware(async (req, res, next) => {
  // Parse args for custom scan
  const scanOptions = {
    range: [
      req.body.target
    ],
    ports: "0-10000"
  };

  let scan = null;
  nmap.scan(scanOptions, (err, report) => {
    if(err) {
      throw new Error(err);
    }

    scan = report;
  });

  // wait the scan to finish
  while(scan == null) {
    await sleep(100);
  }

  // Parse the scan
  let data = [];
  let hosts = Object.keys(scan);
  for(let host = 0; host < hosts.length; host++) {
    data[host] = {};
    let machine = scan[hosts[host]]["host"][0];

    let ip = machine["address"][0]["item"]["addr"];
    data[host]["name"] = ip;

    data[host]["children"] = [];
    let services = machine["ports"][0]["port"];
    for(let port in services) {
      let child = {};
      let service = services[port];
      data[host]["children"][port] = {};
      let portid = service["item"]["portid"];
      child["name"] = `${portid}`;
      child["value"] = 1;
      data[host]["children"][port] = child;
    }
  }

  res.send(data);
}));


app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
