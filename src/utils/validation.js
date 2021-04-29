import * as Yup from 'yup';

export const validateSignIn = Yup.object().shape({
  email: Yup.string()
    .email('Email khong hop le')
    .required('Vui lòng nhập địa chỉ Email'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Vui lòng nhập mật khẩu'),
});

export const validateSignUp = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Vui lòng nhập họ tên'),
  email: Yup.string()
    .email('Email khong hop le')
    .required('Vui lòng nhập địa chỉ Email'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Vui lòng nhập mật khẩu'),
  prePassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Mật khẩu không khớp')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Vui lòng nhập mật khẩu'),
});

export const validateUpdateProfile = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Tên quá ngắn!')
    .max(50, 'Tên quá dài!')
    .required('Nhập tên của bạn'),
  phone: Yup.string()
    .min(1, 'Số điện thoại quá ngắn!')
    .max(50, 'Số điện thoạin quá dài!')
    .required('Nhập số điện thoại của bạn'),
  status: Yup.string()
    .min(1, 'Trạng thái quá ngắn!')
    .max(50, 'Trạng thái dài!')
    .required('Nhập trạng thái của bạn'),
});

export const validateUpdatePassword = Yup.object().shape({
  password: Yup.string()
    .min(2, 'Mật khẩu quá ngắn!')
    .max(50, 'Mật khẩu quá dài!')
    .required('Vui lòng nhập mật khẩu hiện tại của bạn'),
  newPassword: Yup.string()
    .min(2, 'Mật khẩu quá ngắn!')
    .max(50, 'Mật khẩu quá dài!')
    .required('Vui lòng nhập mật khẩu mới của bạn'),
  preNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Mật khẩu không khớp')
    .min(2, 'Mật khẩu quá ngắn!')
    .max(50, 'Mật khẩu quá dài!')
    .required('Vui lòng nhập lại mật khẩu mới của bạn'),
});
