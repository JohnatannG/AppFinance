const RegisterForm = document.getElementById('RegisterForm');

RegisterForm.addEventListener('submit', function(evento){
    evento.preventDefault();

    const nameUser = document.getElementById('nameUser').value;
    const emailUser = document.getElementById('emailUser').value;
    const saldoUser = Number(document.getElementById('saldoUser').value);
    const passwordUser = document.getElementById('passwordUser').value;
    const passwordConfirmation = document.getElementById('passwordConfirmation').value;

    const registrationFormData = {
        nameUser: nameUser,
        emailUser: emailUser,
        saldoUser: saldoUser,
        passwordUser: passwordUser,
    }
    
    if (registrationFormData.nameUser == '' || registrationFormData.emailUser == '' || registrationFormData.saldoUser == '' || registrationFormData.passwordUser == '') {
        const errorInputsNull = document.querySelector('.errorInputsNull');
        errorInputsNull.classList.remove('d-none');
        errorInputsNull.style.display = 'flex';
        errorInputsNull.innerHTML = `
        <div class="d-flex align-items-center gap-3">
            <img src="assets/Error.svg" width='17'>
            <p class='m-0 fs-5'>Existem campos vazios, verifique.</p>
        </div>`;
        return
    };

    if (passwordUser != passwordConfirmation) {
        const errorPassword = document.querySelector('.errorPassword');
        errorPassword.classList.remove('d-none');
        errorPassword.style.display = 'flex';
        errorPassword.innerHTML = `
        <div class="d-flex align-items-center gap-3">
            <img src="assets/Error.svg" width='17'>
            <p class='m-0 fs-5'>As senha não coicidem</p>
        </div>`;
        return
    };

    localStorage.setItem("registrationFormData", JSON.stringify(registrationFormData));
    window.location.href = 'http://127.0.0.1:5500/pages/Home.html'
});