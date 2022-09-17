import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns'

const MoodLineChart = ({moodData}) => {
  // TODO: add different filtering functions
  const data = moodData.slice(0, 10);
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      console.log(payload[0].payload)
      const readableDate = format(new Date(payload[0].payload.createdAt), 'yyyy-MM-dd h:m:s aaaa')
      return (
        <div className="tooltip-ams">
          <p className="label">{`${readableDate} : ${payload[0].value}`}</p>
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
          <XAxis dataKey="createdAt" />
          <YAxis allowDecimals={false} dataKey="value" domain={[1, 3]} />
          <Tooltip content={<CustomTooltip />}/>
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    );
}

export default MoodLineChart