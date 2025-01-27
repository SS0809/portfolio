import * as React from 'react';

export default function Codeforces() {
  const username = 'saurabh45215'; // Replace with the desired Codeforces username

  return (
    <div className="">
      <img
        className='w-[50rem] mt-16'
        src={`https://codeforces-readme-stats.vercel.app/api/card?theme=github_dark&username=${username}`}
        alt={`${username}'s Codeforces stats`}
      />
    </div>
  );
}
