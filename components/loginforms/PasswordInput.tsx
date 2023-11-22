'use client';

import { useState } from 'react';
import {
    IconUserCircle,
    IconEyeClosed,
    IconEyeFilled,
    IconBrandGoogleFilled,
} from '@tabler/icons-react';
import { Input } from '@nextui-org/input';

export default function PasswordInput() {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <Input
            label="Password"
            name="password"
            // variant="bordered"
            placeholder="Enter your password"
            labelPlacement="outside"
            endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                        <IconEyeFilled className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        <IconEyeClosed className="text-2xl text-default-400 pointer-events-none" />
                    )}
                </button>
            }
            type={isVisible ? 'text' : 'password'}
        />
    );
}
