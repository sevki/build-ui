import React, {PropTypes} from 'react';
import cytoscape  from 'cytoscape';

var graph ={
  nodes:[],
  edges:[]
};
var seen = {};
var colors = ["#ff0055", "#ff00aa", "#ff00ff", "#002aff", "#007fff", "#00aaff", "#00ffff", "#00ff80", "#d4ff00", "#ffaa00", "#ff8000", "#ff2b00"]
var shapes = ["rectangle", "roundrectangle", "ellipse", "triangle", "pentagon", "hexagon", "heptagon", "octagon", "star", "diamond", "vee", "rhomboid", "polygon"]

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
  }

   render() {

     var self = this;
     var cyDiv = document.createElement("div");
      var   cy = cytoscape({

  container: cyDiv, // container to render in

  elements: self.props.graph,

  style: [ // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        'background-color': '#666',
        'label': 'data(id)'
      }
    },

    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle'
      }
    }
  ],
  layout: {
    name: 'cose',
    padding: 10
  },


  });
  cy.on('tap', function(evt){
    if (evt.cyTarget.id == null ){
      cy.zoom(cy.zoom()+.10);
    } else {
      window.selectNode(evt.cyTarget.id());
      console.log( 'tap ' + evt.cyTarget.id() );
    }
  });
     return (<div id="cy"  />);
  }
}

Graph.propTypes = {
};
