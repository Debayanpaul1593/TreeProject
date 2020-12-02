/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  TextInput as RNTextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Router, Scene, Actions} from 'react-native-router-flux';
import DocumentPicker from 'react-native-document-picker';
import {
  Title,
  Headline,
  Appbar,
  TextInput,
  Button,
  Subheading,
  Divider,
  Avatar,
  Modal,
  Portal,
} from 'react-native-paper';
import {NativeModules} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
const FilePicker = NativeModules.FileChooser;
const styles = StyleSheet.create({
  genericInputStyle: {
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 15,
  },
});
const initialState = {
  selectedItems: [],
  page: 0,
  showCalendar: false,
  date: '',
  fileObjects: [],
  title: '',
  description: '',
  options: [
    {
      key: '1',
      title: 'Assign to yourself',
      subtitle: '',
      icon: require('./assets/imgs/man.png'),
    },
    {
      key: '2',
      title: 'Ariene Robertson',
      subtitle: 'Manager',
      icon: require('./assets/imgs/woman.png'),
    },
    {
      key: '3',
      title: 'Dianne Howard',
      subtitle: 'Franchise Manager',
      icon: require('./assets/imgs/woman.png'),
    },
    {
      key: '4',
      title: 'Dianne Howard',
      subtitle: 'Manager',
      icon: require('./assets/imgs/woman.png'),
    },
    {
      key: '5',
      title: 'Franchise Managers',
      subtitle: '6 members',
      icon: require('./assets/imgs/man.png'),
    },
    {
      key: '6',
      title: 'Marketing Team',
      subtitle: '12 members',
      icon: require('./assets/imgs/man.png'),
    },
    {
      key: '7',
      title: 'Robert Fox',
      subtitle: 'Manager',
      icon: require('./assets/imgs/man.png'),
    },
    {
      key: '8',
      title: 'Albert Flores',
      subtitle: 'Franchise Manager',
      icon: require('./assets/imgs/man.png'),
    },
    {
      key: '9',
      title: 'Managers',
      subtitle: '12 members',
      icon: require('./assets/imgs/man.png'),
    },
  ],
};

const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_SELECTED_ITEMS':
      let sItems = state.selectedItems;
      const {key} = action.payload;
      if (sItems.includes(key)) {
        sItems.splice(sItems.indexOf(key), 1);
      } else {
        sItems.push(key);
      }
      return {
        ...state,
        selectedItems: sItems,
      };
    case 'CHANGE_PAGE':
      return {
        ...state,
        page: action.payload,
      };
    case 'TOGGLE_CALENDAR':
      return {
        ...state,
        showCalendar: !state.showCalendar,
      };
    case 'SET_DATE':
      return {
        ...state,
        date: action.payload.toISOString().split('T')[0],
        showCalendar: false,
      };
    case 'UPDATE_FILE_OBJ':
      const files = state.fileObjects;
      for (const file of action.payload) {
        files.push(file);
      }
      return {
        ...state,
        fileObjects: files,
      };
    case 'DELETE_FILE_OBJ':
      let nfiles = state.fileObjects;
      for (let file of nfiles) {
        if (action.payload.name === file.name) {
          nfiles.splice(nfiles.indexOf(file), 1);
          break;
        }
      }
      return {
        ...state,
        fileObjects: nfiles,
      };

    case 'UPDATE_TITLE':
      return {
        ...state,
        title: action.payload,
      };
    case 'UPDATE_DESCRIPTION':
      return {
        ...state,
        description: action.payload,
      };
    default:
      return state;
  }
};

const AssigneePage = ({redState, dispatch, ...props}) => {
  const [keyUpdate, setKeyUpdate] = React.useState('update');
  //var set = new Set();

  return (
    <View style={{flex: 1}} key={keyUpdate}>
      <View style={{flex: 5.5}}>
        <FlatList
          data={redState.options}
          keyExtractor={(item) => item.key}
          renderItem={(item) => (
            <TouchableOpacity
              onPress={() => {
                dispatch({type: 'ADD_TO_SELECTED_ITEMS', payload: item.item});
                setKeyUpdate(new Date().toISOString());
              }}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 26,
                      backgroundColor: '#6723c9',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      style={{width: 36, height: 36}}
                      source={item.item.icon}
                    />
                  </View>
                  {redState.selectedItems.includes(item.item.key) && (
                    <Image
                      style={{
                        width: 18,
                        height: 18,
                        position: 'absolute',
                        bottom: 5,
                        right: 5,
                      }}
                      source={require('./assets/imgs/check.png')}
                    />
                  )}
                </View>
                <View style={{flex: 5}}>
                  <Title>{item.item.title}</Title>
                  <Subheading>{item.item.subtitle}</Subheading>
                </View>
              </View>
              <Divider />
            </TouchableOpacity>
          )}
        />
      </View>
      <View
        style={{
          flex: 0.5,
          justifyContent: 'center',
          paddingLeft: 20,
          paddingRight: 20,
        }}>
        <Button
          mode="contained"
          onPress={() => dispatch({type: 'CHANGE_PAGE', payload: 0})}>
          Apply
        </Button>
      </View>
    </View>
  );
};

