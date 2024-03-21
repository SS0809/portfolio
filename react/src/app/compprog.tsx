import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
export default function CompProg() {
  return (
    <main>
      <div className="p-20 mb-32 grid text-center color:white lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-left">
      <LineChart
          series={[
            {
              data: [2, 3.5, 5, 7.5, 3.5, 5 , 7 , 8 , 9 , 10],
            },
          ]}
          width={1000}
          height={600}
        />
      </div>
    </main>
  );
}
