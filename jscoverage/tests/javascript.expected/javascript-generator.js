if (! _$jscoverage['javascript-generator.js']) {
  _$jscoverage['javascript-generator.js'] = [];
  _$jscoverage['javascript-generator.js'][3] = 0;
  _$jscoverage['javascript-generator.js'][4] = 0;
  _$jscoverage['javascript-generator.js'][5] = 0;
  _$jscoverage['javascript-generator.js'][6] = 0;
  _$jscoverage['javascript-generator.js'][7] = 0;
  _$jscoverage['javascript-generator.js'][8] = 0;
  _$jscoverage['javascript-generator.js'][9] = 0;
}
_$jscoverage['javascript-generator.js'].source = ["<span class=\"c\">// https://developer.mozilla.org/en/New_in_JavaScript_1.7</span>","","<span class=\"k\">function</span> fib<span class=\"k\">()</span> <span class=\"k\">{</span>","  <span class=\"k\">var</span> i <span class=\"k\">=</span> <span class=\"s\">0</span><span class=\"k\">,</span> j <span class=\"k\">=</span> <span class=\"s\">1</span><span class=\"k\">;</span>","  <span class=\"k\">while</span> <span class=\"k\">(</span><span class=\"k\">true</span><span class=\"k\">)</span> <span class=\"k\">{</span>","    <span class=\"k\">yield</span> i<span class=\"k\">;</span>","    <span class=\"k\">var</span> t <span class=\"k\">=</span> i<span class=\"k\">;</span>","    i <span class=\"k\">=</span> j<span class=\"k\">;</span>","    j <span class=\"k\">+=</span> t<span class=\"k\">;</span>","  <span class=\"k\">}</span>","<span class=\"k\">}</span>"];
_$jscoverage['javascript-generator.js'][3]++;
function fib() {
  _$jscoverage['javascript-generator.js'][4]++;
  var i = 0, j = 1;
  _$jscoverage['javascript-generator.js'][5]++;
  while (true) {
    _$jscoverage['javascript-generator.js'][6]++;
    (yield i);
    _$jscoverage['javascript-generator.js'][7]++;
    var t = i;
    _$jscoverage['javascript-generator.js'][8]++;
    i = j;
    _$jscoverage['javascript-generator.js'][9]++;
    j += t;
}
}
