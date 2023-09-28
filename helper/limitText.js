export const limitText = (limitField, limitNum) => {
    if (limitField.target.value.length > limitNum) {
        limitField.target.value = limitField.target.value.substring(0, limitNum);
    }
}