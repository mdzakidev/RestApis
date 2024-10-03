import CardUI from '@/components/ui/card';
import ButtonUI from '@/components/ui/button';

const data = [
    {
        plan: "Free",
        price: "0",
        metadata: {
            requests: "25/day",
            custom: "No",
            premium: "No",
            exp: "-",
        }
    },
    {
        plan: "Premium",
        price: "15,000",
        metadata: {
            requests: "1000/day",
            custom: "Yes",
            premium: "Yes",
            exp: "1 Month",
        }
    },
    {
        plan: "Enterprise",
        price: "20,000",
        metadata: {
            requests: "Unlimited",
            custom: "Yes",
            premium: "Yes",
            exp: "1 Month",
        }
    },
];

export default function PricingLanding() {
    return (
        <div className="flex flex-col gap-8" id={"pricing"}>
            <div className="flex flex-col gap-2 md:gap-4">
                <h2 className="text-center font-semibold text-primary-500 text-[2rem] md:text-4xl lg:text-[3rem]">Ready to get started?</h2>
                <p className="text-center text-gray-400 text-base md:text-xl">Choose a plan that suits your needs</p>
                <div className="flex gap-4 justify-center items-center flex-col md:flex-row mt-4">
                    {data.map((item, index) => (
                        <CardUI key={index}>
                            <div className="flex flex-col gap-2 items-center bg-primary-500 w-full text-white rounded-xl py-4">
                                <h1 className="font-medium text-xl">{item.plan}</h1>
                                <p className="font-medium text-2xl">Rp {item.price};</p>
                            </div>
                            <div className="flex flex-col text-sm w-full text-gray-500">
                                <div className="flex justify-between items-center">
                                    <p className="font-medium text-xs">Requests</p>
                                    <p className="font-medium text-xs">{item.metadata.requests}</p>
                                </div>
                                <hr className="my-4 !opacity-100" />
                                <div className="flex justify-between items-center">
                                    <p className="font-medium text-xs">Custom Api Key</p>
                                    <p className="font-medium text-xs">{item.metadata.custom}</p>
                                </div>
                                <hr className="my-4 !opacity-100" />
                                <div className="flex justify-between items-center">
                                    <p className="font-medium text-xs">Premium</p>
                                    <p className="font-medium text-xs">{item.metadata.premium}</p>
                                </div>
                                <hr className="my-4 !opacity-100" />
                                <div className="flex justify-between items-center">
                                    <p className="font-medium text-xs">Title</p>
                                    <p className="font-medium text-xs">{item.plan} Users</p>
                                </div>
                                <hr className="my-4 !opacity-100" />
                                <div className="flex justify-between items-center">
                                    <p className="font-medium text-xs">Expiration</p>
                                    <p className="font-medium text-xs">{item.metadata.exp}</p>
                                </div>
                            </div>
                            <div className="flex space-x-4 w-full">
                                <ButtonUI variant="primary">Order Now</ButtonUI>
                                <ButtonUI variant="primary">Check Out</ButtonUI>
                            </div>
                        </CardUI>
                    ))}
                </div>
            </div>
        </div >
    );
}