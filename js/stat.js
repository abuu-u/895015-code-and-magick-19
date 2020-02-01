'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var GAP = 30;
var FONT_GAP = 20;
var BAR_MAX_HEIGHT = 150;
var barHeights = [];
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var textHeight = 0;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var textWrap = function (ctx, text) {
  var lines = text.split('\n');

  for (var i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], CLOUD_X + GAP, CLOUD_Y + GAP + (FONT_GAP * i));
  }

  textHeight = CLOUD_Y + GAP + (FONT_GAP * lines.length);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  textWrap(ctx, 'Ура вы победили! \nСписок результатов: ');

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var randomSaturate = Math.floor(Math.random() * 100);
    barHeights[i] = times[i] / (maxTime / BAR_MAX_HEIGHT);
    ctx.fillStyle = '#000';
    ctx.fillText(Math.floor(times[i]), CLOUD_X + GAP + (BAR_GAP + BAR_WIDTH) * i, textHeight);
    ctx.fillText(names[i], CLOUD_X + GAP + (BAR_GAP + BAR_WIDTH) * i, textHeight + BAR_MAX_HEIGHT + GAP);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240,' + randomSaturate + '% ,50%)';
    }

    ctx.fillRect(CLOUD_X + GAP + (BAR_GAP + BAR_WIDTH) * i, textHeight + FONT_GAP + (BAR_MAX_HEIGHT - barHeights[i]), BAR_WIDTH, barHeights[i]);
  }
};
