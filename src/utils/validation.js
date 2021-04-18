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
