import SelectField from './SelectField.jsx'

export default function FilterDropdown({ categories, value, onChange }) {
  const options = [
    { value: '', label: 'Semua kategori' },
    ...categories.map((category) => ({ value: category.slug, label: category.name })),
  ]
  return <SelectField id="category-filter" label="Kategori" value={value} options={options} onChange={onChange} />
}
