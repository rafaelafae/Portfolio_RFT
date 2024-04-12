// class FormSubmit {
//   constructor(settings) {
//     this.settings = settings;
//     this.form = document.querySelector(settings.form);
//     this.formButton = document.querySelector(settings.button);

//     if (this.form) {
//       this.url = this.form.getAttribute("action");
//     }
//   }

//   displaySuccess() {
//     this.form.innerHTML = this.settings.success;
//   }

//   displayError() {
//     this.form.innerHTML = this.settings.error;
//   }

//   getFormObject() {
//     const formObject = document.getElementById("form");
// const username = document.getElementById("username");
// const email = document.getElementById("email");
// const subject = document.getElementById("subject");
// const message = document.getElementById("message");
//   }

//   async sendForm() {
//     try {
//     await fetch(this.url, {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//       },
//       body: "",
//     });
//     this.displaySuccess();
//     } catch {
//       this.displayError(error);
//     }
//   }

//   init() {
//     if (this.form) this.formButton.addEventListener("click", => this.displaySuccess());
//     return this;
//   }
// }

// const FormSubmit = new FormSubmit({
//   form: "[data-form]",
//   button: "[data-button]",
//   sucess: "<h1 class="success">Mensagem enviada!</h1>",
//   error: "<h1 class="error">Não foi possível enviar sua mensagem.</h1>"
// });

const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
});

// Função para realizar as validações dos inputs
function checkInputs() {
  const usernameValue = username.value;
  const emailValue = email.value;
  const subjectValue = subject.value;
  const messageValue = message.value;

  if (usernameValue === "") {
    setErrorFor(username, "O nome é obrigatório.");
  } else {
    setSuccessFor(username);
  }

  if (emailValue === "") {
    setErrorFor(email, "O email é obrigatório.");
  } else if (!checkEmail(emailValue)) {
    setErrorFor(email, "Por favor, insira um email válido.");
  } else {
    setSuccessFor(email);
  }

  if (subjectValue === "") {
    setErrorFor(subject, "O assunto é obrigatório.");
  } else {
    setSuccessFor(subject);
  }

  if (messageValue === "") {
    setErrorFor(message, "A mensagem é obrigatória.");
  } else if (messageValue.length < 20) {
    setErrorFor(message, "A messagem deve ter no mínimo 20 caracteres.");
  } else {
    setSuccessFor(message);
  }

  const formControls = form.querySelectorAll(".form__control");

  const formIsValid = [...formControls].every((formControl) => {
    return formControl.className === "form__control success";
  });

  if (formIsValid) {
    console.log("O formulário esta 100% válido!");
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
