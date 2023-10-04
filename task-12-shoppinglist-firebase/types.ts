// For listing items
export interface ShoppinglistItem {
    id: string,
    product: string,
    amount: string,
}

// For adding items
export interface ShoppinglistItemInput {
    product: string,
    amount: string,
}