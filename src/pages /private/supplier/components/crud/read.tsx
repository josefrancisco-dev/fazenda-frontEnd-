import type { Supplier } from "@/types/typesApi"

interface props {
    supplier :  Supplier
}

export function Read({supplier} :  props) {
    return <h1>Read</h1>
}