const HomePage = ({redState, dispatch, ...props}) => {

  const callFileChooser = async () => {
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      dispatch({type: 'UPDATE_FILE_OBJ', payload: res});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const getData = () => {
    let sItems = redState.selectedItems;
    var dItems = [];
    for (let i = 0; i < sItems.length; i++) {
      if (dItems.length < 3) {
        dItems.push(redState.options[parseInt(sItems[i])]);
      }
    }
    return dItems;
  };
  return (
    <View style={{flex: 1, marginLeft: 20, marginRight: 20}}>
      <View style={{flex: 5.5}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Title>Summary</Title>
          <RNTextInput
            placeholder="Title"
            style={styles.genericInputStyle}
            value={redState.title}
            onChangeText={(text) =>
              dispatch({type: 'UPDATE_TITLE', payload: text})
            }
          />
          <TouchableOpacity onPress={() => dispatch({type: 'TOGGLE_CALENDAR'})}>
            <RNTextInput
              style={{marginTop: 20, flexWrap: 'wrap'}}
              placeholder="Due Date"
              editable={false}
              value={redState.date}
              style={[styles.genericInputStyle, {marginTop: 20}]}
            />
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <Title style={{flex: 5, alignSelf: 'flex-start'}}>Employee</Title>
            <Button
              mode="text"
              style={{flex: 1, alignSelf: 'flex-end'}}
              onPress={() => dispatch({type: 'CHANGE_PAGE', payload: 1})}>
              Assign
            </Button>
          </View>
          {redState.selectedItems.length > 0 && (
            <View style={{flexDirection: 'row'}}>
              <FlatList
                horizontal={true}
                data={getData()}
                keyExtractor={(item) => item.key}
                style={{height: 60, flexWrap: 'wrap'}}
                renderItem={(item) => (
                  <View
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 26,
                      backgroundColor: '#6723c9',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      style={{width: 36, height: 36}}
                      source={item.item.icon}
                    />
                  </View>
                )}
              />
            </View>
          )}

          <Title>Description</Title>
          <RNTextInput
            onChangeText={(text) =>
              dispatch({type: 'UPDATE_DESCRIPTION', payload: text})
            }
            numberOfLines={5}
            style={[styles.genericInputStyle, {borderBottomWidth: 0}]}
            multiline={true}
            value={redState.description}
          />
          <Text
            style={[
              styles.genericInputStyle,
              {
                textAlign: 'right',
                borderTopWidth: 0,
                paddingRight: 10,
              },
            ]}>
            Words {redState.description.split(' ').length}/100
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Title style={{flex: 5, alignSelf: 'flex-start'}}>Attachment</Title>
            <Button
              mode="text"
              style={{flex: 1, alignSelf: 'flex-end'}}
              onPress={() => callFileChooser()}>
              Add
            </Button>
          </View>
          {redState.fileObjects.length > 0 && (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={redState.fileObjects}
              keyExtractor={(item) => item.name}
              renderItem={(item) => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderColor: '#d3d3d3',
                    borderRadius: 2,
                    borderWidth: 1,
                    padding: 10,
                    marginTop: 10,
                  }}>
                  <Image
                    style={{
                      flex: 1,
                      height: 16,
                      width: 12,
                      resizeMode: 'contain',
                    }}
                    source={require('./assets/imgs/clip.png')}
                  />
                  <Text style={{flex: 4}}>{item.item.name}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      dispatch({type: 'DELETE_FILE_OBJ', payload: item.item})
                    }>
                    <Image
                      style={{
                        flex: 1,
                        height: 16,
                        width: 12,
                        resizeMode: 'contain',
                      }}
                      source={require('./assets/imgs/trash.png')}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </ScrollView>
      </View>

      <View style={{flex: 0.5, justifyContent: 'center'}}>
        <Button mode="contained" onPress={() => console.log('Hello World!')}>
          Create Task
        </Button>
      </View>
    </View>
  );
};
const App = () => {
  const [redState, dispatch] = React.useReducer(HomeReducer, initialState);
  return (
    <View style={{flex: 1}}>
      {redState.showCalendar && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => {
            dispatch({type: 'SET_DATE', payload: selectedDate});
          }}
        />
      )}
      <Appbar.Header>
        <Appbar.Content
          title={redState.page === 0 ? 'Create  task' : 'Assign employee'}
        />
      </Appbar.Header>
      {redState.page === 0 ? (
        <HomePage redState={redState} dispatch={dispatch} />
      ) : (
        <AssigneePage redState={redState} dispatch={dispatch} />
      )}
    </View>
  );
};

export default App;
