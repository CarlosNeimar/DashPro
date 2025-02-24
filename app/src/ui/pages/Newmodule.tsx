import React, { useState } from 'react';
import { Newmoduleforms } from '../new components/Newmoduleforms';
import Modulecard from '../new components/Modulecard';

export const Newmodule = () => {
  const [moduleData, setModuleData] = useState({
    name: '',
    path: '',
    class: {
      id: '',
      name: '',
      icon: '',
      color: '',
      description: '' as string
    },
    status: '',
    isFavorite: false,
    description: ''
  });

  return (
    <div className="h-screen flex">
      <div className="grid grid-cols-2 gap-4 p-10 w-full">
        <Newmoduleforms moduleData={moduleData} setModuleData={setModuleData} />
        <div>
          <div className="flex justify-center">
            <h3 className="mt-8 scroll-m-20 text-2xl mb-5 font-semibold tracking-tight">
              {moduleData.name || ''}
            </h3>
          </div>
          <div className="flex justify-center w-full">
            <div className="block w-52 mr-5">
              <Modulecard
                id='preview'
                name={moduleData.name}
                path={moduleData.path}
                Classname={moduleData.class.name}
                Classicon={moduleData.class.icon}
                Classcolor={moduleData.class.color}
                status={moduleData.status}
                isFavorite={moduleData.isFavorite}
                format='group'
                preview={true}
              />
            </div>
            <div className="block w-52">
              <Modulecard
                id='preview'
                name={moduleData.name}
                path={moduleData.path}
                Classname={moduleData.class.name}
                Classicon={moduleData.class.icon}
                Classcolor={moduleData.class.color}
                status={moduleData.status}
                isFavorite={moduleData.isFavorite}
                format='title'
                preview={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};