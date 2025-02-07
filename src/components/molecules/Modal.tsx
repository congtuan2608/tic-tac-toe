import React from "react";


type Props = {
  children: React.ReactNode
  open?: boolean
  setOpen?: (open: boolean) => void
}

export default function Modal(props: Props) {
  const [open, setOpen] = React.useState(props?.open || false)

  React.useEffect(() => {
    setOpen(props?.open || false)
  }, [props.open])

  return <>
    {open &&
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-black/15 flex justify-center items-center">
        <div className="p-4 m-auto bg-white rounded-lg relative">
          <button
            onClick={() => setOpen(false)}
            className="absolute -top-0 -right-0 size-6 rounded-lg text-red-500 font-bold border-red-500  hover:bg-red-500 hover:text-white"
          >
            X
          </button>
          {props.children}
        </div>
      </div>}
  </>
}