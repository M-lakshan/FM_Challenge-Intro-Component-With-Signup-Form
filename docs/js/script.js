let elm_body = document.querySelector('body');
let elm_main = document.querySelector('main');
let elm_form = document.querySelector('form');
let elm_errors = document.querySelectorAll('.errors');
let user_text_inputs = document.querySelectorAll('.user_text_input');
let user_special_inputs = document.querySelectorAll('.user_special_input');
let submit_btn = document.getElementById('submit_btn');
let pwd_visibility = document.getElementById('pwd_visibility');
let input_user_f_name = document.getElementById('user_f_name');
let input_user_l_name = document.getElementById('user_l_name');
let input_user_email = document.getElementById('user_email');
let input_user_pwd = document.getElementById('user_pwd');
let user_f_n_error = document.querySelector('.user_f_n_error');
let user_l_n_error = document.querySelector('.user_l_n_error');
let user_email_error = document.querySelector('.user_em_error');
let user_pwd_error = document.querySelector('.user_pwd_error');
let current_form_height = added_height_for_form = current_elm_body_height = new_elm_body_height = 0;

// keyup eventlistners for each type of inputs
user_text_inputs.forEach(user_text_input => { user_text_input.addEventListener('keyup', error_check); });
user_special_inputs.forEach(user_special_input => { user_special_input.addEventListener('keyup', error_check); });

// pwd field access visibility event
pwd_visibility.addEventListener('click', ()=> { 
    if(pwd_visibility.classList.contains('pending_error')) {
        pwd_visibility.innerHTML = "visibility";
        input_user_pwd.type = "text";
    }
    else {
        pwd_visibility.innerHTML = "visibility_off";
        input_user_pwd.type = "password";
    }
    pwd_visibility.classList.toggle('pending_error');
});

// form validation event for submit btn
submit_btn.addEventListener('click', function(e) {
    e.preventDefault();
    error_check();
});

