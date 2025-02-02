import Modulecard from '../new components/Modulecard';
import { Newclassforms } from '../new components/Newclassforms';
import { useState } from 'react';

export const Newclass = () => {
  const [formData, setFormData] = useState({
    className: '',
    color: '#000000',
    icon: '',
    description: ''
  });

  return (
    <div className="h-screen flex">
      <div className="grid grid-cols-2 gap-4 p-10 w-full">
        <Newclassforms formData={formData} setFormData={setFormData} />
        <div className="flex justify-center w-full">
          <div className="block w-52 mr-5">
            <Modulecard
              id='preview'
              name='exemple'
              path='exemple'
              Classname={formData.className}
              Classicon={formData.icon}
              Classcolor={formData.color}
              status='string'
              isFavorite={false}
              format='group'
              preview={true}
            />
          </div>
          <div className="block w-52">
            <Modulecard
              id='preview'
              name='exemple'
              path='exemple'
              Classname={formData.className}
              Classicon={formData.icon}
              Classcolor={formData.color}
              status='string'
              isFavorite={true}
              format='title'
              preview={true}
            />
          </div>
        </div>
      </div>
    </div>
  )
}