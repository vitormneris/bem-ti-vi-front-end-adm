export type ActivationStatus = {
    isActive: boolean;
    creationDate: string;
    deactivationDate: string;
}

export type Passwords = {
    passwordOld: string,
    passwordNew: string
};

export type Token = {
    token: string;
};

export type Error = {
    code: string;
    status: string;
    message: string;
    timestamp: string;
    path: string;
    errorFields: ErrorField[] | string | null;
};

export type ErrorField ={
    name: string;
    description: string;
    value: string;
}

export type AdministratorId = {
    id: string
}

export type Administrator = {
    id: string;
    name: string;
    email: string;
    password: string;
    pathImage: string;
    isEmailActive: boolean;
    activationStatus: ActivationStatus | null;
};

export type UserAuth = {
    email: string,
    password: string,
};

export type Category = {
    id: string;
    name: string;
    pathImage: string;
    cardColor: string;
};

export type CategoryFormated = {
    label: string,
    key: string
}

export type CategoryPages = {
    categories: Category[],
    totalPages: number
}

export type Customer = {
    id: string;
    name: string;
    email: string;
    password?: string;
    pathImage: string;
    appointments?: Appointment[]
    orders?: Order[]
    pets?: Pet[]
}

export type CustomerPages = {
    customers: Customer[],
    totalPages: number
}

export type Service = {
    id: string | null,
    name: string,
    price: number,
    pathImage: string,
    estimatedDuration: string,
    description: string
};

export type ServicePages = {
    services: Service[],
    totalPages: number
}

export type Appointment = {
    id: string | null,
    dateTime: Date,
    customer: Customer,
    price: number,
    paymentStatus: string,
    service: Service
    methodPaymentByPix?: boolean;
}

export type AppointmentPages = {
    appointments: Appointment[],
    totalPages: number
}

export type Product = {
    id: string | null,
    name: string,
    price: number,
    pathImage: string,
    description: string,
    categories: Category[],
};

export type ProductPages = {
    product: Product[],
    totalPages: number
}

export type OrderItem = {
    id: string;
    price: number;
    quantity: number;
    product: Product;
}

export type Order = {
    id: string;
    // dateTime: Date;
    moment: Date;
    customer: Customer;
    totalPrice: number;
    paymentStatus: string;
    orderItems: OrderItem;
    methodPaymentByPix: boolean;
    deliverToAddress: boolean;
}

export type OrderPages = {
    orders: Order[];
    totalPages: number;
}

export type Pet = {
    id: string;
    name: string;
}