

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

interface businessInfo {
    address: string
    city: string
    country: string
    name: string
    state: string
}

interface AdminWasteType {
    id: string
    name: string
}

interface data {
    avatar: string
    balance: number
    businessInfo: businessInfo
    createdAt: string
    email: string
    id: string
    isSubscribed: boolean
    name: string
    phone_number: string
    planId: string
    role: string
    adminWasteType: AdminWasteType[]
    waste_type: AdminWasteType[]
    pricePerKg: number

}

export interface User {
    data: data
}