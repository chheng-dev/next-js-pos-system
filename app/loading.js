'use client';
import { Spinner } from '@nextui-org/react';

function LoadingPage() {
  return (
    <div className='flex min-h-screen justify-center items-center flex-col'>
      <div className='pb-4'>
        <h4>Just give us a second.</h4>
      </div>
      <div className='flex justify-center items-center'>
        <Spinner />
      </div>
    </div>
  );
}

export default LoadingPage;
