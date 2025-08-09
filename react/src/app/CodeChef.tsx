import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

interface RatingItem {
  getyear: number;
  getmonth: number;
  getday: number;
  rating: string;
}

export default function CodeChef() {
  const [data, setData] = React.useState<{ x: string[]; y: number[] }>({ x: [], y: [] });
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/codechef/saurabhs45215');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();

        if (!json.ratingData || json.ratingData.length === 0) {
          setError('No data available');
          setLoading(false);
          return;
        }

        const xData: string[] = [];
        const yData: number[] = [];
        json.ratingData.forEach((item: RatingItem) => {
          const formattedDate = `${item.getyear}-${String(item.getmonth).padStart(2, '0')}-${String(item.getday).padStart(2, '0')}`;
          xData.push(formattedDate);
          yData.push(parseInt(item.rating, 10));
        });
        
        setData({ x: xData, y: yData });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (data.x.length === 0) {
    return <p className="text-center">No data to display</p>;
  }

  return (
    <main>
      <div className="p-20 mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-left">
        <LineChart
          series={[
            {
              data: data.y,
              label: 'Rating',
            },
          ]}
          xAxis={[{ 
            data: data.x, 
            scaleType: 'point',
            label: 'Date' 
          }]}
          width={1000}
          height={600}
        />
      </div>
    </main>
  );
}