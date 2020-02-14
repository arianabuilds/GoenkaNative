import React, { useState } from 'react'
import { Alert } from 'react-native'

import { Props } from './reducer'

function FirstOpenQuestionScreen({ isOldStudent, setState }: Props) {
  const [shownPrompt, setShownPrompt] = useState(false)

  if (isOldStudent !== null) {
    setState({ screen: 'InitScreen' })
  } else if (!shownPrompt) {
    setShownPrompt(true)
    Alert.alert('Welcome', 'Have you completed a Vipassana course taught by S.N. Goenka?', [
      {
        onPress: () => {
          setState({ isOldStudent: true })
          Alert.alert('Welcome, fellow meditator', 'For help and/or questions, email: hi@goenka.app', [
            { onPress: () => setState({ screen: 'InitScreen' }), text: 'OK' },
          ])
        },
        text: 'Yes',
      },
      {
        onPress: () => {
          setState({ isOldStudent: false })
          Alert.alert(
            'Welcome',
            `You are still welcome to use this app, but it may not be as useful for you until you complete a 10-day Vipassana meditation course.

The courses are freely offered without charge, by Old Students who wish to share this technique with others.

Visit _dhamma.org_ for more information.

For help and/or questions with this app, email hi@goenka.app`,
            [{ onPress: () => setState({ screen: 'InitScreen' }), text: 'OK' }],
          )
        },
        style: 'destructive',
        text: 'No',
      },
    ])
  }

  return <></>
}

export default FirstOpenQuestionScreen
