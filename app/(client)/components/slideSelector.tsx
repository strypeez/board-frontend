import { useEffect, useState } from "react"

interface SlideSelectorType {
    currentIndex: number,
    numButtons: number,
    buttonFunction: (index: number) => void
}

export default function SlideSelector({currentIndex, numButtons, buttonFunction}: SlideSelectorType) {
    const [buttons, setButtons] = useState<React.JSX.Element[]>([]);
    useEffect(() => {
        const newButtons = []
        for (let i = 0; i < numButtons; i++) {
            newButtons.push(
                <div className={`h-4 w-4 border border-[#7d7d70] rounded-full mr-3 bg-[#f7f7e6] ${currentIndex === i ? 'outline-[#fafafa] outline-4 outline' : ''}`} onClick={() => {
                    buttonFunction(i);
                }}>
                </div>
            )
        }
        setButtons(newButtons)
    }, [numButtons, currentIndex, buttonFunction])

    return <div className="absolute z-10 left-0 bottom-0 flex p-5 right-0 justify-center">
        {buttons}
    </div>
}