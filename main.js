;(function() {
    var rows;
    var cols;

    function play(e) {
      rows = $('#rows').val();
      cols = $('#cols').val();

      // After we get the input, we no longer need to show these controls: let's remove them
      $('#args').detach();

    }

    $(document).ready(function() {
      $('#submit').click(play);
    });
})();
