import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Clock, ChevronDown, Check } from 'lucide-react';
interface DateTimePickerProps {
    onSelect?: (timestamp: number) => void;
    minHours?: number;
    maxDays?: number;
    placeholder?: string;
    className?: string;
}
interface TempDate {
    day: number;
    month: number;
    year: number;
    hour: number;
    minute: number;
}
interface MonthOption {
    value: number;
    name: string;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ 
    onSelect = () => {}, 
    minHours = 24,
    maxDays = 7,
    placeholder = "Select date and time",
    className = "" 
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);    
    const getInitialDate = (): TempDate => {
        const initialDate = new Date();
        initialDate.setHours(initialDate.getHours() + minHours);
        return {
            day: initialDate.getDate(),
            month: initialDate.getMonth() + 1,
            year: initialDate.getFullYear(),
            hour: initialDate.getHours()+ minHours,
            minute: initialDate.getMinutes()
        };
    };
    const [tempDate, setTempDate] = useState<TempDate>(getInitialDate());
    const popupRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const getMinDateTime = (): Date => {
        const now = new Date();
        now.setHours(now.getHours() + minHours);
        return now;
    };
    const getMaxDateTime = (): Date => {
        const now = new Date();
        now.setDate(now.getDate() + maxDays);
        return now;
    };
    const getValidDaysInMonth = (month: number, year: number): number[] => {
        const daysInMonth = new Date(year, month, 0).getDate();
        const minDate = getMinDateTime(); // ต้องเป็น +24 ชั่วโมง
        const maxDate = getMaxDateTime();
        const validDays: number[] = [];
        for (let day = 1; day <= daysInMonth; day++) {
            const dayStart = new Date(year, month - 1, day, 0, 0);
            if (dayStart >= minDate && dayStart <= maxDate) validDays.push(day);
        }
        return validDays;
    };
    const getValidMonths = (year: number): number[] => {
        const minDate = getMinDateTime();
        const maxDate = getMaxDateTime();
        const validMonths: number[] = [];
        for (let month = 1; month <= 12; month++) {
            const monthStart = new Date(year, month - 1, 1, 0, 0);
            const monthEnd = new Date(year, month, 0, 23, 59);            
            if (monthEnd >= minDate && monthStart <= maxDate) validMonths.push(month);
        }
        return validMonths;
    };
    const getValidHours = (day: number, month: number, year: number): number[] => {
        const minDate = getMinDateTime();
        const maxDate = getMaxDateTime();
        const validHours: number[] = [];
        for (let hour = 0; hour < 24; hour++) {
            const hourStart = new Date(year, month - 1, day, hour, 0);
            const hourEnd = new Date(year, month - 1, day, hour, 59);        
            if (hourEnd >= minDate && hourStart <= maxDate) validHours.push(hour);
        }
        return validHours;
    };
    const getValidMinutes = (day: number, month: number, year: number, hour: number): number[] => {
        const minDate = getMinDateTime();
        const maxDate = getMaxDateTime();
        const validMinutes: number[] = [];
        for (let minute = 0; minute < 60; minute++) {
            const minuteTime = new Date(year, month - 1, day, hour, minute);        
            if (minuteTime >= minDate && minuteTime <= maxDate) validMinutes.push(minute);
        }
        return validMinutes;
    };
    const days = getValidDaysInMonth(tempDate.month, tempDate.year);
    const months: MonthOption[] = Array.from({ length: 12 }, (_, i) => ({
        value: i + 1,
        name: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][i]
    })).filter(month => getValidMonths(tempDate.year).includes(month.value));    
    const minDate = getMinDateTime();
    const maxDate = getMaxDateTime();
    const minYear = minDate.getFullYear();
    const maxYear = maxDate.getFullYear();
    const years: number[] = [];
    for (let year = minYear; year <= maxYear; year++) {
        years.push(year);
    }
    const hours = getValidHours(tempDate.day, tempDate.month, tempDate.year);
    const minutes = getValidMinutes(tempDate.day, tempDate.month, tempDate.year, tempDate.hour);
    const updateTempDate = (field: keyof TempDate, value: number): void => {
        const newTempDate: TempDate = { ...tempDate, [field]: value };        
        if (field === 'year' || field === 'month') {
            const validDays = getValidDaysInMonth(newTempDate.month, newTempDate.year);
            if (!validDays.includes(newTempDate.day)) newTempDate.day = validDays[0] || 1;
        }        
        if (field === 'year' || field === 'month' || field === 'day') {
            const validHours = getValidHours(newTempDate.day, newTempDate.month, newTempDate.year);
            if (!validHours.includes(newTempDate.hour)) newTempDate.hour = validHours[0] || 0;
        }        
        if (field === 'year' || field === 'month' || field === 'day' || field === 'hour') {
            const validMinutes = getValidMinutes(newTempDate.day, newTempDate.month, newTempDate.year, newTempDate.hour);
            if (!validMinutes.includes(newTempDate.minute)) newTempDate.minute = validMinutes[0] || 0;
        }
        setTempDate(newTempDate);
    };
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node) && 
                buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const handleConfirm = (): void => {
        const dateTime = new Date(tempDate.year, tempDate.month - 1, tempDate.day, tempDate.hour, tempDate.minute);
        setSelectedDate(dateTime);
        onSelect(dateTime.getTime());
        setIsOpen(false);
    };
    const formatDisplayDate = (date: Date | null): string => {
        if (!date) return placeholder;
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    return (
        <div className={`relative inline-block ${className} w-full`}>
            <button ref={buttonRef} onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between w-full px-4 py-2 text-left bg-black border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-80">
                <span className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-white" />
                <span className={selectedDate ? "text-white" : "text-white"}>{formatDisplayDate(selectedDate)}</span>
                </span>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div ref={popupRef} className="absolute z-[9999] w-96 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg" style={{ maxHeight: '80vh' }}>
                <div className="p-4">
                    <div className="flex items-center mb-4"><Clock className="w-5 h-5 mr-2 text-blue-600" /><h3 className="text-lg font-medium text-black">Select Date and Time</h3></div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
                                <select value={tempDate.day} onChange={(e) => updateTempDate('day', parseInt(e.target.value))} className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                    {days.map(day => (<option key={day} value={day}>{day}</option>))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
                                <select value={tempDate.month} onChange={(e) => updateTempDate('month', parseInt(e.target.value))} className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                    {months.map(month => (<option key={month.value} value={month.value}>{month.name}</option>))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                                <select value={tempDate.year} onChange={(e) => updateTempDate('year', parseInt(e.target.value))} className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                    {years.map(year => (<option key={year} value={year}>{year}</option>))}
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Hour</label>
                                <select value={tempDate.hour} onChange={(e) => updateTempDate('hour', parseInt(e.target.value))} className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                    {hours.map(hour => (<option key={hour} value={hour}>{hour.toString().padStart(2, '0')}</option>))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Minute</label>
                                <select value={tempDate.minute} onChange={(e) => updateTempDate('minute', parseInt(e.target.value))} className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                    {minutes.map(minute => (<option key={minute} value={minute}>{minute.toString().padStart(2, '0')}</option>))}
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-2 pt-2">
                            <button onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500">Cancel</button>
                            <button onClick={handleConfirm} className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center ${'bg-blue-600 hover:bg-blue-700'}`}><Check className="w-4 h-4 mr-1" />Confirm</button>
                        </div>
                    </div>
                </div>
                </div>
            )}
        </div>
    );
};

export default DateTimePicker;
