interface TypeFilterProps {
    value: 'tracked' | 'others';
    onChange: (value: 'tracked' | 'others') => void;
}
declare const TypeFilter: React.FC<TypeFilterProps>;
export default TypeFilter;
