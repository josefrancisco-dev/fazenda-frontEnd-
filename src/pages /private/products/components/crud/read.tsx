import type { Product } from "@/types/typesApi"

type props = {
    product :  Product
}

export function Read({product} : props) {
    return (
        <div>
           <p>{product.name}</p>
        </div>
    )
}