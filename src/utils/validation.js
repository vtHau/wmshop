import * as Yup from 'yup';

export const validateSignup = Yup.object().shape({
  email: Yup.string()
    .email('Email khong hop le')
    .required('Vui lòng nhập địa chỉ Email'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Vui lòng nhập mật khẩu'),
});
