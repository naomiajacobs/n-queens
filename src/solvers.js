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
  var solution = new Board({n: n});
  var solutionCount = 0;

  var findSolutions = function(currentRow) {

    if (currentRow === n) {
      solutionCount++;
      return;
    }

    // console.log('Before work, board is: ', board.rows());

    for (var i = 0; i < n; i++) {
      solution.togglePiece(currentRow, i);

      // if (!!solution.hasAnyRooksConflicts()) {
      //   solution.togglePiece(currentRow, i);
      // }
      // findSolutions(currentRow + 1);

      if(!solution.hasColConflictAt(i)) {
        findSolutions(currentRow + 1);
      }
      solution.togglePiece(currentRow, i);
    }

  };

  findSolutions(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;

};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({'n': n});
  var queens = [];
  // var setQueens = _.once(function() {
  //   queens = solution.rows();
  // });

  var findSolutions = function(currentRow) {

    // if (currentRow === n) {
    //     queens = solution.rows();      
    //   return true;
    // }

    if (solution.hasAnyQueensConflicts()) {
      return false;
    }

    for (var col = 0; col < n; col++) {
      solution.togglePiece(currentRow, col);

      if( currentRow + 1 < n) {
        if (currentRow === n-2) {
          // debugger;
        }
        var passed = findSolutions(currentRow + 1);
        if (passed) {
          return true;
        }
      } else if( solution.hasAnyQueensConflicts() ) {
        solution.togglePiece(currentRow, col);
        if( currentRow + 1 === n ) {
          continue;
        } else {
          return false;
        }
      } else {
        // setQueens();
        queens = solution.rows();
        return true;
      }
      
      if (!passed) {
        solution.togglePiece(currentRow, col);
      }
    }
    return false;
};

  findSolutions(0);

  var myBoard;
  if( queens.length === 0 && n !== 0 ){
    myBoard = new Board({n : n});
  } else {
    myBoard = new Board(queens);
  }


  console.log('Single solution for ' + n + ' queens:', myBoard);

  return myBoard.rows();
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = new Board({n: n});
  var solutionCount = 0;

  var findSolutions = function(currentRow) {

    if (currentRow === n) {

      solutionCount++;
      return;
    }

    // console.log('Before work, board is: ', board.rows());

    for (var i = 0; i < n; i++) {
      solution.togglePiece(currentRow, i);

      // if (!!solution.hasAnyRooksConflicts()) {
      //   solution.togglePiece(currentRow, i);
      // }
      // findSolutions(currentRow + 1);

      if(!solution.hasAnyQueenConflictsOn(currentRow, i)) {
        findSolutions(currentRow + 1);
      }
      solution.togglePiece(currentRow, i);
    }

  };

  findSolutions(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
