/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500,orange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import SvgIcon from 'material-ui/SvgIcon';
import Paper from 'material-ui/Paper';
import Target from './Target'; // Our custom react component
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';


const BlazeIcon = (props) => (
  <SvgIcon {...props}>
   <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
  </SvgIcon>
);


const styles = {
  container: {
    textAlign: 'left',
    paddingTop: 200,
  },
};
const paper = {
  width: 400,
  margin: 0,
  textAlign: 'left',
  display: 'inline-block',
  position: 'absolute',
  left: '20px',
  top: '20px'
};
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

var graph ={
  nodes:[],
  edges:[]
};
var seen = {};
var colors = ["#ff0055",  "#002aff", "#00ff80", "#d4ff00", "#ffaa00", "#ff8000", "#ff2b00"]
var shapes = ["rectangle", "roundrectangle", "ellipse", "triangle", "pentagon", "hexagon", "heptagon", "octagon", "star", "diamond", "vee", "rhomboid", "polygon"]

function traverse(node, name) {

var color = "";
var shape = "";

if (Object.keys(node.Children).length == 0) {
  color = "#feb24c";
  shape = "triangle";
} else {
  color = "#e31a1c";
  shape = "ellipse";
}
if (name=="root") {
  shape="roundrectangle";
  color = "#800026";
}



if (seen[name] == true) {

} else {
  seen[name] = true;
  graph.nodes.push({ data: { id: name, name: node.Url.Target, parent:node.Type.toString(), weight: 0, faveColor:color, faveShape: shape } });
}
for (let x of Object.keys(node.Children)) {
  if (seen[name+x] == true) {
   } else {
      seen[name+x] = true;
      if (Object.keys(node.Children[x].Children).length == 0) {
        color = "#feb24c";
        shape = "triangle";
      } else {
        color = "#e31a1c";
        shape = "hexagon";
      }
      graph.edges.push({ data: { source: x, target: name, faveColor: color, strength: 70 } });
      traverse(node.Children[x], x);
  }
}
}






class Main extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.handleGet = this.handleGet.bind(this);

    var self = this;
    window.selectNode = function(nodeId) {
      if (nodeId == "root") {
        nodeId = self.state.graphUrl;
      }
      const REGEX = /\/\/([\w|\/]*)\:(\w+)/;
      var rgx = nodeId.match(REGEX);
      if (rgx.length <3){

      } else {
      $.getJSON( "/n/"+rgx[1]+"/"+rgx[2], function( data ) {
        self.setState({node:data});
      });
      }

    };
    this.state = {
      loading: false,
      graph: graph,
      graphUrl: "//sys/src/cmd/acme:acme"
    };
  }
  componentDidMount() {
   }
  loadNode() {

  }
  handleChange(event) {
   this.setState({graphUrl: event.target.value});
  }
  handleGet() {
    var self = this;

    this.setState({
      loading: true,
    });
    graph =={
      nodes:[],
      edges:[]
    };
    seen = {};
    const REGEX = /\/\/([\w|\/]*)\:(\w+)/;
    var rgx = this.state.graphUrl.match(REGEX);
    if (rgx.length <3){

    } else {
      $.getJSON( "/g/"+rgx[1]+"/"+rgx[2], function( data ) {
        traverse(data, "root");
        self.setState({
          loading: false,
          graph: graph,
        });
        window.newgraph(graph);
        window.cy.on('tap', function(evt){
          if (evt.cyTarget.id == null ){
            cy.zoom(cy.zoom()+.10);
          } else {
            window.selectNode(evt.cyTarget.id());
            console.log( 'tap ' + evt.cyTarget.id() );
          }
        });
      });
    }
  }

  render() {

    var self = this;
    var btn =function() {
      if (self.state.loading) {
          return (<CircularProgress style={{marginTop:'3px'}} size={0.4} color={deepOrange500}/>);

      } else {

        return (<IconButton onTouchTap={self.handleGet}
                  tooltip="Blaze!" style={{marginTop:'5px', marginRight:'1px'}} iconStyle={{fill:deepOrange500}}>
                    <BlazeIcon  />
        </IconButton>);
      }
    }
     return (
      <div>

      <MuiThemeProvider muiTheme={muiTheme}>

      <div style={paper} >

      <Paper zDepth={3} >
        <Toolbar style={{backgroundColor:'#fff'}}>

             <ToolbarGroup style={{width:'100%'}} firstChild={true}  >
             <TextField
            style={{marginLeft: '10px', marginTop:'6px'}}
            defaultValue={this.state.graphUrl}
            onChange={this.handleChange}
            underlineFocusStyle={{    borderColor: orange500}}
             id="url"
             fullWidth={true}
             />
             </ToolbarGroup>
             <ToolbarSeparator/>
            <ToolbarGroup lastChild={true}  >
            <div style={{width:'50px'}}>
            {btn()}
            </div>
            </ToolbarGroup>
      </Toolbar>
        <Divider />

        { this.state.node == null ? "": <Target target={this.state.node} />}
       </Paper>


      </div>
      </MuiThemeProvider>
      </div>
    );
  }
}

export default Main;
