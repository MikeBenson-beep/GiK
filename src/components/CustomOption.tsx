import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface CustomOptionProps {
  onSelect: (value: string) => void;
  placeholder?: string;
}

export function CustomOption({ onSelect, placeholder = "Other (please specify)" }: CustomOptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSelect(value);
    }
  };

  return (
    <Card className="relative p-6 transition-all duration-300 bg-white/5 hover:bg-white/10 border-white/10">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full text-left"
        >
          <h3 className="text-xl font-semibold mb-2 text-white/80">{placeholder}</h3>
          <p className="text-gray-400">Customize your own option</p>
        </button>
      ) : (
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit}
        >
          <Input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="bg-black/50 border-white/20 text-white mb-4"
            placeholder="Enter your custom option..."
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded transition-colors duration-300"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white/70 rounded transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
        </motion.form>
      )}
    </Card>
  );
}