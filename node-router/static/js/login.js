var ologinpost = document.querySelector("#loginpost");
var ologin = document.querySelector("#login");
var username = document.querySelector("#username");
var password = document.querySelector("#password");

ologin.onclick = () => {
  fetch(`api/login?username=${username.value}&password=${password.value}`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    });
};

ologinpost.onclick = () => {
  fetch(`/api/loginpost`, {
    method: "POST",
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    });
};
