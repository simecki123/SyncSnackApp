
import { SortOption } from '@/app/types/types';


// HOME PAGE
// Event interface for home page
export interface Event {
    eventId: string;
    creatorId: string;
    creatorFirstName: string;
    creatorLastName: string;
    description: string;
    groupId: string;
    status: string;
    eventType: string;
}

// Interface InProgressEventCardProps for that component that contains event and activeUser that is loged in in app.
export interface InProgressEventCardProps {
    event: Event;
    activeUser: any;
}

// Order food props is interface that is used in OrderFoodComponent and it carries all needed defined atributes
export interface OrderFoodProps {
    event: Event;
    activeUser: any;
    onOrderSuccess: () => void;
}


//-----------------------------------------------------------------------------------------
// LEADERBOARD INTERFACES


// Sort Selector interface
export interface SortSelectorProps {
    sortOption: SortOption;
}

// Interface for UserProfile in leaderboard
export interface User {
    firstName: string;
    lastName: string;
    coffeeCounter: number;
    coffeeRating: number;
}

//-----------------------------------------------------------------------------------
// interfaces for orders
//Order interface
export interface Order {
    userProfileId: string,
    eventType: string,
    status: 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED',
    additionalOptions: any,
    rating: number,
    createdAt: string | Date
}

export interface StarProps {
    value: number,
    handleClick: (value: number) => void,
    isFull: boolean
}

export interface OrdersOrderModalComponentProps {
    coffeeOrderId: string;
    onClose: () => void;
}

//-------------------------------------------------------------------
// Statistics page
// Statistics data interface
export interface StatisticsData {
    completed: number,
    canceled: number,
    ordersPerMonth: number[],
    ordersPerType: {
        coffee: number,
        drinks: number,
        food: number,
        mix: number,
    }
}

// ----------------------------------------------------------------------------------
// Events page interfaces

export interface EventOrder {
    _id: string,
    status: string,
    additionalOptions: string,
    user: {
        _id: string,
        firstName: string,
        lastName: string,
    }
}

// Event for events
export interface EventEvent {
    _id: string,
    title: string,
    description: string,
    status: string,
    eventType: string,
}

//----------------------------------------------------------------------
// Statistics interfaces

export interface MockedData {
    _id: string;
    createdAt: Date;
    completedAt: string | null;
    status: string;
    orderType: string;
    additionalOptions: string;
    rating: number | null | undefined;
}

export interface OrderModalComponentProps {
    description: string;
    onClose: () => void;
}

//---------------------------------------------------------------------------------------------
// User for profile component

export interface ProfileUser {
    email: string,
    firstName: string,
    lastName: string,
    groupName: string,
    score: number,
    profilePhoto: any
}

export interface ProfileGroup {
    name: string,
    description: string,

}

export interface SortOptionsProps {
    sortOption: SortOption;
    onSortChange: (newSortOption: SortOption) => void;
}

