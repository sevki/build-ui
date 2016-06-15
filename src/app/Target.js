import React, {PropTypes} from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

export default class Target extends React.Component {
  render() {
    var ListItems = [];
    for (let x of Object.keys(this.props.target)) {
      if (x != "Name"){
      ListItems.push(
        <tr id={x}>
        <td  style={{textAlign:"right", fontWeight:'bold', verticalAlign:'top', paddingRight:'10px'}}>{x}</td>
        <td><pre>{Array.isArray(this.props.target[x])?this.props.target[x].join('\n'):this.props.target[x]}</pre></td>
        </tr>)
      }
    }
    return (<div style={{marginLeft:'5px', overflow:'hidden'}}>
      <h1 style={{paddingLeft:'10px'}} >{this.props.target.Name}</h1>
      <table>
        {ListItems}
      </table>
    </div>);
  }
}

Target.propTypes = {
};
