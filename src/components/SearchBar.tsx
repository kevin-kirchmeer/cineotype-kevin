import { useState } from "react";

type SearchBarProps = {
    onSearch: (query: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [text, setText] = useState('');

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setText(event.target.value);
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        onSearch(text.trim());
    }

    return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Nach Filmen suchen..."
        className="flex-1 border border-gray-300 p-2 rounded shadow-sm focus:outline-none focus:border-blue-500"
      />
      <button 
        type="submit" 
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded shadow-sm font-medium transition-colors"
      >
        Suchen
      </button>
    </form>
  );

}