const data = [
    "Allah SWT",
    "My Parents",
    "My Friends",
    "Adriansyah",
    "Lolhumen",
    "ErerexID",
    "Yoga",
    "Kyouka",
    "Zvyz",
    "Kiicode",
    "Xyro",
    "Marvel",
    "Fruatre",
    "Vercel"
]

export default function ThankToDashboard() {
    return (
        <div className="w-full">
            <div className="background rounded-xl w-full p-4 border border-a">
                <div className="text-2xl mb-2">Thanks To</div>
                <ol className="list-disc px-8 grid grid-cols-2 text-sm">
                    {data.map((items, index) => (
                        <li className="font-normal" key={index}>{items}</li>
                    ))}
                </ol>
            </div>
        </div>
    )
}