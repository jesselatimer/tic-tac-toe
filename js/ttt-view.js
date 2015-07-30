(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
  };

  View.prototype.bindEvents = function () {
    var $cells = $(".cell.unclicked");
    $cells.click(function (event) {
      var currentTarget = event.currentTarget;
      var $currentTarget = $(currentTarget);
      this.makeMove($currentTarget, $cells);
    }.bind(this));
  };

  View.prototype.makeMove = function ($square, $cells) {
    var mark = this.game.currentPlayer;
    var rowId = $square.parent().data("index");
    var cellId = $square.data("index");
    this.game.playMove([rowId, cellId]);
    $square.removeClass("unclicked").addClass("clicked").addClass(mark);
    if (this.game.isOver()) {
      var $endMessage = "";
      if (this.game.board.winner() !== null) {
        $endMessage = $('<p class="end-message"></p>');
        $endMessage.text(mark + " is the winner!!!");
      } else {
        $endMessage = $('<p class="end-message">Game Over!</p>');
      }
      this.$el.append($endMessage);
      $cells.removeClass("unclicked").addClass("clicked")
      $cells.off("click");
    }
  };

  View.prototype.setupBoard = function () {
    var $row = $('<div class="row"></div>');
    var $cell = $('<div class="cell unclicked"></div>');
    $row.append($cell, $cell.clone(), $cell.clone());
    this.$el.append($row, $row.clone(), $row.clone());
    var $rows = $('.row');
    for (var i = 0; i < 3; i++) {
      $rows.eq(i).data("index", i);
      var $cells = $rows.eq(i).children('.cell');
      for (var j = 0; j < 3; j++) {
        $cells.eq(j).data("index", j);
      }
    }
  };
})();
