import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { add, format, differenceInCalendarDays, isFuture, formatDistanceToNow } from 'date-fns'

const MoodLineChart = ({moodData, loading}) => {
  if (loading) {
    return null;
  }
  // TODO: add different filtering functions
  const data = moodData.slice(0, 10).reverse();
  
  // Date functions from https://codesandbox.io/s/recharts-area-chart-with-date-axis-6o55k?file=/src/DateArea.js:365-836
  const dateFormatter = date => {
    return format(new Date(date), "dd/MMM");
  };
  
  const getTicks = (startDate, endDate, num) => {
    const diffDays = differenceInCalendarDays(endDate, startDate);
  
    let current = startDate,
      velocity = Math.round(diffDays / (num - 1));
  
    const ticks = [startDate.getTime()];
  
    for (let i = 1; i < num - 1; i++) {
      ticks.push(add(current, { days: i * velocity }).getTime());
    }
  
    ticks.push(endDate.getTime());
    return ticks;
  };

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
  const startDate = new Date(data[0].createdAt);
  const endDate = new Date(data[data.length-1].createdAt);
  // const domain = [dataMin => dataMin, () => endDate.getTime()];
  const domain = [startDate.getTime(), endDate.getTime()]
  const ticks = getTicks(startDate, endDate, 1);
  
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      console.log(payload[0].payload)
      const readableDate = format(new Date(payload[0].payload.createdAt), 'MM-dd h:m:s aaaa')
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
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* <XAxis /> */}
            <XAxis
           
            
            tickFormatter={dateFormatter}
            
            interval={0}
            domain={domain}
            ticks={ticks}
          />
          
          <YAxis allowDecimals={false} dataKey="value" domain={[1, 3]} />
          <Tooltip content={<CustomTooltip />}/>
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    );
}

export default MoodLineChart