# Network Visualizer

Here is a tool to visualize `nmap` scans.

It runs on loopback by default, so you can expose this server to your teammates during a CTF.

## Use

### Docker image

```sh
docker build -t network-visualizer:latest .
docker run network-visualizer
```

### Start NodeJS app

```sh
node src/app.js
```

