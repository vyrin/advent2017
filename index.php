<head>
	<title>Advent of Code 2017</title>

	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

	<script type="text/javascript" src="js/common/math/math.min.js"></script>
	<script type="text/javascript" src="js/common/jquery/jquery-1.7.1.min.js"></script>
	<script type="text/javascript" src="js/common/jquery/jquery-ui-1.8.17.custom.min.js"></script>
	<script type="text/javascript" src="js/common/lodash/lodash.js"></script>
	<script type="text/javascript" src="js/common/LaserClass.js"></script>
	<script type="text/javascript" src="js/common/LaserUtil.js"></script>
	<script type="text/javascript" src="js/common/LaserVector.js"></script>
	<script type="text/javascript" src="js/common/md5.js"></script>
	<script type="text/javascript" src="js/day.js"></script>
	<script type="text/javascript" src="js/day01.js"></script>
	<script type="text/javascript" src="js/day02.js"></script>
	<script type="text/javascript" src="js/day03.js"></script>
	<script type="text/javascript" src="js/day04.js"></script>
	<script type="text/javascript" src="js/day05.js"></script>
	<script type="text/javascript" src="js/day06.js"></script>
	<script type="text/javascript" src="js/day07.js"></script>
	<script type="text/javascript" src="js/day08.js"></script>
	<script type="text/javascript" src="js/day09.js"></script>
	<script type="text/javascript" src="js/day10.js"></script>
	<script type="text/javascript" src="js/day11.js"></script>
	<script type="text/javascript" src="js/day12.js"></script>
	<script type="text/javascript" src="js/day13.js"></script>
	<script type="text/javascript" src="js/day14.js"></script>
	<script type="text/javascript" src="js/day15.js"></script>
	<script type="text/javascript" src="js/day16.js"></script>
	<script type="text/javascript" src="js/day17.js"></script>
	<script type="text/javascript" src="js/day18.js"></script>
	<script type="text/javascript" src="js/day19.js"></script>
	<script type="text/javascript" src="js/day20.js"></script>
	<script type="text/javascript" src="js/day21.js"></script>
	<script type="text/javascript" src="js/day22.js"></script>
	<script type="text/javascript" src="js/day23.js"></script>
	<script type="text/javascript" src="js/day24.js"></script>
	<script type="text/javascript" src="js/day25.js"></script>

	<script>
		function findGetParameter(parameterName) {
		    var result = null,
		        tmp = [];
		    location.search
		        .substr(1)
		        .split("&")
		        .forEach(function (item) {
		          tmp = item.split("=");
		          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
		        });
		    return result;
		}

		var getDay = findGetParameter("day");
		if (getDay) {
			advent.getDay(getDay).start();
		}
	</script>
</head>

Advent some stuff

<ul>
	<li><a href="javascript:advent.getDay('01').start()" class="ui-button">Day 01</a></li>
	<li><a href="javascript:advent.getDay('02').start()" class="ui-button">Day 02</a></li>
	<li><a href="javascript:advent.getDay('03').start()" class="ui-button">Day 03</a></li>
	<li><a href="javascript:advent.getDay('04').start()" class="ui-button">Day 04</a></li>
	<li><a href="javascript:advent.getDay('05').start()" class="ui-button">Day 05</a></li>
	<li><a href="javascript:advent.getDay('06').start()" class="ui-button">Day 06</a></li>
	<li><a href="javascript:advent.getDay('07').start()" class="ui-button">Day 07</a></li>
	<li><a href="javascript:advent.getDay('08').start()" class="ui-button">Day 08</a></li>
	<li><a href="javascript:advent.getDay('09').start()" class="ui-button">Day 09</a></li>
	<li><a href="javascript:advent.getDay('10').start()" class="ui-button">Day 10</a></li>
	<li><a href="javascript:advent.getDay('11').start()" class="ui-button">Day 11</a></li>
	<li><a href="javascript:advent.getDay('12').start()" class="ui-button">Day 12</a></li>
	<li><a href="javascript:advent.getDay('13').start()" class="ui-button">Day 13</a></li>
	<li><a href="javascript:advent.getDay('14').start()" class="ui-button">Day 14</a></li>
	<li><a href="javascript:advent.getDay('15').start()" class="ui-button">Day 15</a></li>
	<li><a href="javascript:advent.getDay('16').start()" class="ui-button">Day 16</a></li>
	<li><a href="javascript:advent.getDay('17').start()" class="ui-button">Day 17</a></li>
	<li><a href="javascript:advent.getDay('18').start()" class="ui-button">Day 18</a></li>
	<li><a href="javascript:advent.getDay('19').start()" class="ui-button">Day 19</a></li>
	<li><a href="javascript:advent.getDay('20').start()" class="ui-button">Day 20</a></li>
	<li><a href="javascript:advent.getDay('21').start()" class="ui-button">Day 21</a></li>
	<li><a href="javascript:advent.getDay('22').start()" class="ui-button">Day 22</a></li>
	<li><a href="javascript:advent.getDay('23').start()" class="ui-button">Day 23</a></li>
	<li><a href="javascript:advent.getDay('24').start()" class="ui-button">Day 24</a></li>
	<li><a href="javascript:advent.getDay('25').start()" class="ui-button">Day 25</a></li>
</ul>
