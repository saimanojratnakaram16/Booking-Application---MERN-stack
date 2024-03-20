import  React, { createContext, useContext, useState } from 'react';

type SearchContext = {
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotelId?: number,
    saveSearchData: (
        destination: string,
        checkIn: Date,
        checkOut: Date,
        adultCount: number,
        childCount: number,
        hotelId?: number,
    )=>void;
}

type SearchContextProviderProps = {
    children: React.ReactNode
}

const SearchContext = createContext<SearchContext | undefined>(undefined);

export const SearchContextProvider = ({children}:SearchContextProviderProps) =>{

    const [destination,setDestination] = useState<string>("") 
    const [checkIn,setCheckIn] = useState<Date>(new Date()) 
    const [checkOut,setcheckOut] = useState<Date>(new Date()) 
    const [adultCount,setAdultCount] = useState<number>(1)
    const [childCount,setChildCount] = useState<number>(0)  
    const [hotelId, setHotelId] = useState<number>();
    const saveSearchData = (destination: string,
        checkIn: Date,
        checkOut: Date,
        adultCount: number,
        childCount: number,
        hotelId?:number)=>{
            setDestination(destination);
            setCheckIn(checkIn);
            setChildCount(childCount);
            setAdultCount(adultCount);
            setcheckOut(checkOut);
            if(hotelId) setHotelId(hotelId);
        }

    return (
        <SearchContext.Provider value={{destination,checkIn,checkOut,childCount,adultCount,hotelId, saveSearchData}}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearchContext = ()=>{
    const context = useContext(SearchContext);
    return context as SearchContext;
}