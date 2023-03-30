import axios from "axios";

async function sign_up() {
  await axios({
    method: "post",
    url: "http://localhost:3000/sign_up",
    data: {
      email: "fvbbvd@gmail.com",
      password: "llllllfvvvlf",
    },
  }).then(function (response) {
    console.log(response);
  });
}

async function login() {
  await axios({
    method: "post",
    url: "http://localhost:3000/login?email=goskov49@gmail.com&password=helloImGeorge",
  })
    .then(function (response) {
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function refresh() {
  await axios({
    method: "post",
    url: "http://localhost:3000/refresh",
    data: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdvc2tvdjQ5QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiaGVsbG9JbUdlb3JnZSIsImlhdCI6MTY3NDkzMDExMX0.INbsTGpThgHlEwwlBzkosEu_Pwzx4ZDNFuRaaHRA_38",
    },
  }).then(function (response) {
    console.log(response.data);
  });
}

async function getMe() {
  await axios({
    method: "get",
    url: "http://localhost:4000/me9",
    data: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdvc2tvdjQ5QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiaGVsbG9JbUdlb3JnZSIsImlhdCI6MTY3NTA5NzU2NiwiZXhwIjoxNjc1MDk3NjE4fQ.XXRPgt8s2UznAPo7Rn1bPfz50K8V40_Pkwa23D3qL7E",
    },
  }).then(function (response) {
    console.log(response.data);
  });
}

//sign_up()
//await login()
await refresh();
await getMe();
