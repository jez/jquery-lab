;(function() {
    var rows;
    var cols;

    var reds = 0;
    var blues = 0;
    var greens = 0;

    var boardColors = [];

    var total;

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
