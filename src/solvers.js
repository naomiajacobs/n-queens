/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = new Board({n: n}); 

  for( var i = 0; i < n; i++ ){
    var row = solution.get(i);
    row[i] = 1;

    solution.set(i,row);
  }

  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var Tree = function(value) {
    var newTree = {};
    newTree.value = value;
    newTree.children = [];
    newTree.addChild = function(value) {
      this.children.push(Tree(new Board(value)));
    };
    return newTree;
  };

  var solution = Tree(new Board({n: n}));

  var solutionCount = 0;

  console.log('This is solution: ', solution)

  var runTimes = 0;

  var findSolutions = function(node, currentRow) {

    // console.log('Working on tree level: ', currentRow, 'for n = ', n);
    runTimes++;
    console.log('findSolutions has been called: ' , runTimes);
    debugger;
    for (var i = 0; i < n; i++) {
      node.addChild(node.value.rows()); 
      console.log('Current node is this: ', node.value.rows());
      var childBoard = node.children[i].value;
      childBoard.togglePiece(currentRow, i);
      var newRow = node.value.rows()[i];
      console.log('Current row, i: ', currentRow, i);
      console.log('Attributes are: ', childBoard.attributes);

      if (!(childBoard.hasAnyRooksConflicts())) {
        if (currentRow === n-1) {
          solutionCount++;
        } else {
          findSolutions(node.children[i], currentRow + 1);
        }
      }
    }
  };

  findSolutions(solution, 0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
