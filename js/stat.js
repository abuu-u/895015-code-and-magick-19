'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var GAP = 30;
var FONT_GAP = 20;
var BAR_MAX_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var textHeight = 0;
var TITLE = 'Ура вы победили! \nСписок результатов: ';
var TEXT_PROPERTIES = {
  font: '16px PT Mono',
  color: '#000',
  baseLine: 'hanging'
};

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

var renderText = function (ctx, text, textProperties, x, y, wrap) {
  ctx.font = textProperties.font;
  ctx.fillStyle = textProperties.color;
  ctx.textBaseline = textProperties.baseLine;
  if (wrap) {
    var lines = text.split('\n');
    for (var i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], x, y + FONT_GAP * i);
    }
    textHeight = y + FONT_GAP * lines.length;
  } else {
    ctx.fillText(text, x, y);
  }
};

var renderBar = function (ctx, barColor, barWidth, barHeight, textProperties, playerName, playerTime, x, y) {
  ctx.fillStyle = barColor;
  ctx.fillRect(x, y, barWidth, barHeight);
  renderText(ctx, playerTime, textProperties, x, textHeight + (BAR_MAX_HEIGHT - barHeight));
  renderText(ctx, playerName, textProperties, x, textHeight + BAR_MAX_HEIGHT + GAP);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  renderText(ctx, TITLE, TEXT_PROPERTIES, CLOUD_X + GAP, CLOUD_Y + GAP, true);

  var maxTime = getMaxElement(times);
  for (var i = 0; i < names.length; i++) {
    var playerName = names[i];
    var playerTime = Math.floor(times[i]);
    var barHeight = times[i] / (maxTime / BAR_MAX_HEIGHT);
    var barX = CLOUD_X + GAP + (BAR_GAP + BAR_WIDTH) * i;
    var barY = textHeight + FONT_GAP + (BAR_MAX_HEIGHT - barHeight);

    var randomSaturateBlue = 'hsl(240,' + Math.floor(Math.random() * 100) + '% ,50%)';
    var barColor = randomSaturateBlue;
    if (names[i] === 'Вы') {
      barColor = 'rgba(255, 0, 0, 1)';
    }

    renderBar(ctx, barColor, BAR_WIDTH, barHeight, TEXT_PROPERTIES, playerName, playerTime, barX, barY);
  }
};
