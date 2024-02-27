import React,{useState} from 'react';
import {ScrollView,StyleSheet,Text,TouchableOpacity,View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = () => (
    <View style={styles.header}>
      <Icon name="menu" size={50} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Calendar</Text>
      <Icon name="person-circle" size={50} />
    </View>
  );

  const EventTimeline = ({ events }) => {
    const currentTime = new Date().getHours() + ':' + new Date().getMinutes();
  
    const calculateCurrentTimePosition = () => {
      const totalMinutes = events.reduce((acc, event) => {
        const [hours, minutes] = event.time.split(':');
        return acc + parseInt(hours) * 60 + parseInt(minutes);
      }, 0);
      const averageMinutes = totalMinutes / events.length;
      const [currentHours, currentMinutes] = currentTime.split(':');
      const currentPosition = (parseInt(currentHours) * 60 + parseInt(currentMinutes)) / averageMinutes;
      return `${currentPosition * 100}%`;
    };
  
    return (
      <View style={styles.timelineContainer}>
        <View style={styles.timelineAxis} />
        
        <ScrollView style={styles.timeline}>
          {events.map((event, index) => (
            <View key={index} style={styles.eventBlock}>
              <Text style={styles.eventTime}>{event.time}</Text>
              <Text style={styles.eventTitle}>{event.title}</Text>
            </View>
          ))}
          <View style={[styles.currentTimeLine, { top: calculateCurrentTimePosition() }]}>
          </View>
        </ScrollView>
      </View>
    );
  };

const CalendarWithEvents = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [day, setDay] = useState('');
  // UseState -> implement adding events functionality
  const [events, setEvents] = useState({
    '2024-02-26': [{ time: '10:00', title: 'CS Project'}, { time: '12:00', title: 'Music Project'}],
    '2024-02-28': [{ time: '10:00', title: 'Final'}],
  });

  const today = new Date();
  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const addNewEvent = () => {
    alert('Add event functionality to be implemented');
  };

  return (
    <View style={styles.container}>
      <Header />
      <Calendar
        style={{
            borderWidth: 1,
            borderColor: 'green',
            height: 320
          }}
        theme={{
            arrowColor: 'green',
            todayTextColor: 'green',
          }}
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: {selected: true, marked: true, selectedColor: 'green'},
        }}
        
      />
      <Text style={styles.day}>{today.toLocaleString('en-US', { weekday: 'long' })}</Text>
      <Text style={styles.reminder}>0 reminders</Text>
      {selectedDate && events[selectedDate] ? (
        <EventTimeline events={events[selectedDate]} />
      ) : (
        <Text style={styles.noEventsText}>No Events</Text>
      )}
      <TouchableOpacity style={styles.addButton} onPress={addNewEvent}>
        <Icon name="add-circle" size={80} color="#009200" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
        },
    container: {
        flex: 1,
        color: 'green',
    },
    eventList: {
        marginTop: 20,
    },
    eventItem: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#009200',
    },
    eventTime: {
        marginRight: 10,
        fontWeight: 'bold',
    },
    timeline: {
        flex: 1,
        padding: 10,
    },
    eventBlock: {
        marginVertical: 5,
        padding: 10,
        backgroundColor: 'rgba(0, 146, 0, 0.1)',
    },
    eventTitle: {
        flex: 1,
    },
    noEventsText: {
        textAlign: 'center',
        marginTop: 20,
    },
    addButton: {
        position: 'absolute',
        right: 40,
        bottom: 40,
      },
    timelineContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    timelineAxis: {
        width: 2,
        backgroundColor: '#009200',
        marginRight: 10,
    },
    currentTimeLine: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: '#FF0000',
    },
    day: {
        fontSize: 20, 
        fontWeight: 'bold',
        left: 20,
    },
    reminder: {
        fontSize: 10,
        left: 20,
    },
});

export default CalendarWithEvents;
