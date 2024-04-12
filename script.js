const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();

  // Ckeck if all form controls have 'success' class
  const formControls = form.querySelectorAll(".form__control");
  const formIsValid = [...formControls].every((formControl) => {
    return formControl.className === "form__control success";
  });

  if (formIsValid) {
    console.log("Enviando formulário válido...");
    // Submit form data here
    form.submit();
  } else {
    // Form is not valid, do nothing or display an error message
    console.log("O formulário não está válido.");
  }
});

// Validation inputs
function checkInputs() {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const subjectValue = subject.value.trim();
  const messageValue = message.value.trim();

  // Name validation
  if (usernameValue === "") {
    setErrorFor(username, "O nome é obrigatório.");
  } else {
    setSuccessFor(username);
  }

  // Email validation
  if (emailValue === "") {
    setErrorFor(email, "O email é obrigatório.");
  } else if (!checkEmail(emailValue)) {
    setErrorFor(email, "Por favor, insira um email válido.");
  } else {
    setSuccessFor(email);
  }

  // Subject validation
  if (subjectValue === "") {
    setErrorFor(subject, "O assunto é obrigatório.");
  } else {
    setSuccessFor(subject);
  }

  // Message validation
  if (messageValue === "") {
    setErrorFor(message, "A mensagem é obrigatória.");
  } else if (messageValue.length < 20) {
    setErrorFor(message, "A messagem deve ter no mínimo 20 caracteres.");
  } else {
    setSuccessFor(message);
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  // Menssagem de erro
  small.innerText = message;

  // Classe de erro
  formControl.className = "form__control error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;

  //Classe de sucesso
  formControl.className = "form__control success";
}

function checkEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
