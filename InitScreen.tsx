import React from 'react'
import {
  Alert,
  Picker,
  StyleSheet,
  Switch,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native'
import _ from 'lodash'

type InitScreenProps = {
  duration: string
  hasChanting: boolean
  hasExtendedMetta: boolean
  isEnoughTime: boolean
  pressStart: () => void
  setDuration: (d: string) => void
  toggle: (key: string) => () => void
}

const InitScreen = ({
  duration,
  hasChanting,
  hasExtendedMetta,
  isEnoughTime,
  pressStart,
  setDuration,
  toggle,
}: InitScreenProps) => (
  <>
    <Text style={s.text}>How long would you like to sit?</Text>
    <Picker
      itemStyle={{ color: bodyTextColor }}
      onValueChange={setDuration}
      selectedValue={duration}
      style={{
        backgroundColor: 'hsla(0, 0%, 100%, .05)',
        borderRadius: 10,
        marginBottom: 15,
        marginTop: 15,
      }}
    >
      {[1, ..._.range(5, 61, 5), ..._.range(90, 301, 15)].map(String).map((num: string) => (
        <Picker.Item
          key={num}
          label={((n: string) => {
            const hours = Math.floor(Number(n) / 60)
            const minutes = Number(n) % 60
            return `${hours ? `${hours} hr ` : ''}${minutes ? `${minutes} min` : ''}`
          })(num)}
          value={num}
        />
      ))}
    </Picker>
    <TouchableOpacity activeOpacity={0.7} onPress={toggle('hasChanting')} style={s.switchRow}>
      <Text style={s.text}>Include chanting?</Text>
      <Switch onValueChange={toggle('hasChanting')} style={s.switch} value={hasChanting} />
    </TouchableOpacity>
    <TouchableOpacity activeOpacity={0.7} onPress={toggle('hasExtendedMetta')} style={s.switchRow}>
      <Text style={s.text}>Extended mettā? (4 min)</Text>
      <Switch
        onValueChange={toggle('hasExtendedMetta')}
        style={s.switch}
        trackColor={{ false: 'null', true: 'rgb(10, 132, 255)' }}
        value={hasExtendedMetta}
      />
    </TouchableOpacity>
    <TouchableHighlight
      onPress={
        isEnoughTime
          ? pressStart
          : () => {
              Alert.alert(
                'Not enough time',
                'Lengthen the duration, or turn off the optional extras.',
              )
            }
      }
      style={{
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: '#008000',
        borderRadius: btnSize,
        borderWidth: 1,
        height: btnSize,
        justifyContent: 'center',
        marginBottom: 30,
        marginTop: 'auto',
        opacity: isEnoughTime ? 1 : 0.3,
        width: btnSize,
      }}
    >
      <Text
        style={{
          color: '#73d45d',
          fontSize: 18,
          fontWeight: '500',
        }}
      >
        Start
      </Text>
    </TouchableHighlight>
  </>
)

// Shared vars
const bodyTextColor = '#f1f1f1'
const btnSize = 80

const s = StyleSheet.create({
  switch: {
    alignSelf: 'flex-end',
    paddingVertical: 10,
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  switchRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  text: {
    color: bodyTextColor,
    fontSize: 18,
    fontWeight: '400',
    opacity: 0.8,
  },
})

export default InitScreen
