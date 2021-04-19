const PROXY_CONFIG = [
  {
    context: [
      "/workplace/api",
      "/media"
    ],
    target: "http://localhost:8000",
    secure: false
  }
];

module.exports = PROXY_CONFIG;
