import { useTheme, testIdWithKey, Button, ButtonType } from '@hyperledger/aries-bifold-core'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View, DeviceEventEmitter } from 'react-native'

import EmptyWallet from '../assets/img/emptyWallet.svg'
import { NSWalletEventTypes } from '../events/eventTypes'
export interface EmptyListProps {
  message?: string
}

const EmptyList = ({ message }: EmptyListProps) => {
  const { t } = useTranslation()
  const { ListItems } = useTheme()
  const [addCredentialPressed, setAddCredentialPressed] = useState<boolean>(false)

  useEffect(() => {
    const handle = DeviceEventEmitter.addListener(NSWalletEventTypes.ADD_CREDENTIAL_PRESSED, (value?: boolean) => {
      const newVal = value === undefined ? !addCredentialPressed : value
      setAddCredentialPressed(newVal)
    })
    return () => {
      handle.remove()
    }
  }, [addCredentialPressed])

  const addCredentialPress = useCallback(() => {
    DeviceEventEmitter.emit(NSWalletEventTypes.ADD_CREDENTIAL_PRESSED, !addCredentialPressed)
  }, [addCredentialPressed])

  return (
    <View style={{ marginTop: 100, height: '100%' }}>
      <EmptyWallet height={200} />
      <Text style={[ListItems.emptyList, { textAlign: 'center' }]} testID={testIdWithKey('NoneYet')}>
        {message || t('Global.NoneYet!')}
      </Text>
      <View style={{ margin: 25 }}>
        <Button
          title={t('Credentials.AddFirstCredential')}
          accessibilityLabel={t('Credentials.AddFirstCredential')}
          testID={testIdWithKey('AddFirstCredential')}
          buttonType={ButtonType.Primary}
          onPress={addCredentialPress}
          disabled={addCredentialPressed}
        ></Button>
      </View>
    </View>
  )
}

export default EmptyList
