'use client';

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface  ModalProps {
  isOpen? : boolean;
  onClose : () => void;
  onSubmit : () => void;
  title? : string;
  body? : React.ReactElement;
  footer? : React.ReactElement
  actionLabel : string;
  disabled? : boolean;
  secondaryAction? : () => void;
  secondaryActionLabel? : string;
} 

const Modal:React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel
}) => {


  const [showModal, setShowModal ] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if(disabled){
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    },300);
  },[disabled , onClose]);

  const handleSubmit = useCallback(() => {
    if(disabled){
      return;
    }
    onSubmit();
  },[onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if(!secondaryAction || disabled){
      return;
    }
    
    secondaryAction();

  },[disabled , secondaryAction ]);

  if(!isOpen){
    return null;
  }


  return (
     <>
      <div
         className="
          flex 
          justify-center
          items-center
          overflow-x-hidden
          overflow-y-auto
          fixed 
          inset-0
          z-50
          outline-none
          hover:outline-none
          bg-neutral-800/70
         "
      >
        <div 
          className="
            mt-[10%]
            relative
            w-full
            md:w-4/6
            lg:w-3/6
            xl:w-2/5
            my-6
            mx-auto
            h-full
            lg:h-auto
            md:h-auto
        ">
          {/* CONTENT */}
          <div
            className={`
              translate
              duration-300
              ${showModal ? 'translate-y-0' : 'translate-y-full'}
              ${showModal ? 'opacity-100' : 'opacity-0'}
            `}
          >
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/* HEADER */}
              <div className="flex p-6 rounded-t justify-center relative border-b-[1px]">
                <div>
                  <button onClick={handleClose} className="p-1 border-0 hover:opacity-70 transition absolute left-9">
                    <IoMdClose size={18} />
                  </button>
                </div>
                <div className="text-xl font-semibold">
                  {title}
                </div>
              </div>
              {/* BODY */}
              <div className="relative p-6 flex-auto">
                {body}
              </div>
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center gap-4 w-full">
                  {secondaryAction && secondaryActionLabel && (
                    <Button outline onClick={handleSecondaryAction} label={secondaryActionLabel} disabled={disabled}/>
                  )}
                  <Button onClick={handleSubmit} label={actionLabel} disabled={disabled}/>                
                </div>
                <div>
                  {footer}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     </>
  )
}

export default Modal
