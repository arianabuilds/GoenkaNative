import CountdownScreen from './CountdownScreen/CountdownScreen'
import FirstOpenQuestionScreen from './FirstOpenQuestionScreen'
import HistoryScreen from './HistoryScreen/HistoryScreen'
import MultiDeleteScreen from './HistoryScreen/MultiDeleteScreen'
import InitScreen from './InitScreen/InitScreen'
import SettingsScreen from './SettingsScreen/SettingsScreen'
import SyncScreen from './SettingsScreen/SyncScreen/SyncScreen'

export default {
  CountdownScreen,
  FirstOpenQuestionScreen,
  HistoryScreen,
  InitScreen,
  MultiDeleteScreen,
  SettingsScreen,
  SyncScreen,
}

export type ScreenNames =
  | 'CountdownScreen'
  | 'HistoryScreen'
  | 'InitScreen'
  | 'SettingsScreen'
  | 'MultiDeleteScreen'
  | 'SyncScreen'
  | 'FirstOpenQuestionScreen'
