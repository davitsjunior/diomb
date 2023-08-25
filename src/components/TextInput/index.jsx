import './styles.css'

export const InputPesquisa = ({ handleChange, searchValue }) => {
    return (
        <input className='input-pesquisa'
            onChange={handleChange}
            value={searchValue}
            type='search'
            placeholder='Pesquisa por referência'
        />
    )
}