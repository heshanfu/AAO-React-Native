// @flow
/**
 * All About Olaf
 * KSTO page
 */

import React from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Dimensions,
  Image,
} from 'react-native'
import * as c from '../components/colors'
import Icon from 'react-native-vector-icons/Ionicons'
import Video from 'react-native-video'
import {Touchable} from '../components/touchable'
import {TabBarIcon} from '../components/tabbar-icon'
import {promiseTimeout} from '../../lib/promise-timeout'

const kstoStream = 'https://cdn.stobcm.com/radio/ksto1.stream/master.m3u8'
const kstoStatus = 'https://cdn.stobcm.com/radio/ksto1.stream/chunklist.3mu8'
const image = require('../../../images/streaming/ksto/ksto-logo.png')

export default class KSTOView extends React.PureComponent {
  static navigationOptions = {
    tabBarLabel: 'KSTO',
    tabBarIcon: TabBarIcon('radio'),
  }

  player: Video

  state: {
    refreshing: boolean,
    paused: boolean,
    streamError: ?Object,
    uplinkError: boolean,
    message: string,
    metadata: Object[],
  } = {
    refreshing: false,
    paused: true,
    streamError: null,
    uplinkError: false,
    message: '',
    metadata: [],
  }

  // check the stream uplink status
  fetchUplinkStatus = async () => {
    try {
      await promiseTimeout(6000, fetch(kstoStatus))
      this.setState(() => ({uplinkError: false, message: ''}))
    } catch (err) {
      this.setState(() => ({
        uplinkError: true,
        message: 'The KSTO stream is down. Sorry!',
      }))
    }

    // If the stream is down or we had an error, pause the player
    if (this.state.uplinkError) {
      this.setState(() => ({paused: true}))
    }
  }

  changeControl = () => {
    this.setState(state => ({paused: !state.paused}))

    // If we try to play...
    if (this.state.paused) {
      // Fetch the uplink status
      this.fetchUplinkStatus()
    }
  }

  // callback when HLS ID3 tags change
  onTimedMetadata = (data: any) => {
    this.setState(() => ({metadata: data}))
  }

  // error from react-native-video
  onError = (e: any) => {
    this.setState(() => ({streamError: e, paused: true}))
  }

  render() {
    const ErrorMessage = this.state.uplinkError
      ? <Text style={styles.status}>{this.state.message}</Text>
      : null

    return (
      <ScrollView>
        <View style={styles.container}>
          <Logo />
          <PlayPauseButton
            onPress={this.changeControl}
            paused={this.state.paused}
          />
          {ErrorMessage}
          {/*<Song />*/}
          <Title />

          {!this.state.paused
            ? <Video
                ref={ref => (this.player = ref)}
                source={{uri: kstoStream}}
                playInBackground={true}
                playWhenInactive={true}
                paused={this.state.paused}
                onTimedMetadata={this.onTimedMetadata}
                onError={this.onError}
              />
            : null}
        </View>
      </ScrollView>
    )
  }
}

const Logo = () => {
  const viewport = Dimensions.get('window')
  const style = {
    maxWidth: viewport.width / 1.2,
    maxHeight: viewport.height / 2.0,
  }
  return (
    <View style={styles.wrapper}>
      <Image source={image} style={style} />
    </View>
  )
}

const Title = () => {
  const style = {fontSize: Dimensions.get('window').height / 30}
  return (
    <View style={styles.container}>
      <Text selectable={true} style={[styles.heading, style]}>
        St. Olaf College Radio
      </Text>
      <Text selectable={true} style={[styles.subHeading, style]}>
        KSTO 93.1 FM
      </Text>
    </View>
  )
}

// const song = this.state.metadata.length
//     ? <Metadata song={this.state.metadata.CHANGEME} />
//     : null

class PlayPauseButton extends React.PureComponent {
  props: {
    paused: boolean,
    onPress: () => any,
  }

  render() {
    const {paused, onPress} = this.props
    return (
      <Touchable
        style={buttonStyles.button}
        hightlight={false}
        onPress={onPress}
      >
        <View style={buttonStyles.buttonWrapper}>
          <Icon
            style={buttonStyles.icon}
            name={paused ? 'ios-play' : 'ios-pause'}
          />
          <Text style={buttonStyles.action}>
            {paused ? 'Listen' : 'Pause'}
          </Text>
        </View>
      </Touchable>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  wrapper: {
    padding: 10,
  },
  heading: {
    marginTop: 10,
    color: c.kstoPrimaryDark,
    fontWeight: '500',
  },
  subHeading: {
    marginTop: 5,
    marginBottom: 10,
    color: c.kstoPrimaryDark,
    fontWeight: '300',
  },
  // nowPlaying: {
  //   paddingTop: 10,
  //   fontSize: Dimensions.get('window').height / 40,
  //   fontWeight: '500',
  //   color: c.red,
  // },
  // metadata: {
  //   fontSize: Dimensions.get('window').height / 40,
  //   paddingHorizontal: 13,
  //   paddingTop: 5,
  //   color: c.red,
  // },
})

const buttonStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: c.denim,
    width: 200,
    borderRadius: 8,
    overflow: 'hidden',
  },
  buttonWrapper: {
    flexDirection: 'row',
  },
  icon: {
    color: c.white,
    fontSize: 30,
  },
  action: {
    color: c.white,
    paddingLeft: 10,
    paddingTop: 7,
    fontWeight: '900',
  },
})
