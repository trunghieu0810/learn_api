const URL_SYSTEM_V1 = 'http://localhost:3000/api'


export const URL_LOGIN = URL_SYSTEM_V1 + '/user/login'
export const URL_REGISTER = URL_SYSTEM_V1 + '/user/register'
export const URL_FORGET_PASSWORD = URL_SYSTEM_V1 + '/user/forget-password'
export const URL_CONFIRM_CODE = URL_SYSTEM_V1 + '/user/confirm-code'
export const URL_REFRESH = URL_SYSTEM_V1 + '/user/refresh'
export const URL_LOGIN_WITH_GOOGLE = URL_SYSTEM_V1 + '/user/login-with-google'
export const URL_REGISTER_WITH_GOOGLE = URL_SYSTEM_V1 + '/user/register-with-google'
export const URL_GET_SEARCH = URL_SYSTEM_V1 + '/user/search?search='


//Cart
export const URL_GET_CART = URL_SYSTEM_V1 + '/cart/get-cart-user'
export const URL_UPDATE_AVATAR = URL_SYSTEM_V1 + '/user/update-avatar'
export const URL_UPDATE_INFO_USER = URL_SYSTEM_V1 + '/user/update-info-user'
export const URL_QUANTITY_CHANGE = URL_SYSTEM_V1 + '/cart/quantity-change'

//Receipt
export const URL_CREATE_RECEIPT = URL_SYSTEM_V1 + '/receipt/create-new-receipt'
export const URL_GET_PURCHASED_BOOK = URL_SYSTEM_V1 + '/receipt/get-purchased-book'


//Profile
export const URL_GET_ORDER_LIST = URL_SYSTEM_V1 + '/receipt/get-order-list'
export const URL_DELETE_RECEIPT = URL_SYSTEM_V1 + '/receipt/delete-receipt'

// Admin
export const URL_GET_ALL_USER = URL_SYSTEM_V1 + '/admin/get-all-user'
export const URL_GET_ALL_RECEIPT = URL_SYSTEM_V1 + '/admin/get-all-receipt'
export const URL_POST_CONFORM_RECEIPT = URL_SYSTEM_V1 + '/admin/conform-receipt'
export const URL_CATEGORY = URL_SYSTEM_V1 + '/category';
export const URL_PRODUCT = URL_SYSTEM_V1 + '/product';

export const URL_ADD_CART = URL_SYSTEM_V1 + '/product/add-to-cart';

export const URL_DELETE_USER = URL_SYSTEM_V1 + '/admin/delete-user'
export const URL_CHANGE_ROLE_USER = URL_SYSTEM_V1 + '/admin/change-role-user'
export const URL_GET_DASHBOARD = URL_SYSTEM_V1 + '/admin/dashboard'

export const URL_TAG = URL_SYSTEM_V1 + '/tag';