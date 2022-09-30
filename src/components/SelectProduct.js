function SelectProduct({ products, selectedProductID }) {
    return (
        <select name="cars" id="cars" className="p-2" onChange={e => selectedProductID(e.target.value)}>
            <option value="select">Select Product</option>
            {products.map(product => (
                <option key={product._id} value={product._id}>
                    {product.name}
                </option>
            ))}
        </select>
    )
}

export default SelectProduct