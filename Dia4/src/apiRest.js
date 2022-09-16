const app = require("./app");
require("./bbdd");

app.listen(app.get("port"), function () {
  console.log("Server listen on port" + app.get("port"));
});