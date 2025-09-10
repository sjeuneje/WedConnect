export type BillingUnit =
    | 'hour'
    | 'half_day'
    | 'day'
    | 'week'
    | 'package'
    | 'custom';

export type ServiceRate = {
    amount: number | '';
    billing_unit: BillingUnit;
    custom_label?: string;
};

export type ServiceOptionRate = ServiceRate;

export type ServiceOption = {
    id?: number;
    service_id?: number;
    name: string;
    description?: string;
    rate: ServiceOptionRate;
};

export type Service = {
    id?: number;
    provider_id?: number;
    uuid?: string;
    name: string;
    description?: string;
    rates: ServiceRate[];
    options: ServiceOption[];
};

export type ServiceFormData = {
    name: string;
    description?: string;
    rates: ServiceRate[];
    options: ServiceOption[];
    photos?: File[];
};
