'use client';
import { Spinner } from '@nextui-org/react';

function Loading() {
  return (
    <div class="w-full h-full fixed top-0 left-0 bg-secondary-400 opacity-75 z-50">
      <div class="flex justify-center items-center mt-[50vh]">
        <div class="fas fa-circle-notch fa-spin fa-5x text-primary"><Spinner /></div>
      </div>
    </div>
  );
}

export default Loading;
