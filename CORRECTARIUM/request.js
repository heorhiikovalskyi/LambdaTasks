import axios from "axios";

await axios({
  method: "post",
  url: "http://localhost:3000",
  data: {
    mimetype: "pdf",
    language: "ukr",
    count: 10000,
  },
}).then(function (response) {
  console.log(JSON.stringify(response.data, null, 2));
});
