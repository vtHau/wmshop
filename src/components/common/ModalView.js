import React from 'react';
import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';

const ModalView = props => {
  const {
    modalVisible,
    handleModal,
    title,
    titleButton,
    children,
    twoButton,
    closeModal,
  } = props;

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.boxModal}>
        <View style={styles.modalView}>
          <View style={styles.boxContent}>
            <Text style={styles.textContent}>{title || 'Notification'}</Text>
          </View>
          <View style={styles.boxIcon}>{children}</View>
          <View style={styles.boxAction}>
            <TouchableOpacity onPress={handleModal}>
              <Text style={[styles.textAction, twoButton && styles.twoButton]}>
                {titleButton || 'Action'}
              </Text>
            </TouchableOpacity>
            {twoButton && (
              <TouchableOpacity onPress={closeModal}>
                <Text style={[styles.textAction, styles.twoButton]}>
                  Hủy bỏ
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalView;

const styles = StyleSheet.create({
  jusCenter: {
    justifyContent: 'center',
  },
  jusBetween: {
    justifyContent: 'space-between',
  },
  boxIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  twoButton: {
    paddingHorizontal: 14,
  },
  textAction: {
    paddingHorizontal: 40,
    marginHorizontal: 6,
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
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    paddingHorizontal: 10,
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
