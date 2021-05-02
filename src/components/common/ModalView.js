import React, {useState} from 'react';
import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';

const ModalView = props => {
  const {modalVisible, handleModal} = props;

  return (
    <>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.boxModal}>
          <View style={styles.modalView}>
            <View style={styles.boxTitle}>
              <Text>Thông báo</Text>
            </View>
            <View style={styles.boxContent}>
              <Text style={{textAlign: 'center'}}>
                Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng
              </Text>
            </View>
            <View style={styles.boxAction}>
              <TouchableOpacity onPress={handleModal}>
                <Text>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ModalView;

const styles = StyleSheet.create({
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
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  boxModal: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: '#fff',
    marginHorizontal: 30,
    marginBottom: 60,
    paddingVertical: 4,
    paddingHorizontal: 20,
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
