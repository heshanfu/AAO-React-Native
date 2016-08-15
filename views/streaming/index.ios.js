// @flow
/**
 * All About Olaf
 * iOS Media page
 */

import React from 'react'
import {
  StyleSheet,
  View,
  TabBarIOS,
} from 'react-native'
import NavigatorScreen from '../components/navigator-screen'
import tabs from './tabs'

export default class MediaView extends React.Component {
  state = {
    selectedTab: tabs[0].id,
  }

  // Render a given scene
  renderScene() {
    return (
      <View style={styles.container}>
        <TabBarIOS
          tintColor='white'
          barTintColor='darkslateblue'
        >
          {tabs.map(tab =>
            <TabBarIOS.Item
              key={tab.id}
              icon={tab.icon}
              title={tab.title}
              selected={this.state.selectedTab === tab.id}
              onPress={() => this.setState({selectedTab: tab.id})}
            >
              <tab.content />
            </TabBarIOS.Item>)}
        </TabBarIOS>
      </View>
    )
  }

  render() {
    return <NavigatorScreen
      {...this.props}
      title='Media'
      renderScene={this.renderScene.bind(this)}
    />
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
