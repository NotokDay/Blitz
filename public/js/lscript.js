const form = document.querySelector("form");
eField = form.querySelector(".email"),
    eInput = eField.querySelector("input"),
    pField = form.querySelector(".password"),
    pInput = pField.querySelector("input");

const errorField = document.getElementById('error-status-message');


form.onsubmit = async (e) => {
    e.preventDefault();

    (eInput.value == "") ? eField.classList.add("shake", "error"): checkEmail();
    (pInput.value == "") ? pField.classList.add("shake", "error"): checkPass();

    setTimeout(() => {
        eField.classList.remove("shake");
        pField.classList.remove("shake");
    }, 500);

    eInput.onkeyup = () => { checkEmail(); }
    pInput.onkeyup = () => { checkPass(); }

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

    if (!eField.classList.contains("error") && !pField.classList.contains("error")) {
        // window.location.href = form.getAttribute("action");

        var res = await fetch('/auth/signin', {
            method: "POST",
            mode: "cors", 
            cache: "no-cache", 
            credentials: "same-origin", 
            headers: {
              "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer", 
            body: JSON.stringify({email: eInput.value, password: pInput.value}), 
          });
          
          const responseJson = await res.json();
          if (res.status === 200) {
        
            if (responseJson && responseJson.data && responseJson.data.accessToken) {
              // Save the accessToken to a cookie
              document.cookie = `accessToken=${responseJson.data.accessToken}; expires=Thu, 01 Jan 2099 00:00:00 UTC; path=/`;
          
              // Redirect the page to '/'
              window.location.href = '/';
            } else {
              // Handle the case where the response does not contain the expected data
              console.error('Something went wrong');
            }
          } else {
            // Handle non-200 status codes
            errorField.innerText = `${responseJson.message}`
          }
          
    }
}