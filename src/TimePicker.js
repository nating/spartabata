import React from 'react';
import { StyleSheet, Text, View,Picker, TouchableOpacity} from 'react-native';

export default class TimePicker extends React.Component {
  constructor(){
    super();
    this.state = {
      min: 0,
      sec: 0,
      minutes:[],
      seconds:[],
    }
  }

  componentWillMount(){
    for(i=0;i<60;i++){
      this.state.minutes.push(i);
      this.state.seconds.push(i);
    }
  }

  createPickerItem(minute){
    return(<Picker.Item key={minute} label={''+minute} value={minute}/>);
  }

  render() {
    if(this.props.visible==false){
      return null;
    }
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titleText}>{this.props.title}</Text>
          <TouchableOpacity onPress={()=>this.props.done()} style={styles.doneTouchable}>
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={this.props.min}
            onValueChange={(itemValue, itemIndex) => this.props.minChange(itemValue)}>
            {this.state.minutes.map(this.createPickerItem)}
          </Picker>
          <Picker
            style={styles.pickerLabel}>
            <Picker.Item label="Min" value="java" />
          </Picker>
          <Picker
            style={styles.picker}
            selectedValue={this.props.sec}
            onValueChange={(itemValue, itemIndex) => this.props.secChange(itemValue)}>
            {this.state.minutes.map(this.createPickerItem)}
          </Picker>
          <Picker
            style={styles.pickerLabel}>
            <Picker.Item label="Sec" value="java" />
          </Picker>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    zIndex:1,
    width:'100%',
    height:'55%',
    position:'absolute',
    bottom:0,
    flexDirection:'column',
    backgroundColor:'ghostwhite',
  },
  header:{
    width:'100%',
    height:40,
    backgroundColor:'gainsboro',
    flexDirection:'row',
  },
  titleText:{
    fontSize:20,
    alignSelf:'center',
    textAlign:'center',
    marginLeft:15,
  },
  doneTouchable:{
    justifyContent:'center',
    marginLeft:'auto',
    marginRight:5
  },
  doneText:{
    fontSize:18,
    color:'dodgerblue',
  },
  pickerContainer:{
    width:'100%',
    marginVertical:100,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    height:30,
  },
  picker:{
    width:70,
  },
  pickerLabel:{
    width:50,
  },
});
