describe("PachubeGraph", function() {
  var minimal
    , last_hour
    , twenty_four_hours
    , four_days
    , one_week
    , two_weeks
    , one_month
    , three_months
    , options_graph
    , rolling_graph
    , colors_graph
    , data
    , graph_data
    , oldAjax = $.ajax;

  beforeEach(function() {
    loadFixtures('fixtures/minimal_graph.html',
                 'fixtures/last_hour.html',
                 'fixtures/twenty_four_hours.html',
                 'fixtures/four_days.html',
                 'fixtures/one_week.html',
                 'fixtures/two_weeks.html',
                 'fixtures/one_month.html',
                 'fixtures/three_months.html',
                 'fixtures/options_graph.html',
                 'fixtures/rolling_graph.html',
                 'fixtures/colors_graph.html');
    minimal = $('#minimal.pachube-graph');
    last_hour = $('#last_hour.pachube-graph');
    twenty_four_hours = $('#twenty_four_hours.pachube-graph');
    four_days = $('#four_days.pachube-graph');
    one_week = $('#one_week.pachube-graph');
    two_weeks = $('#two_weeks.pachube-graph');
    one_month = $('#one_month.pachube-graph');
    three_months = $('#three_months.pachube-graph');
    options_graph = $('#options_graph.pachube-graph');
    rolling_graph = $('#rolling_graph.pachube-graph');
    colors_graph = $('#colors_graph.pachube-graph');

    data = 
      [ {at: "2010-10-13T14:10:51.747789Z", value: "1309"}
      , {at: "2010-10-13T15:10:51.747789Z", value: "1310"}
      , {at: "2010-10-13T16:10:51.747789Z", value: "1311"}
      , {at: "2010-10-13T17:10:51.747789Z", value: "1312"}
      ];

    graph_data =
      [ [1286979051747, 1309]
      , [1286982651747, 1310]
      , [1286986251747, 1311]
      , [1286989851747, 1312]
      ];

    $.ajax = function(options) {
      if (options == undefined) { var options = {}; }

      var result = {
        datapoints: data
      , start: options.url.match(/&start=([^&]*)/)[1]
      , end: options.url.match(/&end=([^&]*)/)[1]
      };

      if (options.success != undefined) {
        options.success(result);
      }

      return result;
    };
  });

  afterEach(function() {
    $.ajax = oldAjax
  });

  it("should be able to call $(element).pachubeGraph", function() {
    spyOn(minimal, 'pachubeGraph');

    minimal.pachubeGraph();

    expect(minimal.pachubeGraph).toHaveBeenCalled();
  });

  it("should call new PachubeGraph(this.element) when I call $(element).pachubeGraph()", function() {
    minimal.pachubeGraph();

    expect(minimal[0].graph instanceof PachubeGraph);
  });

  it("PachubeGraph(element) should parse the attributes from the html element", function() {
    minimal.pachubeGraph();

    expect(minimal[0].graph.settings.resource).toEqual("myResource");
    expect(minimal[0].graph.settings.api_key).toEqual("myApiKey");
    expect(minimal[0].graph.settings.rolling).toEqual(false);
    expect(minimal[0].graph.settings.update).toEqual(false);
    expect(minimal[0].graph.settings.per_page).toEqual(2000);
  });

  it("should parse a timespan values and set timespan and interval accordingly", function() {
    minimal.pachubeGraph(); // defaults (should equal twenty_four_hours)
    expect(minimal[0].graph.settings.timespan).toEqual(86400000);
    expect(minimal[0].graph.settings.interval).toEqual(900);

    last_hour.pachubeGraph();
    expect(last_hour[0].graph.settings.timespan).toEqual(3600000);
    expect(last_hour[0].graph.settings.interval).toEqual(60);

    twenty_four_hours.pachubeGraph();
    expect(twenty_four_hours[0].graph.settings.timespan).toEqual(86400000);
    expect(twenty_four_hours[0].graph.settings.interval).toEqual(900);

    four_days.pachubeGraph();
    expect(four_days[0].graph.settings.timespan).toEqual(345600000);
    expect(four_days[0].graph.settings.interval).toEqual(3600);

    one_week.pachubeGraph();
    expect(one_week[0].graph.settings.timespan).toEqual(7*86400000);
    expect(one_week[0].graph.settings.interval).toEqual(7*900);

    two_weeks.pachubeGraph();
    expect(two_weeks[0].graph.settings.timespan).toEqual(14*86400000);
    expect(two_weeks[0].graph.settings.interval).toEqual(14*900);

    one_month.pachubeGraph();
    expect(one_month[0].graph.settings.timespan).toEqual(31*86400000);
    expect(one_month[0].graph.settings.interval).toEqual(31*900);

    three_months.pachubeGraph();
    expect(three_months[0].graph.settings.timespan).toEqual(7776000000);
    expect(three_months[0].graph.settings.interval).toEqual(86400);
  });

  it("should parse the pachube-options parameter", function() {
    options_graph.pachubeGraph();
    expect(options_graph[0].graph.settings.rolling).toEqual(true);
    expect(options_graph[0].graph.settings.update).toEqual(true);
    expect(options_graph[0].graph.settings.timespan).toEqual(86400000);
  });

  it("should set the graph start/end times for static graphs", function() {
    minimal.pachubeGraph();
    expect(minimal[0].graph.end - 0).toEqual(minimal[0].graph.end - (minimal[0].graph.end % minimal[0].graph.settings.timespan));
    expect(minimal[0].graph.start - 0).toEqual(minimal[0].graph.end - minimal[0].graph.settings.timespan);
  });

  it("should set the graph start/end times for rolling graphs", function() {
    rolling_graph.pachubeGraph();
    expect(rolling_graph[0].graph.end - 0).toEqual(rolling_graph[0].graph.end - (rolling_graph[0].graph.end % rolling_graph[0].graph.settings.polling_interval));
    expect(rolling_graph[0].graph.start - 0).toEqual(rolling_graph[0].graph.end - rolling_graph[0].graph.settings.timespan);
  });

  it("should have a 'data' parameter for storing fetched data", function() {
    minimal.pachubeGraph();

    expect(minimal[0].graph.data).not.toEqual(undefined);
  });

  it("should call the api to fetch the initial data", function() {
    spyOn($, 'ajax');

    runs(function() {
      minimal.pachubeGraph();
    });

    waits(500);

    runs(function() {
      expect($.ajax).toHaveBeenCalled();
    });
  });

  it("should have an 'update' method", function() {
    minimal.pachubeGraph();
    expect(minimal[0].graph.update).not.toEqual(undefined);
  });

  it("should do 'update' in a setInterval, if we have enabled update", function() {
    spyOn(window, 'setInterval');
    options_graph.pachubeGraph();
    expect(window.setInterval).toHaveBeenCalledWith(options_graph[0].graph.update, options_graph[0].graph.settings.polling_interval);
  });

  describe("update", function() {
    it("should push the received datapoints into data", function() {
      minimal.pachubeGraph();

      runs(function() {
        minimal[0].graph.update();
      });

      waits(500);

      expect(minimal[0].graph.data).toEqual(graph_data);
    });

    it("should only request new data", function() {
      minimal.pachubeGraph();
      var start, end;

      minimal[0].graph.update(function(results) {
        start = results.start;
        end = results.end;
      });

      expect(minimal[0].graph.data).toEqual(graph_data);

      minimal[0].graph.update(function(results) {
        expect(results.start >= data[3].at);
        expect(results.end).toBeGreaterThan(results.start);
      });
    });

    it("should not store duplicate data", function() {
      minimal.pachubeGraph();
      minimal[0].graph.update();
      expect(minimal[0].graph.data).toEqual(graph_data);
    });

    it("should call 'draw'", function() {
      minimal.pachubeGraph();

      spyOn(minimal[0].graph, 'draw');

      runs(function() {
        minimal[0].graph.update();
      });

      waits(500);

      runs(function() {
        expect(minimal[0].graph.draw).toHaveBeenCalled();
      });
    });
  });

  it("should have a 'draw' method", function() {
    minimal.pachubeGraph();
    expect(minimal[0].graph.draw).not.toEqual(undefined);
  });

  describe("draw", function() {
    it("should add a canvas to the graph div", function() {
      minimal.pachubeGraph();
      expect(minimal[0].graph.canvas).not.toEqual(undefined);
    });

    it("should add a link bar to the top of the graph", function() {
      minimal.pachubeGraph();
      expect(minimal[0].graph.link_bar).not.toEqual(undefined);
    });

    it("should actually have links in the link bar", function() {
      minimal.pachubeGraph();
      expect(minimal[0].graph.link_bar).toContain('a');
    });

    it("should call $.plot", function() {
      minimal.pachubeGraph();
      spyOn($, 'plot');
      minimal[0].graph.draw();
      expect($.plot).toHaveBeenCalled();
    });

    it("should add the pachube logo", function() {
      minimal.pachubeGraph();
      expect(minimal[0].graph.logo).not.toEqual(undefined);
    });

    it("should actually have a logo in the logo div", function() {
      minimal.pachubeGraph();
      expect(minimal[0].graph.logo).toContain('a');
    });
  });

  describe("colors", function() {
    it("should pass some default colors to flot", function() {
      minimal.pachubeGraph();
      spyOn($, 'plot');
      minimal[0].graph.draw();
      expect($.plot).toHaveBeenCalledWith( minimal[0].graph.canvas
                                         , [ { color: "#ff0066"
                                             , data: minimal[0].graph.data
                                             }
                                           ]
                                         , { xaxis: { mode: "time"
                                                    , min: minimal[0].graph.start
                                                    , max: minimal[0].graph.end
                                                    }
                                           , grid:  { color: "#555"
                                                    , tickColor: "#efefef"
                                                    , backgroundColor: "#fff"
                                                    , borderColor: "#9d9d9d"
                                                    }
                                           }
                                         );
    });

    it("should pass some chosen colors to flot", function() {
      colors_graph.pachubeGraph();
      spyOn($, 'plot');
      colors_graph[0].graph.draw();
      expect($.plot).toHaveBeenCalledWith( colors_graph[0].graph.canvas
                                         , [ { color: "#FFFFFF"
                                             , data: colors_graph[0].graph.data
                                             }
                                           ]
                                         , { xaxis: { mode: "time"
                                                    , min: colors_graph[0].graph.start
                                                    , max: colors_graph[0].graph.end
                                                    }
                                           , grid:  { color: "#FFFFFF"
                                                    , tickColor: "#000000"
                                                    , backgroundColor: "#555555"
                                                    , borderColor: "#0000FF"
                                                    }
                                           }
                                         );
    });
  });
});
