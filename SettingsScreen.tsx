import React, { Component } from 'react'
import { Alert, Platform, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import { Props } from './reducer'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import dayjs from 'dayjs'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import PushNotification from 'react-native-push-notification'

class SettingsScreen extends Component<Props> {
  state = {
    amPickerVisible: false,
    pmPickerVisible: false,
  }

  componentDidUpdate() {
    // Props changed, probably because settings were adjusted
    // Now reset local notifications
    const { amNotification, amNotificationTime, pmNotification, pmNotificationTime } = this.props

    // Clear old notifications
    PushNotification.cancelAllLocalNotifications()

    if (amNotification) {
      PushNotification.localNotificationSchedule({
        date: amNotificationTime,
        message: 'AM sit: Awareness & Equanimity',
        repeatType: 'day',
      })
    }
    if (pmNotification) {
      PushNotification.localNotificationSchedule({
        date: pmNotificationTime,
        message: 'PM sit: Awareness & Equanimity',
        repeatType: 'day',
      })
    }
  }

  async toggleNotification(amOrPm: 'am' | 'pm') {
    const { amNotification, pmNotification, setState } = this.props

    // Check iOS notification permissions
    type iosPermission = {
      alert?: boolean
      badge?: boolean
      sound?: boolean
    }
    let permissions: iosPermission = await new Promise(resolve =>
      PushNotification.checkPermissions(resolve),
    )
    if (!permissions.alert) {
      PushNotification.requestPermissions()
      permissions = await new Promise(resolve => PushNotification.checkPermissions(resolve))
      if (!permissions.alert) {
        Alert.alert(
          'You blocked this app from showing Notifications.',
          'To re-enable, go to Settings.app > Notifications > GoenkaTimer.',
        )
        return
      }
    }

    if (amOrPm === 'am') {
      setState({ amNotification: !amNotification })
    } else if (amOrPm === 'pm') {
      setState({ pmNotification: !pmNotification })
    }
  }

  render() {
    const {
      amNotification,
      amNotificationTime,
      pmNotification,
      pmNotificationTime,
      setState,
    } = this.props

    return (
      <>
        {/* Page title bar */}
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: '#fff3',
            borderTopWidth: 1,
            marginVertical: 25,
            paddingVertical: 7,
          }}
        >
          <Text
            style={{
              alignSelf: 'center',
              color: bodyTextColor,
              fontSize: 11,
              fontWeight: '500',
            }}
          >
            SETTINGS
          </Text>
        </View>

        {/* amNotification switch */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => this.toggleNotification('am')}
          style={s.switchRow}
        >
          <Text style={s.text}>
            <FeatherIcon name="sun" size={22} />
            &nbsp; Notification each morning?
          </Text>
          <Switch
            onValueChange={() => this.toggleNotification('am')}
            style={s.switch}
            thumbColor="white"
            trackColor={{ false: 'null', true: 'rgb(255, 204, 0)' }}
            value={amNotification}
          />
        </TouchableOpacity>

        {/* amNotificationTime button */}
        {amNotification && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => this.setState({ amPickerVisible: true })}
            style={{
              alignSelf: 'center',
              borderColor: '#fff7',
              borderRadius: 8,
              borderWidth: 1,
              marginBottom: 30,
              paddingHorizontal: 15,
              paddingVertical: 9,
            }}
          >
            <Text style={s.text}>{dayjs(amNotificationTime).format('h[:]mm a')}</Text>
          </TouchableOpacity>
        )}
        <DateTimePickerModal
          date={amNotificationTime}
          headerTextIOS={'Set morning time'}
          isVisible={this.state.amPickerVisible}
          maximumDate={new Date('Jan 1 2020 11:59 AM')}
          mode="time"
          onCancel={() => this.setState({ amPickerVisible: false })}
          onConfirm={newTime => {
            setState({ amNotificationTime: newTime })
            this.setState({ amPickerVisible: false })
          }}
        />

        {/* pmNotification switch */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => this.toggleNotification('pm')}
          style={s.switchRow}
        >
          <Text style={s.text}>
            <Ionicons name="ios-moon" size={25} />
            &nbsp;&nbsp; Notification each evening?
          </Text>
          <Switch
            onValueChange={() => this.toggleNotification('pm')}
            style={s.switch}
            thumbColor="white"
            trackColor={{ false: 'null', true: 'rgb(175, 82, 222)' }}
            value={pmNotification}
          />
        </TouchableOpacity>

        {/* pmNotificationTime button */}
        {pmNotification && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => this.setState({ pmPickerVisible: true })}
            style={{
              alignSelf: 'center',
              borderColor: '#fff7',
              borderRadius: 8,
              borderWidth: 1,
              marginBottom: 30,
              paddingHorizontal: 15,
              paddingVertical: 9,
            }}
          >
            <Text style={s.text}>{dayjs(pmNotificationTime).format('h[:]mm a')}</Text>
          </TouchableOpacity>
        )}
        <DateTimePickerModal
          date={pmNotificationTime}
          headerTextIOS={'Set evening time'}
          isVisible={this.state.pmPickerVisible}
          minimumDate={new Date('Jan 1 2020 12:00 PM')}
          mode="time"
          onCancel={() => this.setState({ pmPickerVisible: false })}
          onConfirm={newTime => {
            setState({ pmNotificationTime: newTime })
            this.setState({ pmPickerVisible: false })
          }}
        />

        {/* Back button */}
        <TouchableOpacity
          onPress={() => setState({ screen: 'InitScreen' })}
          style={{
            alignItems: 'center',
            marginTop: 'auto',
            marginVertical: 10,
            paddingBottom: 50,
            paddingTop: 15,
          }}
        >
          <Text style={{ color: 'white', fontSize: 18, opacity: 0.2 }}>Back</Text>
        </TouchableOpacity>
      </>
    )
  }
}

// Shared vars
const bodyTextColor = '#f1f1f1'

const s = StyleSheet.create({
  switch: {
    alignSelf: 'flex-end',
    paddingVertical: 10,
    transform: Platform.OS === 'ios' ? [{ scaleX: 0.8 }, { scaleY: 0.8 }] : [],
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
    maxWidth: 250,
    opacity: 0.8,
  },
})

export default SettingsScreen
