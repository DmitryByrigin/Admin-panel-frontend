import { Button } from '@nextui-org/button';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function SubmitButtonRegister({isLoading}) {
  return (
    <Button
      type="submit"
      className={`text-sm font-normal text-default-600 bg-default-100 p-6  ${isLoading === null && 'text-default-600'}`}
      variant="flat"
      isLoading = {isLoading}>
      Register
    </Button>
  );
}
