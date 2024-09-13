import { Children } from "react";

export default function Container(){


    return (
        <section className="my-14 container mx-auto">
             {heading}
            <hr className="h-px w-1/2 mx-auto bg-gray-300 mt-3 mb-8"/>
             {Children} 
        </section>
    )
}