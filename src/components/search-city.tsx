import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';

type SearchProps = {
  onSearch: (value: string) => void,
  refetch: () => void, 
  q: string
};

export function SearchCity({ onSearch, q, refetch }: SearchProps) {
  const [inputValue, setInputValue] = useState(q);
  const [lastTypedValue, setLastTypedValue] = useState('');
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (inputValue === lastTypedValue) {
        onSearch(inputValue);
        refetch()
      }
    }, 1000);
  
    return () => clearTimeout(timeout);
  }, [inputValue, lastTypedValue, onSearch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setLastTypedValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(inputValue);
    }
  };

  return (
    <Input 
      onChange={handleChange} 
      onKeyPress={handleKeyPress}
      placeholder="Search city" 
      type="search" 
      value={inputValue} 
    />
  );
}
