import { Button } from "flowbite-react";


export default function CallToAction() {
  return (
    <div className="flex flex-col border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl sm:flex-row p-3 text-center">
        <div className=" flex-1 justify-center flex flex-col">
            <h2 className="text-2xl">Want to know more about my self</h2>
            <p className="text-gray-500 my-2">Check out my Github Page Mr.Arnab Ghosh</p>
            <Button gradientDuoTone='purpleToPink' className="rounded-tl-xl rounded-bl-none">
                <a href="https://github.com/MrArnabGhosh" target="_blank" rel="noopener noreferrer">Know More</a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img className="rounded" src="https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F4e0d816kuzyu700pdbjn.png"/>
        </div>
    </div>
  )
}
