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
// let data = {
//   name: "network",
//   value: 0,
//   children: [
//     {
//       name: "host",
//       children: [
//         { name: "port service", value: 1 },
//         { name: "port service", value: 1 },
//       ]
//     },
//   ]
// };


// for(let host in report) {
//   let ip = report[host]["host"][0]["address"][0]["item"]["addr"];
//   data["children"][host]["name"] = ip;
//
//   let ports = report[host]["host"][0]["ports"][0]["port"];
//   console.log(ports);
//   for(let p in ports) {
//     let child = data["children"][host]["children"][p];
//     port = ports[p];
//     if(port["service"]) {
//       portid = port["item"]["portid"];
//       service = port["service"][0]["item"]["name"];
//       child["name"] = `${portid} ${service}`;
//       data["children"][host]["children"][p] = child;
//     }
//   }
// }

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "base.html"));
});


app.post("/scan", asyncMiddleware(async (req, res, next) => {
  // Parse args for custom scan

  const scanOptions = {
    range: [
      "localhost"
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
