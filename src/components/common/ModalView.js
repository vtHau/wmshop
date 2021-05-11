import React from 'react';
import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const ModalView = props => {
  const {title, modalVisible, handleModal} = props;

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.boxModal}>
        <View style={styles.modalView}>
          <View style={styles.boxContent}>
            <Text style={styles.textContent}>{title}</Text>
          </View>
          <View style={styles.boxIcon}>
            <FontAwesome5
              name={'cart-arrow-down'}
              size={40}
              color={'#3b72ff'}
            />
          </View>
          <View style={styles.boxAction}>
            <TouchableOpacity onPress={handleModal}>
              <Text style={styles.textAction}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalView;

const styles = StyleSheet.create({
  boxIcon: {
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAction: {
    paddingHorizontal: 50,
    paddingVertical: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'blue',
    borderRadius: 60,
  },
  textContent: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  boxAction: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxTitle: {
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxContent: {
    padding: 10,
  },
  boxModal: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: '#fff',
    marginHorizontal: 40,
    marginBottom: 60,
    paddingVertical: 4,
    paddingHorizontal: 40,
    borderRadius: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
