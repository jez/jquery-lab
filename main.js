;(function() {
    var rows;
    var cols;

    var boardColors = [];

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
    }

    $(document).ready(function() {
      $('#submit').click(play);
    });
})();
