import React from 'react';
import { StyleSheet, Text, View,Picker, ScrollView, TouchableOpacity, Switch} from 'react-native';
import TimePicker from './src/TimePicker';
import ScalarPicker from './src/ScalarPicker';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      min: 0,
      sec: 0,
      minutes:[],
      seconds:[],
      timepicker_visible: false,
      numberOfTabatas: 0,
      restBetweenTabatas: 0,
      roundsPerTabatas: 0,
      timeOn: 0,
      timeOff: 0,
      includeLastRest: false,
      prepTime: 0,
      countDown: 'Every Transition',
      picker: null,
    }
  }

  componentWillMount(){
    for(i=0;i<60;i++){
      this.state.minutes.push(i);
      this.state.seconds.push(i);
    }
  }

  createPickerItem(minute){
    return(<Picker.Item key={minute} style={{color:'blue'}} label={''+minute} value={minute}/>);
  }

  minChange(min){
    this.setState({min:min});
  }

  secChange(sec){
    this.setState({sec:sec});
  }

  //
  tabatasPressed(){

  }

  //Returns the calculated total workout time
  getTotalWorkOutTime(){
    rests = (this.state.includeLastRest?this.state.numberOfTabatas:this.state.numberOfTabatas-1);
    return this.state.prepTime+this.state.numberOfTabatas*this.state.roundsPerTabatas*(this.state.timeOn+this.state.timeOff)+this.state.restBetweenTabatas*rests;
  }

  //Shows the picker for the number of tabatas
  showNumberOfTabatasPicker(){
    if(this.state.picker==null || this.state.picker!='numberOfTabatas'){
      return null;
    }
    else{
      return (<ScalarPicker title='Number of Tabatas' done={()=>this.setState({picker:null})} val={this.state.min} sec={this.state.sec} onChange={this.minChange.bind(this)}/>);
    }
  }

  render() {
    return (
      <View>
        <ScrollView style={styles.container}>
          <View style={styles.bigTimeContainer}>
            <Text style={styles.bigTimeText}>00:00</Text>
          </View>
          <View style={{alignSelf:'center',width:'90%',height:30,backgroundColor:'green',borderRadius:5,marginVertical:10}}/>
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>01/30</Text>
          </View>
          <View style={styles.inputsContainer}>
            <View style={styles.inputRow}>
              <Text style={styles.inputText}>Number of Tabatas</Text>
              <TouchableOpacity onPress={()=>this.setState({picker:'numberOfTabatas'})} style={styles.inputTouchable}>
                <Text style={styles.inputText}>1</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputsContainer}>
            <View style={styles.inputRow}>
              <Text style={styles.inputText}>Rest Between Tabatas</Text>
              <TouchableOpacity onPress={this.tabatasPressed()} style={styles.inputTouchable}>
                <Text style={styles.inputText}>1:50</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputsContainer}>
            <View style={styles.inputRow}>
              <Text style={styles.inputText}>Rounds Per Tabata</Text>
              <TouchableOpacity onPress={this.tabatasPressed()} style={styles.inputTouchable}>
                <Text style={styles.inputText}>1</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputsContainer}>
            <View style={styles.inputRow}>
              <Text style={styles.inputText}>Time On</Text>
              <TouchableOpacity onPress={this.tabatasPressed()} style={styles.inputTouchable}>
                <Text style={styles.inputText}>1:50</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputsContainer}>
            <View style={styles.inputRow}>
              <Text style={styles.inputText}>Time Off</Text>
              <TouchableOpacity onPress={this.tabatasPressed()} style={styles.inputTouchable}>
                <Text style={styles.inputText}>1:50</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputsContainer}>
            <View style={styles.inputRow}>
              <Text style={styles.inputText}>Include Last Rest</Text>
                <Switch style={styles.inputTouchable} value={this.state.includeLastRest} onValueChange={() =>this.setState({includeLastRest:!this.state.includeLastRest})}/>
            </View>
          </View>
          <View style={styles.inputsContainer}>
            <View style={styles.inputRow}>
              <Text style={styles.inputText}>Total Workout Time</Text>
              <TouchableOpacity onPress={this.tabatasPressed()} style={styles.inputTouchable}>
                <Text style={styles.inputText}>{this.getTotalWorkOutTime()}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputsContainer}>
            <View style={styles.inputRow}>
              <Text style={styles.inputText}>Prep Time</Text>
              <TouchableOpacity onPress={this.tabatasPressed()} style={styles.inputTouchable}>
                <Text style={styles.inputText}>{this.state.prepTime}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputsContainer}>
            <View style={styles.inputRow}>
              <Text style={styles.inputText}>Count Down</Text>
              <TouchableOpacity disabled style={styles.inputTouchable}>
                <Text style={styles.inputText}>{this.state.countDown}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TimePicker min={this.state.min} visible={this.state.timepicker_visible} sec={this.state.sec} minChange={this.minChange.bind(this)} secChange={this.secChange.bind(this)}/>
        </ScrollView>
        {this.showNumberOfTabatasPicker()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bigTimeContainer:{
    marginTop:50,
    alignItems:'center',
  },
  bigTimeText:{
    fontSize:100
  },
  progressContainer:{
    alignItems:'center',
    marginBottom:20,
  },
  progressText:{
    fontSize: 80,
    marginVertical:10,
  },
  inputRow: {
    flexDirection:'row',
    backgroundColor:'ghostwhite',
    height:50,
    paddingHorizontal:5,
    alignItems:'center',
    borderBottomWidth:2,
    borderBottomColor:'grey',
  },
  inputText:{
    fontSize:20,
  },
  inputTouchable:{
    marginLeft:'auto',
  },
});
