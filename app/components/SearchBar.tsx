import { useState, useEffect } from 'react';

interface SearchBarProps {
  reserved: number[];
  removed: number[];
  fetchReservedNumbersFromDB: () => Promise<number[]>;
}

export const SearchBar: React.FC<SearchBarProps> = ({ reserved, removed, fetchReservedNumbersFromDB }) => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState<number | null>(null);
  const [dbReserved, setDbReserved] = useState<number[]>([]);

  useEffect(() => {
    fetchReservedNumbersFromDB().then(data => setDbReserved(data));
  }, [fetchReservedNumbersFromDB]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    const number = parseInt(e.target.value, 10);

    if (!isNaN(number)) {
      if (!reserved.includes(number) && !removed.includes(number) && !dbReserved.includes(number)) {
        setSearchResult(number);
      } else {
        setSearchResult(null);
      }
    } else {
      setSearchResult(null);
    }
  };

  return (
    <div>
      <input type="text" value={search} onChange={handleChange} placeholder="Search for a number..." />
      {searchResult !== null && (
        <div>
          <h2>Number {searchResult} is available</h2>
        </div>
      )}
    </div>
  );
};
