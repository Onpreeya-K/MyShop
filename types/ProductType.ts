type Rating = {
    rate: number
    count: number
}

export type Product = {
    id: number
    name: string
    desc?: string
    image?: string
    price?: number
    rating?: Rating
    idAddToCart?: string
}