'use client';
import Image from 'next/image'
import { useState } from 'react';
import GroupNameComponent from './first-step';

export default function AdminPage() {
  
  const steps = 4;
  
  const [currentStep, setCurrentStep] = useState(0);
  
  const handleNext = () => {
    setCurrentStep((prevStep) => (prevStep < steps - 1 ? prevStep + 1 : prevStep));
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => (prevStep > 0 ? prevStep - 1 : prevStep));
  };

  let childComponentToRender;

  switch (currentStep) {
    case 0:
      childComponentToRender = <GroupNameComponent></GroupNameComponent>
      break;
    case 1:
      childComponentToRender = <div>Step 2 content</div>;
      break;
    case 2:
      childComponentToRender = <span>Step 3 content</span>;
      break;
    case 3:
      childComponentToRender = <p>Default content</p>;
      break;
  }

  return (
    <div className="flex flex-col content-center items-center h-screen">
      <div className="flex justify-center items-start p-24">
        <ul className="steps steps-vertical lg:steps-horizontal">
          <li className={`step w-64 ${currentStep >= 0 ? 'step-success' : undefined}`}>Name your group</li>
          <li className={`step w-64 ${currentStep >= 1 ? 'step-success' : undefined}`}>Add participants</li>
          <li className={`step w-64 ${currentStep >= 2 ? 'step-success' : undefined}`}>Send out invites</li>
          <li className={`step w-64 ${currentStep >= 3 ? 'step-success' : undefined}`}>Scramble</li>
        </ul>
      </div> 
      <div className="grow w-3/5">
        {childComponentToRender}
      </div>
      <div className="flex flex-row justify-between w-3/5 mb-48 px-10">
        <button className="btn btn-success" onClick={handlePrev} disabled={currentStep === 0}>
         Previous
        </button>
        <button className="btn btn-success" onClick={handleNext} disabled={currentStep === steps - 1}>
         Next
        </button>
      </div>
    </div>
            
    )
}
