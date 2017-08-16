import React from 'react';
import { StyleSheet, Text, View,Picker, TouchableOpacity} from 'react-native';

export default class TimePicker extends React.Component {
  constructor(){
    super();
    this.state = {
      val: 0,
      options:[],
    }
  }

  componentWillMount(){
    for(i=0;i<100;i++){
      this.state.options.push(i);
    }
  }

  createPickerItem(val){
    return(<Picker.Item key={val} label={''+val} value={val}/>);
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
            selectedValue={this.props.val}
            onValueChange={(itemValue, itemIndex) => this.props.onChange(itemValue)}>
            {this.state.options.map(this.createPickerItem)}
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