function error_check() {

    if(input_user_f_name.value == '') {
        user_f_n_error.parentElement.children[0].innerHTML = "First Name cannot be empty";
        user_f_n_error.parentElement.classList.add('active');
        input_user_f_name.classList.add('sts_error');
        input_user_f_name.classList.add('sts_error_emptyfield');
    }
    else {
        input_user_f_name.classList.add('sts_error');
        input_user_f_name.classList.remove('sts_error_emptyfield');

        if(input_user_f_name.value.length <=2) {
            user_f_n_error.parentElement.children[0].innerHTML = "Value is too short for a First Name";
            user_f_n_error.parentElement.classList.add('active');
        }
        else if(input_user_f_name.value.length >=3) {
            let ufn_char_set = input_user_f_name.value.length - 1;
            input_user_f_name.classList.remove('sts_error');
            user_f_n_error.parentElement.classList.remove('active');

            while(ufn_char_set >= 0) {
                if(!(input_user_f_name.value.charCodeAt(ufn_char_set) >= 65 && input_user_f_name.value.charCodeAt(ufn_char_set) <= 122)) {
                    user_f_n_error.parentElement.children[0].innerHTML = "A Name should only consists of letters";
                    user_f_n_error.parentElement.classList.add('active');
                    input_user_f_name.classList.add('sts_error');
                    break;
                }
                ufn_char_set--;
            }
        }
        else {
            user_f_n_error.parentElement.classList.remove('active');
            input_user_f_name.classList.remove('sts_error');
            input_user_f_name.classList.remove('sts_error_emptyfield');
        }
    }

    if(input_user_l_name.value == '') {
        user_l_n_error.parentElement.children[0].innerHTML = "Last Name cannot be empty";
        user_l_n_error.parentElement.classList.add('active');
        input_user_l_name.classList.add('sts_error');
        input_user_l_name.classList.add('sts_error_emptyfield');
    }
    else {
        input_user_l_name.classList.remove('sts_error');
        input_user_l_name.classList.remove('sts_error_emptyfield');

        if(input_user_l_name.value.length <=2) {
            user_l_n_error.parentElement.children[0].innerHTML = "Value is too short for a Last Name";
            user_l_n_error.parentElement.classList.add('active');
        }
        else if(input_user_l_name.value.length >=3) {
            let uln_char_set = input_user_l_name.value.length - 1;
            input_user_l_name.classList.remove('sts_error');
            user_l_n_error.parentElement.classList.remove('active');
            
            while(uln_char_set >= 0) {
                if(!(input_user_l_name.value.charCodeAt(uln_char_set) >= 65 && input_user_l_name.value.charCodeAt(uln_char_set) <= 122)) {
                    console.log(uln_char_set)
                    user_l_n_error.parentElement.children[0].innerHTML = "A Name should only consists of letters";
                    user_l_n_error.parentElement.classList.add('active');
                    input_user_l_name.classList.add('sts_error');
                    break;
                }
                uln_char_set--;
            }
        }
        else {
            user_l_n_error.parentElement.classList.remove('active');
            input_user_l_name.classList.remove('sts_error');
            input_user_l_name.classList.remove('sts_error_emptyfield');
        }
    }

    if(input_user_email.value == '') {
        user_email_error.parentElement.children[0].innerHTML = "Email Address cannot be empty";
        user_email_error.parentElement.classList.add('active');
        input_user_email.classList.add('sts_error_emptyfield');
        input_user_email.value = "";
        input_user_email.classList.add('sts_error');
    }
    else {
        if(input_user_email.value.length <=12) {
            user_email_error.parentElement.children[0].innerHTML = "Looks like this is not an email";
            user_email_error.parentElement.classList.add('active');
            input_user_email.classList.add('sts_error');
            input_user_email.classList.add('pending_error');
            input_user_email.classList.remove('sts_error_emptyfield');
        }
        else if(input_user_email.value.length >=12) {
            let uem_char_set = input_user_email.value.length - 1;
            let provided_string = input_user_email.value;
            input_user_email.classList.remove('sts_error_emptyfield');

            if((provided_string.includes(".")) && !(provided_string.indexOf('.') >= (provided_string.length-3))) {

                while(uem_char_set >= 0) {
                    if(input_user_email.value.charCodeAt(uem_char_set) >= 46 && input_user_email.value.charCodeAt(uem_char_set) <= 122) {
                        if(input_user_email.value.charCodeAt(uem_char_set) >= 58 && input_user_email.value.charCodeAt(uem_char_set) <= 63) {
                            user_email_error.parentElement.children[0].innerHTML = "Provide a valid email address";
                            user_email_error.parentElement.classList.add('active');
                            input_user_email.classList.add('sts_error');
                            input_user_email.classList.add('pending_error');
                            break;
                        }
                        else {
                            user_email_error.parentElement.classList.remove('active');
                            input_user_email.classList.remove('sts_error');
                            input_user_email.classList.remove('pending_error');
                        }
                    }
                    else {
                        user_email_error.parentElement.children[0].innerHTML = "Provide a valid email address";
                        user_email_error.parentElement.classList.add('active');
                        input_user_email.classList.add('sts_error');
                        input_user_email.classList.add('pending_error');
                        break;
                    }
                    uem_char_set--;
                }
            }
            else {
                user_email_error.parentElement.children[0].innerHTML = "Provide the email domain ending correctly";
                user_email_error.parentElement.classList.add('active');
                input_user_email.classList.add('sts_error');
                input_user_email.classList.add('pending_error');
            }
        }
        else {
            user_email_error.parentElement.children[0].innerHTML = "Provide a valid email address";
            user_email_error.parentElement.classList.add('active');
            input_user_email.classList.add('sts_error');
            input_user_email.classList.remove('sts_error_emptyfield');
        }
    }

    if(input_user_pwd.value == '') {
        user_pwd_error.parentElement.children[0].innerHTML = "Password cannot be empty";
        user_pwd_error.parentElement.classList.add('active');
        input_user_pwd.classList.add('sts_error');
        input_user_pwd.classList.add('pending_error');
        input_user_pwd.classList.add('sts_error_emptyfield');
        input_user_pwd.type = "text";
        pwd_visibility.classList.add('active');
        pwd_visibility.innerHTML = "visibility";
    }
    else {
        input_user_pwd.classList.remove('sts_error_emptyfield');
        input_user_pwd.type = "password";
        pwd_visibility.innerHTML = "visibility_off";

        if(input_user_pwd.value.length <=7) {
            user_pwd_error.parentElement.children[0].innerHTML = "Value is too short for a Password";
            user_pwd_error.parentElement.classList.add('active');
            input_user_pwd.classList.add('sts_error');
            input_user_pwd.classList.add('pending_error');
        }
        else if(input_user_pwd.value.length >=7) {
            let upwd_char_set = input_user_pwd.value.length - 1;
            user_pwd_error.parentElement.classList.remove('active');
            input_user_pwd.classList.remove('sts_error');

            while(upwd_char_set >= 0) {
                let defined_pwd_charactor = input_user_pwd.value.charCodeAt(upwd_char_set);
                if(defined_pwd_charactor >= 32 && defined_pwd_charactor <= 126) {
                    switch(defined_pwd_charactor) {
                        case 58: case 59: case 92: case 96: case 124:
                            user_pwd_error.parentElement.children[0].innerHTML = "Skip : ; \\ ` | characters from your password";
                            user_pwd_error.parentElement.classList.add('active');
                            input_user_pwd.classList.add('sts_error');
                            input_user_pwd.classList.add('pending_error');
                            pwd_visibility.innerHTML = "visibility";
                            input_user_pwd.type = "text";
                        break;
                    }
                }
                upwd_char_set--;
            }
        }
        else {
            user_pwd_error.parentElement.classList.remove('active');
            input_user_pwd.classList.remove('sts_error');
            input_user_pwd.classList.remove('pending_error');
        }
    }
        
    elm_errors.forEach(elm_error => {

        if(elm_error.classList.contains('active')) {
            if(!elm_form.classList.contains(".error_triggered")) {
                elm_form.classList.add("error_triggered");
            }
        }
        else {
            if(!elm_form.classList.length>=2) {
                elm_form.classList.remove("error_triggered");
            }
        }

        body_height_resizer();
    });
}

// function to resize the document according to user input errors
function body_height_resizer() {
    
    if(elm_form.classList.contains("error_triggered")) {
        current_form_height = elm_form.clientHeight;
        elm_form.style.height = "fit-content";
        added_height_for_form = elm_form.clientHeight - current_form_height;
        current_elm_body_height = elm_body.clientHeight;
        new_elm_body_height = (current_elm_body_height + added_height_for_form) + 'px';
        elm_main.style.height = new_elm_body_height;
        new_elm_body_height = (current_elm_body_height + 1.2*added_height_for_form) + 'px';
        elm_body.style.height = new_elm_body_height;
        console.log(current_elm_body_height,new_elm_body_height)
    }
}
