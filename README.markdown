Pachube Graph Library
=====================

Usage
=====

In your page include:

    <div id="graph" class="pachube-graph" pachube-resource="/feeds/FEED_ID/datastreams/DATASTREAM_ID" pachube-key="API_KEY" pachube-options="OPTIONS" style="width:WIDTH; height:HEIGHT;">&nbsp;</div>
    <script src="http://pachube.github.com/pachube_graph_library/lib/PachubeLoader.js"></script>


Options
=======

Optional settings you can use to set up your graph include:

    timespan: last hour;  Sets a default timespan for the graph.
              24 hours;
              4 days;
              1 week;
              2 weeks;
              1 month;
              3 months;

    rolling:  true;       Makes the graph end at the current time,
                          instead of at the end of the next interval.
                          (e.g. A 1 hour graph viewed at 1:15pm will
                          go from 12:15pm to 1:15pm)

    update: true;         Automatically updates the graph with
                          new data every 5 minutes.

    background-color: #ffffff   Sets the background color for the graph

    line-color: #ff0066;        Sets the color of the line

    grid-color: #efefef;        Sets the color of the grid behind the line

    border-color: #9d9d9d;      Sets the color of the border around the graph

    text-color: #555555;        Sets the color of the text and labels around the graph
