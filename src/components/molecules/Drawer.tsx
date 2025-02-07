import React from "react";

type Props = {
  children: React.ReactNode
  button?: string | React.ReactNode
  buttonClassName?: string
  footer?: React.ReactNode
}
export default function Drawer(props: Props) {
  const [open, setOpen] = React.useState(false);

  const renderButton = () => {
    if (React.isValidElement(props.button)) {
      return props.button
    } else {
      return (
        <button onClick={() => setOpen(!open)} className={"bg-blue-500 text-white p-2 rounded-lg " + props?.buttonClassName}>
          {props?.button || "Open Drawer"}
        </button>
      )
    }
  }
  return (
    <>
      {/* render the drawer open button */}
      {renderButton()}
      <div
        className={`fixed top-0 right-0 h-full w-1/6 min-w-[350px] bg-white shadow-md transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-2 flex flex-col gap-1 w-full">
          {/* header of drawer */}
          <div className="flex item-start">
            <button
              onClick={() => setOpen(false)}
              className="text-red-500 font-bold"
            >
              ✖ Close
            </button>
          </div>
          {/* body of drawer */}
          <div className="p-2 w-full overflow-y-auto max-h-[calc(100vh-100px)] pb-5">
            {props.children}
          </div>
          {/* footer of drawer */}
          <div>
            {props.footer}
          </div>
        </div>
      </div>
    </>
  )
}