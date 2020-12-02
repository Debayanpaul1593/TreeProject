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
        date: action.payload,
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
    default:
      return state;
  }
};
const CalendarView = ({dispatch, ...props}) => {
  return (
    <Portal>
      <Modal visible={true}>
        <Calendar
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => {
            console.log('selected day', day);
            dispatch({type: 'SET_DATE', payload: day.dateString});
          }}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={(day) => {
            console.log('selected day', day);
          }}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={'yyyy MM'}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(month) => {
            console.log('month changed', month);
          }}
          // Hide month navigation arrows. Default = false
          //hideArrows={true}
          // Replace default arrows with custom ones (direction can be 'left' or 'right')
          renderArrow={(direction) => <Arrow />}
          // Do not show days of other months in month page. Default = false
          hideExtraDays={true}
          // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false
          disableMonthChange={true}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          firstDay={1}
          // Hide day names. Default = false
          hideDayNames={true}
          // Show week numbers to the left. Default = false
          showWeekNumbers={true}
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          onPressArrowLeft={(subtractMonth) => subtractMonth()}
          // Handler which gets executed when press arrow icon right. It receive a callback can go next month
          onPressArrowRight={(addMonth) => addMonth()}
          // Disable left arrow. Default = false
          disableArrowLeft={true}
          // Disable right arrow. Default = false
          disableArrowRight={true}
          // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
          disableAllTouchEventsForDisabledDays={true}
          // Replace default month and year title with custom one. the function receive a date as parameter.
          renderHeader={(date) => {
            /*Return JSX*/
          }}
          // Enable the option to swipe between months. Default = false
          enableSwipeMonths={true}
        />
      </Modal>
    </Portal>
  );
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
                /*var sItems = selectedItems;
                sItems.push(item.item.key);
                setSelectedItems(sItems);*/
                //set.add(item.item.key);
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
  const [noOfWords, setNoOfWord] = React.useState(0);
  const [title, setTitle] = React.useState('');

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
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TouchableOpacity onPress={() => dispatch({type: 'TOGGLE_CALENDAR'})}>
            <RNTextInput
              style={{marginTop: 20, flexWrap:'wrap'}}
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
            onChangeText={(text) => setNoOfWord(text.split(' ').length)}
            numberOfLines={5}
            style={[styles.genericInputStyle, {borderBottomWidth: 0}]}
            multiline={true}
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
            Words {noOfWords}/100
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
      {redState.showCalendar && <CalendarView dispatch={dispatch} />}
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
