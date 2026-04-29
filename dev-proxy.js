const http = require("http");
const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer({});

const routes = [
  { path: "/market", target: "http://localhost:3002" },
  { path: "/learn", target: "http://localhost:3003" },
  { path: "/exam", target: "http://localhost:3004" },
  { path: "/pharmacy", target: "http://localhost:3005" },
  { path: "/clinic", target: "http://localhost:3006" },
  { path: "/tools", target: "http://localhost:3007" },
  { path: "/insurance", target: "http://localhost:3008" },
  { path: "/download", target: "http://localhost:3009" },
];

const defaultTarget = "http://localhost:3001";

const server = http.createServer((req, res) => {
  const url = req.url || "/";

  const route = routes.find(
    (r) => url === r.path || url.startsWith(r.path + "/"),
  );

  const target = route ? route.target : defaultTarget;

  proxy.web(
    req,
    res,
    {
      target,
      changeOrigin: true,
    },
    (error) => {
      console.error("Proxy error:", error);
      if (!res.headersSent) {
        res.writeHead(502, { "Content-Type": "text/plain; charset=utf-8" });
      }
      res.end("Proxy error");
    },
  );
});

server.on("connect", (req, socket) => {
  socket.end();
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Dev proxy running on http://localhost:${PORT}`);
});

