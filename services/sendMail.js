import emailjs from 'emailjs-com';

export const sendCode = async (code, email) => {

    emailjs.init("user_K1g5N5hUDI0rjsa1uRoI4");
    emailjs.send("service_mkluihx", "template_plasdgf", {
        code: code,
        To_mail: email,
    })
        .then((response) => {
            console.log('Success 200 OK');
            return true
        }, (err) => {

            console.log('FAILED...', err);
            return false
        });
}