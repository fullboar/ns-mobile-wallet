import { testIdWithKey, IconButton, ButtonLocation } from '@hyperledger/aries-bifold-core'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { DeviceEventEmitter } from 'react-native'

import { NSWalletEventTypes } from '../events/eventTypes'

const AddCredentialButton = () => {
  const { t } = useTranslation()

  const activateSlider = useCallback(() => {
    DeviceEventEmitter.emit(NSWalletEventTypes.ADD_CREDENTIAL_PRESSED, true)
  }, [])

  return (
    <IconButton
      buttonLocation={ButtonLocation.Right}
      accessibilityLabel={t('Credentials.AddCredential')}
      testID={testIdWithKey('AddCredential')}
      onPress={activateSlider}
      icon="plus-circle-outline"
    />
  )
}

export default AddCredentialButton
