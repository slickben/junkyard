

export interface Plan {
    id: string
    name: string
    description: string
    price: string
}

export interface GroupPlans {
    description: string
    plans: Plan[]
}