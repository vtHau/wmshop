import * as Yup from 'yup';

export const validateSignIn = Yup.object().shape({
  email: Yup.string()
    .email('Địa chỉ Email không hợp lệ')
    .required('Vui lòng nhập địa chỉ Email'),
  password: Yup.string()
    .min(8, 'Mật khẩu quá ngắn!')
    .max(50, 'Mật khẩu quá dài!')
    .required('Vui lòng nhập mật khẩu'),
});

export const validateSignUp = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Tên quá ngắn')
    .max(50, 'Tên quá dài')
    .required('Vui lòng nhập họ tên'),
  email: Yup.string()
    .email('Địa chỉ Email không hợp lệ')
    .required('Vui lòng nhập địa chỉ Email'),
  password: Yup.string()
    .min(8, 'Mật khẩu quá ngắn')
    .max(50, 'Mật khẩu quá dài')
    .required('Vui lòng nhập mật khẩu'),
  prePassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Mật khẩu không khớp')
    .min(8, 'Mật khẩu quá ngắn')
    .max(50, 'Mật khẩu quá dài')
    .required('Vui lòng nhập lại mật khẩu'),
});

export const validateUpdateProfile = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Tên quá ngắn!')
    .max(50, 'Tên quá dài!')
    .required('Nhập tên của bạn'),
  phone: Yup.string()
    .min(10, 'Số điện thoại không hợp lệ!!!')
    .max(11, 'Số điện thoại không hợp lệ!')
    .required('Nhập số điện thoại của bạn'),
});

export const validateUpdatePassword = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Mật khẩu quá ngắn!')
    .max(50, 'Mật khẩu quá dài!')
    .required('Vui lòng nhập mật khẩu hiện tại của bạn'),
  newPassword: Yup.string()
    .min(8, 'Mật khẩu quá ngắn!')
    .max(50, 'Mật khẩu quá dài!')
    .required('Vui lòng nhập mật khẩu mới của bạn'),
  preNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Mật khẩu không khớp')
    .min(8, 'Mật khẩu quá ngắn!')
    .max(50, 'Mật khẩu quá dài!')
    .required('Vui lòng nhập lại mật khẩu mới của bạn'),
});

export const validateUpdateComment = Yup.object().shape({
  comment: Yup.string()
    .min(2, 'Đánh giá quá ngắn!')
    .max(200, 'Đánh giá quá dài!')
    .required('Vui lòng nhập đánh giá'),
});
