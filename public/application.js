$(function(){ // on dom ready

  var cy;

  $.get("http://localhost:3000/initial", function(data) {
    generateCytoscape(data, cyTap);
  });


  function generateCytoscape(data, cb) {
    cy = cytoscape({
      container: document.getElementById('cy'),

      boxSelectionEnabled: false,
      autounselectify: true,

      style: cytoscape.stylesheet()
        .selector('node')
          .css({
            'height': 80,
            'width': 80,
            'background-fit': 'cover',
            'border-color': '#000',
            'border-width': 3,
            'border-opacity': 0.5
          })
        .selector('.eating')
          .css({
            'border-color': 'red'
          })
        .selector('.eater')
          .css({
            'border-width': 9
          })
        .selector('edge')
          .css({
            'width': 6,
            'target-arrow-shape': 'triangle',
            'line-color': '#ffaaaa',
            'target-arrow-color': '#ffaaaa',
            'curve-style': 'bezier'
          })
        .selector('#0')
          .css({
            'background-image': getIMGurl(data.nodes[0].data)
          })
        .selector('#1')
          .css({
            'background-image': getIMGurl(data.nodes[1].data)
          })
        .selector('#2')
          .css({
            'background-image': getIMGurl(data.nodes[2].data)
          })
      .selector('#3')
          .css({
            'background-image': getIMGurl(data.nodes[3].data)
          })
      .selector('#4')
          .css({
            'background-image': getIMGurl(data.nodes[4].data)
          })
      .selector('#5')
          .css({
            'background-image': getIMGurl(data.nodes[5].data)
          })
      .selector('#6')
          .css({
            'background-image': getIMGurl(data.nodes[6].data)
          })
      .selector('#7')
          .css({
            'background-image': getIMGurl(data.nodes[7].data)
          }),

      elements: data,
      layout: {
        name: 'breadthfirst',
        directed: true,
        padding: 10
      }
    });
    cb();
  }
  // cy init
  function cyTap() {
    cy.on('tap', 'node', function(){
      var nodeData = this._private.data;
      if (nodeData.unlocked) {
        document.getElementById('frame').src = nodeData.link;
        // update completed and get next step
      }
    });
  }
 // on tap
 function getIMGurl(node) {
   if (node.completed) {
     return '/img/completed';
   } else if (node.unlocked) {
     return '/img/inprogress';
   } else {
     return '/img/locked';
   }
 }


}); // on dom ready
