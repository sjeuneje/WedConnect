import {JSX} from "react";

export type Provider = {
    id: number;
    user_id: number;
    company_name: string;
    logo: string | null;
    city: string | null;
    zipcode: string | null;
    description: string | null;
    facebook_url: string | null;
    instagram_url: string | null;
    website_url: string | null;
    trial_end_at: string | null;
    published_at: string | null;
    created_at: string;
    updated_at: string;
};

export type User = {
    id: number;
    email: string;
    country: string;
    phone_number: string;
    phone_verified: boolean | 0 | 1;
    role: 'provider';
    created_at: string;
    updated_at: string;
    provider: Provider;
};

export type Page = {
    name: string;
    href: string;
    icon: JSX.Element;
    showOnDesktop: boolean;
    method: string;
};
