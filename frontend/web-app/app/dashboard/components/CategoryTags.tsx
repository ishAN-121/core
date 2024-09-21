import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface CategoryTagsProps {
  initialTags?: string[];
  onTagsChange?: (tags: string[]) => void;
}

const CategoryTags: React.FC<CategoryTagsProps> = ({ initialTags = [], onTagsChange }) => {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [inputValue, setInputValue] = useState<string>('');

  const addTag = () => {
    if (inputValue.trim() !== '' && !tags.includes(inputValue.trim())) {
      const newTags = [...tags, inputValue.trim()];
      setTags(newTags);
      setInputValue('');
      onTagsChange?.(newTags);
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
    onTagsChange?.(newTags);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Add a category"
          className="flex-grow"
        />
        <Button className="bg-secondaryGreen text-primaryGreen" onClick={addTag}>Add</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div 
            key={index} 
            className="bg-secondaryGreen text-white px-3 py-1 rounded-full flex items-center"
          >
            {tag}
            <button 
              onClick={() => removeTag(tag)} 
              className="ml-2 focus:outline-none text-primaryGreen"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryTags;