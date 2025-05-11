interface TypeFilterProps {
  value: 'tracked' | 'others';
  onChange: (value: 'tracked' | 'others') => void;
}

const TypeFilter: React.FC<TypeFilterProps> = ({ value, onChange }) => (
  <div>
    <span className="text-white text-lg font-bold">Tipos</span>
    <div className="flex gap-4">
    <label>
      <input
        type="radio"
        checked={value === 'tracked'}
        onChange={() => onChange('tracked')}
        className="mr-2"
      />
      Rastreados
    </label>
    <label>
      <input
        type="radio"
        checked={value === 'others'}
        onChange={() => onChange('others')}
        className="mr-2"
      />
      Outros
    </label>
    </div>
  </div>
);

export default TypeFilter;
