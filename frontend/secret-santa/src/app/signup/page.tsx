import Image from 'next/image'

export default function SignupPage() {
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="grid grid-cols-2 gap-8 justify-stretch">
          <input type="text" placeholder="First Name" className="input w-full max-w-xs" />
          <input type="text" placeholder="Last Name" className="input w-full max-w-xs" />
          <textarea className="textarea col-span-2" placeholder="Write your letter to Santa"></textarea>
          <p className="p-4 col-span-2">Do you want to participate?</p>
          <button className="btn btn-neutral">No</button>
          <button className="btn btn-success">Yes</button>
      </div>
    </div>
  )
}
