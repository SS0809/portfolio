import * as React from 'react';

export default function Codeforces() {
  const username = 'saurabh45215'; // Replace with the desired Codeforces username

  return (
    <div className="w-full flex justify-center items-center">
      <img
        src={`https://codeforces-readme-stats.vercel.app/api/card?username=${username}`}
        alt={`${username}'s Codeforces stats`}
        className="max-w-full h-auto"
      />
    </div>
  );
}
