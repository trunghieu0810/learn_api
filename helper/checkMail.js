export const CheckMail = (email) => {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let isCheck = regex.test(email)
    return isCheck
}

