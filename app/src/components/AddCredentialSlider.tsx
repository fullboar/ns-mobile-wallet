import { useTheme, Screens, Stacks, testIdWithKey, testIdForAccessabilityLabel } from '@hyperledger/aries-bifold-core'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { DeviceEventEmitter, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { hitSlop } from '../constants'
import { NSWalletEventTypes } from '../events/eventTypes'

export default function AddCredentialSlider() {
  const { ColorPallet, TextTheme } = useTheme()
  const navigation = useNavigation()
  const { t } = useTranslation()

  const [addCredentialPressed, setAddCredentialPressed] = useState<boolean>(false)

  const styles = StyleSheet.create({
    centeredView: {
      marginTop: 'auto',
      justifyContent: 'flex-end',
    },
    outsideListener: {
      height: '100%',
    },
    modalView: {
      backgroundColor: ColorPallet.grayscale.white,
      borderTopStartRadius: 20,
      borderTopEndRadius: 20,
      shadowColor: '#000',
      padding: 20,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    drawerTitleText: {
      ...TextTheme.normal,
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 10,
    },
    drawerContentText: {
      ...TextTheme.normal,
    },
    drawerRow: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginVertical: 12,
    },
    drawerRowItem: {
      color: ColorPallet.grayscale.black,
    },
    closeButton: {
      alignSelf: 'flex-start',
    },
  })

  const deactivateSlider = useCallback(() => {
    DeviceEventEmitter.emit(NSWalletEventTypes.ADD_CREDENTIAL_PRESSED, false)
  }, [])

  const goToScanScreen = useCallback(() => {
    deactivateSlider()
    navigation.getParent()?.navigate(Stacks.ConnectStack, { screen: Screens.Scan })
  }, [deactivateSlider, navigation])

  useEffect(() => {
    const handle = DeviceEventEmitter.addListener(NSWalletEventTypes.ADD_CREDENTIAL_PRESSED, (value?: boolean) => {
      const newVal = value === undefined ? !addCredentialPressed : value
      setAddCredentialPressed(newVal)
    })

    return () => {
      handle.remove()
    }
  }, [addCredentialPressed])

  return (
    <Modal animationType="slide" transparent={true} visible={addCredentialPressed} onRequestClose={deactivateSlider}>
      <TouchableOpacity style={styles.outsideListener} onPress={deactivateSlider} />
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            testID={testIdWithKey('Close')}
            accessibilityLabel={t('Global.Close')}
            accessibilityRole={'button'}
            onPress={deactivateSlider}
            hitSlop={hitSlop}
            style={styles.closeButton}
          >
            <Icon name="window-close" size={35} style={styles.drawerRowItem}></Icon>
          </TouchableOpacity>
          <Text style={styles.drawerTitleText}>{t('AddCredentialSlider.Choose')}</Text>
          <TouchableOpacity
            style={styles.drawerRow}
            onPress={goToScanScreen}
            testID={testIdWithKey(testIdForAccessabilityLabel(t('AddCredentialSlider.ScanQRCode')))}
            accessibilityLabel={t('AddCredentialSlider.ScanQRCode')}
          >
            <Icon name="qrcode" size={30} style={styles.drawerRowItem}></Icon>
            <Text style={{ ...styles.drawerRowItem, marginLeft: 5 }}>{t('AddCredentialSlider.ScanQRCode')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
