// --- Nav bar media (max-width: 800px) ---//

const toggleButton = document.getElementsByClassName("toggle-button")[0];
const navbarLinks = document.getElementsByClassName("navbar-links")[0];

toggleButton.addEventListener("click", () => {
  navbarLinks.classList.toggle("active");
});

// -----  GLOBAL VARIABLES ------ //
let userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"));
console.log(userLoggedIn);

import { printMainContent, printLoginContent } from "./main.js";
import { printLoginForm, getUser } from "./login.js";
import { printSignUpForm, addNew } from "./signUp.js";
import { subsctibtionHandeler } from "./stopSubscribe.js";
import { getAdminInfo, printAdminContent } from "./admin.js";
//import {} from "./stopSubscribe.js";*/

//-------------- EVENTLISTENERS --------------- //
window.addEventListener("load", () => {
  updateDom();
});
// // handels homeBtn
// let homeBtn = document.getElementById("home-btn");
// homeBtn.addEventListener("click", () => {
//   updateDom();
// });
// //handel loginform
// let loginBtn = document.getElementById("login-btn");
// loginBtn.addEventListener("click", (e) => {
//   console.log(e.target);
//   console.log("LOGIN FORM");

//   printLoginForm();
// });
// // handels signupform
// let signUp = document.getElementById("singUp-btn");

// signUp.addEventListener("click", () => printSignUpForm());
// let adminBtn = document.getElementById("admin-btn");
// adminBtn.addEventListener("click", () => printAdminContent());

//--------------  GLOBAL EVENTLISTENERS --------------- //
window.addEventListener("click", (e) => {
  if (e.target.matches(".login-btn")) {
    printLoginForm();
  }

  if (e.target.matches(".home-btn")) {
    updateDom();
  }

  if (e.target.matches(".logOut-btn")) {
    localStorage.removeItem("userLoggedIn");
    userLoggedIn = null;
    updateDom();
  }

  if (e.target.matches(".admin-btn")) {
    console.log("click");

    getAdminInfo().then((users) => printAdminContent(users));
  }

  if (e.target.matches(".signUp-btn")) {
    printSignUpForm();
  }

  // --------  eventlisteners submit form -------- //

  if (e.target.matches("#submit-login")) {
    let userName = document.querySelector("#userName");
    let loginPassword = document.querySelector("#loginPassword");
    console.log(userName, loginPassword);

    if (userName.value.trim() != "" && loginPassword.value.trim() != "") {
      let loginUser = {
        userName: userName.value.trim(),
        password: loginPassword.value.trim(),
      };
      getUser(loginUser).then((user) => {
        userLoggedIn = user; // set global variabel to user. user comes from EndpointCall
        updateDom(user);
      });

      //printLoginContent(user.userName);
    } else {
      alert("you must complete all necessary fields");
    }
  }

  // --------  eventlisteners SignUp  form -------- //
  if (e.target.matches("#submit-new-btn")) {
    e.preventDefault();

    let fName = document.querySelector("#fName");
    let lName = document.querySelector("#lName");
    let userName = document.querySelector("#userName");
    let regEmail = document.querySelector("#regEmail");
    let regPassword = document.querySelector("#regPassword");
    let checkbox = document.querySelector("#checkbox");

    if (
      fName.value.trim() !== "" &&
      lName.value.trim() !== "" &&
      userName.value.trim() !== "" &&
      regEmail.value.trim() !== "" &&
      regPassword.value.trim() !== ""
    ) {
      //new user object using user input
      let newUser = {
        fName: fName.value.trim(),
        lastName: lName.value.trim(),
        userName: userName.value.trim(),
        email: regEmail.value.trim(),
        password: regPassword.value.trim(),
        admin: false,
        subscribed: checkbox.checked,
      };
      //clear all fields
      //clearFields();

      addNew(newUser);
      updateDom();
    } else {
      alert("you must complete all necessary fields");
    }
  }
  // --------  eventlisteners Stop subrscribe -------- //
  if (e.target.matches(".stop")) {
    console.log(e.target);
    let subscribtion = {
      subscribed: userLoggedIn.userLoggedIn[0].subscribed ? false : true,
    };
    //ls
    let LSuser = JSON.parse(localStorage.getItem("userLoggedIn"));
    console.log(LSuser);

    //update
    userLoggedIn.userLoggedIn[0].subscribed = userLoggedIn.userLoggedIn[0]
      .subscribed
      ? false
      : true;

    // if (JSON.stringify(LSuser) === JSON.stringify(userLoggedIn)) {
    //   console.log("hej");
    // } else {
    //   console.log(userLoggedIn);
    // }

    localStorage.setItem("userLoggedIn", JSON.stringify(userLoggedIn));
    console.log(userLoggedIn);

    subsctibtionHandeler(userLoggedIn.userLoggedIn[0]._id, subscribtion);
    updateDom();
  }
});

// -------- ENDPOINT CALLS -------- //

// ---- DOM Functions ---- ///
function updateDom() {
  let navbar = document.querySelector(".navbar-links > ul");

  console.log("print maincontent");

  if (userLoggedIn) {
    let liTamplate = ` 
    <li id="home-btn"><a class="home-btn">Home</a></li>
    <li id="logOut-btn"><a class="logOut-btn">LogOut</a></li>
    ${
      userLoggedIn.userLoggedIn[0].admin
        ? '<li id="admin-btn"><a class="admin-btn">Admin</a></li> '
        : "<li></li> "
    } `;

    navbar.innerHTML = liTamplate;
    printLoginContent(userLoggedIn);
  } else {
    let liTamplate = ` 
          <li id="home-btn"> <a class="home-btn"> Home</a></li>
          <li id="login-btn"><a class="login-btn" >Login</a></li>
          <li id="signUp-btn"><a class="signUp-btn">Sign up</a></li>
          
              `;
    navbar.innerHTML = liTamplate;

    printMainContent();
  }
}
