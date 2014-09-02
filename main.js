;(function() {
    var rows;
    var cols;

    var reds = 0;
    var blues = 0;
    var greens = 0;

    var boardColors = [];

    var total;

    // Helper function to get row
    function getTile(row, col) {
      return $('.tile-row:nth(' + row + ') > .tile:nth(' + col + ')');
    }

    function setColor(row, col, color) {
      // Update our representation of the tile's color
      boardColors[row][col] = color;

      // Change the page's representation
      getTile(row, col).removeClass('red')
                       .removeClass('green')
                       .removeClass('blue')
                       .addClass(color);
    }

    function move(e, r, c) {
      // Grab the stored color
      var color = boardColors[r][c];

      // We can only click the green tiles, else do nothing
      if(color == 'green') {
        // Clicked tiles turn red
        setColor(r, c, 'red');

        // Update totals
        reds++;
        greens--;

        // Find the neighbors, checking for valid rows and cols
        var $up = (r > 0) ? getTile(r - 1, c) : null; 
        var $down = (r < rows - 1) ? getTile(r + 1, c) : null;
        var $left = (c > 0) ? getTile(r, c - 1) : null;
        var $right = (c < cols - 1) ? getTile(r, c + 1) : null;
        var $neighbors = [{tile: $up,    row: r - 1, col: c}, 
                          {tile: $down,  row: r + 1, col: c}, 
                          {tile: $left,  row: r,     col: c - 1}, 
                          {tile: $right, row: r,     col: c + 1}];

        // Loop over each element in the $neighbors list
        // Note how this is done with a callback that takes 3 arguments
        $neighbors.forEach(function($neighbor, i, array) {
          // Make sure the neighbor actually exists
          if($neighbor.tile) {
            var neighbor_color = boardColors[$neighbor.row][$neighbor.col];

            if(neighbor_color === 'green') {
              // Green flips to blue
              setColor($neighbor.row, $neighbor.col, 'blue');

              // Update totals
              if(greens > 0) { 
                greens--; 
              }
              blues++;
            } else if(neighbor_color === 'blue') {
              // Blue flips to green
              setColor($neighbor.row, $neighbor.col, 'green');

              // Update totals
              if (blues > 0 ) { 
                blues--; 
              }
              greens++;
            }
          }
        }); // end of loop

        // Update the displayed totals so the user can see
        $('#reds').html(reds);
        $('#blues').html(blues);
        $('#greens').html(greens);

        // Check winning or losing conditions
        if(reds == total) {
          alert("Hooray! You're such a champ. Keep it up.");

          // Refresh the page so that people can play again
          location.reload();
        } else if(greens == 0) {
          // Yes, I know that some boards are winnable and some boards aren't
          // Yes I chose to tell them that losing boards are winnable
          // Yes you can choose a different message if you'd like
          alert("You're pretty bad at this game. This board was winnable.");

          // Refresh the page so that people can play again
          location.reload();
        }
      }
    }

    function play(e) {
      e.preventDefault();
      rows = $('#rows').val();
      cols = $('#cols').val();

      // After we get the input, we no longer need to show these controls: let's remove them
      $('#args').detach();

      // Loop over all the rows and columns
      for(var curRow = 0; curRow < rows; curRow++) {
        // Wrap each row in a div for :nth-child access
        var $curTileRow = $('<div class="tile-row"></div>');
        $('#tile-wrapper').append($curTileRow);

        // Initialize the current row to an empty column array
        boardColors[curRow] = [];

        for(var curCol = 0; curCol < cols; curCol++) {
          // Add an element to the current row and set it's color
          $curTileRow.append('<div class="tile"></div>');
          setColor(curRow, curCol, 'blue');

          // Use a closure to encode data about the row and column
          getTile(curRow, curCol).click((function(r, c) {
            return function(e) {
              move(e, r, c);
            }
          })(curRow, curCol));
        }
      }

      // Top left piece needs to start out green
      setColor(0,0,'green');

      // Initialize these for displaying to the user
      greens = 1;
      blues = rows * cols - 1;

      // Keep track of this so that we can determine if the user has won
      total = rows * cols;

      // Set the initial values 
      // (remember that there are no reds initally, 
      // and we are already showing 0 from our index.html file)
      $('#blues').html(blues);
      $('#greens').html(greens);
    }

    $(document).ready(function() {
      $('#submit').click(play);
    });
})();
