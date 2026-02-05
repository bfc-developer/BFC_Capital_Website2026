import { useState, useEffect } from 'react';

export const useDeviceType = () => {
    const [deviceType, setDeviceType] = useState<'android' | 'ios' | 'desktop'>('desktop');

    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

        if (/android/i.test(userAgent)) {
            setDeviceType('android');
        } else if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
            setDeviceType('ios');
        } else {
            setDeviceType('desktop');
        }
    }, []);

    return deviceType;
};
