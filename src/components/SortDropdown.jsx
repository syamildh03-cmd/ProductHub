import SelectField from './SelectField.jsx'
import { SORT_OPTIONS } from '../utils/productQuery.js'

export default function SortDropdown({ value, onChange }) {
  return <SelectField id="product-sort" label="Urutkan" value={value} options={SORT_OPTIONS} onChange={onChange} />
}
