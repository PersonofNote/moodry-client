import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getTime, add, format, differenceInCalendarDays, isFuture, formatDistanceToNow, differenceInHours, parseISO } from 'date-fns'

const MoodLineChart = ({moodData, timeFrame="day", loading}) => {
  if (loading) {
    return null;
  }
  // TODO: add different filtering functions

  const data = moodData.map(m => parseISO(m.createdAt).getTime()).reverse()
  // Date functions from https://codesandbox.io/s/recharts-area-chart-with-date-axis-6o55k?file=/src/DateArea.js:365-836
  const dateFormatter = date => {
    return format(new Date(date), "dd/MMM h:m aaaa");
  };

  for (let x in data) {
    console.log(data[x])
    
  }

  
  const getTicks = (startDate, endDate, num) => {
    const diffDays = differenceInCalendarDays(parseISO(endDate), parseISO(startDate));
  
    let current = startDate,
      velocity = Math.round(diffDays / (num - 1));
  
    const ticks = [startDate.getTime()];
  
    for (let i = 1; i < num - 1; i++) {
      ticks.push(add(current, { days: i * velocity }).getTime());
    }
  
    ticks.push(endDate.getTime());
    return ticks;
  };

  const ticks = getTicks(parseISO(moodData[0].createdAt), parseISO(moodData[moodData.length-1].createdAt), 4)
  const domain = [ticks[0], ticks[ticks.length-1]]

  const fillTicksData = (_ticks, data) => {
    const ticks = [..._ticks];
    const filled = [];
    let currentTick = ticks.shift();
    let lastData = null;
    for (const it of data) {
      if (ticks.length && it.date > currentTick && lastData) {
        filled.push({ ...lastData, ...{ date: currentTick } });
        currentTick = ticks.shift();
      } else if (ticks.length && it.date === currentTick) {
        currentTick = ticks.shift();
      }
  
      filled.push(it);
      lastData = it;
    }
  
    return filled;
  };

  // Temp
  // const startDate = new Date(data[0].createdAt);
  // const endDate = new Date(data[data.length-1].createdAt);
  // const domain = [dataMin => dataMin, () => endDate.getTime()];
  // const domain = [startDate.getTime(), endDate.getTime()]
  // const ticks = getTicks(startDate, endDate, 1);
  
  // TODO: Extract to own function
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const friendlyDate = formatDistanceToNow(
        new Date(payload[0].payload.createdAt)
      )
      return (
        <div className="tooltip-ams">
          <p className="label">{`${friendlyDate} ago : ${payload[0].value}`}</p>
          <p className="desc">{payload[0].payload.note ? `Note: ${payload[0].payload.note}` : '' }</p>
        </div>
      );
    }
  }

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 15,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          {/*
          <XAxis 
          dataKey='createdAt'
          type="number" 
          domain={['auto', 'auto']}
          interval={2}
          tickFormatter={dateFormatter}
          ticks={ticks}
          allowDecimals={false}
          />
        */}
        <XAxis />
          <YAxis allowDecimals={false} dataKey="value" domain={[1, 3]} />
          <Tooltip content={<CustomTooltip />}/>
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" dot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    );
}

export default MoodLineChart