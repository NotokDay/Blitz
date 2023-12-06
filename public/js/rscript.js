const form = document.querySelector("form");

nField = form.querySelector(".name"),
nInput = nField.querySelector("input"),

eField = form.querySelector(".email"),
eInput = eField.querySelector("input"),

uField = form.querySelector(".username"),
uInput = uField.querySelector("input"),

pField = form.querySelector(".password"),
pInput = pField.querySelector("input");

const statusField = document.getElementById('status-message-box');


form.onsubmit = async (e) =>  {
    e.preventDefault();

    (nInput.value == "") ? nField.classList.add("shake", "error"): checkName();
    (eInput.value == "") ? eField.classList.add("shake", "error"): checkEmail();
    (uInput.value == "") ? uField.classList.add("shake", "error"): checkUsername();
    (pInput.value == "") ? pField.classList.add("shake", "error"): checkPass();

    setTimeout(() => {
        nField.classList.remove("shake");
        eField.classList.remove("shake");
        uField.classList.remove("shake");
        pField.classList.remove("shake");
    }, 500);

    nInput.onkeyup = () => { checkName(); }
    eInput.onkeyup = () => { checkEmail(); }
    uInput.onkeyup = () => { checkUsername(); }
    pInput.onkeyup = () => { checkPass(); }

    function checkName() {
        if (nInput.value == "") {
            nField.classList.add("error");
            nField.classList.remove("valid");
        } else {
            nField.classList.remove("error");
            nField.classList.add("valid");
        }
    }

    function checkUsername() {
        if (uInput.value == "") {
            uField.classList.add("error");
            uField.classList.remove("valid");
        } else {
            uField.classList.remove("error");
            uField.classList.add("valid");
        }
    }

    function checkEmail() {
        let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!eInput.value.match(pattern)) {
            eField.classList.add("error");
            eField.classList.remove("valid");
            let errorTxt = eField.querySelector(".error-txt");

            (eInput.value != "") ? errorTxt.innerText = "Enter a valid email address": errorTxt.innerText = "Email can't be blank";
        } else {
            eField.classList.remove("error");
            eField.classList.add("valid");
        }
    }

    function checkPass() {
        if (pInput.value == "") {
            pField.classList.add("error");
            pField.classList.remove("valid");
        } else {
            pField.classList.remove("error");
            pField.classList.add("valid");
        }
    }

    if (!nField.classList.contains("error") && !eField.classList.contains("error") && !uField.classList.contains("error") && !pField.classList.contains("error")) {

        var res = await fetch('/auth/register', {
            method: "POST",
            mode: "cors", 
            cache: "no-cache", 
            credentials: "same-origin", 
            headers: {
              "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer", 
            body: JSON.stringify({fullname: nInput.value, email: eInput.value, username: uInput.value, password: pInput.value}), 
          });
          
          const responseJson = await res.json();
          if (res.status === 201) {
            if (responseJson && responseJson.status) {          
                console.log(responseJson.status)
                statusField.innerHTML = `<p style="color: green;">${responseJson.message}</p>`
                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);
            } else {
              console.error('Something went wrong');
            }
          } else {
            // Handle non-200 status codes
            console.error(`Request failed with status: ${res.status}`);
            statusField.innerHTML = `<p style="color: red;">${responseJson.message}</p>`
          }
          
    }
}