import { UploadDropzone } from '@uploadthing/react';
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

export default function ImageInput({ label, imageUrl = "", setImageUrl, endpoint = "imageUploader" }) {
  return (
    <div className='sm:col-span-full mb-3'>
      <div className="flex justify-between items-center mb-4">
        <label htmlFor="course-image" className="block text-sm font-medium leading-6 text-white">{label}</label>
        {imageUrl && (
          <button
            type='button'
            onClick={() => setImageUrl("")}
            className='flex space-x-2 rounded-md shadow text-slate-50 py-2 px-4 bg-yellow-800'
          >
            <Pencil className='w-5 h-5' />
            <span className='text-white'>Change Image</span>
          </button>
        )}
      </div>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Uploaded image"
          width={1000}
          height={667}
          className='w-full h-64 object-cover'
        />
      ) : (
        <UploadDropzone
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            if (res && res.length > 0) {
              setImageUrl(res[0].url);
              toast.success("Upload Completed");
            } else {
              toast.error("Upload failed, no file received.");
            }
          }}
          onUploadError={(error) => {
            toast.error(`ERROR! ${error.message}`);
          }}
        />
      )}
    </div>
  );
}
