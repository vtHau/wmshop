import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import {validateSignup} from '../../utils/validation';

function TestVali() {
  const onSubmit = () => {};

  return (
    <View>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={validateSignup}
        onSubmit={values => console.log(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched,
          values,
        }) => (
          <>
            <TextInput
              style={styles.borderInput}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {errors.email && touched.email ? <Text>{errors.email}</Text> : null}
            <TextInput
              style={styles.borderInput}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {errors.password && touched.password ? (
              <Text>{errors.password}</Text>
            ) : null}
            <TouchableOpacity onPress={handleSubmit}>
              <Text>OK</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
}

export default TestVali;

const styles = StyleSheet.create({
  borderInput: {
    borderWidth: 1,
    borderColor: 'red',
  },
});
